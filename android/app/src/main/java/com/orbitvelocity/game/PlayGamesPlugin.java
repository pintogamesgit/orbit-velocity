package com.orbitvelocity.game;

import android.content.Intent;
import android.net.Uri;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.games.GamesSignInClient;
import com.google.android.gms.games.PlayGames;
import com.google.android.gms.games.PlayGamesSdk;
import com.google.android.gms.games.Player;
import com.google.android.gms.games.snapshot.Snapshot;
import com.google.android.gms.games.snapshot.SnapshotMetadataChange;
import com.google.android.gms.games.SnapshotsClient;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "PlayGames")
public class PlayGamesPlugin extends Plugin {
    private static final String SAVE_NAME = "orbitvelocity_main_save_v1";
    private boolean configured = false;

    @Override
    public void load() {
        super.load();
        String projectId = getContext().getString(R.string.game_services_project_id).trim();
        configured = !projectId.isEmpty() && !"0000000000".equals(projectId);
        if (configured) {
            PlayGamesSdk.initialize(getContext());
        }
    }

    private void requireConfigured(PluginCall call) {
        if (!configured) {
            call.reject("Play Games Services is not configured. Replace game_services_project_id first.");
        }
    }

    private GamesSignInClient signInClient() {
        return PlayGames.getGamesSignInClient(getActivity());
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject result = new JSObject();
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
            .addOnFailureListener(error -> call.reject("Could not read Play Games status.", error));
    }

    @PluginMethod
    public void signIn(PluginCall call) {
        if (!configured) {
            requireConfigured(call);
            return;
        }
        boolean interactive = Boolean.TRUE.equals(call.getBoolean("interactive", false));
        signInClient().isAuthenticated()
            .addOnSuccessListener(auth -> {
                if (auth.isAuthenticated()) {
                    resolvePlayer(call);
                } else if (interactive) {
                    signInClient().signIn()
                        .addOnSuccessListener(result -> {
                            if (result.isAuthenticated()) resolvePlayer(call);
                            else resolveSignedOut(call);
                        })
                        .addOnFailureListener(error -> call.reject("Play Games sign-in failed.", error));
                } else {
                    resolveSignedOut(call);
                }
            })
            .addOnFailureListener(error -> call.reject("Play Games sign-in failed.", error));
    }

    private void resolveSignedOut(PluginCall call) {
        JSObject result = new JSObject();
        result.put("signedIn", false);
        call.resolve(result);
    }

    private void resolvePlayer(PluginCall call) {
        PlayGames.getPlayersClient(getActivity()).getCurrentPlayer()
            .addOnSuccessListener(player -> call.resolve(playerToJson(player)))
            .addOnFailureListener(error -> call.reject("Could not load the Play Games player.", error));
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
                    call.reject("Cloud save conflict could not be resolved automatically.");
                    return;
                }
                Snapshot snapshot = result.getData();
                snapshot.getSnapshotContents().writeBytes(data.getBytes(StandardCharsets.UTF_8));
                SnapshotMetadataChange metadata = new SnapshotMetadataChange.Builder()
                    .setDescription("Orbit Velocity cloud progress")
                    .build();
                client.commitAndClose(snapshot, metadata)
                    .addOnSuccessListener(saved -> {
                        JSObject response = new JSObject();
                        response.put("saved", true);
                        call.resolve(response);
                    })
                    .addOnFailureListener(error -> call.reject("Cloud save failed.", error));
            })
            .addOnFailureListener(error -> call.reject("Could not open cloud save.", error));
    }

    @PluginMethod
    public void loadGame(PluginCall call) {
        if (!configured) {
            requireConfigured(call);
            return;
        }
        SnapshotsClient client = PlayGames.getSnapshotsClient(getActivity());
        client.open(SAVE_NAME, false, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
            .addOnSuccessListener(result -> {
                JSObject response = new JSObject();
                if (result.isConflict() || result.getData() == null) {
                    response.put("found", false);
                    call.resolve(response);
                    return;
                }
                Snapshot snapshot = result.getData();
                try {
                    byte[] bytes = snapshot.getSnapshotContents().readFully();
                    response.put("found", bytes.length > 0);
                    response.put("data", new String(bytes, StandardCharsets.UTF_8));
                    client.discardAndClose(snapshot);
                    call.resolve(response);
                } catch (Exception error) {
                    client.discardAndClose(snapshot);
                    call.reject("Could not read cloud save.", error);
                }
            })
            .addOnFailureListener(error -> {
                JSObject response = new JSObject();
                response.put("found", false);
                response.put("error", error.getMessage());
                call.resolve(response);
            });
    }
}
