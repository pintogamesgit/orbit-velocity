package com.orbitvelocity.game;

import android.app.Application;
import com.google.android.gms.games.PlayGamesSdk;

public class OrbitVelocityApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        String projectId = getString(R.string.game_services_project_id).trim();
        if (!projectId.isEmpty() && !"0000000000".equals(projectId)) {
            PlayGamesSdk.initialize(this);
        }
    }
}
