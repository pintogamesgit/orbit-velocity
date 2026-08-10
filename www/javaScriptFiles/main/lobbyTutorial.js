(function () {
  'use strict';

  const STORAGE_KEY = 'orbitvelocity.lobbyTutorialCompleted.v3';
  const COPY = {
    en: {
      eyebrow: 'PILOT TRAINING', skip: 'SKIP', next: 'BEGIN TOUR', tap: 'TAP THE HIGHLIGHTED BUTTON',
      steps: [
        ['Welcome, pilot!', 'Follow the highlighted controls. You will press each button yourself while learning the lobby.'],
        ['Open the shop', 'Tap the highlighted SHOP button to view skins, items, and special offers.'],
        ['Open your loadout', 'Tap the highlighted LOADOUT button to choose your weapon, pet, and super ability.'],
        ['Open the inventory', 'Tap the highlighted INVENTORY button to see and equip everything you own.'],
        ['Return home', 'Tap the highlighted battle icon in the bottom bar to return to the main lobby.'],
        ['Open settings', 'Tap the highlighted settings button to open music, sound, and language options.'],
        ['Close settings', 'Tap the settings button again to close the panel.'],
        ['Choose a mission', 'Tap the large BATTLE button to open the level map. Your pilot training is complete!'],
      ],
    },
    he: {
      eyebrow: 'אימון טייסים', skip: 'דלג', next: 'התחל מדריך', tap: 'לחצו על הכפתור המסומן',
      steps: [
        ['ברוכים הבאים, טייסים!', 'עקבו אחרי הכפתורים המסומנים. אתם תלחצו בעצמכם על כל כפתור ותכירו את הלובי.'],
        ['פתחו את החנות', 'לחצו על כפתור החנות המסומן כדי לראות סקינים, פריטים והצעות מיוחדות.'],
        ['פתחו את הציוד', 'לחצו על כפתור ה־Loadout המסומן כדי לבחור נשק, חיית מחמד ומתקפת סופר.'],
        ['פתחו את המלאי', 'לחצו על כפתור המלאי המסומן כדי לראות ולצייד את כל מה שאספתם.'],
        ['חזרו למסך הבית', 'לחצו על סמל הקרב המסומן בסרגל התחתון כדי לחזור ללובי הראשי.'],
        ['פתחו את ההגדרות', 'לחצו על כפתור ההגדרות המסומן כדי לפתוח אפשרויות מוזיקה, צלילים ושפה.'],
        ['סגרו את ההגדרות', 'לחצו שוב על כפתור ההגדרות כדי לסגור את החלון.'],
        ['בחרו משימה', 'לחצו על כפתור BATTLE הגדול כדי לפתוח את מפת השלבים. אימון הטייסים הושלם!'],
      ],
    },
    es: {
      eyebrow: 'ENTRENAMIENTO DE PILOTO', skip: 'SALTAR', next: 'INICIAR GUÍA', tap: 'PULSA EL BOTÓN MARCADO',
      steps: [
        ['¡Bienvenido, piloto!', 'Sigue los controles resaltados. Pulsarás cada botón para conocer el lobby.'],
        ['Abre la tienda', 'Pulsa el botón TIENDA resaltado para ver skins, objetos y ofertas especiales.'],
        ['Abre tu equipamiento', 'Pulsa LOADOUT para elegir tu arma, mascota y habilidad súper.'],
        ['Abre el inventario', 'Pulsa INVENTARIO para ver y equipar todo lo que tienes.'],
        ['Vuelve al inicio', 'Pulsa el icono de batalla resaltado en la barra inferior para volver al lobby.'],
        ['Abre los ajustes', 'Pulsa el botón de ajustes para ver las opciones de música, sonido e idioma.'],
        ['Cierra los ajustes', 'Pulsa otra vez el botón de ajustes para cerrar el panel.'],
        ['Elige una misión', 'Pulsa el botón BATTLE grande para abrir el mapa. ¡Entrenamiento completado!'],
      ],
    },
  };

  const TARGETS = [
    null,
    '.bottomButton[data-target="shopScreen"]',
    '.bottomButton[data-target="loadoutScreen"]',
    '.bottomButton[data-target="inventoryScreen"]',
    '#battle',
    '#settingsBtn',
    '#settingsBtn',
    '#startGameBtn',
  ];

  let overlay;
  let card;
  let spotlight;
  let targetProxy;
  let currentStep = 0;
  let copy;
  let activeTarget = null;
  let advancing = false;
  let positionFrame = null;
  let positionUntil = 0;

  function completeTutorial() {
    localStorage.setItem(STORAGE_KEY, '1');
    window.removeEventListener('resize', positionTutorial);
    window.removeEventListener('orientationchange', positionTutorial);
    document.removeEventListener('keydown', handleKeydown);
    if (positionFrame !== null) cancelAnimationFrame(positionFrame);
    positionFrame = null;
    overlay?.remove();
    overlay = null;
  }

  function handleKeydown(event) {
    const isFinalStep = currentStep === copy.steps.length - 1;
    if (event.key === 'Escape' && !isFinalStep) completeTutorial();
    if (event.key === 'Enter' && currentStep === 0) advanceWelcome();
  }

  function advanceWelcome() {
    if (currentStep !== 0 || advancing) return;
    currentStep = 1;
    renderStep(120);
  }

  function activateTarget() {
    if (!activeTarget || advancing || currentStep === 0) return;
    advancing = true;
    targetProxy.style.pointerEvents = 'none';
    activeTarget.click();

    if (currentStep >= copy.steps.length - 1) {
      window.setTimeout(completeTutorial, 180);
      return;
    }

    const clickedStep = currentStep;
    currentStep++;
    const pageChange = clickedStep >= 1 && clickedStep <= 4;
    renderStep(pageChange ? 620 : 320);
  }

  function getFrameBounds() {
    const frame = document.querySelector('.phone-frame');
    const rect = frame?.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) {
      return { left: 0, top: 0, right: innerWidth, bottom: innerHeight, width: innerWidth, height: innerHeight };
    }
    return rect;
  }

  function schedulePositioning(duration = 0) {
    positionUntil = Math.max(positionUntil, performance.now() + duration);
    if (positionFrame !== null) return;

    const updatePosition = (now) => {
      positionFrame = null;
      positionTutorial();
      if (now < positionUntil) positionFrame = requestAnimationFrame(updatePosition);
    };

    positionFrame = requestAnimationFrame(updatePosition);
  }

  function positionTutorial() {
    if (!overlay || !card || !spotlight || !targetProxy) return;
    const selector = TARGETS[currentStep];
    activeTarget = selector ? document.querySelector(selector) : null;
    const bounds = getFrameBounds();
    const margin = 12;

    if (!activeTarget) {
      spotlight.classList.remove('is-visible');
      targetProxy.classList.remove('is-visible');
      overlay.style.background = 'rgba(0, 3, 14, 0.84)';
      card.dataset.placement = 'center';
      const welcomeOffsetX = 24;
      const cardHalfWidth = card.offsetWidth / 2;
      const welcomeCenterX = Math.max(
        margin + cardHalfWidth,
        Math.min(bounds.width - margin - cardHalfWidth, bounds.width / 2 - welcomeOffsetX)
      );
      card.style.left = `${welcomeCenterX}px`;
      card.style.top = `${bounds.height / 2}px`;
      card.style.setProperty('--tutorial-card-position', 'translate(-50%, -50%)');
      advancing = false;
      return;
    }

    const rect = activeTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const isTargetInFrame =
      rect.right > bounds.left + 3 &&
      rect.left < bounds.right - 3 &&
      rect.bottom > bounds.top + 3 &&
      rect.top < bounds.bottom - 3;
    if (!isTargetInFrame) {
      spotlight.classList.remove('is-visible');
      targetProxy.classList.remove('is-visible');
      return;
    }
    overlay.style.background = 'transparent';
    const pad = 9;
    const spotLeft = Math.max(3, rect.left - bounds.left - pad);
    const spotTop = Math.max(3, rect.top - bounds.top - pad);
    const spotRight = Math.min(bounds.width - 3, rect.right - bounds.left + pad);
    const spotBottom = Math.min(bounds.height - 3, rect.bottom - bounds.top + pad);

    [spotlight, targetProxy].forEach((element) => {
      element.classList.add('is-visible');
      element.style.left = `${spotLeft}px`;
      element.style.top = `${spotTop}px`;
      element.style.width = `${Math.max(1, spotRight - spotLeft)}px`;
      element.style.height = `${Math.max(1, spotBottom - spotTop)}px`;
      element.style.borderRadius = `${Math.min(22, Math.max(12, rect.height * 0.28))}px`;
    });

    card.style.setProperty('--tutorial-card-position', 'translate(0, 0)');
    const maxCardWidth = Math.max(240, bounds.width - margin * 2);
    card.style.width = `${Math.min(330, maxCardWidth)}px`;
    const cardW = card.offsetWidth;
    const cardH = card.offsetHeight;
    const centerX = rect.left - bounds.left + rect.width / 2;
    const minLeft = margin;
    const maxLeft = bounds.width - cardW - margin;
    const left = Math.max(minLeft, Math.min(maxLeft, centerX - cardW / 2));
    const belowY = spotBottom + 18;
    const aboveY = spotTop - cardH - 18;
    const canFitBelow = belowY + cardH <= bounds.height - margin;
    let top = canFitBelow ? belowY : aboveY;
    top = Math.max(margin, Math.min(bounds.height - cardH - margin, top));

    card.dataset.placement = canFitBelow ? 'below' : 'above';
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    targetProxy.style.pointerEvents = 'auto';
    advancing = false;
  }

  function renderStep(transitionDuration = 0) {
    const [title, text] = copy.steps[currentStep];
    card.querySelector('.tutorialTitle').textContent = title;
    card.querySelector('.tutorialText').textContent = text;
    card.querySelector('.tutorialNext').classList.toggle('is-hidden', currentStep !== 0);
    card.querySelector('.tutorialSkip').classList.toggle(
      'is-hidden',
      currentStep === copy.steps.length - 1
    );
    card.querySelector('.tutorialTapHint').classList.toggle('is-hidden', currentStep === 0);
    card.querySelector('.tutorialProgress').innerHTML = copy.steps
      .map((_, index) => `<span class="${index === currentStep ? 'active' : ''}"></span>`)
      .join('');
    schedulePositioning(transitionDuration);
  }

  function startTutorial() {
    if (localStorage.getItem(STORAGE_KEY) === '1') return;
    const lang = localStorage.getItem('language') || 'en';
    copy = COPY[lang] || COPY.en;
    overlay = document.createElement('div');
    overlay.className = 'lobbyTutorialOverlay';
    overlay.setAttribute('data-no-page-swipe', '');
    overlay.dir = lang === 'he' ? 'rtl' : 'ltr';
    overlay.innerHTML = `
      <div class="tutorialSpotlight"></div>
      <button type="button" class="tutorialTargetProxy" aria-label="${copy.tap}"></button>
      <section class="tutorialCard" data-placement="center" role="dialog" aria-modal="true">
        <div class="tutorialEyebrow">${copy.eyebrow}</div>
        <h2 class="tutorialTitle"></h2>
        <p class="tutorialText"></p>
        <div class="tutorialTapHint is-hidden"><span></span>${copy.tap}</div>
        <div class="tutorialProgress" aria-hidden="true"></div>
        <div class="tutorialActions">
          <button type="button" class="tutorialSkip">${copy.skip}</button>
          <button type="button" class="tutorialNext">${copy.next}</button>
        </div>
      </section>`;

    const frame = document.querySelector('.phone-frame');
    if (!frame) return;
    frame.appendChild(overlay);
    card = overlay.querySelector('.tutorialCard');
    spotlight = overlay.querySelector('.tutorialSpotlight');
    targetProxy = overlay.querySelector('.tutorialTargetProxy');
    card.querySelector('.tutorialSkip').addEventListener('click', completeTutorial);
    card.querySelector('.tutorialNext').addEventListener('click', advanceWelcome);
    targetProxy.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      activateTarget();
    });
    overlay.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
    window.addEventListener('resize', positionTutorial);
    window.addEventListener('orientationchange', positionTutorial);
    document.addEventListener('keydown', handleKeydown);
    document.fonts?.ready?.then(() => positionTutorial());
    renderStep();
  }

  window.resetLobbyTutorial = () => localStorage.removeItem(STORAGE_KEY);
  document.addEventListener('DOMContentLoaded', () => window.setTimeout(startTutorial, 350));
})();
