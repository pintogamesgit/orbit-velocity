# ORBIT VELOCITY 1.1.10 (18)

Prepared October 11, 2026. Package: `com.orbitvelocity.game`.

## Files

- `orbit-velocity-1.1.10-code18-debug.apk`: debug-signed APK for local testing. It cannot replace an installed Play Store build with a different signing certificate. Do not uninstall your existing game just to install this APK; use a test device or a signed Play testing release to preserve progress.
- `orbit-velocity-1.1.10-code18-unsigned.aab`: unsigned release bundle, not ready for Play upload. The user signs releases in Android Studio. Generate a signed Android App Bundle from this project's `android` directory using the existing upload key.

## Changes

- Android version advanced from 1.1.9 (17) to 1.1.10 (18); npm package metadata aligned.
- Navigation-bar theme attributes requiring API 27 moved to version-qualified resources, preserving support for API 24–26.
- Privacy policy dated October 11, 2026 and matched to this release. Added disclosure of local device/performance information, installation/synchronization metadata, and cloud-saved shop reward date.
- Updated policy included in both artifacts and verified byte-for-byte against `www/privacy.html`.

## Validation

- All 60 existing JavaScript tests passed (audience/ad gating, cloud synchronization and tutorial restoration).
- All 19 JavaScript files parsed successfully; 103 local HTML references checked with no missing files (the native Capacitor bridge is generated separately).
- `assembleDebug bundleRelease testDebugUnitTest lintDebug --offline`: successful.
- Android app lint: 0 errors, 31 warnings. Warnings remain, including portrait orientation, obsolete checks and unused resources; this is not a zero-warning release.
- APK manifest confirmed version 1.1.10 / code 18.
- Debug APK signature verified with apksigner; release AAB has no JAR signing entries.

## Still requires device testing

No Android device was connected. Live gameplay, touch/audio, actual Play Games login and cross-device saves, and live AdMob consent/ads were not verified on a device. Test the signed release via Play's testing track before production: launch as guest, select an age group, complete gameplay, buy/equip items, restart, connect Play Games, and confirm cloud restoration on a separate test device. Check that minors cannot request ads and that adult consent/reward flows work. Achievement IDs in `playGamesConfig.js` remain empty, so configured Google achievements are not submitted.

Privacy changes are local and bundled only; the public privacy-policy website was not deployed. Existing signed files under `android/app/release` were not replaced and should not be mistaken for this release.
