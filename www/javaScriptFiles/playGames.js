(function () {
  'use strict';

  const META_KEY = 'orbitvelocity.cloudSaveMeta.v1';
  const ACCOUNT_CREATED_KEY = 'orbitvelocity.accountCreatedAt';
  const SAVE_VERSION = 1;
  const SYNC_KEYS = [
    ACCOUNT_CREATED_KEY,
    'coins',
    'maxUnlockedLevel',
    'ownedSkins',
    'equippedSkin',
    'ownedWeapons',
    'equippedWeapon',
    'ownedPets',
    'equippedPet',
    'ownedSupers',
    'equippedSuper',
    'ownedDaily',
  ];
  const ARRAY_KEYS = new Set([
    'ownedSkins',
    'ownedWeapons',
    'ownedPets',
    'ownedSupers',
    'ownedDaily',
  ]);

  let plugin = null;
  let configured = false;
  let signedIn = false;
  let player = null;
  let initialized = false;
  let applyingCloud = false;
  let lastStateHash = '';
  let saveTimer = null;
  let pollTimer = null;
  let saveInFlight = null;

  function getPlugin() {
    return window.Capacitor?.Plugins?.PlayGames || null;
  }

  function readMeta() {
    try {
      return JSON.parse(localStorage.getItem(META_KEY) || '{}');
    } catch (_) {
      return {};
    }
  }

  function writeMeta(updatedAt) {
    localStorage.setItem(META_KEY, JSON.stringify({ updatedAt }));
  }

  function readValue(key) {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    if (ARRAY_KEYS.has(key)) {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (_) {
        return [];
      }
    }
    if (key === ACCOUNT_CREATED_KEY || key === 'coins' || key === 'maxUnlockedLevel') {
      const value = Number(raw);
      return Number.isFinite(value) ? value : 0;
    }
    return raw;
  }

  function captureData() {
    const data = {};
    for (const key of SYNC_KEYS) {
      const value = readValue(key);
      if (value !== null) data[key] = value;
    }
    return data;
  }

  function stateHash(data = captureData()) {
    return JSON.stringify(data);
  }

  function progressRank(data) {
    const maxLevel = Number(data?.maxUnlockedLevel) || 1;
    const coins = Math.max(0, Number(data?.coins) || 0);
    const ownedCount = [...ARRAY_KEYS].reduce(
      (sum, key) => sum + (Array.isArray(data?.[key]) ? data[key].length : 0),
      0
    );
    return maxLevel * 1000000 + ownedCount * 10000 + Math.min(coins, 9999);
  }

  function readArray(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function normalizeId(id) {
    return String(id || '')
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[_-]+/g, '');
  }

  function getLangSafe() {
    return localStorage.getItem('language') || 'en';
  }

  function getAccountCreatedAt() {
    const saved = Number(localStorage.getItem(ACCOUNT_CREATED_KEY));
    if (Number.isFinite(saved) && saved > 0) return saved;
    const createdAt = Date.now();
    localStorage.setItem(ACCOUNT_CREATED_KEY, String(createdAt));
    return createdAt;
  }

  function getAccountAgeDays() {
    const createdAt = getAccountCreatedAt();
    return Math.max(1, Math.floor((Date.now() - createdAt) / 86400000) + 1);
  }

  function setAccountAgeUi() {
    const days = document.getElementById('accountDaysPlayed');
    if (days) days.textContent = String(getAccountAgeDays());
  }

  function tr(key, params = null) {
    return typeof t === 'function' ? t(getLangSafe(), key, params) : key;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[char]);
  }

  function localText() {
    const lang = getLangSafe();
    const labels = {
      en: {
        title: 'ACHIEVEMENTS',
        complete: 'Game Complete',
        inventory: 'Inventory',
        skins: 'Skins',
        weapons: 'Weapons',
        pets: 'Pets',
        supers: 'Supers',
        coins: 'Coins',
        level: 'Highest Level',
        empty: 'Nothing owned yet',
        close: 'CLOSE',
      },
      he: {
        title: 'הישגים',
        complete: 'התקדמות במשחק',
        inventory: 'מלאי',
        skins: 'סקינים',
        weapons: 'נשקים',
        pets: 'חיות',
        supers: 'סופרים',
        coins: 'מטבעות',
        level: 'שלב הכי גבוה',
        empty: 'עוד אין פריטים',
        close: 'סגור',
      },
      es: {
        title: 'LOGROS',
        complete: 'Juego completado',
        inventory: 'Inventario',
        skins: 'Skins',
        weapons: 'Armas',
        pets: 'Mascotas',
        supers: 'Supers',
        coins: 'Monedas',
        level: 'Nivel más alto',
        empty: 'Aún no tienes objetos',
        close: 'CERRAR',
      },
    };
    return labels[lang] || labels.en;
  }

  function itemName(item, fallback) {
    if (!item) return fallback;
    const lang = localStorage.getItem('language') || 'en';
    if (item.nameKey && typeof t === 'function') return t(lang, item.nameKey);
    if (item.titleKey && typeof t === 'function') return t(lang, item.titleKey);
    return item.name || item.title || fallback;
  }

  function getLocalAchievementData() {
    const maxLevel = Math.max(1, Math.min(101, Number(localStorage.getItem('maxUnlockedLevel')) || 1));
    const completedLevels = Math.max(0, Math.min(100, maxLevel - 1));
    const progressPct = Math.round((completedLevels / 100) * 100);

    const allSkins = typeof getAllSkinsArr === 'function'
      ? getAllSkinsArr()
      : (typeof shopData !== 'undefined' ? shopData.skins || [] : []);
    const ownedSkins = new Set(readArray('ownedSkins').map(normalizeId));
    ownedSkins.add('default');

    const weapons = typeof WEAPONS !== 'undefined' ? WEAPONS : {};
    const ownedWeapons = new Set(readArray('ownedWeapons').map(normalizeId));
    ownedWeapons.add('laser');

    const pets = typeof PETS !== 'undefined' ? PETS : {};
    const ownedPets = new Set(readArray('ownedPets').map(normalizeId));

    const supers = typeof SUPERS !== 'undefined' ? SUPERS : {};
    const ownedSupers = new Set(readArray('ownedSupers').map(normalizeId));

    const skinItems = allSkins
      .filter((skin) => ownedSkins.has(normalizeId(skin.id)))
      .map((skin) => itemName(skin, skin.id));
    const lockedSkinItems = allSkins
      .filter((skin) => !ownedSkins.has(normalizeId(skin.id)))
      .map((skin) => itemName(skin, skin.id));
    const weaponItems = Object.entries(weapons)
      .filter(([id]) => ownedWeapons.has(normalizeId(id)))
      .map(([id, weapon]) => itemName(weapon, id));
    const lockedWeaponItems = Object.entries(weapons)
      .filter(([id]) => !ownedWeapons.has(normalizeId(id)))
      .map(([id, weapon]) => itemName(weapon, id));
    const petItems = Object.entries(pets)
      .filter(([id]) => ownedPets.has(normalizeId(id)))
      .map(([id, pet]) => itemName(pet, id));
    const lockedPetItems = Object.entries(pets)
      .filter(([id]) => !ownedPets.has(normalizeId(id)))
      .map(([id, pet]) => itemName(pet, id));
    const superItems = Object.entries(supers)
      .filter(([id, superItem]) => ownedSupers.has(normalizeId(id)) || (superItem.price ?? 1) === 0)
      .map(([id, superItem]) => itemName(superItem, id));
    const lockedSuperItems = Object.entries(supers)
      .filter(([id, superItem]) => !ownedSupers.has(normalizeId(id)) && (superItem.price ?? 1) !== 0)
      .map(([id, superItem]) => itemName(superItem, id));

    const equippedSkinId = normalizeId(localStorage.getItem('equippedSkin') || 'default');
    const equippedWeaponId = localStorage.getItem('equippedWeapon') || 'laser';
    const equippedPetId = localStorage.getItem('equippedPet') || '';
    const equippedSuperId = localStorage.getItem('equippedSuper') || '';
    const equippedSkin = allSkins.find((skin) => normalizeId(skin.id) === equippedSkinId);
    const totalOwned = skinItems.length + weaponItems.length + petItems.length + superItems.length;
    const totalItems = allSkins.length + Object.keys(weapons).length + Object.keys(pets).length + Object.keys(supers).length;

    return {
      progressPct,
      completedLevels,
      maxLevel,
      coins: Number(localStorage.getItem('coins')) || 0,
      signedIn,
      totalOwned,
      totalItems,
      equipped: [
        { label: tr('achievements.skins'), value: itemName(equippedSkin, equippedSkinId || 'default') },
        { label: tr('achievements.weapons'), value: itemName(weapons[equippedWeaponId], equippedWeaponId) },
        { label: tr('achievements.pets'), value: equippedPetId ? itemName(pets[equippedPetId], equippedPetId) : tr('achievements.none') },
        { label: tr('achievements.supers'), value: equippedSuperId ? itemName(supers[equippedSuperId], equippedSuperId) : tr('achievements.none') },
      ],
      groups: [
        { key: 'skins', owned: skinItems.length, total: allSkins.length, items: skinItems, locked: lockedSkinItems },
        { key: 'weapons', owned: weaponItems.length, total: Object.keys(weapons).length, items: weaponItems, locked: lockedWeaponItems },
        { key: 'pets', owned: petItems.length, total: Object.keys(pets).length, items: petItems, locked: lockedPetItems },
        { key: 'supers', owned: superItems.length, total: Object.keys(supers).length, items: superItems, locked: lockedSuperItems },
      ],
    };
  }

  function ensureLocalAchievementsDialog() {
    let modal = document.getElementById('localAchievementsModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'localAchievementsModal';
    modal.className = 'localAchievementsModal hidden';
    modal.innerHTML = `
      <div class="localAchievementsPanel" role="dialog" aria-modal="true" aria-labelledby="localAchievementsTitle">
        <button id="localAchievementsClose" class="localAchievementsClose" type="button" aria-label="Close">×</button>
        <h2 id="localAchievementsTitle"></h2>
        <div class="localAchievementsProgress">
          <div class="localAchievementsPercent"></div>
          <div class="localAchievementsBar"><span></span></div>
          <div class="localAchievementsMeta"></div>
        </div>
        <div class="localAchievementsInventory"></div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.classList.add('hidden');
    });
    modal.querySelector('#localAchievementsClose')?.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    return modal;
  }

  function renderLocalAchievementsLegacy() {
    const text = localText();
    const data = getLocalAchievementData();
    const modal = ensureLocalAchievementsDialog();
    const panel = modal.querySelector('.localAchievementsPanel');
    const dir = (localStorage.getItem('language') || 'en') === 'he' ? 'rtl' : 'ltr';

    modal.dir = dir;
    modal.querySelector('#localAchievementsTitle').textContent = text.title;
    modal.querySelector('.localAchievementsPercent').textContent = `${data.progressPct}% ${text.complete}`;
    modal.querySelector('.localAchievementsBar span').style.width = `${data.progressPct}%`;
    modal.querySelector('.localAchievementsMeta').textContent =
      `${text.level}: ${Math.min(data.maxLevel, 100)} / 100  •  ${text.coins}: ${data.coins}`;

    const inventory = modal.querySelector('.localAchievementsInventory');
    inventory.innerHTML = '';
    for (const group of data.groups) {
      const section = document.createElement('section');
      section.className = 'localAchievementsGroup';
      const names = group.items.length ? group.items.join(', ') : text.empty;
      section.innerHTML = `
        <h3>${text[group.key]} <span>${group.owned}/${group.total}</span></h3>
        <p>${names}</p>
      `;
      inventory.appendChild(section);
    }

    modal.classList.remove('hidden');
    panel?.focus?.();
  }

  function renderLocalAchievements() {
    const data = getLocalAchievementData();
    const modal = ensureLocalAchievementsDialog();
    const panel = modal.querySelector('.localAchievementsPanel');
    const dir = ['he', 'ar'].includes(getLangSafe()) ? 'rtl' : 'ltr';

    modal.dir = dir;
    panel.innerHTML = `
      <header class="localAchievementsHeader">
        <button id="localAchievementsClose" class="localAchievementsClose" type="button" aria-label="${escapeHtml(tr('ui.close'))}">×</button>
        <p class="localAchievementsEyebrow">${escapeHtml(tr('achievements.eyebrow'))}</p>
        <h2 id="localAchievementsTitle">${escapeHtml(tr('profile.achievements'))}</h2>
        <p class="localAchievementsSubtitle">${escapeHtml(tr('achievements.subtitle'))}</p>
      </header>
      <div class="localAchievementsHero">
        <div class="localAchievementsProgress">
          <div class="localAchievementsPercent">${escapeHtml(tr('achievements.percentComplete', { percent: data.progressPct }))}</div>
          <div class="localAchievementsBar"><span style="width: ${data.progressPct}%"></span></div>
          <div class="localAchievementsMeta">${escapeHtml(tr('achievements.levelMeta', {
            current: Math.min(data.maxLevel, 100),
            completed: data.completedLevels,
            total: 100,
          }))}</div>
        </div>
        <div class="localAchievementsStats">
          ${[
            [tr('achievements.highestLevel'), Math.min(data.maxLevel, 100)],
            [tr('achievements.coins'), data.coins],
            [tr('achievements.inventoryOwned'), `${data.totalOwned}/${data.totalItems}`],
            [tr('achievements.cloudStatus'), data.signedIn ? tr('achievements.connected') : tr('achievements.offlineReady')],
          ].map(([label, value]) => `
            <div class="localAchievementsStat">
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(value)}</strong>
            </div>
          `).join('')}
        </div>
      </div>
      <section class="localAchievementsEquipped">
        <h3>${escapeHtml(tr('achievements.equippedTitle'))}</h3>
        <div class="localAchievementsEquippedGrid">
          ${data.equipped.map((item) => `
            <div class="localAchievementsEquippedItem">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
            </div>
          `).join('')}
        </div>
      </section>
      <div class="localAchievementsInventory"></div>
    `;
    const backButton = panel.querySelector('#localAchievementsClose');
    if (backButton) {
      backButton.textContent = '‹';
      backButton.setAttribute('aria-label', tr('ui.close'));
    }
    backButton?.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    const inventory = panel.querySelector('.localAchievementsInventory');
    for (const group of data.groups) {
      const section = document.createElement('section');
      const pct = group.total ? Math.round((group.owned / group.total) * 100) : 0;
      const names = group.items.length ? group.items.join(', ') : tr('achievements.emptyOwned');
      const locked = group.locked.length ? group.locked.join(', ') : tr('achievements.allUnlocked');
      section.className = 'localAchievementsGroup';
      section.innerHTML = `
        <div class="localAchievementsGroupTop">
          <h3>${escapeHtml(tr(`achievements.${group.key}`))}</h3>
          <strong>${group.owned}/${group.total}</strong>
        </div>
        <div class="localAchievementsMiniBar"><span style="width: ${pct}%"></span></div>
        <div class="localAchievementsListBlock">
          <span>${escapeHtml(tr('achievements.ownedItems'))}</span>
          <p>${escapeHtml(names)}</p>
        </div>
        <div class="localAchievementsListBlock locked">
          <span>${escapeHtml(tr('achievements.lockedItems'))}</span>
          <p>${escapeHtml(locked)}</p>
        </div>
      `;
      inventory.appendChild(section);
    }

    modal.classList.remove('hidden');
    panel.focus?.();
  }

  function applyData(data) {
    if (!data || typeof data !== 'object') return;
    applyingCloud = true;
    for (const key of SYNC_KEYS) {
      if (!Object.hasOwn(data, key)) continue;
      const value = data[key];
      if (key === ACCOUNT_CREATED_KEY) {
        const incoming = Number(value);
        if (!Number.isFinite(incoming) || incoming <= 0) continue;
        const current = getAccountCreatedAt();
        localStorage.setItem(key, String(Math.min(current, incoming)));
      } else {
        localStorage.setItem(key, ARRAY_KEYS.has(key) ? JSON.stringify(value || []) : String(value));
      }
    }
    applyingCloud = false;
    lastStateHash = stateHash();
    setAccountAgeUi();
    window.dispatchEvent(new CustomEvent('orbitvelocity:cloud-restored', { detail: data }));
  }

  function setProfileUi() {
    const lang = localStorage.getItem('language') || 'en';
    const labels = {
      en: { guest: 'Guest', setup: 'SETUP NEEDED', connected: 'PLAY GAMES CONNECTED', connect: 'CONNECT PLAY GAMES' },
      he: { guest: 'אורח', setup: 'נדרשת הגדרה', connected: 'PLAY GAMES מחובר', connect: 'התחבר ל־PLAY GAMES' },
      es: { guest: 'Invitado', setup: 'CONFIGURAR', connected: 'PLAY GAMES CONECTADO', connect: 'CONECTAR PLAY GAMES' },
    };
    const text = labels[lang] || labels.en;
    const name = document.getElementById('playGamesPlayerName');
    const account = document.getElementById('playGamesAccountBtn');
    const achievements = document.getElementById('playGamesAchievementsBtn');
    if (name) name.textContent = player?.displayName || text.guest;
    setAccountAgeUi();
    if (account) {
      const label = account.querySelector('.playGamesLoginLabel') || account;
      label.textContent = !configured ? text.setup : signedIn ? text.connected : text.connect;
      account.disabled = signedIn || !configured;
    }
    if (achievements) achievements.disabled = false;
  }

  async function saveNow() {
    clearTimeout(saveTimer);
    saveTimer = null;
    if (!plugin || !configured || !signedIn || applyingCloud) return false;
    if (saveInFlight) return saveInFlight;

    let updatedAt = Number(readMeta().updatedAt) || Date.now();
    writeMeta(updatedAt);
    const payload = {
      version: SAVE_VERSION,
      updatedAt,
      data: captureData(),
    };

    saveInFlight = plugin.saveGame({ data: JSON.stringify(payload) })
      .then(() => {
        lastStateHash = stateHash(payload.data);
        window.dispatchEvent(new CustomEvent('orbitvelocity:cloud-saved'));
        return true;
      })
      .catch((error) => {
        console.warn('Play Games cloud save failed.', error);
        return false;
      })
      .finally(() => {
        saveInFlight = null;
      });
    return saveInFlight;
  }

  function scheduleSave(delay = 2200) {
    if (!signedIn || applyingCloud) return;
    clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveNow, delay);
  }

  function markDirty() {
    if (applyingCloud) return;
    writeMeta(Date.now());
    scheduleSave();
  }

  async function restoreOrCreateCloudSave() {
    if (!plugin || !signedIn) return;
    let remote = null;
    try {
      const result = await plugin.loadGame();
      if (result?.found && result.data) remote = JSON.parse(result.data);
    } catch (error) {
      console.warn('Play Games cloud load failed.', error);
    }

    const localData = captureData();
    const localUpdatedAt = Number(readMeta().updatedAt) || 0;
    if (!remote?.data) {
      if (!localUpdatedAt) writeMeta(Date.now());
      await saveNow();
      return;
    }

    const remoteUpdatedAt = Number(remote.updatedAt) || 0;
    const shouldRestore = localUpdatedAt
      ? remoteUpdatedAt > localUpdatedAt
      : progressRank(remote.data) > progressRank(localData);

    if (shouldRestore) {
      applyData(remote.data);
      writeMeta(remoteUpdatedAt || Date.now());
      if (!sessionStorage.getItem('orbitvelocity.cloudReloaded')) {
        sessionStorage.setItem('orbitvelocity.cloudReloaded', '1');
        window.location.reload();
      }
    } else if (localUpdatedAt > remoteUpdatedAt || progressRank(localData) > progressRank(remote.data)) {
      await saveNow();
    }
  }

  async function connect(interactive = false) {
    if (!plugin || !configured) return null;
    try {
      const result = await plugin.signIn({ interactive });
      signedIn = Boolean(result?.signedIn);
      player = signedIn ? result : null;
      setProfileUi();
      if (signedIn) await restoreOrCreateCloudSave();
      return player;
    } catch (error) {
      console.warn('Play Games connection failed.', error);
      signedIn = false;
      player = null;
      setProfileUi();
      return null;
    }
  }

  async function unlockAchievement(achievementId) {
    if (!plugin || !signedIn || !achievementId) return false;
    try {
      await plugin.unlockAchievement({ achievementId });
      return true;
    } catch (error) {
      console.warn('Achievement could not be unlocked.', error);
      return false;
    }
  }

  function recordLevelComplete(level) {
    const ids = window.ORBIT_VELOCITY_PLAY_GAMES?.achievementIds || {};
    const tasks = [];
    if (level >= 1 && ids.firstVictory) tasks.push(unlockAchievement(ids.firstVictory));
    if (level >= 10 && ids.level10) tasks.push(unlockAchievement(ids.level10));
    if (level >= 50 && ids.level50) tasks.push(unlockAchievement(ids.level50));
    if (level >= 100 && ids.finalBoss) tasks.push(unlockAchievement(ids.finalBoss));
    markDirty();
    scheduleSave(500);
    return Promise.all(tasks);
  }

  async function showAchievements() {
    renderLocalAchievements();
    return true;
  }

  function bindUi() {
    document.getElementById('playGamesAccountBtn')?.addEventListener('click', () => connect(true));
    document.getElementById('playGamesAchievementsBtn')?.addEventListener('click', showAchievements);
    setProfileUi();
  }

  async function initialize() {
    if (initialized) return;
    initialized = true;
    plugin = getPlugin();
    bindUi();
    lastStateHash = stateHash();
    if (!plugin) return;

    try {
      const status = await plugin.getStatus();
      configured = Boolean(status?.configured);
      signedIn = Boolean(status?.signedIn);
      setProfileUi();
      if (configured) await connect(false);
    } catch (error) {
      console.warn('Play Games initialization skipped.', error);
    }

    clearInterval(pollTimer);
    pollTimer = window.setInterval(() => {
      const nextHash = stateHash();
      if (nextHash === lastStateHash || applyingCloud) return;
      lastStateHash = nextHash;
      markDirty();
    }, 1500);
  }

  window.OrbitVelocityCloud = {
    initialize,
    connect: () => connect(true),
    saveNow,
    markDirty,
    unlockAchievement,
    recordLevelComplete,
    showAchievements,
    getPlayer: () => player,
    isSignedIn: () => signedIn,
    isConfigured: () => configured,
  };

  window.addEventListener('DOMContentLoaded', initialize, { once: true });
  window.addEventListener('pagehide', () => {
    if (signedIn) void saveNow();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && signedIn) void saveNow();
  });
})();
