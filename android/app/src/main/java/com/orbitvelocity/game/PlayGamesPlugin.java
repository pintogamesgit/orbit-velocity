package com.orbitvelocity.game;

import android.content.Intent;
import android.net.Uri;
import android.util.AtomicFile;
import android.content.pm.PackageInfo;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.games.GamesSignInClient;
import com.google.android.gms.games.GamesClientStatusCodes;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.games.PlayGames;
import com.google.android.gms.games.Player;
import com.google.android.gms.games.snapshot.Snapshot;
import com.google.android.gms.games.snapshot.SnapshotMetadata;
import com.google.android.gms.games.snapshot.SnapshotMetadataChange;
import com.google.android.gms.games.snapshot.SnapshotMetadataBuffer;
import com.google.android.gms.games.SnapshotsClient;
import java.nio.charset.StandardCharsets;
import java.io.File;
import java.io.FileOutputStream;
import org.json.JSONObject;
import java.util.UUID;

@CapacitorPlugin(name = "PlayGames")
public class PlayGamesPlugin extends Plugin {
    private static final String SAVE_NAME = "orbitvelocity_main_save_v1";
    private boolean configured = false;

    private synchronized JSONObject installationState() throws Exception {
        // Android restores WebView/localStorage from Auto Backup on reinstall.
        // This identity deliberately lives outside that backup and survives updates.
        AtomicFile marker = new AtomicFile(new File(getContext().getNoBackupFilesDir(), "cloud-installation.json"));
        if (marker.getBaseFile().exists()) {
            return new JSONObject(new String(marker.readFully(), StandardCharsets.UTF_8));
        }
        PackageInfo info = getContext().getPackageManager().getPackageInfo(getContext().getPackageName(), 0);
        JSONObject state = new JSONObject();
        state.put("installationId", UUID.randomUUID().toString());
        // Legacy localStorage has no identity yet. Distinguish an in-place update
        // from an install whose data may have come from an older Android backup.
        state.put("freshInstall", info.firstInstallTime == info.lastUpdateTime);
        FileOutputStream output = null;
        try {
            output = marker.startWrite();
            output.write(state.toString().getBytes(StandardCharsets.UTF_8));
            marker.finishWrite(output);
        } catch (Exception error) {
            if (output != null) marker.failWrite(output);
            throw error;
        }
        return state;
    }

    @Override
    public void load() {
        super.load();
        String projectId = getContext().getString(R.string.game_services_project_id).trim();
        configured = !projectId.isEmpty() && !"0000000000".equals(projectId);
    }

    private void requireConfigured(PluginCall call) {
        if (!configured) {
            call.reject("Play Games Services is not configured. Replace game_services_project_id first.");
        }
    }

    private GamesSignInClient signInClient() {
        return PlayGames.getGamesSignInClient(getActivity());
    }

    private void rejectAuth(PluginCall call, String stage, Exception error) {
        String code = "PGS_" + stage + "_" +
            (error instanceof ApiException ? String.valueOf(((ApiException) error).getStatusCode()) : "UNKNOWN");
        call.reject("Play Games authentication failed.", code, error);
    }

    private void rejectCloud(PluginCall call, String stage, Exception error) {
        String code = "PGS_CLOUD_" + stage + "_" +
            (error instanceof ApiException ? String.valueOf(((ApiException) error).getStatusCode()) : "UNKNOWN");
        call.reject("Play Games cloud sync failed.", code, error);
    }

    private void resolveSave(PluginCall call, boolean verified) {
        JSObject response = new JSObject();
        response.put("saved", true);
        response.put("cloudVerified", verified);
        call.resolve(response);
    }

    private void verifyCloudCommit(SnapshotsClient client, String revision, String expectedData, PluginCall call) {
        // A successful commit can be cached offline. Confirm the exact revision
        // in a fresh server listing before reporting a cloud backup to the player.
        client.load(true)
            .addOnSuccessListener(result -> {
                SnapshotMetadata remote = null;
                SnapshotMetadataBuffer entries = result.get();
                try {
                    if (!result.isStale() && entries != null) {
                        for (int i = 0; i < entries.getCount(); i++) {
                            if (SAVE_NAME.equals(entries.get(i).getUniqueName()) &&
                                revision.equals(entries.get(i).getDescription())) {
                                remote = entries.get(i).freeze();
                                break;
                            }
                        }
                    }
                } finally {
                    if (entries != null) entries.release();
                }
                if (remote == null) {
                    resolveSave(call, false);
                    return;
                }
                client.open(remote, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
                    .addOnSuccessListener(opened -> {
                        if (opened.isConflict() || opened.getData() == null) {
                            resolveSave(call, false);
                            return;
                        }
                        Snapshot snapshot = opened.getData();
                        boolean matches = false;
                        try {
                            matches = revision.equals(snapshot.getMetadata().getDescription()) &&
                                expectedData.equals(new String(snapshot.getSnapshotContents().readFully(), StandardCharsets.UTF_8));
                        } catch (Exception ignored) {
                            // An unreadable snapshot is not a confirmed backup.
                        }
                        final boolean verified = matches;
                        client.discardAndClose(snapshot)
                            .addOnSuccessListener(ignored -> resolveSave(call, verified))
                            .addOnFailureListener(error -> resolveSave(call, false));
                    })
                    .addOnFailureListener(error -> resolveSave(call, false));
            })
            .addOnFailureListener(error -> resolveSave(call, false));
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject result = new JSObject();
        try {
            JSONObject installation = installationState();
            result.put("installationId", installation.getString("installationId"));
            result.put("freshInstall", installation.getBoolean("freshInstall"));
        } catch (Exception error) {
            call.reject("Could not identify this installation safely.", "PGS_INSTALLATION_STATE_FAILED", error);
            return;
        }
        result.put("configured", configured);
        if (!configured) {
            result.put("signedIn", false);
            call.resolve(result);
            return;
        }

        signInClient().isAuthenticated()
            .addOnSuccessListener(auth -> {
                result.put("signedIn", auth.isAuthenticated());
                call.resolve(result);
            })
            .addOnFailureListener(error -> rejectAuth(call, "STATUS", error));
    }

    @PluginMethod
    public void signIn(PluginCall call) {
        if (!configured) {
            requireConfigured(call);
            return;
        }
        boolean interactive = Boolean.TRUE.equals(call.getBoolean("interactive", false));
        // An explicit retry must not depend on a successful silent status check.
        if (interactive) {
            signInClient().signIn()
                .addOnSuccessListener(result -> {
                    if (result.isAuthenticated()) resolvePlayer(call);
                    else call.reject("Play Games did not authenticate the player.", "PGS_SIGNIN_NOT_AUTHENTICATED");
                })
                .addOnFailureListener(error -> rejectAuth(call, "SIGNIN", error));
            return;
        }
        signInClient().isAuthenticated()
            .addOnSuccessListener(auth -> {
                if (auth.isAuthenticated()) {
                    resolvePlayer(call);
                } else {
                    resolveSignedOut(call);
                }
            })
            .addOnFailureListener(error -> rejectAuth(call, "AUTH", error));
    }

    private void resolveSignedOut(PluginCall call) {
        JSObject result = new JSObject();
        result.put("signedIn", false);
        call.resolve(result);
    }

    private void resolvePlayer(PluginCall call) {
        PlayGames.getPlayersClient(getActivity()).getCurrentPlayer()
            .addOnSuccessListener(player -> call.resolve(playerToJson(player)))
            .addOnFailureListener(error -> rejectAuth(call, "PROFILE", error));
    }

    private JSObject playerToJson(Player player) {
        JSObject result = new JSObject();
        result.put("signedIn", true);
        result.put("playerId", player.getPlayerId());
        result.put("displayName", player.getDisplayName());
        Uri icon = player.getIconImageUri();
        Uri hiRes = player.getHiResImageUri();
        result.put("iconUrl", icon == null ? "" : icon.toString());
        result.put("hiResIconUrl", hiRes == null ? "" : hiRes.toString());
        return result;
    }

    @PluginMethod
    public void unlockAchievement(PluginCall call) {
        if (!configured) {
            requireConfigured(call);
            return;
        }
        String achievementId = call.getString("achievementId", "").trim();
        if (achievementId.isEmpty()) {
            call.reject("achievementId is required.");
            return;
        }
        PlayGames.getAchievementsClient(getActivity()).unlockImmediate(achievementId)
            .addOnSuccessListener(ignored -> call.resolve())
            .addOnFailureListener(error -> call.reject("Could not unlock achievement.", error));
    }

    @PluginMethod
    public void incrementAchievement(PluginCall call) {
        if (!configured) {
            requireConfigured(call);
            return;
        }
        String achievementId = call.getString("achievementId", "").trim();
        Integer steps = call.getInt("steps", 1);
        if (achievementId.isEmpty()) {
            call.reject("achievementId is required.");
            return;
        }
        PlayGames.getAchievementsClient(getActivity())
            .incrementImmediate(achievementId, Math.max(1, steps == null ? 1 : steps))
            .addOnSuccessListener(ignored -> call.resolve())
            .addOnFailureListener(error -> call.reject("Could not increment achievement.", error));
    }

    @PluginMethod
    public void showAchievements(PluginCall call) {
        if (!configured) {
            requireConfigured(call);
            return;
        }
        PlayGames.getAchievementsClient(getActivity()).getAchievementsIntent()
            .addOnSuccessListener(intent -> {
                getActivity().startActivity(intent);
                call.resolve();
            })
            .addOnFailureListener(error -> call.reject("Could not open achievements.", error));
    }

    @PluginMethod
    public void saveGame(PluginCall call) {
        if (!configured) {
            requireConfigured(call);
            return;
        }
        String data = call.getString("data");
        if (data == null) {
            call.reject("data is required.");
            return;
        }

        SnapshotsClient client = PlayGames.getSnapshotsClient(getActivity());
        client.open(SAVE_NAME, true, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
            .addOnSuccessListener(result -> {
                if (result.isConflict() || result.getData() == null) {
                    call.reject("Cloud save conflict could not be resolved automatically.", "PGS_CLOUD_CONFLICT");
                    return;
                }
                Snapshot snapshot = result.getData();
                try {
                    if (!snapshot.getSnapshotContents().writeBytes(data.getBytes(StandardCharsets.UTF_8))) {
                        client.discardAndClose(snapshot);
                        call.reject("Could not write cloud save contents.", "PGS_CLOUD_WRITE_FAILED");
                        return;
                    }
                } catch (Exception error) {
                    client.discardAndClose(snapshot);
                    rejectCloud(call, "WRITE", error);
                    return;
                }
                String revision = "Orbit Velocity save " + UUID.randomUUID();
                SnapshotMetadataChange metadata = new SnapshotMetadataChange.Builder()
                    .setDescription(revision)
                    .build();
                client.commitAndClose(snapshot, metadata)
                    .addOnSuccessListener(saved -> verifyCloudCommit(client, revision, data, call))
                    .addOnFailureListener(error -> rejectCloud(call, "COMMIT", error));
            })
            .addOnFailureListener(error -> rejectCloud(call, "OPEN", error));
    }

    @PluginMethod
    public void loadGame(PluginCall call) {
        if (!configured) {
            requireConfigured(call);
            return;
        }
        SnapshotsClient client = PlayGames.getSnapshotsClient(getActivity());
        client.load(true).continueWithTask(task -> {
            // A stale/empty device cache must never be interpreted as no cloud save.
            com.google.android.gms.games.AnnotatedData<SnapshotMetadataBuffer> result = task.getResult();
            SnapshotMetadataBuffer entries = result.get();
            if (entries != null) entries.release();
            if (result.isStale()) {
                throw new ApiException(new Status(CommonStatusCodes.NETWORK_ERROR,
                    "Could not refresh saved games from the server."));
            }
            return client.open(SAVE_NAME, false, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED);
        })
            .addOnSuccessListener(result -> {
                JSObject response = new JSObject();
                if (result.isConflict() || result.getData() == null) {
                    call.reject("Cloud save could not be resolved.", "PGS_CLOUD_CONFLICT");
                    return;
                }
                Snapshot snapshot = result.getData();
                try {
                    byte[] bytes = snapshot.getSnapshotContents().readFully();
                    response.put("found", bytes.length > 0);
                    response.put("data", new String(bytes, StandardCharsets.UTF_8));
                    client.discardAndClose(snapshot)
                        .addOnSuccessListener(ignored -> call.resolve(response))
                        .addOnFailureListener(error -> rejectCloud(call, "CLOSE", error));
                } catch (Exception error) {
                    client.discardAndClose(snapshot);
                    rejectCloud(call, "READ", error);
                }
            })
            .addOnFailureListener(error -> {
                if (error instanceof ApiException &&
                    ((ApiException) error).getStatusCode() == GamesClientStatusCodes.SNAPSHOT_NOT_FOUND) {
                    JSObject response = new JSObject();
                    response.put("found", false);
                    call.resolve(response);
                } else {
                    rejectCloud(call, "LOAD", error);
                }
            });
    }
}
