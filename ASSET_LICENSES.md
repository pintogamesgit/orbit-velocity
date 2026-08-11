# ORBIT VELOCITY Asset Licenses

Use this file to track every third-party or AI-generated asset before publishing
the game to Google Play.

Rule of thumb:

- `CC0` is OK for commercial use and does not require attribution.
- `CC BY` is OK for commercial use, but attribution is required.
- `CC BY-NC` / `NonCommercial` is NOT OK for a Google Play game with ads,
  purchases, or commercial intent unless you get written permission.
- `UNKNOWN` is NOT approved yet. Keep the source link and license proof before
  publishing.
- AI-generated music is OK only if the AI tool terms allow commercial use.

## Status Key

| Status | Meaning |
| --- | --- |
| `OK` | Approved for use. Source and license proof are recorded. |
| `NEEDS_CREDIT` | Usable, but must be credited in-game or in the store listing. |
| `REPLACE` | Not safe for commercial use. Replace or get written permission. |
| `UNKNOWN` | Not checked yet. Do not treat as approved. |

## Sounds And Music

| File | Type | Source | Creator | License | Commercial use? | Credit required? | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `www/sounds/backgroundMusics/homeScreen.mp3` | Music | AI generated - fill tool name | You | AI tool terms - fill link/proof | Unknown | Unknown | UNKNOWN | Add the AI tool name, date, and proof that commercial use is allowed. |
| `www/sounds/game/gameplayMusic.mp3` | Music | AI generated - fill tool name | You | AI tool terms - fill link/proof | Unknown | Unknown | UNKNOWN | Add the AI tool name, date, and proof that commercial use is allowed. |
| `www/sounds/backgroundSoundEffect/buttonClick.wav` | Sound effect | Freesound - fill URL | Fill creator | Fill license | Unknown | Unknown | UNKNOWN | Used for regular button, map, and equip/select clicks. Fill the new source/license before publishing. |
| `www/sounds/backgroundSoundEffect/equipButton.wav` | Sound effect | Freesound - fill URL | Fill creator | Fill license | Unknown | Unknown | UNKNOWN | Used for weapon, pet, skin, and super equip actions. Fill the source/license before publishing. |
| `www/sounds/game/soundEffects/enemyExplosion.mp3` | Sound effect | Freesound - fill URL | Fill creator | Fill license | Unknown | Unknown | UNKNOWN | Use only CC0 or CC BY, not CC BY-NC. |
| `www/sounds/game/soundEffects/powerUp.wav` | Sound effect | Freesound - fill URL | Fill creator | Fill license | Unknown | Unknown | UNKNOWN | Replacement for the old NonCommercial power-up sound. Fill the new source/license before publishing. |
| `www/sounds/game/soundEffects/superAttacksSounds/superAttack1Sound.mp3` | Sound effect | Freesound - fill URL | Fill creator | Fill license | Unknown | Unknown | UNKNOWN | Use only CC0 or CC BY, not CC BY-NC. |
| `www/sounds/game/soundEffects/superAttacksSounds/superLaserSound.mp3` | Sound effect | Freesound - fill URL | Fill creator | Fill license | Unknown | Unknown | UNKNOWN | Use only CC0 or CC BY, not CC BY-NC. |

## Freesound Download History Matches

These are sounds found from browser download names. Match each one to the
renamed file in `www/sounds`, then copy the source/license details into the
main table above.

| Downloaded/original file | Source | Creator | License | Commercial use? | Credit required? | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `588251_romeo_kaleikau_power-up-regeneration-sfx.wav` | https://freesound.org/people/Romeo_Kaleikau/sounds/588251/ | Romeo_Kaleikau | Attribution NonCommercial 3.0 | No | Yes | REPLACE | Not safe for a commercial Google Play game unless you get written permission. |
| `330293_humanoide9000_sci-fi-gun-shot-x6.wav` | https://freesound.org/people/humanoide9000/sounds/330293/ | humanoide9000 | Creative Commons 0 | Yes | No | OK | Safe to use commercially. |
| `584191_unfa_weapons-beam-loop.flac` | https://freesound.org/people/unfa/sounds/584191/ | unfa | Creative Commons 0 | Yes | No | OK | Safe to use commercially. |
| `394128_morganpurkis_space-explosion.wav` | https://freesound.org/people/morganpurkis/sounds/394128/ | morganpurkis | Creative Commons 0 | Yes | No | OK | Safe to use commercially. |

## Replacement Candidates For Power-Up / Shield Sounds

These are possible replacements for the `Attribution NonCommercial` sound above.
All candidates below are listed as `Creative Commons 0` on Freesound.

| Candidate | Source | Creator | License | Commercial use? | Credit required? | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `Retro video game sfx - Powerup` | https://freesound.org/s/404722/ | OwlStorm | Creative Commons 0 | Yes | No | Short retro game power-up, about 1 second. |
| `Game Powerup` | https://freesound.org/people/Jofae/sounds/368651/ | Jofae | Creative Commons 0 | Yes | No | Clean cheerful power-up, about 1 second. |
| `Spacey 1up/Power up` | https://freesound.org/people/GameAudio/sounds/220173/ | GameAudio | Creative Commons 0 | Yes | No | Strong space-game fit, about 1 second. |
| `Power Boost` | https://freesound.org/people/colorsCrimsonTears/sounds/585803/ | colorsCrimsonTears | Creative Commons 0 | Yes | No | Very short boost/power-up, about 0.6 seconds. |
| `Powerup` | https://freesound.org/people/JustInvoke/sounds/138485/ | JustInvoke | Creative Commons 0 | Yes | No | Made for a shield power-up, about 1.2 seconds. |
| `Power Up` | https://freesound.org/people/noirenex/sounds/98883/ | noirenex | Creative Commons 0 | Yes | No | Longer spaceship/device power-up, about 22 seconds; only use if you need a charge-up loop/sequence. |

## Replacement Candidates For Home/Menu Click Sounds

These are possible replacements for:

- `www/sounds/backgroundSoundEffect/buttonClick.wav`

All candidates below are listed as `Creative Commons 0` on Freesound.

| Candidate | Source | Creator | License | Commercial use? | Credit required? | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `Soft UI Button Click` | https://freesound.org/people/Jummit/sounds/528561/ | Jummit | Creative Commons 0 | Yes | No | Soft sci-fi click; best fit for normal home buttons. |
| `Sci Fi UI Button Sound 019.wav` | https://freesound.org/s/615543/ | crash_358 | Creative Commons 0 | Yes | No | More futuristic; good for map/select or important actions. |
| `Menu Select Tick` | https://freesound.org/people/el_boss/sounds/628638/ | el_boss | Creative Commons 0 | Yes | No | Metallic menu select sound; good for weapon selection. |
| `UI Button Click` | https://freesound.org/people/benzix2/sounds/467951/ | benzix2 | Creative Commons 0 | Yes | No | Very short pop/click; good for regular taps. |
| `Normal click` | https://freesound.org/people/Breviceps/sounds/448086/ | Breviceps | Creative Commons 0 | Yes | No | Simple menu click; very short. |
| `Click 01_Minimal UI Sounds` | https://freesound.org/people/cabled_mess/sounds/370962/ | cabled_mess | Creative Commons 0 | Yes | No | Extremely short minimal UI click. |

## Regular Game Click Candidates

These are less sci-fi and more standard game/menu button clicks. All are listed
as `Creative Commons 0` on Freesound.

| Candidate | Source | Creator | License | Commercial use? | Credit required? | Best use |
| --- | --- | --- | --- | --- | --- | --- |
| `Click - Basic` | https://freesound.org/people/GameAudio/sounds/220197/ | GameAudio | Creative Commons 0 | Yes | No | Best simple normal button click. |
| `Click` | https://freesound.org/people/GameAudio/sounds/220178/ | GameAudio | Creative Commons 0 | Yes | No | Normal click with a small space-game tail. |
| `SFX UI Button Click` | https://freesound.org/people/suntemple/sounds/253168/ | suntemple | Creative Commons 0 | Yes | No | Very short clean UI click for buttons. |
| `UI click` | https://freesound.org/people/Ranner/sounds/487588/ | Ranner | Creative Commons 0 | Yes | No | Simple game UI click. |
| `Click Tick.wav` | https://freesound.org/s/384187/ | malle99 | Creative Commons 0 | Yes | No | Short tick/click for menu movement or selection. |
| `Button_Click1` | https://freesound.org/people/BaggoNotes/sounds/721502/ | BaggoNotes | Creative Commons 0 | Yes | No | Game UI button click with a little electronic feel. |
| `click.wav` | https://freesound.org/people/satrebor/sounds/113218/ | satrebor | Creative Commons 0 | Yes | No | Soft bubble-like simple click. |
| `Button click.wav` | https://freesound.org/people/brnck/sounds/257357/ | brnck | Creative Commons 0 | Yes | No | Classic short button click. |
| `Waterdrop Click - Clean UI Drop` | https://freesound.org/people/LilMati/sounds/702806/ | LilMati | Creative Commons 0 | Yes | No | Softer mobile click; good if you want less harsh audio. |
| `Simple GUI Click` | https://freesound.org/people/qubodup/sounds/159697/ | qubodup | Creative Commons 0 | Yes | No | Simple interface click; downloaded as FLAC. |

## Weapon Equip Sound Candidates

These are possible sounds for equipping/selecting weapons in the lobby. All
listed candidates are `Creative Commons 0` on Freesound.

| Candidate | Source | Creator | License | Commercial use? | Credit required? | Best use |
| --- | --- | --- | --- | --- | --- | --- |
| `Arming a Sci-Fi Gun` | https://freesound.org/people/jackolous/sounds/645778/ | jackolous | Creative Commons 0 | Yes | No | Best fit for weapon equip: short futuristic gun ready/load sound. |
| `Item Equip` | https://freesound.org/people/mrickey13/sounds/518850/ | mrickey13 | Creative Commons 0 | Yes | No | Clear game equip notification; less sci-fi, very usable. |
| `Equip - [Rpg] 1` | https://freesound.org/people/colorsCrimsonTears/sounds/641900/ | colorsCrimsonTears | Creative Commons 0 | Yes | No | Short equip sound, a little retro/game-like. |
| `equip.mp3` | https://freesound.org/s/407481/ | Loyalty_Freak_Music | Creative Commons 0 | Yes | No | Very short RPG/menu equip click. |
| `Lazer shot` | https://freesound.org/people/colorsCrimsonTears/sounds/566200/ | colorsCrimsonTears | Creative Commons 0 | Yes | No | Very short laser zap; good if equip should feel energetic. |
| `Laser` | https://www.freesound.org/people/SamsterBirdies/sounds/542579/ | SamsterBirdies | Creative Commons 0 | Yes | No | Short laser pulse; stronger than a UI click. |
| `Sci-fi weapon pack` | https://freesound.org/people/deleted_user_1941307/packs/9413/ | deleted_user_1941307 | Creative Commons 0 | Yes | No | Pack with heavier weapon sounds; may need trimming. |
| `Yume Nikki Effect Equip` | https://freesound.org/people/plasterbrain/sounds/464902/ | plasterbrain | Creative Commons 0 | Yes | No | More magical/arcade equip, good for special weapons. |
| `video game equip / item pick up` | https://freesound.org/people/square_colored/sounds/741097/ | square_colored | Creative Commons 0 | Yes | No | Pickup/equip style, a bit longer. |

## More Futuristic Home/Menu Click Candidates

These are stronger sci-fi options for a space/mobile-game UI.

| Candidate | Source | Creator | License | Commercial use? | Credit required? | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `Sci Fi Interface` | https://freesound.org/people/Jofae/sounds/367997/ | Jofae | Creative Commons 0 | Yes | No | Best overall for a futuristic menu select/button. |
| `Sci-Fi Click` | https://freesound.org/people/Jofae/sounds/383212/ | Jofae | Creative Commons 0 | Yes | No | Short clean sci-fi click for normal buttons. |
| `Sci-Fi Two-Part Click` | https://freesound.org/people/Jofae/sounds/382574/ | Jofae | Creative Commons 0 | Yes | No | Good for bigger actions or opening panels. |
| `Sci-fi button click` | https://freesound.org/people/dotY21/sounds/322228/ | dotY21 | Creative Commons 0 | Yes | No | More electric/strange click, good for map or shop tabs. |
| `Sci Fi UI Button Sound 014.wav` | https://freesound.org/s/615540/ | crash_358 | Creative Commons 0 | Yes | No | Longer sci-fi interface press, good for map/open actions. |
| `Sci Fi UI Button Sound 019.wav` | https://freesound.org/s/615543/ | crash_358 | Creative Commons 0 | Yes | No | Futuristic UI click, already listed above; still a strong option. |
| `Energy, vortexes, field, sci-fi, pulses` | https://freesound.org/people/julianmateo_/sounds/524165/ | julianmateo_ | Creative Commons 0 | Yes | No | Longer energy pulse; use only if trimmed into a short click/transition. |
| `SCIMisc_Energy UI Low 01_KVV AUDIO_FREE` | https://freesound.org/people/KVV_Audio/sounds/811930/ | KVV_Audio | Attribution 4.0 | Yes | Yes | Very futuristic, but requires credit. Also avoid redistributing as raw stock material. |

## Expanded Futuristic Home/Menu Options

More `Creative Commons 0` options to audition for the home screen.

| Candidate | Source | Creator | License | Commercial use? | Credit required? | Best use |
| --- | --- | --- | --- | --- | --- | --- |
| `Sci-Fi_Menu_Toolkit` | https://freesound.org/people/Artem_Zaitsev/sounds/832398/ | Artem_Zaitsev | Creative Commons 0 | Yes | No | Full toolkit with many UI clicks, toggles, transitions, and blips. |
| `UI Select` | https://freesound.org/people/unfa/sounds/584187/ | unfa | Creative Commons 0 | Yes | No | Very short space-game select blip. |
| `UI Open` | https://freesound.org/people/unfa/sounds/584186/ | unfa | Creative Commons 0 | Yes | No | Opening inventory/shop/map panels. |
| `UI Confirm` | https://freesound.org/people/unfa/sounds/584184/ | unfa | Creative Commons 0 | Yes | No | Confirm/equip/buy actions. |
| `UI Close` | https://freesound.org/people/unfa/sounds/584183/ | unfa | Creative Commons 0 | Yes | No | Closing panels or backing out. |
| `UI Zoom Out` | https://freesound.org/people/unfa/sounds/584189/ | unfa | Creative Commons 0 | Yes | No | Map transitions or returning from screens. |
| `menu move3` | https://freesound.org/people/Tissman/sounds/574592/ | Tissman | Creative Commons 0 | Yes | No | Futuristic spaceship/terminal menu move. |
| `menu move5` | https://freesound.org/people/Tissman/sounds/574595/ | Tissman | Creative Commons 0 | Yes | No | Futuristic menu move, shorter than move3. |
| `Menu FX 02` | https://freesound.org/people/Nightflame/sounds/397599/ | Nightflame | Creative Commons 0 | Yes | No | Bright sci-fi/magic UI blip. |
| `Little thing` | https://freesound.org/people/LloydEvans09/sounds/185828/ | LloydEvans09 | Creative Commons 0 | Yes | No | Hi-tech short beep for buttons. |
| `Incorrect function` | https://freesound.org/people/LloydEvans09/sounds/185845/ | LloydEvans09 | Creative Commons 0 | Yes | No | Negative/disabled/error click. |
| `Sci Fi UI Button Sound 003.wav` | https://freesound.org/people/crash_358/sounds/615526/ | crash_358 | Creative Commons 0 | Yes | No | Long sci-fi press, good for map/open actions. |
| `Sci Fi UI Button Sound 013.wav` | https://freesound.org/people/crash_358/sounds/615537/ | crash_358 | Creative Commons 0 | Yes | No | Long sci-fi press variant. |
| `Sci Fi UI Button Sound 016.wav` | https://freesound.org/people/crash_358/sounds/615539/ | crash_358 | Creative Commons 0 | Yes | No | Long sci-fi press variant. |
| `Sci Fi UI Button Sound 018.wav` | https://freesound.org/people/crash_358/sounds/615542/ | crash_358 | Creative Commons 0 | Yes | No | Shorter sci-fi UI button, close to 019. |

## How To Check A Freesound Asset

1. Open the sound page on Freesound.
2. Copy the full URL into the `Source` column.
3. Copy the uploader/user name into the `Creator` column.
4. Check the license shown on that sound page.
5. Fill the `License` column:
   - `CC0` -> set `Commercial use?` to `Yes`, `Credit required?` to `No`, `Status` to `OK`.
   - `Attribution` / `CC BY` -> set `Commercial use?` to `Yes`, `Credit required?` to `Yes`, `Status` to `NEEDS_CREDIT`.
   - `Attribution NonCommercial` / `CC BY-NC` -> set `Commercial use?` to `No`, `Credit required?` to `Yes`, `Status` to `REPLACE`.
6. Save a screenshot or PDF of the sound page showing the license.
7. Keep the downloaded original file name somewhere in `Notes` if you renamed it.

## How To Check AI Music

1. Write the AI music tool name in `Source`.
2. Add a link to the tool terms/license in `License`.
3. Confirm the terms allow commercial use in games and apps.
4. Save proof: screenshot, receipt, export page, or terms page.
5. If the prompt referenced a famous artist, song, game, movie, or franchise,
   regenerate the music with a generic prompt.

## Credits Text Template

Use this for `CC BY` Freesound assets:

```text
Sound credits:
- "[sound title]" by [creator], from Freesound, licensed under CC BY 4.0: [source URL]
```

For `CC0` assets, credit is not required, but keeping the source in this file is
still recommended.
