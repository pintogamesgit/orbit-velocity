# Privacy policy publication checklist

Updated locally on 2026-10-11. Publication is deferred until the user's final coordinated update. Do not treat the updated local HTML as already published.

The public page returned HTTP 200 on 2026-10-07 but still described version 1.1 (code 2) with Play Games disabled. The local policy now describes version 1.1.10 (code 18), optional Play Games/cloud saves, and a prominent `#delete-data` section. Recheck against the final uploaded AAB, not just the local build configuration.

Planned public URLs after the final update:

- Privacy: https://pintogamesgit.github.io/orbit-velocity/www/privacy.html
- Deletion instructions: https://pintogamesgit.github.io/orbit-velocity/www/privacy.html#delete-data

Before publication:

- Recheck the final age flow: the local policy describes no ads or social links for under-18/unknown users, and optional Play Games for eligible users of every age group. Verify the release behavior on Android, including consent and ad-request settings.
- The developer must review and adopt the proposed support-email retention and deletion practice, or replace it with their actual practice and retention period.
- Confirm that the support mailbox is monitored and establish the actual deletion response time and any retained-record periods before submission. No numeric deadline has been invented in the policy. Verify cloud deletion with a test profile, including other devices and restoration of local backups; do not promise deletion of Google-controlled advertising or diagnostic records through the developer's mailbox.
- Confirm that AdMob has no additional mediation providers or account-side features that require extra disclosures; these cannot be verified from the local source.
- Publish the reviewed HTML at a public HTTPS URL without sign-in. Existing repository: `pintogamesgit/orbit-velocity`. If GitHub Pages serves the repository root, the file path will be `/orbit-velocity/www/privacy.html`. Verify the actual Pages domain and successful public response before entering any URL in Play Console.
- Publish the same reviewed policy online and in the bundled app. Sync Android assets before building the final signed AAB. Update the policy's version/date if the release changes from version 1.1.10 / code 18.
- Verify that the public deletion URL scrolls directly to the deletion instructions and shows the final content before submitting the Data safety form. A saved draft may contain the planned URL, but the current public page is still outdated.
- Keep Play Console Data safety answers consistent with the actual SDKs and policy.

Sources:

- https://support.google.com/googleplay/android-developer/answer/10144311
- https://developers.google.com/admob/android/privacy/play-data-disclosure
- https://policies.google.com/privacy
- https://support.google.com/googleplay/answer/9130646?hl=en

No Git commit, push, or website deployment has been performed. Android assets were synced and the bundled policy was checked against the source in the 1.1.10 test APK and unsigned AAB on 2026-10-11. The user signs release builds through Android Studio; generate the signed release from this updated project. The public page has not been rechecked or updated during this preparation.
