(function () {
  'use strict';

  const INTRO_KEY = 'orbitvelocity.interactiveGameTutorialCompleted.v2';
  const BOSS_KEY = 'orbitvelocity.interactiveBossTutorialCompleted.v3';
  const params = new URLSearchParams(window.location.search);
  const level = parseInt(params.get('level'), 10) || 1;

  if (params.get('mode') === 'infinity' || level !== 1) return;

  const COPY = {
    en: {
      eyebrow: 'FLIGHT COMMAND', skip: 'SKIP TRAINING', start: 'START TRAINING', next: 'CONTINUE',
      welcomeTitle: 'Your first mission',
      welcomeText: 'I will fly with you. First you will move, then destroy an enemy, charge SUPER, choose an upgrade, and face the boss.',
      moveTitle: 'Drag the ship here',
      moveText: 'Hold the battlefield and drag your finger onto the glowing target.',
      moveAgainTitle: 'Great — now move across',
      moveAgainText: 'Keep holding and drag the ship to the second target.',
      enemyTitle: 'Enemy incoming!',
      enemyText: 'Move underneath it and keep holding. Your ship fires automatically while your finger is down.',
      hudTitle: 'Target destroyed',
      hudText: 'The counter increased. The hearts are your lives—keep moving so enemies never collide with your ship.',
      superTitle: 'Charge your SUPER',
      superText: 'The bar needs one more charge. Destroy the marked enemy to fill it.',
      superActiveTitle: 'SUPER activated!',
      superActiveText: 'When the bar fills, your equipped SUPER launches automatically and can clear several enemies.',
      upgradeTitle: 'Choose one upgrade',
      upgradeText: 'Combat is paused. Tap one of the three cards to strengthen your ship. You can choose only one.',
      missionTitle: 'Training complete',
      missionText: 'Now defeat 15 enemies. Keep dragging to move and fire—the boss arrives when the counter reaches 15.',
      bossTitle: 'Boss incoming!',
      bossText: 'The red bar is its health. Its shots aim at your position, so never stay still.',
      bossFightTitle: 'Move, dodge, fire!',
      bossFightText: 'Drag from side to side, avoid the aimed shots, and keep firing until the red bar is empty.',
      fight: 'FIGHT THE BOSS',
    },
    he: {
      eyebrow: 'פיקוד טיסה', skip: 'דלג על האימון', start: 'התחל אימון', next: 'המשך',
      welcomeTitle: 'המשימה הראשונה שלכם',
      welcomeText: 'אני מלווה אתכם בתוך הקרב. קודם נלמד לזוז, אחר כך נשמיד אויב, נטען SUPER, נבחר שדרוג ונילחם בבוס.',
      moveTitle: 'גררו את החללית לכאן',
      moveText: 'לחצו והחזיקו בשדה הקרב, וגררו את האצבע אל המטרה הזוהרת.',
      moveAgainTitle: 'מצוין — עכשיו לצד השני',
      moveAgainText: 'המשיכו להחזיק וגררו את החללית אל המטרה השנייה.',
      enemyTitle: 'אויב נכנס!',
      enemyText: 'זוזו מתחתיו והמשיכו להחזיק. החללית יורה אוטומטית כל עוד האצבע על המסך.',
      hudTitle: 'האויב הושמד',
      hudText: 'המונה עלה. הלבבות הם החיים שלכם—המשיכו לזוז כדי שאויבים לא יתנגשו בחללית.',
      superTitle: 'טענו את ה־SUPER',
      superText: 'חסרה עוד טעינה אחת במד. השמידו את האויב המסומן כדי למלא אותו.',
      superActiveTitle: 'ה־SUPER הופעל!',
      superActiveText: 'כשהמד מתמלא, ה־SUPER שבחרתם מופעל אוטומטית ויכול להשמיד כמה אויבים יחד.',
      upgradeTitle: 'בחרו שדרוג אחד',
      upgradeText: 'הקרב מושהה. לחצו על אחד משלושת הקלפים כדי לחזק את החללית. אפשר לבחור רק אחד.',
      missionTitle: 'האימון הושלם',
      missionText: 'עכשיו הביסו 15 אויבים. המשיכו לגרור כדי לזוז ולירות—כשהמונה יגיע ל־15 הבוס יופיע.',
      bossTitle: 'הבוס נכנס!',
      bossText: 'המד האדום הוא החיים שלו. היריות שלו מכוונות למיקום שלכם, לכן אסור להישאר במקום.',
      bossFightTitle: 'זוזו, התחמקו וירו!',
      bossFightText: 'גררו מצד לצד, התחמקו מהיריות המכוונות והמשיכו לירות עד שהמד האדום מתרוקן.',
      fight: 'התחל קרב בוס',
    },
    es: {
      eyebrow: 'COMANDO DE VUELO', skip: 'SALTAR', start: 'INICIAR', next: 'CONTINUAR',
      welcomeTitle: 'Tu primera misión',
      welcomeText: 'Te acompañaré durante el combate. Aprenderás a moverte, destruir un enemigo, cargar el SÚPER, mejorar y luchar contra el jefe.',
      moveTitle: 'Arrastra la nave aquí',
      moveText: 'Mantén pulsado el campo de batalla y arrastra el dedo hasta el objetivo brillante.',
      moveAgainTitle: 'Bien — ahora al otro lado',
      moveAgainText: 'Sigue pulsando y arrastra la nave hasta el segundo objetivo.',
      enemyTitle: '¡Enemigo acercándose!',
      enemyText: 'Colócate debajo y mantén pulsado. La nave dispara automáticamente mientras tocas la pantalla.',
      hudTitle: 'Objetivo destruido',
      hudText: 'El contador ha subido. Los corazones son tus vidas; sigue moviéndote para evitar choques.',
      superTitle: 'Carga tu SÚPER',
      superText: 'Falta una carga. Destruye al enemigo marcado para llenar la barra.',
      superActiveTitle: '¡SÚPER activado!',
      superActiveText: 'Al llenarse la barra, tu SÚPER se activa automáticamente y puede eliminar varios enemigos.',
      upgradeTitle: 'Elige una mejora',
      upgradeText: 'El combate está pausado. Pulsa una de las tres cartas para mejorar tu nave.',
      missionTitle: 'Entrenamiento completado',
      missionText: 'Ahora derrota a 15 enemigos. Arrastra para moverte y disparar; el jefe llega al alcanzar 15.',
      bossTitle: '¡Llega el jefe!',
      bossText: 'La barra roja es su vida. Sus disparos apuntan a tu posición, así que no te quedes quieto.',
      bossFightTitle: '¡Muévete, esquiva y dispara!',
      bossFightText: 'Arrastra de lado a lado, esquiva los disparos y vacía la barra roja.',
      fight: 'LUCHAR CONTRA EL JEFE',
    },
  };

  let game = null;
  let overlay = null;
  let state = 'idle';
  let frameId = null;
  let moveTargetIndex = 0;
  let moveTargets = [];
  let watchedEnemy = null;
  let scoreAtStepStart = 0;
  let superDemoTimer = null;
  let lastSpotKey = '';
  let lastTargetKey = '';
  let lastTrackingUpdate = 0;

  function copy() {
    const lang = localStorage.getItem('language') || document.documentElement.lang || 'en';
    return COPY[lang] || COPY.en;
  }

  function isHebrew() {
    return (localStorage.getItem('language') || document.documentElement.lang) === 'he';
  }

  function pause(paused) {
    if (!game) return;
    game.tutorialPaused = paused;
    if (game.mouse) game.mouse.pressed = false;
    for (const attack of game.superAttacks || []) {
      if (!attack?.sound) continue;
      if (paused) {
        attack.sound.pause();
      } else if (
        localStorage.getItem('audio') !== 'off' &&
        Number(localStorage.getItem('audioVolume') ?? 80) > 0
      ) {
        attack.sound.play().catch(() => {});
      }
    }
  }

  function clearOverlay() {
    overlay?.remove();
    overlay = null;
  }

  function baseOverlay(interactive = false) {
    const previousOverlay = overlay;
    lastSpotKey = '';
    lastTargetKey = '';
    lastTrackingUpdate = 0;
    const c = copy();
    const nextOverlay = document.createElement('div');
    nextOverlay.className = `gameTutorialOverlay${interactive ? ' is-interactive' : ' no-spotlight'}`;
    nextOverlay.dir = isHebrew() ? 'rtl' : 'ltr';
    nextOverlay.innerHTML = `
      <div class="gameTutorialSpotlight is-hidden"></div>
      <div class="gameTutorialTarget is-hidden"><span></span></div>
      <div class="gameTutorialHand is-hidden"><span class="gameTutorialHandIcon">☝</span></div>
      <section class="gameTutorialCard" data-placement="top" role="dialog" aria-live="polite">
        <div class="gameTutorialEyebrow"></div>
        <h2 class="gameTutorialTitle"></h2>
        <p class="gameTutorialText"></p>
        <div class="gameTutorialActions">
          <button type="button" class="gameTutorialSkip"></button>
          <button type="button" class="gameTutorialNext"></button>
        </div>
      </section>`;
    nextOverlay.querySelector('.gameTutorialEyebrow').textContent = c.eyebrow;
    if (previousOverlay?.isConnected) previousOverlay.replaceWith(nextOverlay);
    else document.querySelector('.screen')?.appendChild(nextOverlay);
    overlay = nextOverlay;
    return overlay;
  }

  function showModal({
    title,
    text,
    button,
    onNext,
    allowSkip = false,
    placement = 'center',
    spot = null,
    compact = false,
  }) {
    pause(true);
    const c = copy();
    const root = baseOverlay(false);
    if (compact) root.classList.add('is-interactive', 'gameTutorialCompactPrompt');
    const card = root.querySelector('.gameTutorialCard');
    card.dataset.placement = placement;
    card.querySelector('.gameTutorialTitle').textContent = title;
    card.querySelector('.gameTutorialText').textContent = text;

    const skip = card.querySelector('.gameTutorialSkip');
    skip.textContent = c.skip;
    skip.hidden = !allowSkip;
    if (allowSkip) skip.addEventListener('click', skipTutorial);

    const next = card.querySelector('.gameTutorialNext');
    next.textContent = button || c.next;
    next.addEventListener('click', onNext);

    if (spot) {
      root.classList.remove('no-spotlight');
      setSpot(spot.x, spot.y, spot.width, spot.height);
    }
  }

  function showGuide({ title, text, placement = 'middle', spot = null, target = null, hand = true }) {
    const root = baseOverlay(true);
    const card = root.querySelector('.gameTutorialCard');
    card.dataset.placement = placement;
    card.querySelector('.gameTutorialTitle').textContent = title;
    card.querySelector('.gameTutorialText').textContent = text;
    card.querySelector('.gameTutorialActions').remove();
    if (spot) setSpot(spot.x, spot.y, spot.width, spot.height);
    if (target) setTarget(target.x, target.y, hand);
  }

  function setSpot(x, y, width, height) {
    if (!overlay) return;
    const px = Math.round(x / 4) * 4;
    const py = Math.round(y / 4) * 4;
    const pw = Math.round(width / 4) * 4;
    const ph = Math.round(height / 4) * 4;
    const key = `${px}:${py}:${pw}:${ph}`;
    if (key === lastSpotKey) return;
    lastSpotKey = key;
    overlay.classList.remove('no-spotlight');
    const spot = overlay.querySelector('.gameTutorialSpotlight');
    if (!spot) return;
    spot.classList.remove('is-hidden');
    Object.assign(spot.style, {
      transform: `translate3d(${px}px, ${py}px, 0)`,
      width: `${pw}px`,
      height: `${ph}px`,
    });
  }

  function setTarget(x, y, showHand = true) {
    if (!overlay) return;
    const px = Math.round(x / 4) * 4;
    const py = Math.round(y / 4) * 4;
    const key = `${px}:${py}:${showHand ? 1 : 0}`;
    if (key === lastTargetKey) return;
    lastTargetKey = key;
    const target = overlay.querySelector('.gameTutorialTarget');
    const hand = overlay.querySelector('.gameTutorialHand');
    target?.classList.remove('is-hidden');
    if (target) {
      target.style.transform = `translate3d(${px - 31}px, ${py - 31}px, 0)`;
    }
    if (hand) {
      hand.classList.toggle('is-hidden', !showHand);
      hand.style.transform = `translate3d(${px + 12}px, ${py + 16}px, 0)`;
    }
  }

  function updateEnemyFocus(enemy, force = false) {
    if (!enemy || enemy.markedForDeletion || !overlay) return;
    const now = performance.now();
    if (!force && now - lastTrackingUpdate < 100) return;
    lastTrackingUpdate = now;
    setTarget(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, true);
  }

  function spawnEnemy({ x, y = -90, speed = 0.55, lives = 4 } = {}) {
    if (!window.Angler1 || !game) return null;
    const enemy = new window.Angler1(game);
    enemy.x = Number.isFinite(x) ? x : game.width / 2 - enemy.width / 2;
    enemy.y = y;
    enemy.speedY = speed;
    enemy.lives = lives;
    enemy.maxLives = lives;
    enemy.isTutorialEnemy = true;
    game.enemies.push(enemy);
    return enemy;
  }

  function beginMovement() {
    pause(false);
    game.tutorialSuppressSpawns = true;
    game.tutorialControlsUpgrades = true;
    game.tutorialInvulnerable = true;
    game.tutorialSuppressFire = true;
    game.enemies.length = 0;
    game.enemyTimer = 0;
    moveTargets = [
      { x: game.width * 0.24, y: game.height * 0.7 },
      { x: game.width * 0.76, y: game.height * 0.58 },
    ];
    moveTargetIndex = 0;
    state = 'movement';
    const c = copy();
    showGuide({ title: c.moveTitle, text: c.moveText, target: moveTargets[0], placement: 'middle' });
  }

  function advanceMovementTarget() {
    moveTargetIndex++;
    if (moveTargetIndex >= moveTargets.length) {
      beginEnemyLesson();
      return;
    }
    const c = copy();
    showGuide({
      title: c.moveAgainTitle,
      text: c.moveAgainText,
      target: moveTargets[moveTargetIndex],
      placement: 'middle',
    });
  }

  function beginEnemyLesson() {
    state = 'enemy';
    game.tutorialSuppressFire = false;
    game.player.projectiles.length = 0;
    scoreAtStepStart = game.score;
    watchedEnemy = spawnEnemy({ x: game.width / 2 - 35, y: -85, speed: 0.52, lives: 3 });
    const c = copy();
    showGuide({ title: c.enemyTitle, text: c.enemyText, placement: 'middle' });
    updateEnemyFocus(watchedEnemy, true);
  }

  function showHudLesson() {
    state = 'hud';
    const c = copy();
    showModal({
      title: c.hudTitle,
      text: c.hudText,
      button: c.next,
      placement: 'bottom',
      spot: { x: 6, y: 6, width: game.width - 12, height: 66 },
      onNext: beginSuperLesson,
    });
  }

  function beginSuperLesson() {
    pause(false);
    state = 'superCharge';
    game.enemies.length = 0;
    const need = game.superAttackReadyGauge || 5;
    game.superAttackGauge = Math.max(0, need - 1);
    game.superGaugeVisual = game.superAttackGauge / need;
    scoreAtStepStart = game.score;
    watchedEnemy = spawnEnemy({
      x: game.width / 2 - 35,
      y: game.height * 0.34,
      speed: 0.22,
      lives: 1,
    });
    spawnEnemy({ x: game.width * 0.12, y: 15, speed: 0.18, lives: 4 });
    spawnEnemy({ x: game.width * 0.72, y: 20, speed: 0.18, lives: 4 });
    const c = copy();
    showGuide({
      title: c.superTitle,
      text: c.superText,
      placement: 'top',
      spot: { x: game.width / 2 - 112, y: game.height - 42, width: 224, height: 32 },
    });
    setTarget(watchedEnemy.x + watchedEnemy.width / 2, watchedEnemy.y + watchedEnemy.height / 2, true);
  }

  function showSuperDemo() {
    if (state === 'superDemo') return;
    state = 'superDemo';
    const c = copy();
    showGuide({
      title: c.superActiveTitle,
      text: c.superActiveText,
      placement: 'middle',
      spot: { x: game.width / 2 - 112, y: game.height - 42, width: 224, height: 32 },
      hand: false,
    });
    clearTimeout(superDemoTimer);
    superDemoTimer = window.setTimeout(beginUpgradeLesson, 1400);
  }

  function beginUpgradeLesson() {
    clearOverlay();
    state = 'upgradePending';
    game.mouse.pressed = false;
    game.enemies.length = 0;
    game.player.projectiles.length = 0;
    game.explosions.length = 0;
    game.clearSuperAttacks?.();
    game.beginUpgradeCards();
  }

  function showUpgradeChoice() {
    state = 'upgradeChoice';
    const c = copy();
    showGuide({
      title: c.upgradeTitle,
      text: c.upgradeText,
      placement: 'top',
      spot: { x: game.width * 0.04, y: game.height * 0.35, width: game.width * 0.92, height: game.height * 0.34 },
      hand: false,
    });
    for (const card of game.upgradeCards) {
      const target = document.createElement('div');
      target.className = 'gameTutorialTarget gameTutorialUpgradeTarget';
      target.innerHTML = '<span></span>';
      target.style.width = `${card.width + 12}px`;
      target.style.height = `${card.height + 12}px`;
      target.style.transform = `translate3d(${card.x - 6}px, ${card.targetY - 6}px, 0)`;
      overlay.appendChild(target);
    }
  }

  function finishScriptedTraining() {
    state = 'normal';
    localStorage.setItem(INTRO_KEY, '1');
    game.tutorialSuppressSpawns = false;
    game.tutorialControlsUpgrades = false;
    game.tutorialInvulnerable = false;
    game.tutorialSuppressFire = false;
    game.enemyTimer = game.enemyInterval;
    pause(false);
    const c = copy();
    showGuide({
      title: c.missionTitle,
      text: c.missionText,
      placement: 'middle',
      spot: { x: game.width - 126, y: 5, width: 120, height: 62 },
      hand: false,
    });
    window.setTimeout(() => {
      if (state === 'normal') clearOverlay();
    }, 3200);
  }

  function showBossIntro(boss) {
    state = 'bossIntro';
    watchedEnemy = boss;
    const c = copy();
    showModal({
      title: c.bossTitle,
      text: c.bossText,
      button: c.fight,
      placement: 'bottom',
      compact: true,
      spot: { x: game.width * 0.1, y: 45, width: game.width * 0.8, height: Math.min(260, game.height * 0.36) },
      onNext: beginBossFightGuide,
    });
  }

  function beginBossFightGuide() {
    pause(false);
    state = 'bossFightGuide';
    const c = copy();
    showGuide({ title: c.bossFightTitle, text: c.bossFightText, placement: 'bottom' });
    updateEnemyFocus(watchedEnemy);
    window.setTimeout(() => {
      if (state !== 'bossFightGuide') return;
      localStorage.setItem(BOSS_KEY, '1');
      state = 'done';
      clearOverlay();
    }, 4200);
  }

  function skipTutorial() {
    localStorage.setItem(INTRO_KEY, '1');
    localStorage.setItem(BOSS_KEY, '1');
    clearTimeout(superDemoTimer);
    clearOverlay();
    if (game) {
      game.tutorialSuppressSpawns = false;
      game.tutorialControlsUpgrades = false;
      game.tutorialInvulnerable = false;
      game.tutorialSuppressFire = false;
    }
    state = 'done';
    pause(false);
  }

  function tick() {
    frameId = requestAnimationFrame(tick);
    if (!game) return;

    if (state === 'movement') {
      const target = moveTargets[moveTargetIndex];
      const px = game.player.x + game.player.width / 2;
      const py = game.player.y + game.player.height / 2;
      if (game.mouse.pressed && Math.hypot(px - target.x, py - target.y) < 55) {
        advanceMovementTarget();
      }
      return;
    }

    if (state === 'enemy') {
      updateEnemyFocus(watchedEnemy);
      if (game.score > scoreAtStepStart) {
        showHudLesson();
      } else if (!watchedEnemy || watchedEnemy.markedForDeletion || watchedEnemy.y > game.height) {
        watchedEnemy = spawnEnemy({ x: game.width / 2 - 35, y: -85, speed: 0.45, lives: 3 });
      }
      return;
    }

    if (state === 'superCharge') {
      if (
        watchedEnemy &&
        !watchedEnemy.markedForDeletion &&
        performance.now() - lastTrackingUpdate >= 100
      ) {
        lastTrackingUpdate = performance.now();
        setTarget(
          watchedEnemy.x + watchedEnemy.width / 2,
          watchedEnemy.y + watchedEnemy.height / 2,
          true
        );
      }
      if (game.superActive || game.superAttacks.length > 0) showSuperDemo();
      return;
    }

    if (state === 'upgradePending') {
      if (game.upgradeCardsShowing && !game.upgradePending) showUpgradeChoice();
      return;
    }

    if (state === 'upgradeChoice') {
      if (!game.upgradeCardsShowing) finishScriptedTraining();
      return;
    }

    if (state === 'normal' && localStorage.getItem(BOSS_KEY) !== '1') {
      const boss = game.enemies.find((enemy) => enemy?.isBoss && !enemy.markedForDeletion && enemy.y >= -20);
      if (boss) showBossIntro(boss);
      return;
    }

    if (state === 'bossFightGuide') updateEnemyFocus(watchedEnemy);
  }

  function initialize(nextGame) {
    game = nextGame;
    window.resetGameTutorial = () => {
      localStorage.removeItem(INTRO_KEY);
      localStorage.removeItem(BOSS_KEY);
    };

    if (localStorage.getItem(INTRO_KEY) === '1') {
      state = localStorage.getItem(BOSS_KEY) === '1' ? 'done' : 'normal';
    } else {
      state = 'welcome';
      const c = copy();
      showModal({
        title: c.welcomeTitle,
        text: c.welcomeText,
        button: c.start,
        allowSkip: true,
        onNext: beginMovement,
      });
    }

    if (frameId === null) frameId = requestAnimationFrame(tick);
  }

  window.addEventListener('orbitvelocity:game-ready', (event) => initialize(event.detail.game));
  if (window.currentOrbitVelocityGame) initialize(window.currentOrbitVelocityGame);
})();
