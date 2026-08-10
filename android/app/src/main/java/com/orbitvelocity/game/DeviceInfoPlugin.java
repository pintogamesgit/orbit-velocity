package com.orbitvelocity.game;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Build;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "DeviceInfo")
public class DeviceInfoPlugin extends Plugin {
    @PluginMethod
    public void getInfo(PluginCall call) {
        JSObject result = new JSObject();
        result.put("manufacturer", Build.MANUFACTURER);
        result.put("brand", Build.BRAND);
        result.put("model", Build.MODEL);
        result.put("device", Build.DEVICE);
        result.put("product", Build.PRODUCT);
        result.put("hardware", Build.HARDWARE);
        result.put("sdkInt", Build.VERSION.SDK_INT);
        result.put("release", Build.VERSION.RELEASE);
        result.put("cpuCores", Runtime.getRuntime().availableProcessors());
        result.put("supportedAbis", String.join(", ", Build.SUPPORTED_ABIS));

        ActivityManager.MemoryInfo memoryInfo = new ActivityManager.MemoryInfo();
        ActivityManager activityManager = (ActivityManager) getContext().getSystemService(Context.ACTIVITY_SERVICE);
        if (activityManager != null) {
            activityManager.getMemoryInfo(memoryInfo);
            result.put("totalRamMb", memoryInfo.totalMem / 1048576);
            result.put("availableRamMb", memoryInfo.availMem / 1048576);
            result.put("memoryThresholdMb", memoryInfo.threshold / 1048576);
            result.put("lowMemory", memoryInfo.lowMemory);
        }
        call.resolve(result);
    }
}
