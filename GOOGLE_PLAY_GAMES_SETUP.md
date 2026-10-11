# השלמת החיבור ל-Google Play Games

## אבחון `PGS_SIGNIN_NOT_AUTHENTICATED` בגרסה שהותקנה מ-Google Play

הקוד הזה נוצר במשחק כאשר קריאת ההתחברות של Google מסתיימת עם
`isAuthenticated() == false`. הוא לא מציין סיבה מסוימת ואינו שגיאת Saved Games:
טעינת הענן מתחילה רק אחרי התחברות מוצלחת.

הערכים הנוכחיים בקוד הם Package ID: `com.orbitvelocity.game`
ו-Play Games project ID: `488211155337`.

1. ב-Play Console פותחים את **App integrity > App signing** ומעתיקים את
   ה-SHA-1 תחת **App signing key certificate**. לגרסה מהחנות לא משתמשים
   בחתימת Debug או ב-Upload key certificate.
2. ב-**Play Games Services > Setup and management > Configuration** בודקים
   שה-Android credential מקושר לאותו Package ID ולחתימת App signing שהועתקה.
   אם אין התאמה, מוסיפים credential מתאים דרך Play Console.
3. ב-**Play Games Services > Setup and management > Testers** מוודאים שהחשבון
   שבו Play Games משתמש בטלפון מורשה לבדיקה. השתתפות במסלול בדיקות של האפליקציה
   כשלעצמה אינה מוכיחה הרשאת בדיקה ל-Play Games Services.
4. מוודאים שמזהה פרויקט Play Games תואם לערך בקוד. עבור משתמשים שאינם בודקים,
   יש לפרסם גם את הגדרות Play Games Services.
5. אחרי הפעלת Saved Games ייתכן עיכוב של עד 24 שעות. הפעלת האפשרות לבדה
   אינה מתקנת חוסר התאמה בחתימה או בהרשאות ההתחברות.

לאחר שינוי ההגדרות מנסים שוב להתחבר. אם השגיאה נמשכת, מחברים את הטלפון
ל-Android Studio ואוספים Logcat בזמן הניסיון; הקוד המוצג לבדו אינו מספיק
לקביעת הסיבה. אין צורך למחוק את נתוני המשחק לצורך הבדיקות האלה.

מקורות:
- https://developer.android.com/games/pgs/android/troubleshooting
- https://developer.android.com/games/pgs/console/enable-features

בקוד, ניסיון התחברות ידני פונה ישירות ל-Google. כתיבה לענן חסומה עד שטעינת
השמירה הצליחה, וכפתור TRY AGAIN מאפשר לנסות סנכרון מחדש לאחר כשל טעינה.

הקוד במשחק כבר כולל התחברות לשחקן, הישגים ושמירת התקדמות בענן. כדי להפעיל אותם צריך להשלים את ההגדרות הבאות בחשבון Google Play Console.

## לוגו רשמי לכפתור ההתחברות

את הלוגו הרשמי מורידים רק מ-Google Partner Marketing Hub / Google Play brand assets:

https://play.google.com/intl/en_us/badges/

שם נכנסים ל-Google Play assets ומורידים את קובצי המותג לפי ההנחיות של Google. אחרי ההורדה, שמים את הלוגו של Google Play Games בפרויקט באחד מהשמות האלה:

```text
www/images/googlePlayGamesLogo.svg
www/images/googlePlayGamesLogo.png
```

הכפתור במשחק כבר מחפש קודם את הקובץ הרשמי הזה. אם הוא לא קיים, הוא מציג סמל זמני כדי שהמסך לא יישבר. לא מומלץ להעתיק לוגו מאתרים לא רשמיים או לשנות צבעים/צורה של לוגו Google.

## 1. לבחור מזהה קבוע למשחק

אפליקציית Android הוכנה עם מזהה קבוע:

```text
com.orbitvelocity.game
```

כשיוצרים את האפליקציה ב-Google Play Console חייבים להשתמש בדיוק באותו Package ID. אחרי פרסום בחנות אי אפשר לשנות את המזהה.

המקומות העיקריים לעדכון הם:

- `capacitor.config.json` — השדה `appId`
- `android/app/build.gradle` — השדות `namespace` ו-`applicationId`
- שורת `package` בשני קובצי Java שבתיקייה `android/app/src/main/java/com/example/app`
- להעביר את שני קובצי Java לתיקייה שמתאימה למזהה החדש

הקובץ `www/capacitor.config.json` אינו קובץ ההגדרה הפעיל של בניית Android.

## 2. להגדיר את המשחק ב-Play Console

1. ליצור אפליקציה ב-Google Play Console עם אותו Package ID שנבחר בשלב הקודם.
2. לפתוח **Play Games Services > Setup and management > Configuration** וליצור הגדרת Play Games Services למשחק.
3. ליצור Android credential עם ה-Package ID של המשחק.
4. להוסיף SHA-1 לכל גרסה שמשמשת לבדיקה או לפרסום:
   - מפתח Debug לבדיקות מקומיות.
   - מפתח Release אם חותמים לבד.
   - מפתח **App signing** של Google Play עבור גרסה שמותקנת מהחנות.
5. להפעיל **Saved Games** בהגדרת Play Games Services.
6. להוסיף את חשבון Google שבטלפון לרשימת הבודקים ולפרסם את הגדרת Play Games Services לבודקים.

אפשר לראות את חתימות ה-SHA-1 המקומיות בעזרת:

```powershell
cd android
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'
.\gradlew.bat signingReport
```

למחשב הזה, חתימת ה-Debug הנוכחית היא:

```text
25:E1:38:A8:85:5B:8F:20:E3:5A:16:D2:CF:FC:69:95:C1:6E:1A:34
```

ב-Play Console צריך להוסיף אותה ל-Android credential עבור בדיקות מקומיות. בהמשך, לפני פרסום אמיתי, צריך להוסיף גם את חתימת ה-App signing של Google Play.

## 3. להדביק את מזהה הפרויקט

ב-`android/app/src/main/res/values/strings.xml` להחליף את:

```xml
<string translatable="false" name="game_services_project_id">0000000000</string>
```

במספר ה-Project ID שמופיע בהגדרת Play Games Services. זהו מספר בלבד, לא Client ID ולא Package ID.

## 4. ליצור הישגים ולהדביק את המזהים

ליצור ב-Play Console את ההישגים הרצויים, ואז להדביק את ה-ID של כל הישג בקובץ `www/javaScriptFiles/playGamesConfig.js`:

```js
achievementIds: {
  firstVictory: 'PASTE_ID_HERE',
  level10: 'PASTE_ID_HERE',
  level50: 'PASTE_ID_HERE',
  finalBoss: 'PASTE_ID_HERE',
}
```

מזהה שנשאר ריק פשוט לא יישלח ל-Google ולא יגרום לשגיאה.

## 5. לסנכרן ולבדוק בטלפון

```powershell
npx.cmd cap sync android
```

לאחר מכן לבנות ולהתקין דרך Android Studio או להעלות AAB למסלול Internal testing. ההתחברות האוטומטית, שם השחקן, מסך ההישגים ושמירת הענן יופעלו רק בבניית Android אמיתית; בדפדפן המשחק ממשיך לעבוד במצב מקומי רגיל.

## מה נשמר בענן

נוספו גם שפה, הפעלת מוזיקה ואפקטים, עוצמות שמע, השלמת ההדרכות ונתוני מתנות
יומיות. שמירות ישנות שאין בהן הגדרות נשארות נתמכות; הגדרות שלא הועלו בעבר
אינן ניתנות לשחזור בדיעבד.

### בדיקת שחזור אחרי מחיקת נתוני האפליקציה

1. מתקינים את הבנייה החדשה (קוד גרסה 10, שם 1.1.3) ומתחברים לאותו חשבון Play Games.
2. משנים שפה/שמע וצוברים התקדמות. בפרופיל לוחצים על **סנכרן עכשיו**.
3. ממתינים להודעת שמירה בענן. אם מופיעה הודעה שההעלאה לא אושרה או שגיאה,
   שומרים צילום של ההודעה לפני בדיקת מחיקת הנתונים.
4. בדיקה בטוחה יותר היא התחברות באותו חשבון במכשיר בדיקה נוסף. בבדיקת Clear
   storage, אחרי המחיקה מתחברים מחדש לאותו חשבון וממתינים לשחזור ולרענון המסך.

`commitAndClose` יכול להצליח גם בלי אינטרנט ולשמור רק במטמון של ה-SDK.
לכן הקוד מרענן כעת את רשימת השמירות מהשרת, ודורש רשימה שאינה stale ובה מזהה
העדכון שבוצע, לפני הצגת אישור העלאה. גם לפני השחזור מתבצע רענון מהשרת;
כשל רשת לא נחשב לשמירה שאינה קיימת ולא מאפשר כתיבה מעליה.
מקור: https://developer.android.com/games/pgs/android/saved-games

נשמרים המטבעות, השלב הגבוה ביותר שנפתח, סקינים, נשקים, חיות מחמד, Super-ים ופריטי Daily שנרכשו או נבחרו. בהתחברות ראשונה הקוד משווה בין השמירה המקומית לשמירת הענן ושומר את ההתקדמות המתקדמת יותר.

הערה: Saved Games מתאים לסנכרון התקדמות בין מכשירים, אבל הוא אינו הגנה מלאה מפני שינוי ידני של נתוני המשחק במכשיר.
