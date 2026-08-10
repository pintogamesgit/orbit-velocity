# השלמת החיבור ל-Google Play Games

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

נשמרים המטבעות, השלב הגבוה ביותר שנפתח, סקינים, נשקים, חיות מחמד, Super-ים ופריטי Daily שנרכשו או נבחרו. בהתחברות ראשונה הקוד משווה בין השמירה המקומית לשמירת הענן ושומר את ההתקדמות המתקדמת יותר.

הערה: Saved Games מתאים לסנכרון התקדמות בין מכשירים, אבל הוא אינו הגנה מלאה מפני שינוי ידני של נתוני המשחק במכשיר.
