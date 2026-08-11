const TRANSLATIONS = {
  en: {
    'settings.title': 'Settings',
    'settings.music': 'Music',
    'settings.audio': 'Audio',
    'settings.language': 'Language',
    'settings.privacy': 'Privacy options',
    'settings.audioVolume': 'Audio Volume',
    'settings.musicVolume': 'Music Volume',

    'profile.name': 'Profile Name:',
    'profile.daysPlayed': 'Days Played:',
    'profile.changeName': 'Change Name',
    'profile.icon': 'Profile Icon',
    'profile.account': 'Account',
    'profile.connectPlayGames': 'LOGIN',
    'profile.achievements': 'ACHIEVEMENTS',
    'achievements.eyebrow': 'Local Progress',
    'achievements.subtitle': 'Saved on this device and available offline.',
    'achievements.percentComplete': '{percent}% Game Complete',
    'achievements.levelMeta': 'Highest level: {current} / {total} • Completed levels: {completed}',
    'achievements.highestLevel': 'Highest Level',
    'achievements.coins': 'Coins',
    'achievements.inventoryOwned': 'Inventory Owned',
    'achievements.cloudStatus': 'Save Status',
    'achievements.connected': 'Google connected',
    'achievements.offlineReady': 'Offline ready',
    'achievements.equippedTitle': 'Equipped Loadout',
    'achievements.skins': 'Skins',
    'achievements.weapons': 'Weapons',
    'achievements.pets': 'Pets',
    'achievements.supers': 'Supers',
    'achievements.none': 'None',
    'achievements.ownedItems': 'Owned',
    'achievements.lockedItems': 'Locked',
    'achievements.emptyOwned': 'Nothing owned yet',
    'achievements.allUnlocked': 'All unlocked',
    'main.title': 'Main Lobby',

    'map.title': 'LEVELS',
    'loadout.title': 'LOADOUT',
    'inventory.title': 'INVENTORY',
    'social.title': 'JOIN THE COMMUNITY',
    'home.battle': 'BATTLE',

    'nav.shop': 'Shop',
    'nav.loadout': 'Loadout',
    'nav.battle': 'Battle!',
    'nav.inventory': 'Inventory',

    'ui.free': 'FREE',
    'ui.owned': 'OWNED',
    'ui.buy': 'BUY',
    'ui.get': 'GET',
    'ui.claim': 'CLAIM',
    'ui.claimed': 'CLAIMED',
    'ui.equip': 'EQUIP',
    'ui.equipped': 'EQUIPPED',
    'ui.locked': 'LOCKED',
    'ui.open': 'OPEN',
    'ui.close': 'CLOSE',
    'ui.cancel': 'CANCEL',
    'ui.item': 'Item',
    'ui.desc': 'Description',
    'ui.weapon': 'WEAPON',
    'ui.price': 'PRICE',
    'ui.rarity': 'RARITY',
    'rarity.COMMON': 'COMMON',
    'rarity.RARE': 'RARE',
    'rarity.EPIC': 'EPIC',
    'rarity.LEGENDARY': 'LEGENDARY',
    'ui.role': 'ROLE:',
    'ui.ability': 'ABILITY:',
    'ui.stats': 'STATS',
    'ui.shop': 'SHOP',
    'ui.goToShop': 'GO TO SHOP',
    'ui.goToSuperShop': 'GO TO SUPER SHOP',
    'ui.goToLoadout': 'GO TO LOADOUT',
    'ui.comingSoon': 'Coming Soon...',
    'ui.yes': 'Yes',

    'toast.noCoins': 'Not enough coins!',
    'toast.alreadyOwned': 'Already owned!',
    'toast.boughtEquipped': 'You bought and equipped {name}!',
    'toast.superPurchased': 'Super purchased and equipped!',
    'toast.superUnlocked': 'Super unlocked and equipped!',

    'shop.title': 'SHOP',
    'shop.sub': 'Grab deals • Upgrade style • Power up',
    'shop.dailyOffers': 'DAILY OFFERS',
    'shop.freeGift': 'DAILY BONUS',
    'shop.skinOffers': 'SKIN OFFERS',
    'shop.featured': 'FEATURED',
    'shop.coins': 'COINS',
    'shop.refreshesDaily': 'Refreshes daily',
    'shop.everyDay': 'Every day',
    'shop.limited': 'Limited',
    'shop.bestValue': 'Best value packs',
    'shop.featuredTag': 'SPECIAL DROP',
    'shop.newFeaturedIn': 'NEW FEATURED IN {time}',
    'shop.notEnoughCoins': 'Not enough coins',
    'shop.skinPurchased': 'Skin purchased!',
    'shop.featuredUnlocked': 'Featured unlocked!',
    'shop.dealPurchased': 'Deal purchased!',
    'shop.alreadyOwnedBonus': 'Already owned. Bonus: +{coins} coins',
    'shop.dailyGiftCoins': 'Daily gift: +{coins} coins',
    'shop.boostUnlocked': 'Boost unlocked: {name}',
    'shop.unlocked': 'Unlocked: {name}',
    'shop.confirmSuper': 'Are you sure you want to buy this super?',
    'shop.confirmPet': 'Are you sure you want to buy this pet?',
    'shop.dailyGiftClaimed': 'Daily gift claimed! +{coins} coins',
    'shop.coinClaimed': '+{coins} coins!',
    'shop.paymentUnavailable': 'Payment is not connected yet.',
    'shop.watchAd': 'WATCH AD',
    'shop.loadingAd': 'LOADING...',
    'shop.adUnavailable': 'No ad is available right now. Try again later.',
    'shop.adRewardNotCompleted': 'Watch the full ad to receive the reward.',
    'shop.adRewardClaimed': '+{coins} coins received!',
    'shop.adRewardReady': 'REWARD READY',
    'shop.adRewardAvailableIn': 'AVAILABLE IN {time}',

    'shop.gift.title': 'Daily Gift',
    'shop.gift.tag': 'DAILY',
    'shop.gift.freeCoinsToday': 'Free coins for today',
    'shop.gift.unlockBoost': 'Unlock a boost item',
    'shop.gift.unlockDaily': 'Unlock a daily shop item',
    'shop.gift.claimYourReward': 'Claim your reward',
    'shop.gift.dailyGift': 'Daily Gift',
    'shop.gift.paidCoinsOnly': 'Coin packs require payment.',

    'loadout.weapons': 'Weapons',
    'loadout.pets': 'Pets',
    'loadout.super': 'Super',
    'loadout.upgrade': 'Upgrade',

    'planet.levelRange': 'Levels {start} - {end}',

    'weapon.laser.name': 'Laser',
    'weapon.laser.desc': 'Fast shots with a high fire rate.',
    'weapon.missile.name': 'Missile',
    'weapon.missile.desc': 'Heavy projectile with strong impact.',
    'weapon.triangleShooter.name': 'Triangle Shooter',
    'weapon.triangleShooter.desc': 'Wide spread shots for crowd control.',
    'weapon.statsComingSoon': 'Stats coming soon.',
    'weapon.descComingSoon': 'Weapon description coming soon.',

    'pets.title': 'PET SHOP',
    'pets.equip': 'EQUIP',
    'pets.unequip': 'UNEQUIP',
    'pets.supportCompanion': 'Support companion',
    'pets.info': '{name} Info',
    'pets.role.attack': 'ATTACK',
    'pets.ability.heavyPulse': 'Heavy Pulse',
    'pets.ability.mindControl': 'Mind Control',
    'pets.ability.massCrash': 'Mass Crash',
    'pets.effect.siren': 'Let them do the work.',
    'pets.rate.every8s': 'Every 8s',
    'pets.rate.every9s': 'Every 9s',
    'pets.stat.LIVES': 'Lives',
    'pets.stat.DAMAGE': 'Damage',
    'pets.stat.SHOOT_RATE': 'Shoot Rate',
    'pets.stat.ABILITY': 'Ability',
    'pets.stat.EFFECT': 'Effect',
    'pets.stat.RATE': 'Rate',
    'pets.dog.short': 'Support companion',
    'pets.dog.long':
      'Chimpo is an autonomous companion unit that assists the player in battle.\n\n' +
      'It automatically targets the closest enemy and fires consistently over time. ' +
      'Perfect for early-game support and survivability.',
    'pets.siren.short': 'Support companion',
    'pets.siren.long':
      'Siren does not deal damage directly.\n\n' +
      'It manipulates enemy minds, forcing them to turn against each other.\n' +
      'Extremely effective in crowded waves.',

    'super.waveShield.title': 'WAVE SHIELD',
    'super.waveShield.desc':
      'Generates a powerful energy wave that blocks incoming damage and reflects part of it back to enemies.',
    'super.superLaser.title': 'SUPER LASER',
    'super.superLaser.desc':
      'Channels a long-range laser beam that deals high damage over time.',
    'super.stat.Duration': 'Duration',
    'super.stat.Cooldown': 'Cooldown',
    'super.stat.Reflect': 'Reflect',
    'super.stat.Damage': 'Damage',
    'super.stat.Pierce': 'Pierce',

    'inv.section.weapons.title': 'Weapons',
    'inv.section.weapons.sub': 'Your unlocked weapons',
    'inv.section.pets.title': 'Pets',
    'inv.section.pets.sub': 'Companions & helpers',
    'inv.section.skins.title': 'Skins',
    'inv.section.skins.sub': 'Cosmetics you own',
    'inv.section.supers.title': 'Supers',
    'inv.section.supers.sub': 'Special abilities',
    'inv.modal.skins': 'SKINS',
    'inv.modal.weapons': 'WEAPONS',
    'inv.modal.pets': 'PETS',
    'inv.modal.supers': 'SUPERS',
    'inv.empty.skins': 'No skins',
    'inv.empty.weapons': 'No weapons yet',
    'inv.empty.pets': 'No pets yet',
    'inv.empty.supers': 'No supers yet',
    'inv.notOwned': 'NOT OWNED',
    'inv.available': 'AVAILABLE',
    'inv.goToPetShop': 'GO TO PET SHOP',

    'game.title': 'The Game',
    'game.victory': 'Victory!',
    'game.gameOver': 'Game Over!',
    'game.reward': 'You earned {coins} coins',
    'game.betterLuck': 'Better luck next time!',
    'game.nextLevel': 'Next Level',
    'game.backToLobby': 'Back to Lobby',
    'game.lobby': 'Lobby',
    'game.tryAgain': 'Try Again',
    'game.newSkinUnlocked': 'NEW SKIN UNLOCKED',
    'game.collect': 'COLLECT',
    'game.reviveAd': 'WATCH AD • GOLDEN LIFE',
    'game.reviveLoading': 'LOADING AD…',
    'game.reviveUnavailable': 'AD UNAVAILABLE — TRY AGAIN',
    'game.reviveIncomplete': 'WATCH THE FULL AD TO REVIVE',
    'game.lockedLevel':
      'Level {level} is locked!\nComplete previous levels first.',
    'game.lives': 'Lives:',
    'game.level': 'LEVEL {level}',
    'game.levelColon': 'LEVEL {level}:',
    'game.stage.100.title': 'LEVEL 100:',
    'game.stage.90.title': 'LEVEL 90: STORM CORE',
    'game.stage.80.title': 'LEVEL 80: WAVE WALL',
    'game.stage.70.title': 'LEVEL 70: MAGNETIC CHAOS',
    'game.stage.60.title': 'LEVEL 60: LASER LOCK',
    'game.stage.100.1':
      'This is the final stage... and the rules are about to change.',
    'game.stage.100.2': 'No Enemies this time.',
    'game.stage.100.3':
      'You will face every boss... and then the final one will appear.',
    'game.stage.100.4': 'After each boss falls, you will earn an upgrade.',
    'game.stage.100.5': 'Survive the full gauntlet to clear the level.',
    'game.stage.100.6':
      'Complete this stage to unlock an exclusive skin you cannot get anywhere else.',
    'game.stage.90.1': 'Boss10 controls lightning strikes and electric zones.',
    'game.stage.90.2': 'Keep moving and avoid marked danger areas.',
    'game.stage.80.1': 'Boss9 creates wave walls with narrow safe gaps.',
    'game.stage.80.2': 'Read the telegraph and move early.',
    'game.stage.default.1': 'Get ready.',
    'game.stage.default.2':
      'Survive the stage and defeat everything in your path.',
    'game.enterChaos': 'ENTER THE CHAOS!',
    'game.finalBoss.gateOpening': 'THE GATE IS OPENING',
    'game.finalBoss.name': 'PORTAL MASTER',
    'game.finalBoss.detected': 'FINAL AUTHORITY DETECTED',

    'upgrade.doubleShooter.title': 'Double Shot',
    'upgrade.doubleShooter.sub': '+1 Projectile',
    'upgrade.plusHp.title': 'Extra HP',
    'upgrade.plusHp.sub': '+1 Life',
    'upgrade.fasterShooter.title': 'Faster Fire',
    'upgrade.fasterShooter.sub': 'Rate Boost',
    'upgrade.petFaster.title': 'Pet',
    'upgrade.petFaster.sub': 'Faster',
    'upgrade.damageUp.title': 'Damage Up',
    'upgrade.damageUp.sub': '+1 Damage',
    'upgrade.speedBoost.title': 'Speed Boost',
    'upgrade.speedBoost.sub': '+Move Speed',
    'upgrade.piercingShot.title': 'Piercing Shot',
    'upgrade.piercingShot.sub': 'Shots Go Through',
    'upgrade.superCharge.title': 'Super Charge',
    'upgrade.superCharge.sub': '+Gauge Energy',
    'upgrade.shield.title': 'Shield',
    'upgrade.shield.sub': '20s Protection',
  },

  he: {
    'settings.title': 'הגדרות',
    'settings.music': 'מוזיקה',
    'settings.audio': 'צלילים',
    'settings.language': 'שפה',
    'settings.privacy': 'אפשרויות פרטיות',
    'settings.audioVolume': 'עוצמת צלילים',
    'settings.musicVolume': 'עוצמת מוזיקה',

    'profile.name': 'שם פרופיל:',
    'profile.daysPlayed': 'ימים ששוחקו:',
    'profile.changeName': 'שנה שם',
    'profile.icon': 'אייקון פרופיל',
    'profile.account': 'חשבון',
    'profile.connectPlayGames': 'LOGIN',
    'profile.achievements': 'הישגים',
    'main.title': 'לובי ראשי',

    'map.title': 'שלבים',
    'loadout.title': 'ציוד',
    'inventory.title': 'מלאי',
    'social.title': 'הצטרפו לקהילה',
    'home.battle': 'קרב',

    'nav.shop': 'חנות',
    'nav.loadout': 'ציוד',
    'nav.battle': 'קרב!',
    'nav.inventory': 'מלאי',

    'ui.free': 'חינם',
    'ui.owned': 'בבעלותך',
    'ui.buy': 'קנה',
    'ui.get': 'קבל',
    'ui.claim': 'אסוף',
    'ui.claimed': 'נאסף',
    'ui.equip': 'צייד',
    'ui.equipped': 'מצויד',
    'ui.locked': 'נעול',
    'ui.open': 'פתח',
    'ui.close': 'סגור',
    'ui.cancel': 'בטל',
    'ui.item': 'פריט',
    'ui.desc': 'תיאור',
    'ui.weapon': 'נשק',
    'ui.price': 'מחיר',
    'ui.rarity': 'נדירות',
    'rarity.COMMON': 'קומון',
    'rarity.RARE': 'רייר',
    'rarity.EPIC': 'אפיק',
    'rarity.LEGENDARY': 'לג׳נדרי',
    'ui.role': 'תפקיד:',
    'ui.ability': 'יכולת:',
    'ui.stats': 'נתונים',
    'ui.shop': 'חנות',
    'ui.goToShop': 'עבור לחנות',
    'ui.goToSuperShop': 'עבור לחנות הסופר',
    'ui.goToLoadout': 'עבור לציוד',
    'ui.comingSoon': 'בקרוב...',
    'ui.yes': 'כן',

    'toast.noCoins': 'אין מספיק מטבעות!',
    'toast.alreadyOwned': 'כבר בבעלותך!',
    'toast.boughtEquipped': 'קנית וציידת את {name}!',
    'toast.superPurchased': 'הסופר נקנה וצויד!',
    'toast.superUnlocked': 'הסופר נפתח וצויד!',

    'shop.title': 'חנות',
    'shop.sub': 'דילים • סטייל • שדרוג כוח',
    'shop.dailyOffers': 'הצעות יומיות',
    'shop.freeGift': 'בונוס יומי',
    'shop.skinOffers': 'סקינים',
    'shop.featured': 'מומלץ',
    'shop.coins': 'מטבעות',
    'shop.refreshesDaily': 'מתחדש כל יום',
    'shop.everyDay': 'כל יום',
    'shop.limited': 'מוגבל',
    'shop.bestValue': 'החבילות המשתלמות',
    'shop.featuredTag': 'דרופ מיוחד',
    'shop.newFeaturedIn': 'מומלץ חדש בעוד {time}',
    'shop.notEnoughCoins': 'אין מספיק מטבעות',
    'shop.skinPurchased': 'הסקין נקנה!',
    'shop.featuredUnlocked': 'המומלץ נפתח!',
    'shop.dealPurchased': 'הדיל נקנה!',
    'shop.alreadyOwnedBonus': 'כבר בבעלותך. בונוס: +{coins} מטבעות',
    'shop.dailyGiftCoins': 'מתנה יומית: +{coins} מטבעות',
    'shop.boostUnlocked': 'בוסט נפתח: {name}',
    'shop.unlocked': 'נפתח: {name}',
    'shop.confirmSuper': 'בטוח שברצונך לקנות את הסופר הזה?',
    'shop.confirmPet': 'בטוח שברצונך לקנות את החיה הזאת?',
    'shop.dailyGiftClaimed': 'המתנה היומית נאספה! +{coins} מטבעות',
    'shop.coinClaimed': '+{coins} מטבעות!',
    'shop.paymentUnavailable': 'התשלום עדיין לא מחובר.',
    'shop.watchAd': 'צפה בפרסומת',
    'shop.loadingAd': 'טוען...',
    'shop.adUnavailable': 'אין כרגע פרסומת זמינה. נסו שוב מאוחר יותר.',
    'shop.adRewardNotCompleted': 'יש לצפות בפרסומת המלאה כדי לקבל את הפרס.',
    'shop.adRewardClaimed': 'קיבלתם {coins}+ מטבעות!',
    'shop.adRewardReady': 'הפרס מוכן',
    'shop.adRewardAvailableIn': 'זמין בעוד {time}',

    'shop.gift.title': 'מתנה יומית',
    'shop.gift.tag': 'יומי',
    'shop.gift.freeCoinsToday': 'מטבעות חינם להיום',
    'shop.gift.unlockBoost': 'פתח פריט בוסט',
    'shop.gift.unlockDaily': 'פתח פריט יומי מהחנות',
    'shop.gift.claimYourReward': 'אסוף את הפרס שלך',
    'shop.gift.dailyGift': 'מתנה יומית',
    'shop.gift.paidCoinsOnly': 'חבילות מטבעות דורשות תשלום.',

    'loadout.weapons': 'נשקים',
    'loadout.pets': 'חיות',
    'loadout.super': 'סופר',
    'loadout.upgrade': 'שדרוג',

    'planet.levelRange': 'שלבים {start} - {end}',

    'weapon.laser.name': 'לייזר',
    'weapon.laser.desc': 'יריות מהירות בקצב אש גבוה.',
    'weapon.missile.name': 'טיל',
    'weapon.missile.desc': 'קליע כבד עם פגיעה חזקה.',
    'weapon.triangleShooter.name': 'יורה משולש',
    'weapon.triangleShooter.desc': 'יריות רחבות לשליטה בקבוצות אויבים.',
    'weapon.statsComingSoon': 'נתונים יתווספו בקרוב.',
    'weapon.descComingSoon': 'תיאור נשק יתווסף בקרוב.',

    'pets.title': 'חנות חיות',
    'pets.equip': 'צייד',
    'pets.unequip': 'הסר',
    'pets.supportCompanion': 'שותף תומך',
    'pets.info': 'מידע על {name}',
    'pets.role.attack': 'תקיפה',
    'pets.ability.heavyPulse': 'פעימת כוח',
    'pets.ability.mindControl': 'שליטה מחשבתית',
    'pets.ability.massCrash': 'ריסוק המוני',
    'pets.effect.siren': 'תן להם לעשות את העבודה.',
    'pets.rate.every8s': 'כל 8 שניות',
    'pets.rate.every9s': 'כל 9 שניות',
    'pets.stat.LIVES': 'חיים',
    'pets.stat.DAMAGE': 'נזק',
    'pets.stat.SHOOT_RATE': 'קצב ירי',
    'pets.stat.ABILITY': 'יכולת',
    'pets.stat.EFFECT': 'השפעה',
    'pets.stat.RATE': 'קצב',
    'pets.dog.short': 'שותף תומך',
    'pets.dog.long':
      'צ׳ימפו הוא שותף אוטונומי שעוזר לשחקן בקרב.\n\n' +
      'הוא מכוון אוטומטית לאויב הקרוב ביותר ויורה בקצב קבוע לאורך זמן. ' +
      'מצוין לתמיכה בתחילת המשחק ולהישרדות.',
    'pets.siren.short': 'שותפה תומכת',
    'pets.siren.long':
      'סיירן לא גורמת נזק ישיר.\n\n' +
      'היא משתלטת על מחשבות אויבים וגורמת להם לתקוף אחד את השני.\n' +
      'יעילה במיוחד בגלים צפופים.',

    'super.waveShield.title': 'מגן גל',
    'super.waveShield.desc':
      'יוצר גל אנרגיה חזק שחוסם נזק נכנס ומחזיר חלק ממנו לאויבים.',
    'super.superLaser.title': 'סופר לייזר',
    'super.superLaser.desc':
      'משגר קרן לייזר ארוכת טווח שגורמת נזק גבוה לאורך זמן.',
    'super.stat.Duration': 'משך',
    'super.stat.Cooldown': 'קירור',
    'super.stat.Reflect': 'החזרה',
    'super.stat.Damage': 'נזק',
    'super.stat.Pierce': 'חדירה',

    'inv.section.weapons.title': 'נשקים',
    'inv.section.weapons.sub': 'הנשקים שפתחת',
    'inv.section.pets.title': 'חיות',
    'inv.section.pets.sub': 'שותפים ועוזרים',
    'inv.section.skins.title': 'סקינים',
    'inv.section.skins.sub': 'קוסמטיקה שבבעלותך',
    'inv.section.supers.title': 'סופרים',
    'inv.section.supers.sub': 'יכולות מיוחדות',
    'inv.modal.skins': 'סקינים',
    'inv.modal.weapons': 'נשקים',
    'inv.modal.pets': 'חיות',
    'inv.modal.supers': 'סופרים',
    'inv.empty.skins': 'אין סקינים',
    'inv.empty.weapons': 'אין נשקים עדיין',
    'inv.empty.pets': 'אין חיות עדיין',
    'inv.empty.supers': 'אין סופרים עדיין',
    'inv.notOwned': 'לא בבעלותך',
    'inv.available': 'זמין',
    'inv.goToPetShop': 'עבור לחנות החיות',

    'game.title': 'המשחק',
    'game.victory': 'ניצחון!',
    'game.gameOver': 'נגמר המשחק!',
    'game.reward': 'הרווחת {coins} מטבעות',
    'game.betterLuck': 'בהצלחה בפעם הבאה!',
    'game.nextLevel': 'השלב הבא',
    'game.backToLobby': 'חזרה ללובי',
    'game.lobby': 'לובי',
    'game.tryAgain': 'נסה שוב',
    'game.newSkinUnlocked': 'סקין חדש נפתח',
    'game.collect': 'אסוף',
    'game.reviveAd': 'צפה בפרסומת • חיים מוזהבים',
    'game.reviveLoading': 'הפרסומת נטענת…',
    'game.reviveUnavailable': 'הפרסומת לא זמינה — נסה שוב',
    'game.reviveIncomplete': 'יש לצפות בפרסומת עד הסוף',
    'game.lockedLevel': 'שלב {level} נעול!\nסיים קודם את השלבים הקודמים.',
    'game.lives': 'חיים:',
    'game.level': 'שלב {level}',
    'game.levelColon': 'שלב {level}:',
    'game.stage.100.title': 'שלב 100:',
    'game.stage.90.title': 'שלב 90: ליבת הסערה',
    'game.stage.80.title': 'שלב 80: קיר הגלים',
    'game.stage.70.title': 'שלב 70: כאוס מגנטי',
    'game.stage.60.title': 'שלב 60: נעילת לייזר',
    'game.stage.100.1': 'זהו השלב האחרון... והחוקים עומדים להשתנות.',
    'game.stage.100.2': 'הפעם אין אנגלרים.',
    'game.stage.100.3': 'תתמודד מול כל הבוסים... ואז האחרון יופיע.',
    'game.stage.100.4': 'אחרי שכל בוס נופל תקבל שדרוג.',
    'game.stage.100.5': 'שרוד את כל האתגר כדי לסיים את השלב.',
    'game.stage.100.6':
      'סיים את השלב כדי לפתוח סקין בלעדי שלא ניתן להשיג במקום אחר.',
    'game.stage.90.1': 'בוס 10 שולט במכות ברק ובאזורים חשמליים.',
    'game.stage.90.2': 'המשך לזוז והתרחק מאזורי סכנה מסומנים.',
    'game.stage.80.1': 'בוס 9 יוצר קירות גלים עם פתחים בטוחים וצרים.',
    'game.stage.80.2': 'קרא את הסימון וזוז מוקדם.',
    'game.stage.default.1': 'התכונן.',
    'game.stage.default.2': 'שרוד את השלב והבס כל דבר בדרך.',
    'game.enterChaos': 'היכנס לכאוס!',
    'game.finalBoss.gateOpening': 'השער נפתח',
    'game.finalBoss.name': 'מאסטר הפורטלים',
    'game.finalBoss.detected': 'נוכחות סופית זוהתה',

    'upgrade.doubleShooter.title': 'ירייה כפולה',
    'upgrade.doubleShooter.sub': '+1 קליע',
    'upgrade.plusHp.title': 'עוד חיים',
    'upgrade.plusHp.sub': '+1 חיים',
    'upgrade.fasterShooter.title': 'ירי מהיר',
    'upgrade.fasterShooter.sub': 'בוסט לקצב',
    'upgrade.petFaster.title': 'חיה',
    'upgrade.petFaster.sub': 'מהירה יותר',
    'upgrade.damageUp.title': 'חיזוק נזק',
    'upgrade.damageUp.sub': '+1 נזק',
    'upgrade.speedBoost.title': 'בוסט מהירות',
    'upgrade.speedBoost.sub': '+מהירות תנועה',
    'upgrade.piercingShot.title': 'ירייה חודרת',
    'upgrade.piercingShot.sub': 'יריות עוברות דרך',
    'upgrade.superCharge.title': 'טעינת סופר',
    'upgrade.superCharge.sub': '+אנרגיית מד',
    'upgrade.shield.title': 'מגן',
    'upgrade.shield.sub': '20 שניות הגנה',
  },

  es: {
    'settings.title': 'Ajustes',
    'settings.music': 'Música',
    'settings.audio': 'Audio',
    'settings.language': 'Idioma',
    'settings.privacy': 'Opciones de privacidad',
    'settings.audioVolume': 'Volumen de sonido',
    'settings.musicVolume': 'Volumen de música',

    'profile.name': 'Nombre de perfil:',
    'profile.daysPlayed': 'Días jugados:',
    'profile.changeName': 'Cambiar nombre',
    'profile.icon': 'Icono de perfil',
    'profile.account': 'Cuenta',
    'profile.connectPlayGames': 'LOGIN',
    'profile.achievements': 'LOGROS',
    'main.title': 'Lobby principal',

    'map.title': 'NIVELES',
    'loadout.title': 'EQUIPO',
    'inventory.title': 'INVENTARIO',
    'social.title': 'ÚNETE A LA COMUNIDAD',
    'home.battle': 'BATALLA',

    'nav.shop': 'Tienda',
    'nav.loadout': 'Equipo',
    'nav.battle': '¡Batalla!',
    'nav.inventory': 'Inventario',

    'ui.free': 'GRATIS',
    'ui.owned': 'OBTENIDO',
    'ui.buy': 'COMPRAR',
    'ui.get': 'OBTENER',
    'ui.claim': 'RECLAMAR',
    'ui.claimed': 'RECLAMADO',
    'ui.equip': 'EQUIPAR',
    'ui.equipped': 'EQUIPADO',
    'ui.locked': 'BLOQUEADO',
    'ui.open': 'ABRIR',
    'ui.close': 'CERRAR',
    'ui.cancel': 'CANCELAR',
    'ui.item': 'Ítem',
    'ui.desc': 'Descripción',
    'ui.weapon': 'ARMA',
    'ui.price': 'PRECIO',
    'ui.rarity': 'RAREZA',
    'rarity.COMMON': 'COMÚN',
    'rarity.RARE': 'RARO',
    'rarity.EPIC': 'ÉPICO',
    'rarity.LEGENDARY': 'LEGENDARIO',
    'ui.role': 'ROL:',
    'ui.ability': 'HABILIDAD:',
    'ui.stats': 'ESTADÍSTICAS',
    'ui.shop': 'TIENDA',
    'ui.goToShop': 'IR A LA TIENDA',
    'ui.goToSuperShop': 'IR A TIENDA SÚPER',
    'ui.goToLoadout': 'IR A EQUIPO',
    'ui.comingSoon': 'Próximamente...',
    'ui.yes': 'Sí',

    'toast.noCoins': '¡No hay suficientes monedas!',
    'toast.alreadyOwned': '¡Ya lo tienes!',
    'toast.boughtEquipped': '¡Compraste y equipaste {name}!',
    'toast.superPurchased': '¡Súper comprado y equipado!',
    'toast.superUnlocked': '¡Súper desbloqueado y equipado!',

    'shop.title': 'TIENDA',
    'shop.sub': 'Ofertas • Estilo • Poder',
    'shop.dailyOffers': 'OFERTAS DIARIAS',
    'shop.freeGift': 'BONO DIARIO',
    'shop.skinOffers': 'OFERTAS DE SKINS',
    'shop.featured': 'DESTACADO',
    'shop.coins': 'MONEDAS',
    'shop.refreshesDaily': 'Se renueva a diario',
    'shop.everyDay': 'Cada día',
    'shop.limited': 'Limitado',
    'shop.bestValue': 'Paquetes con mejor valor',
    'shop.featuredTag': 'LANZAMIENTO ESPECIAL',
    'shop.newFeaturedIn': 'NUEVO DESTACADO EN {time}',
    'shop.notEnoughCoins': 'No tienes suficientes monedas',
    'shop.skinPurchased': '¡Skin comprada!',
    'shop.featuredUnlocked': '¡Destacado desbloqueado!',
    'shop.dealPurchased': '¡Oferta comprada!',
    'shop.alreadyOwnedBonus': 'Ya lo tienes. Bonus: +{coins} monedas',
    'shop.dailyGiftCoins': 'Regalo diario: +{coins} monedas',
    'shop.boostUnlocked': 'Boost desbloqueado: {name}',
    'shop.unlocked': 'Desbloqueado: {name}',
    'shop.confirmSuper': '¿Seguro que quieres comprar este súper?',
    'shop.confirmPet': '¿Seguro que quieres comprar esta mascota?',
    'shop.dailyGiftClaimed': '¡Regalo diario reclamado! +{coins} monedas',
    'shop.coinClaimed': '¡+{coins} monedas!',
    'shop.paymentUnavailable': 'El pago todavía no está conectado.',
    'shop.watchAd': 'VER ANUNCIO',
    'shop.loadingAd': 'CARGANDO...',
    'shop.adUnavailable': 'No hay anuncios disponibles. Inténtalo más tarde.',
    'shop.adRewardNotCompleted': 'Mira el anuncio completo para recibir la recompensa.',
    'shop.adRewardClaimed': '¡Has recibido {coins} monedas!',
    'shop.adRewardReady': 'RECOMPENSA LISTA',
    'shop.adRewardAvailableIn': 'DISPONIBLE EN {time}',

    'shop.gift.title': 'Regalo diario',
    'shop.gift.tag': 'DIARIO',
    'shop.gift.freeCoinsToday': 'Monedas gratis de hoy',
    'shop.gift.unlockBoost': 'Desbloquea un boost',
    'shop.gift.unlockDaily': 'Desbloquea un ítem diario',
    'shop.gift.claimYourReward': 'Reclama tu recompensa',
    'shop.gift.dailyGift': 'Regalo diario',
    'shop.gift.paidCoinsOnly': 'Los paquetes de monedas requieren pago.',

    'loadout.weapons': 'Armas',
    'loadout.pets': 'Mascotas',
    'loadout.super': 'Súper',
    'loadout.upgrade': 'Mejora',

    'planet.levelRange': 'Niveles {start} - {end}',

    'weapon.laser.name': 'Láser',
    'weapon.laser.desc': 'Disparos rápidos con alta cadencia.',
    'weapon.missile.name': 'Misil',
    'weapon.missile.desc': 'Proyectil pesado con impacto fuerte.',
    'weapon.triangleShooter.name': 'Disparador triangular',
    'weapon.triangleShooter.desc': 'Disparos amplios para controlar grupos.',
    'weapon.statsComingSoon': 'Estadísticas próximamente.',
    'weapon.descComingSoon': 'Descripción del arma próximamente.',

    'pets.title': 'TIENDA DE MASCOTAS',
    'pets.equip': 'EQUIPAR',
    'pets.unequip': 'QUITAR',
    'pets.supportCompanion': 'Compañero de apoyo',
    'pets.info': 'Info de {name}',
    'pets.role.attack': 'ATAQUE',
    'pets.ability.heavyPulse': 'Pulso pesado',
    'pets.ability.mindControl': 'Control mental',
    'pets.ability.massCrash': 'Choque masivo',
    'pets.effect.siren': 'Que ellos hagan el trabajo.',
    'pets.rate.every8s': 'Cada 8s',
    'pets.rate.every9s': 'Cada 9s',
    'pets.stat.LIVES': 'Vidas',
    'pets.stat.DAMAGE': 'Daño',
    'pets.stat.SHOOT_RATE': 'Cadencia',
    'pets.stat.ABILITY': 'Habilidad',
    'pets.stat.EFFECT': 'Efecto',
    'pets.stat.RATE': 'Frecuencia',
    'pets.dog.short': 'Compañero de apoyo',
    'pets.dog.long':
      'Chimpo es un compañero autónomo que ayuda al jugador en batalla.\n\n' +
      'Apunta automáticamente al enemigo más cercano y dispara de forma constante. ' +
      'Perfecto para apoyo temprano y supervivencia.',
    'pets.siren.short': 'Compañera de apoyo',
    'pets.siren.long':
      'Siren no hace daño directo.\n\n' +
      'Manipula la mente de los enemigos para que se ataquen entre sí.\n' +
      'Muy eficaz en oleadas con muchos enemigos.',

    'super.waveShield.title': 'ESCUDO DE ONDA',
    'super.waveShield.desc':
      'Genera una onda de energía que bloquea el daño entrante y refleja parte a los enemigos.',
    'super.superLaser.title': 'SÚPER LÁSER',
    'super.superLaser.desc':
      'Canaliza un rayo láser de largo alcance que inflige mucho daño con el tiempo.',
    'super.stat.Duration': 'Duración',
    'super.stat.Cooldown': 'Enfriamiento',
    'super.stat.Reflect': 'Reflejo',
    'super.stat.Damage': 'Daño',
    'super.stat.Pierce': 'Perforación',

    'inv.section.weapons.title': 'Armas',
    'inv.section.weapons.sub': 'Tus armas desbloqueadas',
    'inv.section.pets.title': 'Mascotas',
    'inv.section.pets.sub': 'Compañeros y ayudantes',
    'inv.section.skins.title': 'Skins',
    'inv.section.skins.sub': 'Cosméticos que tienes',
    'inv.section.supers.title': 'Súpers',
    'inv.section.supers.sub': 'Habilidades especiales',
    'inv.modal.skins': 'SKINS',
    'inv.modal.weapons': 'ARMAS',
    'inv.modal.pets': 'MASCOTAS',
    'inv.modal.supers': 'SÚPERS',
    'inv.empty.skins': 'No hay skins',
    'inv.empty.weapons': 'Aún no hay armas',
    'inv.empty.pets': 'Aún no hay mascotas',
    'inv.empty.supers': 'Aún no hay súpers',
    'inv.notOwned': 'NO OBTENIDO',
    'inv.available': 'DISPONIBLE',
    'inv.goToPetShop': 'IR A TIENDA DE MASCOTAS',

    'game.title': 'El Juego',
    'game.victory': '¡Victoria!',
    'game.gameOver': '¡Fin del juego!',
    'game.reward': 'Ganaste {coins} monedas',
    'game.betterLuck': '¡Más suerte la próxima vez!',
    'game.nextLevel': 'Siguiente nivel',
    'game.backToLobby': 'Volver al lobby',
    'game.lobby': 'Lobby',
    'game.tryAgain': 'Intentar otra vez',
    'game.newSkinUnlocked': 'NUEVA SKIN DESBLOQUEADA',
    'game.collect': 'RECLAMAR',
    'game.reviveAd': 'VER ANUNCIO • VIDA DORADA',
    'game.reviveLoading': 'CARGANDO ANUNCIO…',
    'game.reviveUnavailable': 'ANUNCIO NO DISPONIBLE',
    'game.reviveIncomplete': 'MIRA EL ANUNCIO COMPLETO',
    'game.lockedLevel':
      '¡El nivel {level} está bloqueado!\nCompleta primero los niveles anteriores.',
    'game.lives': 'Vidas:',
    'game.level': 'NIVEL {level}',
    'game.levelColon': 'NIVEL {level}:',
    'game.stage.100.title': 'NIVEL 100:',
    'game.stage.90.title': 'NIVEL 90: NÚCLEO DE TORMENTA',
    'game.stage.80.title': 'NIVEL 80: MURO DE ONDAS',
    'game.stage.70.title': 'NIVEL 70: CAOS MAGNÉTICO',
    'game.stage.60.title': 'NIVEL 60: BLOQUEO LÁSER',
    'game.stage.100.1':
      'Esta es la fase final... y las reglas están por cambiar.',
    'game.stage.100.2': 'Esta vez no hay Anglers.',
    'game.stage.100.3':
      'Te enfrentarás a todos los jefes... y luego aparecerá el final.',
    'game.stage.100.4': 'Después de derrotar cada jefe ganarás una mejora.',
    'game.stage.100.5': 'Sobrevive a todo el desafío para completar el nivel.',
    'game.stage.100.6':
      'Completa esta fase para desbloquear una skin exclusiva que no se consigue en otro lugar.',
    'game.stage.90.1': 'Boss10 controla rayos y zonas eléctricas.',
    'game.stage.90.2':
      'Sigue moviéndote y evita las zonas de peligro marcadas.',
    'game.stage.80.1': 'Boss9 crea muros de onda con huecos seguros estrechos.',
    'game.stage.80.2': 'Lee la señal y muévete pronto.',
    'game.stage.default.1': 'Prepárate.',
    'game.stage.default.2': 'Sobrevive la fase y derrota todo a tu paso.',
    'game.enterChaos': '¡ENTRA AL CAOS!',
    'game.finalBoss.gateOpening': 'LA PUERTA SE ESTA ABRIENDO',
    'game.finalBoss.name': 'MAESTRO DEL PORTAL',
    'game.finalBoss.detected': 'AUTORIDAD FINAL DETECTADA',

    'upgrade.doubleShooter.title': 'Disparo doble',
    'upgrade.doubleShooter.sub': '+1 proyectil',
    'upgrade.plusHp.title': 'HP extra',
    'upgrade.plusHp.sub': '+1 vida',
    'upgrade.fasterShooter.title': 'Fuego rápido',
    'upgrade.fasterShooter.sub': 'Boost de cadencia',
    'upgrade.petFaster.title': 'Mascota',
    'upgrade.petFaster.sub': 'Más rápida',
    'upgrade.damageUp.title': 'Más daño',
    'upgrade.damageUp.sub': '+1 daño',
    'upgrade.speedBoost.title': 'Boost de velocidad',
    'upgrade.speedBoost.sub': '+velocidad',
    'upgrade.piercingShot.title': 'Disparo perforante',
    'upgrade.piercingShot.sub': 'Disparos atraviesan',
    'upgrade.superCharge.title': 'Carga súper',
    'upgrade.superCharge.sub': '+energía',
    'upgrade.shield.title': 'Escudo',
    'upgrade.shield.sub': '20s de protección',
  },
};

TRANSLATIONS.ar = {
  'settings.title': '\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a',
  'settings.music': '\u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649',
  'settings.audio': '\u0627\u0644\u0623\u0635\u0648\u0627\u062a',
  'settings.language': '\u0627\u0644\u0644\u063a\u0629',
  'settings.privacy': '\u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
  'settings.audioVolume': '\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0623\u0635\u0648\u0627\u062a',
  'settings.musicVolume': '\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0645\u0648\u0633\u064a\u0642\u0649',

  'profile.name': '\u0627\u0633\u0645 \u0627\u0644\u0645\u0644\u0641:',
  'profile.daysPlayed': '\u0623\u064a\u0627\u0645 \u0627\u0644\u0644\u0639\u0628:',
  'profile.changeName': '\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0627\u0633\u0645',
  'profile.icon': '\u0623\u064a\u0642\u0648\u0646\u0629 \u0627\u0644\u0645\u0644\u0641',
  'profile.account': '\u0627\u0644\u062d\u0633\u0627\u0628',
  'profile.connectPlayGames': 'LOGIN',
  'profile.achievements': '\u0627\u0644\u0625\u0646\u062c\u0627\u0632\u0627\u062a',
  'main.title': '\u0627\u0644\u0631\u062f\u0647\u0629 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',

  'map.title': '\u0627\u0644\u0645\u0631\u0627\u062d\u0644',
  'loadout.title': '\u0627\u0644\u062a\u062c\u0647\u064a\u0632',
  'inventory.title': '\u0627\u0644\u0645\u062e\u0632\u0648\u0646',
  'social.title': '\u0627\u0646\u0636\u0645 \u0625\u0644\u0649 \u0627\u0644\u0645\u062c\u062a\u0645\u0639',
  'home.battle': '\u0645\u0639\u0631\u0643\u0629',

  'nav.shop': '\u0627\u0644\u0645\u062a\u062c\u0631',
  'nav.loadout': '\u0627\u0644\u062a\u062c\u0647\u064a\u0632',
  'nav.battle': '\u0645\u0639\u0631\u0643\u0629!',
  'nav.inventory': '\u0627\u0644\u0645\u062e\u0632\u0648\u0646',

  'ui.free': '\u0645\u062c\u0627\u0646\u064a',
  'ui.owned': '\u0645\u0645\u062a\u0644\u0643',
  'ui.buy': '\u0634\u0631\u0627\u0621',
  'ui.get': '\u0627\u062d\u0635\u0644',
  'ui.claim': '\u0627\u0633\u062a\u0644\u0627\u0645',
  'ui.claimed': '\u062a\u0645 \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645',
  'ui.equip': '\u062a\u062c\u0647\u064a\u0632',
  'ui.equipped': '\u0645\u062c\u0647\u0632',
  'ui.locked': '\u0645\u063a\u0644\u0642',
  'ui.open': '\u0641\u062a\u062d',
  'ui.close': '\u0625\u063a\u0644\u0627\u0642',
  'ui.cancel': '\u0625\u0644\u063a\u0627\u0621',
  'ui.item': '\u0639\u0646\u0635\u0631',
  'ui.desc': '\u0627\u0644\u0648\u0635\u0641',
  'ui.weapon': '\u0633\u0644\u0627\u062d',
  'ui.price': '\u0627\u0644\u0633\u0639\u0631',
  'ui.rarity': '\u0627\u0644\u0646\u062f\u0631\u0629',
  'rarity.COMMON': '\u0639\u0627\u062f\u064a',
  'rarity.RARE': '\u0646\u0627\u062f\u0631',
  'rarity.EPIC': '\u0645\u0644\u062d\u0645\u064a',
  'rarity.LEGENDARY': '\u0623\u0633\u0637\u0648\u0631\u064a',
  'ui.role': '\u0627\u0644\u062f\u0648\u0631:',
  'ui.ability': '\u0627\u0644\u0642\u062f\u0631\u0629:',
  'ui.stats': '\u0627\u0644\u0625\u062d\u0635\u0627\u0626\u064a\u0627\u062a',
  'ui.shop': '\u0627\u0644\u0645\u062a\u062c\u0631',
  'ui.goToShop': '\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0627\u0644\u0645\u062a\u062c\u0631',
  'ui.goToSuperShop': '\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0645\u062a\u062c\u0631 \u0627\u0644\u0633\u0648\u0628\u0631',
  'ui.goToLoadout': '\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0627\u0644\u062a\u062c\u0647\u064a\u0632',
  'ui.comingSoon': '\u0642\u0631\u064a\u0628\u0627...',
  'ui.yes': '\u0646\u0639\u0645',

  'toast.noCoins': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0645\u0644\u0627\u062a \u0643\u0627\u0641\u064a\u0629!',
  'toast.alreadyOwned': '\u062a\u0645\u062a\u0644\u0643\u0647 \u0628\u0627\u0644\u0641\u0639\u0644!',
  'toast.boughtEquipped': '\u0627\u0634\u062a\u0631\u064a\u062a {name} \u0648\u062a\u0645 \u062a\u062c\u0647\u064a\u0632\u0647!',
  'toast.superPurchased': '\u062a\u0645 \u0634\u0631\u0627\u0621 \u0627\u0644\u0633\u0648\u0628\u0631 \u0648\u062a\u062c\u0647\u064a\u0632\u0647!',
  'toast.superUnlocked': '\u062a\u0645 \u0641\u062a\u062d \u0627\u0644\u0633\u0648\u0628\u0631 \u0648\u062a\u062c\u0647\u064a\u0632\u0647!',

  'shop.title': '\u0627\u0644\u0645\u062a\u062c\u0631',
  'shop.sub': '\u0639\u0631\u0648\u0636 \u2022 \u0623\u0646\u0627\u0642\u0629 \u2022 \u0642\u0648\u0629',
  'shop.freeGift': '\u0645\u0643\u0627\u0641\u0623\u0629 \u064a\u0648\u0645\u064a\u0629',
  'shop.skinOffers': '\u0639\u0631\u0648\u0636 \u0627\u0644\u0633\u0643\u064a\u0646\u0627\u062a',
  'shop.featured': '\u0645\u0645\u064a\u0632',
  'shop.coins': '\u0639\u0645\u0644\u0627\u062a',
  'shop.refreshesDaily': '\u064a\u062a\u062c\u062f\u062f \u064a\u0648\u0645\u064a\u0627',
  'shop.everyDay': '\u0643\u0644 \u064a\u0648\u0645',
  'shop.limited': '\u0645\u062d\u062f\u0648\u062f',
  'shop.bestValue': '\u0623\u0641\u0636\u0644 \u0627\u0644\u062d\u0632\u0645',
  'shop.confirmSuper': '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u0634\u0631\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u0633\u0648\u0628\u0631\u061f',
  'shop.confirmPet': '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u0634\u0631\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u0645\u0631\u0627\u0641\u0642\u061f',
  'shop.loadingAd': '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0645\u064a\u0644...',

  'loadout.weapons': '\u0627\u0644\u0623\u0633\u0644\u062d\u0629',
  'loadout.pets': '\u0627\u0644\u0645\u0631\u0627\u0641\u0642\u0648\u0646',
  'loadout.super': '\u0633\u0648\u0628\u0631',
  'loadout.upgrade': '\u062a\u0631\u0642\u064a\u0629',

  'inv.section.weapons.title': '\u0627\u0644\u0623\u0633\u0644\u062d\u0629',
  'inv.section.weapons.sub': '\u0623\u0633\u0644\u062d\u062a\u0643 \u0627\u0644\u0645\u0641\u062a\u0648\u062d\u0629',
  'inv.section.supers.title': '\u0627\u0644\u0633\u0648\u0628\u0631',
  'inv.section.supers.sub': '\u0642\u062f\u0631\u0627\u062a \u062e\u0627\u0635\u0629',
  'inv.section.pets.title': '\u0627\u0644\u0645\u0631\u0627\u0641\u0642\u0648\u0646',
  'inv.section.pets.sub': '\u0645\u0633\u0627\u0639\u062f\u0648\u0646 \u0648\u0631\u0641\u0627\u0642',
  'inv.section.skins.title': '\u0627\u0644\u0633\u0643\u064a\u0646\u0627\u062a',
  'inv.section.skins.sub': '\u0627\u0644\u0645\u0638\u0627\u0647\u0631 \u0627\u0644\u062a\u064a \u062a\u0645\u062a\u0644\u0643\u0647\u0627',

  'upgrade.doubleShooter.title': '\u0637\u0644\u0642\u0629 \u0645\u0632\u062f\u0648\u062c\u0629',
  'upgrade.doubleShooter.sub': '+1 \u0645\u0642\u0630\u0648\u0641',
  'upgrade.plusHp.title': '\u0635\u062d\u0629 \u0625\u0636\u0627\u0641\u064a\u0629',
  'upgrade.plusHp.sub': '+1 \u062d\u064a\u0627\u0629',
  'upgrade.fasterShooter.title': '\u0625\u0637\u0644\u0627\u0642 \u0623\u0633\u0631\u0639',
  'upgrade.fasterShooter.sub': '\u0632\u064a\u0627\u062f\u0629 \u0627\u0644\u0645\u0639\u062f\u0644',
  'upgrade.petFaster.title': '\u0645\u0631\u0627\u0641\u0642',
  'upgrade.petFaster.sub': '\u0623\u0633\u0631\u0639',
  'upgrade.damageUp.title': '\u0632\u064a\u0627\u062f\u0629 \u0627\u0644\u0636\u0631\u0631',
  'upgrade.damageUp.sub': '+1 \u0636\u0631\u0631',
  'upgrade.speedBoost.title': '\u062a\u0639\u0632\u064a\u0632 \u0627\u0644\u0633\u0631\u0639\u0629',
  'upgrade.speedBoost.sub': '+\u0633\u0631\u0639\u0629 \u0627\u0644\u062d\u0631\u0643\u0629',
  'upgrade.piercingShot.title': '\u0637\u0644\u0642\u0629 \u062e\u0627\u0631\u0642\u0629',
  'upgrade.piercingShot.sub': '\u062a\u062e\u062a\u0631\u0642 \u0627\u0644\u0623\u0639\u062f\u0627\u0621',
  'upgrade.superCharge.title': '\u0634\u062d\u0646 \u0627\u0644\u0633\u0648\u0628\u0631',
  'upgrade.superCharge.sub': '+\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0624\u0634\u0631',
  'upgrade.shield.title': '\u062f\u0631\u0639',
  'upgrade.shield.sub': '20 \u062b\u0627\u0646\u064a\u0629 \u062d\u0645\u0627\u064a\u0629',
};

Object.assign(TRANSLATIONS.ar, {
  'shop.dailyOffers': '\u0639\u0631\u0648\u0636 \u064a\u0648\u0645\u064a\u0629',
  'shop.featuredTag': '\u0625\u0635\u062f\u0627\u0631 \u062e\u0627\u0635',
  'shop.newFeaturedIn': '\u0639\u0631\u0636 \u0645\u0645\u064a\u0632 \u062c\u062f\u064a\u062f \u0628\u0639\u062f {time}',
  'shop.notEnoughCoins': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0639\u0645\u0644\u0627\u062a \u0643\u0627\u0641\u064a\u0629',
  'shop.skinPurchased': '\u062a\u0645 \u0634\u0631\u0627\u0621 \u0627\u0644\u0633\u0643\u064a\u0646!',
  'shop.featuredUnlocked': '\u062a\u0645 \u0641\u062a\u062d \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0645\u064a\u0632!',
  'shop.dealPurchased': '\u062a\u0645 \u0634\u0631\u0627\u0621 \u0627\u0644\u0639\u0631\u0636!',
  'shop.alreadyOwnedBonus': '\u062a\u0645\u062a\u0644\u0643\u0647 \u0628\u0627\u0644\u0641\u0639\u0644. \u0645\u0643\u0627\u0641\u0623\u0629: +{coins} \u0639\u0645\u0644\u0629',
  'shop.dailyGiftCoins': '\u0647\u062f\u064a\u0629 \u064a\u0648\u0645\u064a\u0629: +{coins} \u0639\u0645\u0644\u0629',
  'shop.boostUnlocked': '\u062a\u0645 \u0641\u062a\u062d \u062a\u0639\u0632\u064a\u0632: {name}',
  'shop.unlocked': '\u062a\u0645 \u0641\u062a\u062d: {name}',
  'shop.dailyGiftClaimed': '\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u0647\u062f\u064a\u0629 \u0627\u0644\u064a\u0648\u0645\u064a\u0629! +{coins} \u0639\u0645\u0644\u0629',
  'shop.coinClaimed': '+{coins} \u0639\u0645\u0644\u0629!',
  'shop.paymentUnavailable': '\u0627\u0644\u062f\u0641\u0639 \u063a\u064a\u0631 \u0645\u062a\u0635\u0644 \u062d\u0627\u0644\u064a\u0627.',
  'shop.watchAd': '\u0634\u0627\u0647\u062f \u0625\u0639\u0644\u0627\u0646',
  'shop.adUnavailable': '\u0644\u0627 \u064a\u0648\u062c\u062f \u0625\u0639\u0644\u0627\u0646 \u0645\u062a\u0627\u062d \u0627\u0644\u0622\u0646. \u062d\u0627\u0648\u0644 \u0644\u0627\u062d\u0642\u0627.',
  'shop.adRewardNotCompleted': '\u0634\u0627\u0647\u062f \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0643\u0627\u0645\u0644\u0627 \u0644\u062a\u062d\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0643\u0627\u0641\u0623\u0629.',
  'shop.adRewardClaimed': '\u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 {coins} \u0639\u0645\u0644\u0629!',
  'shop.adRewardReady': '\u0627\u0644\u0645\u0643\u0627\u0641\u0623\u0629 \u062c\u0627\u0647\u0632\u0629',
  'shop.adRewardAvailableIn': '\u0645\u062a\u0627\u062d \u0628\u0639\u062f {time}',
  'shop.gift.title': '\u0647\u062f\u064a\u0629 \u064a\u0648\u0645\u064a\u0629',
  'shop.gift.tag': '\u064a\u0648\u0645\u064a',
  'shop.gift.freeCoinsToday': '\u0639\u0645\u0644\u0627\u062a \u0645\u062c\u0627\u0646\u064a\u0629 \u0644\u0644\u064a\u0648\u0645',
  'shop.gift.unlockBoost': '\u0627\u0641\u062a\u062d \u0639\u0646\u0635\u0631 \u062a\u0639\u0632\u064a\u0632',
  'shop.gift.unlockDaily': '\u0627\u0641\u062a\u062d \u0639\u0646\u0635\u0631\u0627 \u064a\u0648\u0645\u064a\u0627 \u0645\u0646 \u0627\u0644\u0645\u062a\u062c\u0631',
  'shop.gift.claimYourReward': '\u0627\u0633\u062a\u0644\u0645 \u0645\u0643\u0627\u0641\u0623\u062a\u0643',
  'shop.gift.dailyGift': '\u0647\u062f\u064a\u0629 \u064a\u0648\u0645\u064a\u0629',
  'shop.gift.paidCoinsOnly': '\u062d\u0632\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u062a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u062f\u0641\u0639.',

  'planet.levelRange': '\u0627\u0644\u0645\u0631\u0627\u062d\u0644 {start} - {end}',
  'weapon.laser.name': '\u0644\u064a\u0632\u0631',
  'weapon.laser.desc': '\u0633\u0644\u0627\u062d \u0637\u0627\u0642\u0629 \u062f\u0642\u064a\u0642 \u0648\u0633\u0631\u064a\u0639.',
  'weapon.missile.name': '\u0635\u0627\u0631\u0648\u062e',
  'weapon.missile.desc': '\u0635\u0648\u0627\u0631\u064a\u062e \u0642\u0648\u064a\u0629 \u0628\u0636\u0631\u0631 \u0639\u0627\u0644.',
  'weapon.triangleShooter.name': '\u0645\u0637\u0644\u0642 \u0645\u062b\u0644\u062b',
  'weapon.triangleShooter.desc': '\u064a\u0637\u0644\u0642 \u0628\u0646\u0645\u0637 \u0645\u062a\u0634\u0639\u0628 \u0644\u062a\u063a\u0637\u064a\u0629 \u0623\u0648\u0633\u0639.',
  'weapon.statsComingSoon': '\u0627\u0644\u0625\u062d\u0635\u0627\u0626\u064a\u0627\u062a \u0642\u0631\u064a\u0628\u0627',
  'weapon.descComingSoon': '\u0627\u0644\u0648\u0635\u0641 \u0642\u0631\u064a\u0628\u0627',

  'pets.title': '\u0645\u062a\u062c\u0631 \u0627\u0644\u0645\u0631\u0627\u0641\u0642\u064a\u0646',
  'pets.equip': '\u062a\u062c\u0647\u064a\u0632',
  'pets.unequip': '\u0625\u0632\u0627\u0644\u0629',
  'pets.supportCompanion': '\u0645\u0631\u0627\u0641\u0642 \u062f\u0627\u0639\u0645',
  'pets.info': '\u0645\u0639\u0644\u0648\u0645\u0627\u062a {name}',
  'pets.role.attack': '\u0647\u062c\u0648\u0645',
  'pets.ability.heavyPulse': '\u0646\u0628\u0636\u0629 \u0642\u0648\u064a\u0629',
  'pets.ability.mindControl': '\u062a\u062d\u0643\u0645 \u0630\u0647\u0646\u064a',
  'pets.ability.massCrash': '\u0627\u0635\u0637\u062f\u0627\u0645 \u062c\u0645\u0627\u0639\u064a',
  'pets.effect.siren': '\u064a\u0634\u0648\u0634 \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u062f\u0627\u0621',
  'pets.rate.every8s': '\u0643\u0644 8 \u062b\u0648\u0627\u0646',
  'pets.rate.every9s': '\u0643\u0644 9 \u062b\u0648\u0627\u0646',
  'pets.stat.LIVES': '\u0627\u0644\u062d\u064a\u0627\u0629',
  'pets.stat.DAMAGE': '\u0627\u0644\u0636\u0631\u0631',
  'pets.stat.SHOOT_RATE': '\u0645\u0639\u062f\u0644 \u0627\u0644\u0625\u0637\u0644\u0627\u0642',
  'pets.stat.ABILITY': '\u0627\u0644\u0642\u062f\u0631\u0629',
  'pets.stat.EFFECT': '\u0627\u0644\u062a\u0623\u062b\u064a\u0631',
  'pets.stat.RATE': '\u0627\u0644\u0645\u0639\u062f\u0644',
  'pets.dog.short': '\u0645\u0631\u0627\u0641\u0642 \u064a\u0637\u0644\u0642 \u0645\u0639\u0643.',
  'pets.dog.long': '\u0645\u0631\u0627\u0641\u0642 \u0648\u0641\u064a \u064a\u0633\u0627\u0639\u062f\u0643 \u0628\u0625\u0637\u0644\u0627\u0642\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629 \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u0642\u062a\u0627\u0644.',
  'pets.siren.short': '\u064a\u0634\u0648\u0634 \u0639\u0644\u0649 \u0627\u0644\u0623\u0639\u062f\u0627\u0621 \u0628\u0646\u0628\u0636\u0627\u062a \u062e\u0627\u0635\u0629.',
  'pets.siren.long': '\u0633\u0627\u064a\u0631\u0646 \u0645\u0631\u0627\u0641\u0642 \u062e\u0627\u0635 \u064a\u0636\u0639\u0641 \u062d\u0631\u0643\u0629 \u0627\u0644\u0623\u0639\u062f\u0627\u0621 \u0648\u064a\u0645\u0646\u062d\u0643 \u0623\u0641\u0636\u0644\u064a\u0629.',

  'super.waveShield.title': '\u062f\u0631\u0639 \u0645\u0648\u062c\u064a',
  'super.waveShield.desc': '\u064a\u0637\u0644\u0642 \u0645\u0648\u062c\u0629 \u062d\u0645\u0627\u064a\u0629 \u062a\u062f\u0641\u0639 \u0627\u0644\u062e\u0637\u0631 \u0628\u0639\u064a\u062f\u0627.',
  'super.superLaser.title': '\u0644\u064a\u0632\u0631 \u0633\u0648\u0628\u0631',
  'super.superLaser.desc': '\u0634\u0639\u0627\u0639 \u0642\u0648\u064a \u064a\u062e\u062a\u0631\u0642 \u0627\u0644\u0623\u0639\u062f\u0627\u0621.',
  'super.stat.Duration': '\u0627\u0644\u0645\u062f\u0629',
  'super.stat.Cooldown': '\u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631',
  'super.stat.Reflect': '\u0627\u0644\u0635\u062f',
  'super.stat.Damage': '\u0627\u0644\u0636\u0631\u0631',
  'super.stat.Pierce': '\u0627\u0644\u0627\u062e\u062a\u0631\u0627\u0642',

  'inv.modal.skins': '\u0627\u0644\u0633\u0643\u064a\u0646\u0627\u062a',
  'inv.modal.weapons': '\u0627\u0644\u0623\u0633\u0644\u062d\u0629',
  'inv.modal.pets': '\u0627\u0644\u0645\u0631\u0627\u0641\u0642\u0648\u0646',
  'inv.modal.supers': '\u0627\u0644\u0633\u0648\u0628\u0631',
  'inv.empty.skins': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0633\u0643\u064a\u0646\u0627\u062a \u0628\u0639\u062f.',
  'inv.empty.weapons': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u0633\u0644\u062d\u0629 \u0628\u0639\u062f.',
  'inv.empty.pets': '\u0644\u0627 \u064a\u0648\u062c\u062f \u0645\u0631\u0627\u0641\u0642\u0648\u0646 \u0628\u0639\u062f.',
  'inv.empty.supers': '\u0644\u0627 \u062a\u0648\u062c\u062f \u0642\u062f\u0631\u0627\u062a \u0633\u0648\u0628\u0631 \u0628\u0639\u062f.',
  'inv.notOwned': '\u063a\u064a\u0631 \u0645\u0645\u062a\u0644\u0643',
  'inv.available': '\u0645\u062a\u0627\u062d',
  'inv.goToPetShop': '\u0627\u0630\u0647\u0628 \u0625\u0644\u0649 \u0645\u062a\u062c\u0631 \u0627\u0644\u0645\u0631\u0627\u0641\u0642\u064a\u0646',

  'game.title': 'ORBIT VELOCITY',
  'game.victory': '\u0627\u0646\u062a\u0635\u0627\u0631!',
  'game.gameOver': '\u0627\u0646\u062a\u0647\u062a \u0627\u0644\u0644\u0639\u0628\u0629',
  'game.reward': '\u0645\u0643\u0627\u0641\u0623\u0629',
  'game.betterLuck': '\u062d\u0638\u0627 \u0623\u0641\u0636\u0644 \u0627\u0644\u0645\u0631\u0629 \u0627\u0644\u0642\u0627\u062f\u0645\u0629',
  'game.nextLevel': '\u0627\u0644\u0645\u0631\u062d\u0644\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629',
  'game.backToLobby': '\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0631\u062f\u0647\u0629',
  'game.lobby': '\u0627\u0644\u0631\u062f\u0647\u0629',
  'game.tryAgain': '\u062d\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649',
  'game.newSkinUnlocked': '\u062a\u0645 \u0641\u062a\u062d \u0633\u0643\u064a\u0646 \u062c\u062f\u064a\u062f',
  'game.collect': '\u0627\u0633\u062a\u0644\u0627\u0645',
  'game.reviveAd': '\u0634\u0627\u0647\u062f \u0625\u0639\u0644\u0627\u0646 \u0644\u0644\u0625\u062d\u064a\u0627\u0621',
  'game.reviveLoading': '\u062c\u0627\u0631\u064a \u0627\u0644\u0625\u062d\u064a\u0627\u0621...',
  'game.reviveUnavailable': '\u0627\u0644\u0625\u062d\u064a\u0627\u0621 \u063a\u064a\u0631 \u0645\u062a\u0627\u062d \u0627\u0644\u0622\u0646.',
  'game.reviveIncomplete': '\u0634\u0627\u0647\u062f \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0643\u0627\u0645\u0644\u0627 \u0644\u0644\u0625\u062d\u064a\u0627\u0621.',
  'game.lockedLevel': '\u0645\u0631\u062d\u0644\u0629 \u0645\u063a\u0644\u0642\u0629',
  'game.lives': '\u062d\u064a\u0627\u0629',
  'game.level': '\u0645\u0631\u062d\u0644\u0629',
  'game.levelColon': '\u0645\u0631\u062d\u0644\u0629:',
  'game.stage.100.title': '\u0627\u0644\u0645\u0631\u062d\u0644\u0629 100',
  'game.stage.90.title': '\u0645\u0646\u0637\u0642\u0629 90',
  'game.stage.80.title': '\u0645\u0646\u0637\u0642\u0629 80',
  'game.stage.70.title': '\u0645\u0646\u0637\u0642\u0629 70',
  'game.stage.60.title': '\u0645\u0646\u0637\u0642\u0629 60',
  'game.stage.100.1': '\u0627\u0633\u062a\u0639\u062f \u0644\u0644\u0645\u0639\u0631\u0643\u0629 \u0627\u0644\u0623\u062e\u064a\u0631\u0629.',
  'game.stage.100.2': '\u0627\u0644\u0623\u0639\u062f\u0627\u0621 \u0623\u0642\u0648\u0649 \u0648\u0623\u0633\u0631\u0639.',
  'game.stage.100.3': '\u0627\u062c\u0645\u0639 \u0627\u0644\u0637\u0627\u0642\u0629 \u0648\u0627\u0633\u062a\u062e\u062f\u0645 \u0627\u0644\u0633\u0648\u0628\u0631 \u0628\u062d\u0643\u0645\u0629.',
  'game.stage.100.4': '\u0628\u0639\u062f \u0643\u0644 \u0632\u0639\u064a\u0645 \u0633\u062a\u062d\u0635\u0644 \u0639\u0644\u0649 \u062a\u0631\u0642\u064a\u0629.',
  'game.stage.100.5': '\u062d\u0627\u0641\u0638 \u0639\u0644\u0649 \u062d\u064a\u0627\u062a\u0643 \u062d\u062a\u0649 \u0627\u0644\u0646\u0647\u0627\u064a\u0629.',
  'game.stage.100.6': '\u0627\u0644\u0646\u062c\u0648\u0645 \u062a\u0646\u062a\u0638\u0631\u0643.',
  'game.stage.90.1': '\u0627\u0644\u0642\u0637\u0627\u0639 \u064a\u0632\u062f\u0627\u062f \u062e\u0637\u0648\u0631\u0629.',
  'game.stage.90.2': '\u0627\u0644\u062d\u0631\u0643\u0629 \u0627\u0644\u0633\u0631\u064a\u0639\u0629 \u0647\u064a \u0627\u0644\u0645\u0641\u062a\u0627\u062d.',
  'game.stage.80.1': '\u0627\u0644\u0623\u0639\u062f\u0627\u0621 \u064a\u0647\u0627\u062c\u0645\u0648\u0646 \u0628\u0634\u0631\u0627\u0633\u0629.',
  'game.stage.80.2': '\u0631\u0627\u0642\u0628 \u0627\u0644\u0645\u0642\u0630\u0648\u0641\u0627\u062a \u0645\u0646 \u0643\u0644 \u0627\u062a\u062c\u0627\u0647.',
  'game.stage.default.1': '\u0627\u0647\u0632\u0645 \u0627\u0644\u0623\u0639\u062f\u0627\u0621 \u0648\u0627\u062c\u0645\u0639 \u0627\u0644\u0645\u0643\u0627\u0641\u0622\u062a.',
  'game.stage.default.2': '\u0627\u062e\u062a\u0631 \u0627\u0644\u062a\u0631\u0642\u064a\u0627\u062a \u0644\u062a\u0642\u0648\u064a\u0629 \u0633\u0641\u064a\u0646\u062a\u0643.',
  'game.enterChaos': '\u0627\u062f\u062e\u0644 \u0627\u0644\u0641\u0648\u0636\u0649',
  'game.finalBoss.gateOpening': '\u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u062a\u0646\u0641\u062a\u062d',
  'game.finalBoss.name': '\u0633\u064a\u062f \u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062a',
  'game.finalBoss.detected': '\u062a\u0645 \u0631\u0635\u062f \u0633\u0644\u0637\u0629 \u0646\u0647\u0627\u0626\u064a\u0629',
});

const TRANSLATABLE_DATA = {
  shop: {
    featured: {
      adReward: {
        en: {
          name: 'Ad Bonus',
          desc: 'Watch a short ad and receive 100 coins',
        },
        he: {
          name: 'בונוס מפרסומת',
          desc: 'צפו בפרסומת קצרה וקבלו 100 מטבעות',
        },
        es: {
          name: 'Bono por anuncio',
          desc: 'Mira un anuncio corto y recibe 100 monedas',
        },
      },
      galaxySkin: {
        en: { name: 'Galaxy Skin', desc: 'Get this skin before it leaves' },
        he: { name: 'סקין גלקסי', desc: 'קח את הסקין לפני שהוא נעלם' },
        es: {
          name: 'Skin Galaxia',
          desc: 'Consigue esta skin antes de que desaparezca',
        },
      },
    },
    dailyPool: {
      daily_pet_food: {
        en: {
          name: 'Pet Treat',
          desc: 'Pet bonus for 3 battles',
          badge: 'NEW',
        },
        he: { name: 'חטיף לחיה', desc: 'בונוס לחיה ל-3 קרבות', badge: 'חדש' },
        es: {
          name: 'Premio Mascota',
          desc: 'Bono para mascota por 3 batallas',
          badge: 'NUEVO',
        },
      },
      daily_coin_bundle: {
        en: { name: 'Mini Coins', desc: '+350 coins', badge: 'VALUE' },
        he: { name: 'מיני מטבעות', desc: '+350 מטבעות', badge: 'משתלם' },
        es: { name: 'Monedas Mini', desc: '+350 monedas', badge: 'VALOR' },
      },
      daily_fire_rate: {
        en: {
          name: 'Rapid Fire',
          desc: '+25% fire rate (2 battles)',
          badge: 'LIMIT',
        },
        he: {
          name: 'אש מהירה',
          desc: '+25% קצב ירי (2 קרבות)',
          badge: 'מוגבל',
        },
        es: {
          name: 'Fuego Rápido',
          desc: '+25% cadencia (2 batallas)',
          badge: 'LÍMITE',
        },
      },
      daily_revive: {
        en: {
          name: 'Instant Revive',
          desc: 'Revive once on death',
          badge: 'RARE',
        },
        he: {
          name: 'החייאה מיידית',
          desc: 'חזרה לחיים פעם אחת במוות',
          badge: 'נדיר',
        },
        es: {
          name: 'Revivir Instantáneo',
          desc: 'Revive una vez al morir',
          badge: 'RARO',
        },
      },
      daily_super_charge: {
        en: {
          name: 'Super Charge',
          desc: 'Start battle with full super',
          badge: 'POWER',
        },
        he: {
          name: 'טעינת סופר',
          desc: 'מתחילים קרב עם סופר מלא',
          badge: 'כוח',
        },
        es: {
          name: 'Carga Súper',
          desc: 'Empieza con el súper lleno',
          badge: 'PODER',
        },
      },
      daily_random_box: {
        en: { name: 'Mystery Box', desc: 'Random reward', badge: '???' },
        he: { name: 'קופסת מסתורין', desc: 'פרס אקראי', badge: '???' },
        es: {
          name: 'Caja Misteriosa',
          desc: 'Recompensa aleatoria',
          badge: '???',
        },
      },
      daily_coin_rush: {
        en: {
          name: 'Coin Rush',
          desc: 'Double coins for 2 battles',
          badge: 'VALUE',
        },
        he: {
          name: 'מרוץ מטבעות',
          desc: 'כפל מטבעות ל-2 קרבות',
          badge: 'משתלם',
        },
        es: {
          name: 'Lluvia de Monedas',
          desc: 'Doble monedas por 2 batallas',
          badge: 'VALOR',
        },
      },
    },
    skins: {
      default: {
        en: { name: 'Classic', desc: '' },
        he: { name: 'קלאסי', desc: '' },
        es: { name: 'Clásico', desc: '' },
      },
      redclassic: {
        en: { name: 'Red Classic', desc: 'Red classic' },
        he: { name: 'קלאסי אדום', desc: 'קלאסי בצבע אדום' },
        es: { name: 'Clásico Rojo', desc: 'Clásico en rojo' },
      },
      dark_reaper: {
        en: { name: 'Dark Reaper', desc: 'Dark metallic finish' },
        he: { name: 'קוצר אפל', desc: 'גימור מתכתי כהה' },
        es: { name: 'Segador Oscuro', desc: 'Acabado metálico oscuro' },
      },
      celestialsakura: {
        en: { name: 'Celestial Sakura', desc: 'Pink petals FX' },
        he: { name: 'סאקורה שמיימית', desc: 'אפקט עלי כותרת ורודים' },
        es: { name: 'Sakura Celestial', desc: 'FX de pétalos rosas' },
      },
      celestial_sakura: {
        en: { name: 'Celestial Sakura', desc: 'Pink petals FX' },
        he: { name: 'סאקורה שמיימית', desc: 'אפקט עלי כותרת ורודים' },
        es: { name: 'Sakura Celestial', desc: 'FX de pétalos rosas' },
      },
      goden_core: {
        en: { name: 'Golden Core', desc: 'Gold shine aura' },
        he: { name: 'ליבה זהובה', desc: 'הילה זהובה זוהרת' },
        es: { name: 'Núcleo Dorado', desc: 'Aura brillante dorada' },
      },
      star_breaker: {
        en: { name: 'Star Breaker', desc: 'Unlocked by beating Level 100' },
        he: { name: 'שובר כוכבים', desc: 'נפתח אחרי ניצחון בשלב 100' },
        es: {
          name: 'Rompeestrellas',
          desc: 'Se desbloquea al superar el nivel 100',
        },
      },
    },
    coinPacks: {
      coins_1000: {
        en: { name: '1000 Coins', desc: 'Small boost' },
        he: { name: '1000 מטבעות', desc: 'חיזוק קטן' },
        es: { name: '1000 Monedas', desc: 'Impulso pequeño' },
      },
      coins_3000: {
        en: { name: '3000 Coins', desc: 'Good value' },
        he: { name: '3000 מטבעות', desc: 'תמורה טובה' },
        es: { name: '3000 Monedas', desc: 'Buena relación' },
      },
      coins_6000: {
        en: { name: '6000 Coins', desc: 'Big pack' },
        he: { name: '6000 מטבעות', desc: 'חבילה גדולה' },
        es: { name: '6000 Monedas', desc: 'Paquete grande' },
      },
      coins_10000: {
        en: { name: '10000 Coins', desc: 'Mega pack' },
        he: { name: '10000 מטבעות', desc: 'חבילת ענק' },
        es: { name: '10000 Monedas', desc: 'Paquete mega' },
      },
    },
    dailyGiftPool: {
      small_coin_pack: {
        en: { name: 'Small Coin Pack' },
        he: { name: 'חבילת מטבעות קטנה' },
        es: { name: 'Paquete pequeño de monedas' },
      },
      coin_pack: {
        en: { name: 'Coin Pack' },
        he: { name: 'חבילת מטבעות' },
        es: { name: 'Paquete de monedas' },
      },
      big_coin_pack: {
        en: { name: 'Big Coin Pack' },
        he: { name: 'חבילת מטבעות גדולה' },
        es: { name: 'Paquete grande de monedas' },
      },
    },
  },
};

Object.assign(TRANSLATABLE_DATA.shop.featured.adReward, {
  ar: {
    name: '\u0645\u0643\u0627\u0641\u0623\u0629 \u0625\u0639\u0644\u0627\u0646',
    desc: '\u0634\u0627\u0647\u062f \u0625\u0639\u0644\u0627\u0646\u0627 \u0642\u0635\u064a\u0631\u0627 \u0648\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 100 \u0639\u0645\u0644\u0629',
  },
});
Object.assign(TRANSLATABLE_DATA.shop.featured.galaxySkin, {
  ar: {
    name: '\u0633\u0643\u064a\u0646 \u0627\u0644\u0645\u062c\u0631\u0629',
    desc: '\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0633\u0643\u064a\u0646 \u0642\u0628\u0644 \u0623\u0646 \u064a\u062e\u062a\u0641\u064a',
  },
});

Object.assign(TRANSLATABLE_DATA.shop.dailyPool.daily_pet_food, {
  ar: {
    name: '\u0645\u0643\u0627\u0641\u0623\u0629 \u0627\u0644\u0645\u0631\u0627\u0641\u0642',
    desc: '\u0645\u0643\u0627\u0641\u0623\u0629 \u0644\u0644\u0645\u0631\u0627\u0641\u0642 \u0644\u0640 3 \u0645\u0639\u0627\u0631\u0643',
    badge: '\u062c\u062f\u064a\u062f',
  },
});
Object.assign(TRANSLATABLE_DATA.shop.dailyPool.daily_coin_bundle, {
  ar: {
    name: '\u0639\u0645\u0644\u0627\u062a \u0635\u063a\u064a\u0631\u0629',
    desc: '+350 \u0639\u0645\u0644\u0629',
    badge: '\u0642\u064a\u0645\u0629',
  },
});
Object.assign(TRANSLATABLE_DATA.shop.dailyPool.daily_fire_rate, {
  ar: {
    name: '\u0625\u0637\u0644\u0627\u0642 \u0633\u0631\u064a\u0639',
    desc: '+25% \u0645\u0639\u062f\u0644 \u0627\u0644\u0625\u0637\u0644\u0627\u0642 (\u0645\u0639\u0631\u0643\u062a\u0627\u0646)',
    badge: '\u0645\u062d\u062f\u0648\u062f',
  },
});
Object.assign(TRANSLATABLE_DATA.shop.dailyPool.daily_revive, {
  ar: {
    name: '\u0625\u062d\u064a\u0627\u0621 \u0641\u0648\u0631\u064a',
    desc: '\u0625\u062d\u064a\u0627\u0621 \u0645\u0631\u0629 \u0648\u0627\u062d\u062f\u0629 \u0639\u0646\u062f \u0627\u0644\u0645\u0648\u062a',
    badge: '\u0646\u0627\u062f\u0631',
  },
});
Object.assign(TRANSLATABLE_DATA.shop.dailyPool.daily_super_charge, {
  ar: {
    name: '\u0634\u062d\u0646 \u0627\u0644\u0633\u0648\u0628\u0631',
    desc: '\u0627\u0628\u062f\u0623 \u0627\u0644\u0645\u0639\u0631\u0643\u0629 \u0628\u0633\u0648\u0628\u0631 \u0643\u0627\u0645\u0644',
    badge: '\u0642\u0648\u0629',
  },
});
Object.assign(TRANSLATABLE_DATA.shop.dailyPool.daily_random_box, {
  ar: {
    name: '\u0635\u0646\u062f\u0648\u0642 \u063a\u0627\u0645\u0636',
    desc: '\u0645\u0643\u0627\u0641\u0623\u0629 \u0639\u0634\u0648\u0627\u0626\u064a\u0629',
    badge: '???',
  },
});
Object.assign(TRANSLATABLE_DATA.shop.dailyPool.daily_coin_rush, {
  ar: {
    name: '\u0627\u0646\u062f\u0641\u0627\u0639 \u0627\u0644\u0639\u0645\u0644\u0627\u062a',
    desc: '\u0636\u0639\u0641 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0644\u0645\u0639\u0631\u0643\u062a\u064a\u0646',
    badge: '\u0642\u064a\u0645\u0629',
  },
});

Object.assign(TRANSLATABLE_DATA.shop.skins.default, {
  ar: { name: '\u0643\u0644\u0627\u0633\u064a\u0643', desc: '' },
});
Object.assign(TRANSLATABLE_DATA.shop.skins.redclassic, {
  ar: { name: '\u0643\u0644\u0627\u0633\u064a\u0643 \u0623\u062d\u0645\u0631', desc: '\u0643\u0644\u0627\u0633\u064a\u0643 \u0623\u062d\u0645\u0631' },
});
Object.assign(TRANSLATABLE_DATA.shop.skins.dark_reaper, {
  ar: { name: '\u0627\u0644\u062d\u0627\u0635\u062f \u0627\u0644\u0645\u0638\u0644\u0645', desc: '\u0644\u0645\u0633\u0629 \u0645\u0639\u062f\u0646\u064a\u0629 \u062f\u0627\u0643\u0646\u0629' },
});
Object.assign(TRANSLATABLE_DATA.shop.skins.celestialsakura, {
  ar: { name: '\u0633\u0627\u0643\u0648\u0631\u0627 \u0633\u0645\u0627\u0648\u064a\u0629', desc: '\u062a\u0623\u062b\u064a\u0631 \u0628\u062a\u0644\u0627\u062a \u0648\u0631\u062f\u064a\u0629' },
});
Object.assign(TRANSLATABLE_DATA.shop.skins.celestial_sakura, {
  ar: { name: '\u0633\u0627\u0643\u0648\u0631\u0627 \u0633\u0645\u0627\u0648\u064a\u0629', desc: '\u062a\u0623\u062b\u064a\u0631 \u0628\u062a\u0644\u0627\u062a \u0648\u0631\u062f\u064a\u0629' },
});
Object.assign(TRANSLATABLE_DATA.shop.skins.goden_core, {
  ar: { name: '\u0627\u0644\u0646\u0648\u0627\u0629 \u0627\u0644\u0630\u0647\u0628\u064a\u0629', desc: '\u0647\u0627\u0644\u0629 \u0644\u0645\u0639\u0627\u0646 \u0630\u0647\u0628\u064a' },
});
Object.assign(TRANSLATABLE_DATA.shop.skins.star_breaker, {
  ar: { name: '\u0643\u0627\u0633\u0631 \u0627\u0644\u0646\u062c\u0648\u0645', desc: '\u064a\u0641\u062a\u062d \u0628\u0639\u062f \u0647\u0632\u064a\u0645\u0629 \u0627\u0644\u0645\u0631\u062d\u0644\u0629 100' },
});

Object.assign(TRANSLATABLE_DATA.shop.coinPacks.coins_1000, {
  ar: { name: '1000 \u0639\u0645\u0644\u0629', desc: '\u062f\u0641\u0639\u0629 \u0635\u063a\u064a\u0631\u0629' },
});
Object.assign(TRANSLATABLE_DATA.shop.coinPacks.coins_3000, {
  ar: { name: '3000 \u0639\u0645\u0644\u0629', desc: '\u0642\u064a\u0645\u0629 \u062c\u064a\u062f\u0629' },
});
Object.assign(TRANSLATABLE_DATA.shop.coinPacks.coins_6000, {
  ar: { name: '6000 \u0639\u0645\u0644\u0629', desc: '\u062d\u0632\u0645\u0629 \u0643\u0628\u064a\u0631\u0629' },
});
Object.assign(TRANSLATABLE_DATA.shop.coinPacks.coins_10000, {
  ar: { name: '10000 \u0639\u0645\u0644\u0629', desc: '\u062d\u0632\u0645\u0629 \u0636\u062e\u0645\u0629' },
});

Object.assign(TRANSLATABLE_DATA.shop.dailyGiftPool.small_coin_pack, {
  ar: { name: '\u062d\u0632\u0645\u0629 \u0639\u0645\u0644\u0627\u062a \u0635\u063a\u064a\u0631\u0629' },
});
Object.assign(TRANSLATABLE_DATA.shop.dailyGiftPool.coin_pack, {
  ar: { name: '\u062d\u0632\u0645\u0629 \u0639\u0645\u0644\u0627\u062a' },
});
Object.assign(TRANSLATABLE_DATA.shop.dailyGiftPool.big_coin_pack, {
  ar: { name: '\u062d\u0632\u0645\u0629 \u0639\u0645\u0644\u0627\u062a \u0643\u0628\u064a\u0631\u0629' },
});

function getLang() {
  return localStorage.getItem('language') || 'en';
}

Object.assign(TRANSLATIONS.en, {
  'achievements.eyebrow': 'Local Progress',
  'achievements.subtitle': 'Saved on this device and available offline.',
  'achievements.percentComplete': '{percent}% Game Complete',
  'achievements.levelMeta': 'Highest level: {current} / {total} • Completed levels: {completed}',
  'achievements.highestLevel': 'Highest Level',
  'achievements.coins': 'Coins',
  'achievements.inventoryOwned': 'Inventory Owned',
  'achievements.cloudStatus': 'Save Status',
  'achievements.connected': 'Google connected',
  'achievements.offlineReady': 'Offline ready',
  'achievements.equippedTitle': 'Equipped Loadout',
  'achievements.skins': 'Skins',
  'achievements.weapons': 'Weapons',
  'achievements.pets': 'Pets',
  'achievements.supers': 'Supers',
  'achievements.none': 'None',
  'achievements.ownedItems': 'Owned',
  'achievements.lockedItems': 'Locked',
  'achievements.emptyOwned': 'Nothing owned yet',
  'achievements.allUnlocked': 'All unlocked',
});

Object.assign(TRANSLATIONS.he, {
  'achievements.eyebrow': 'התקדמות מקומית',
  'achievements.subtitle': 'נשמר על המכשיר וזמין גם בלי אינטרנט.',
  'achievements.percentComplete': '{percent}% מהמשחק הושלם',
  'achievements.levelMeta': 'שלב הכי גבוה: {current} / {total} • שלבים שהושלמו: {completed}',
  'achievements.highestLevel': 'שלב הכי גבוה',
  'achievements.coins': 'מטבעות',
  'achievements.inventoryOwned': 'פריטים במלאי',
  'achievements.cloudStatus': 'מצב שמירה',
  'achievements.connected': 'Google מחובר',
  'achievements.offlineReady': 'זמין אופליין',
  'achievements.equippedTitle': 'ציוד פעיל',
  'achievements.skins': 'סקינים',
  'achievements.weapons': 'נשקים',
  'achievements.pets': 'חיות',
  'achievements.supers': 'סופרים',
  'achievements.none': 'אין',
  'achievements.ownedItems': 'יש לך',
  'achievements.lockedItems': 'נעול',
  'achievements.emptyOwned': 'עוד אין פריטים',
  'achievements.allUnlocked': 'הכול פתוח',
});

Object.assign(TRANSLATIONS.es, {
  'achievements.eyebrow': 'Progreso local',
  'achievements.subtitle': 'Guardado en este dispositivo y disponible sin conexión.',
  'achievements.percentComplete': '{percent}% del juego completado',
  'achievements.levelMeta': 'Nivel más alto: {current} / {total} • Niveles completados: {completed}',
  'achievements.highestLevel': 'Nivel más alto',
  'achievements.coins': 'Monedas',
  'achievements.inventoryOwned': 'Inventario obtenido',
  'achievements.cloudStatus': 'Estado de guardado',
  'achievements.connected': 'Google conectado',
  'achievements.offlineReady': 'Listo sin conexión',
  'achievements.equippedTitle': 'Equipo activo',
  'achievements.skins': 'Skins',
  'achievements.weapons': 'Armas',
  'achievements.pets': 'Mascotas',
  'achievements.supers': 'Supers',
  'achievements.none': 'Ninguno',
  'achievements.ownedItems': 'Tienes',
  'achievements.lockedItems': 'Bloqueado',
  'achievements.emptyOwned': 'Aún no tienes objetos',
  'achievements.allUnlocked': 'Todo desbloqueado',
});

Object.assign(TRANSLATIONS.ar, {
  'achievements.eyebrow': 'تقدم محلي',
  'achievements.subtitle': 'محفوظ على هذا الجهاز ومتاح بدون إنترنت.',
  'achievements.percentComplete': 'اكتمل {percent}% من اللعبة',
  'achievements.levelMeta': 'أعلى مرحلة: {current} / {total} • المراحل المكتملة: {completed}',
  'achievements.highestLevel': 'أعلى مرحلة',
  'achievements.coins': 'العملات',
  'achievements.inventoryOwned': 'عناصر المخزون',
  'achievements.cloudStatus': 'حالة الحفظ',
  'achievements.connected': 'Google متصل',
  'achievements.offlineReady': 'جاهز دون اتصال',
  'achievements.equippedTitle': 'العتاد المجهز',
  'achievements.skins': 'الأشكال',
  'achievements.weapons': 'الأسلحة',
  'achievements.pets': 'الحيوانات',
  'achievements.supers': 'السوبر',
  'achievements.none': 'لا يوجد',
  'achievements.ownedItems': 'تملك',
  'achievements.lockedItems': 'مغلق',
  'achievements.emptyOwned': 'لا توجد عناصر بعد',
  'achievements.allUnlocked': 'تم فتح الكل',
});

function t(langOrKey, keyOrParams, maybeParams = null) {
  let lang = langOrKey;
  let key = keyOrParams;
  let params = maybeParams;

  if (typeof keyOrParams !== 'string') {
    lang = getLang();
    key = langOrKey;
    params = keyOrParams || null;
  }

  const safeLang = TRANSLATIONS[lang] ? lang : 'en';
  const str = TRANSLATIONS?.[safeLang]?.[key] ?? TRANSLATIONS?.en?.[key] ?? key;

  if (!params) return str;

  return str.replace(/\{(\w+)\}/g, (_, k) =>
    params[k] !== undefined ? String(params[k]) : `{${k}}`
  );
}

function dataT(group, id, field, lang = getLang()) {
  const data = TRANSLATABLE_DATA?.shop?.[group]?.[id];
  return data?.[lang]?.[field] ?? data?.en?.[field] ?? null;
}

function applyDirection(lang) {
  const nextLang = TRANSLATIONS[lang] ? lang : 'en';
  const isRTL = nextLang === 'he' || nextLang === 'ar';
  document.documentElement.lang = nextLang;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  if (document.body) {
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    document.body.style.direction = isRTL ? 'rtl' : 'ltr';
  }
}

function applyLanguage(lang) {
  const nextLang = TRANSLATIONS[lang] ? lang : 'en';

  localStorage.setItem('language', nextLang);
  applyDirection(nextLang);
  document.title = t(
    nextLang,
    document.body?.dataset?.titleI18n || 'game.title'
  );

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(nextLang, key);
  });

  document.querySelectorAll('[data-i18n-label]').forEach((el) => {
    const label = t(nextLang, el.dataset.i18nLabel);
    el.setAttribute('aria-label', label);
    el.setAttribute('title', label);
  });

  shopApplyLangToData?.(nextLang);

  updateEquipUI?.();
  updatePetUI?.();
  updateSuperEquipUI?.();
  updateLevelsMap?.();
  renderInventoryOverview?.();

  if (document.getElementById('shopScreen')) {
    shopRenderFeatured?.();
    shopRenderDaily?.();
    shopRenderSkinOffers?.();
    shopRenderSkins?.();
    shopRenderCoins?.();
    renderDailyGiftCard?.();
    updateDailyGiftUI?.();
  }

  shopOnEnter?.();
  invRerenderIfOpen?.();
}

const LANGUAGE_NAMES = {
  en: 'English',
  he: '\u05e2\u05d1\u05e8\u05d9\u05ea',
  es: 'Espa\u00f1ol',
  ar: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
};

const LANGUAGE_CHANGE_COPY = {
  en: {
    title: 'Change language?',
    text: 'Are you sure you want to switch to {language}?',
    cancel: 'Cancel',
    apply: 'Switch',
  },
  he: {
    title: '\u05dc\u05d4\u05d7\u05dc\u05d9\u05e3 \u05e9\u05e4\u05d4?',
    text: '\u05d1\u05d8\u05d5\u05d7 \u05e9\u05d1\u05e8\u05e6\u05d5\u05e0\u05da \u05dc\u05d4\u05d7\u05dc\u05d9\u05e3 \u05dc\u05e9\u05e4\u05d4 {language}?',
    cancel: '\u05d1\u05d8\u05dc',
    apply: '\u05d4\u05d7\u05dc\u05e3',
  },
  es: {
    title: 'Cambiar idioma?',
    text: 'Seguro que quieres cambiar a {language}?',
    cancel: 'Cancelar',
    apply: 'Cambiar',
  },
  ar: {
    title: '\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0644\u063a\u0629\u061f',
    text: '\u0647\u0644 \u0623\u0646\u062a \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u0627\u0644\u062a\u0628\u062f\u064a\u0644 \u0625\u0644\u0649 {language}\u061f',
    cancel: '\u0625\u0644\u063a\u0627\u0621',
    apply: '\u062a\u0628\u062f\u064a\u0644',
  },
};

function getLanguageName(lang) {
  return LANGUAGE_NAMES[lang] || lang;
}

function formatInlineText(text, params = {}) {
  return text.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`
  );
}

function ensureLanguageConfirmModal() {
  let modal = document.getElementById('languageConfirmModal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'languageConfirmModal';
  modal.className = 'languageConfirmModal hidden';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="languageConfirmBox">
      <div id="languageConfirmTitle" class="languageConfirmTitle"></div>
      <div id="languageConfirmText" class="languageConfirmText"></div>
      <div class="languageConfirmActions">
        <button id="languageConfirmCancel" class="languageConfirmBtn languageConfirmCancel" type="button"></button>
        <button id="languageConfirmApply" class="languageConfirmBtn languageConfirmApply" type="button"></button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function ensureLanguageOptions(languageMenu) {
  Object.entries(LANGUAGE_NAMES).forEach(([lang, label]) => {
    let btn = languageMenu.querySelector(`.languageOption[data-lang="${lang}"]`);
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'languageOption';
      btn.dataset.lang = lang;
      languageMenu.appendChild(btn);
    }
    btn.textContent = label;
    btn.dir = lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';
  });
}

function askLanguageChange(lang) {
  const modal = ensureLanguageConfirmModal();
  const currentLang = getLang();
  const copy = LANGUAGE_CHANGE_COPY[currentLang] || LANGUAGE_CHANGE_COPY.en;
  const title = modal.querySelector('#languageConfirmTitle');
  const text = modal.querySelector('#languageConfirmText');
  const cancelBtn = modal.querySelector('#languageConfirmCancel');
  const applyBtn = modal.querySelector('#languageConfirmApply');

  title.textContent = copy.title;
  text.textContent = formatInlineText(copy.text, {
    language: getLanguageName(lang),
  });
  cancelBtn.textContent = copy.cancel;
  applyBtn.textContent = copy.apply;
  modal.dir = currentLang === 'he' || currentLang === 'ar' ? 'rtl' : 'ltr';
  modal.classList.remove('hidden');

  return new Promise((resolve) => {
    const close = (result) => {
      modal.classList.add('hidden');
      cancelBtn.removeEventListener('click', onCancel);
      applyBtn.removeEventListener('click', onApply);
      modal.removeEventListener('click', onBackdrop);
      resolve(result);
    };
    const onCancel = () => close(false);
    const onApply = () => close(true);
    const onBackdrop = (e) => {
      if (e.target === modal) close(false);
    };

    cancelBtn.addEventListener('click', onCancel);
    applyBtn.addEventListener('click', onApply);
    modal.addEventListener('click', onBackdrop);
  });
}

function initLanguageUI() {
  const languageBtn = document.getElementById('languageBtn');
  const languageMenu = document.getElementById('languageMenu');

  if (!languageBtn || !languageMenu) return;
  ensureLanguageOptions(languageMenu);
  const languageOptions = languageMenu.querySelectorAll('.languageOption');

  languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    languageMenu.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    languageMenu.classList.remove('open');
  });

  languageMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  languageOptions.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const nextLang = btn.dataset.lang;
      languageMenu.classList.remove('open');
      if (!nextLang || nextLang === getLang()) return;

      const confirmed = await askLanguageChange(nextLang);
      if (!confirmed) return;

      localStorage.setItem('language', nextLang);
      window.location.href = `loadingScreen.html?to=${encodeURIComponent('main.html')}&language=1`;
    });
  });
}

function initPageLanguage() {
  applyLanguage(getLang());
}

window.TRANSLATIONS = TRANSLATIONS;
window.TRANSLATABLE_DATA = TRANSLATABLE_DATA;
window.getLang = getLang;
window.t = t;
window.dataT = dataT;
window.applyDirection = applyDirection;
window.applyLanguage = applyLanguage;
window.initLanguageUI = initLanguageUI;
window.initPageLanguage = initPageLanguage;
