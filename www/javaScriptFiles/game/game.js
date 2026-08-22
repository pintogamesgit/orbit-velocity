const ENEMY_SPAWN_TABLE = window.ENEMY_SPAWN_TABLE;

document.addEventListener(
  'touchmove',
  (e) => {
    if (e.scale && e.scale !== 1) e.preventDefault();
  },
  { passive: false }
);

let lastTouchEnd = 0;
document.addEventListener(
  'touchend',
  (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  },
  { passive: false }
);

const params = new URLSearchParams(window.location.search);
const isInfinityMode = params.get('mode') === 'infinity';
const currentLevel = isInfinityMode ? 101 : parseInt(params.get('level')) || 1;
const GAME_PERFORMANCE_MODE_KEY = 'orbitvelocity.performance.mode';
const GAME_PERFORMANCE_AUTO_TIER_KEY = 'orbitvelocity.performance.autoTier';

function normalizeGamePerformanceTier(value) {
  if (value === 'high') return 'strong';
  if (value === 'mid') return 'medium';
  if (value === 'low' || value === 'medium' || value === 'strong') return value;
  return 'strong';
}

function getGamePerformanceTier() {
  const manual = localStorage.getItem(GAME_PERFORMANCE_MODE_KEY);
  if (manual === 'low' || manual === 'medium' || manual === 'strong') {
    return manual;
  }

  return normalizeGamePerformanceTier(
    localStorage.getItem(GAME_PERFORMANCE_AUTO_TIER_KEY)
  );
}

const GAME_PERFORMANCE_TIER = getGamePerformanceTier();
const GAME_PERFORMANCE_PROFILE =
  GAME_PERFORMANCE_TIER === 'low'
    ? {
        tier: 'low',
        renderScale: 0.72,
        minRenderScale: 0.62,
        starCount: 0,
        starSpeed: 0,
        spriteAnimScale: 0.58,
        particleScale: 0.45,
        effectsAlpha: 0.62,
        scanlines: false,
      }
    : GAME_PERFORMANCE_TIER === 'medium'
      ? {
          tier: 'medium',
          renderScale: 0.86,
          minRenderScale: 0.74,
          starCount: 36,
          starSpeed: 0.55,
          spriteAnimScale: 0.78,
          particleScale: 0.7,
          effectsAlpha: 0.82,
          scanlines: false,
        }
      : {
          tier: 'strong',
          renderScale: 1,
          minRenderScale: 0.82,
          starCount: 160,
          starSpeed: 1.2,
          spriteAnimScale: 1,
          particleScale: 1,
          effectsAlpha: 1,
          scanlines: true,
        };

window.OrbitVelocityGamePerf = GAME_PERFORMANCE_PROFILE;

function getSpriteAnimationDelta(deltaTime) {
  return deltaTime * (window.OrbitVelocityGamePerf?.spriteAnimScale ?? 1);
}

document.addEventListener('DOMContentLoaded', () => {
  initPageLanguage?.();
});

function gameT(key, params = null) {
  return t?.(getLang?.() || 'en', key, params) ?? key;
}

const LEVELS = {
  1: {
    maxOnScreen: 4,
    spawnMs: 1200,
    pool: ['Enemy1'],
    speedMul: 1.0,
    hpMul: 1.0,
  },
  2: {
    maxOnScreen: 5,
    spawnMs: 1100,
    pool: ['Enemy1', 'Enemy2'],
    speedMul: 1.05,
    hpMul: 1.0,
  },
  3: {
    maxOnScreen: 6,
    spawnMs: 1000,
    pool: ['Enemy1', 'Enemy2'],
    speedMul: 1.1,
    hpMul: 1.05,
  },
  4: {
    maxOnScreen: 7,
    spawnMs: 900,
    pool: ['Enemy1', 'Enemy2', 'Enemy3'],
    speedMul: 1.15,
    hpMul: 1.1,
  },
};

function getLevelCfg(level) {
  return (
    LEVELS[level] || {
      maxOnScreen: 8,
      spawnMs: Math.max(650, 900 - level * 35),
      pool: ['Enemy1', 'Enemy2', 'Enemy3'],
      speedMul: 1 + level * 0.03,
      hpMul: 1 + level * 0.02,
    }
  );
}

function getOwnedSkinsRewardSet() {
  return new Set(
    JSON.parse(localStorage.getItem('ownedSkins') || '[]').map((x) =>
      String(x || '')
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[_-]+/g, '')
    )
  );
}

function saveOwnedSkinsRewardSet(set) {
  localStorage.setItem('ownedSkins', JSON.stringify([...set]));
}

function unlockSkinReward(id) {
  const n = String(id || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '');
  if (!n) return false;

  const owned = getOwnedSkinsRewardSet();
  if (owned.has(n)) return false;

  owned.add(n);
  saveOwnedSkinsRewardSet(owned);
  return true;
}

function getRewardSkinData(id) {
  const n = String(id || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '');

  if (n === 'starbreaker') {
    return {
      id: 'star_breaker',
      name: dataT?.('skins', 'star_breaker', 'name') || 'Star Breaker',
      image: './images/shopAInventoryicons/playerIcones/starBreakerIcone.png',
    };
  }

  return null;
}

function showSkinRewardPopup(id, onCollect = null) {
  const popup = document.getElementById('skinRewardPopup');
  const img = document.getElementById('skinRewardImg');
  const name = document.getElementById('skinRewardName');
  const btn = document.getElementById('skinRewardCollectBtn');

  if (!popup || !img || !name || !btn) return;

  const skin = getRewardSkinData(id);
  if (!skin) return;

  img.src = skin.image;
  name.textContent = skin.name;

  popup.classList.remove('hidden');

  btn.onclick = () => {
    popup.classList.add('hidden');
    if (typeof onCollect === 'function') onCollect();
  };
}

function getEquippedPet() {
  const pet = localStorage.getItem('equippedPet');
  return pet && pet !== '' ? pet : null;
}

const STORAGE_KEY_MAX_LEVEL = 'maxUnlockedLevel';

function getMaxUnlockedLevel() {
  return Number(localStorage.getItem(STORAGE_KEY_MAX_LEVEL)) || 1;
}

function unlockNextLevel(currentLevel) {
  const maxLevel = getMaxUnlockedLevel();

  if (currentLevel >= maxLevel) {
    localStorage.setItem(STORAGE_KEY_MAX_LEVEL, currentLevel + 1);
    window.OrbitVelocityCloud?.markDirty?.();
  }
}

const SKIN_TO_PLAYER_IMG_ID = {
  default: 'player',
  redclassic: 'playerRedClassic',
  darkreaper: { imgId: 'playerDarkReaper', frameY: 0 },
  celestialsakura: { imgId: 'playerCelestialSakura', frameY: 1 },
  goldencore: { imgId: 'playerGoldenCore', frameY: 1 },
  starbreaker: { imgId: 'playerStarBreaker', frameY: 0 },
};

const DEFAULT_SKIN = 'default';
const STORAGE_KEY_EQUIPPED_SKIN = 'equippedSkin';

const ALLOWED_SKINS = new Set([
  'default',
  'redclassic',
  'darkreaper',
  'celestialsakura',
  'goldencore',
  'starbreaker',
]);

const SKIN_ALIASES = {
  default: 'default',
  redclassic: 'redclassic',
  darkreaper: 'darkreaper',
  celestialsakura: 'celestialsakura',
  goldencore: 'goldencore',
  godencore: 'goldencore',
  starbreaker: 'starbreaker',
  star_breaker: 'starbreaker',
};

function resolveSkinId(raw) {
  const n = normalizeSkinId(raw);
  return SKIN_ALIASES[n] || DEFAULT_SKIN;
}

function normalizeSkinId(id) {
  return String(id || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '');
}

function getEquippedSkin() {
  const raw = localStorage.getItem(STORAGE_KEY_EQUIPPED_SKIN) || DEFAULT_SKIN;
  const resolved = resolveSkinId(raw);
  return ALLOWED_SKINS.has(resolved) ? resolved : DEFAULT_SKIN;
}

function setEquippedSkin(id) {
  const resolved = resolveSkinId(id);
  localStorage.setItem(STORAGE_KEY_EQUIPPED_SKIN, resolved);
}

function equipSkin(id) {
  const owned = getOwnedSkinsArr().map(normalizeSkinId);
  const n = normalizeSkinId(id);
  if (!owned.includes(n)) return;

  setEquippedSkin(n);

  const isGamePage = !!document.getElementById('gameBoard');
  if (isGamePage) location.reload();
  else openInv('skins');
}

window.addEventListener('load', function () {
  function getBackgroundForLevel(level) {
    if (level > 100) return './images/game/background/blueSpace.png';
    if (level >= 91) return './images/game/background/goldSpace.png';
    else if (level >= 81) return './images/game/background/blackSpace.png';
    else if (level >= 71) return './images/game/background/yellowSpace.png';
    else if (level >= 61) return './images/game/background/lightblueSpace.png';
    else if (level >= 51) return './images/game/background/orangeSpace.png';
    else if (level >= 41) return './images/game/background/purpleSpace.png';
    else if (level >= 31) return './images/game/background/redSpace.png';
    else if (level >= 21) return './images/game/background/pinkSpace.png';
    else if (level >= 11) return './images/game/background/greenSpace.png';
    return './images/game/background/blueSpace.png';
  }

  const ASSETS = {
    bg: getBackgroundForLevel(currentLevel),
    explosion: './images/game/sprites/smokeExplosion.png',
    music: './sounds/game/gameplayMusic.mp3',
    uiClickSound: './sounds/backgroundSoundEffect/buttonClick.wav',
    enemyExplosionSound: './sounds/game/soundEffects/enemyExplosion.mp3',
  };

  let enemyExplosionSound = null;
  let upgradeSound = null;
  let uiClickSound = null;
  let playerHitAudioCtx = null;
  let lastPlayerHitSoundAt = 0;
  let gameButtonClicksBound = false;

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function getMusicEnabled() {
    return localStorage.getItem('music') !== 'off';
  }

  function getMusicVolume() {
    const v = Number(localStorage.getItem('musicVolume') ?? 70);
    return Math.max(0, Math.min(100, v));
  }

  function getAudioEnabled() {
    return localStorage.getItem('audio') !== 'off';
  }

  function getAudioVolume() {
    const v = Number(localStorage.getItem('audioVolume') ?? 80);
    return Math.max(0, Math.min(100, v));
  }

  function getSfxVolume(scale = 0.65) {
    return (getAudioVolume() / 100) * scale;
  }

  function createAudioPool(src, size = 4, volumeScale = 0.65) {
    const pool = Array.from({ length: size }, () => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = getSfxVolume(volumeScale);
      return audio;
    });

    let cursor = 0;

    return {
      setVolume() {
        const volume = getSfxVolume(volumeScale);
        for (let i = 0; i < pool.length; i++) {
          pool[i].volume = volume;
        }
      },
      play() {
        if (!getAudioEnabled() || getAudioVolume() === 0) return;

        const audio = pool[cursor];
        cursor = (cursor + 1) % pool.length;
        audio.currentTime = 0;
        audio.volume = getSfxVolume(volumeScale);
        audio.play().catch(() => {});
      },
    };
  }

  function applyGameMusicSettings() {
    if (!bgMusic) return;

    const enabled = getMusicEnabled();
    const volume = getMusicVolume();

    bgMusic.volume = (volume / 100) * gameMusicDuckScale;

    if (!enabled || volume === 0) {
      bgMusic.pause();
      return;
    }

    if (musicStarted && bgMusic.paused) {
      bgMusic.play().catch(() => {});
    }
  }

  function tweenGameMusicDuck(targetScale, duration = 420) {
    const startScale = gameMusicDuckScale;
    const target = Math.max(0.12, Math.min(1, targetScale));
    const startTime = performance.now();

    if (gameMusicDuckRaf) cancelAnimationFrame(gameMusicDuckRaf);

    const step = (time) => {
      const progress = Math.min(1, (time - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      gameMusicDuckScale = startScale + (target - startScale) * eased;
      applyGameMusicSettings();

      if (progress < 1) {
        gameMusicDuckRaf = requestAnimationFrame(step);
      } else {
        gameMusicDuckScale = target;
        gameMusicDuckRaf = 0;
        applyGameMusicSettings();
      }
    };

    gameMusicDuckRaf = requestAnimationFrame(step);
  }

  function duckGameMusicForBossEntrance() {
    tweenGameMusicDuck(0.28, 520);
  }

  function restoreGameMusicAfterBossEntrance() {
    tweenGameMusicDuck(1, 720);
  }
  ('');

  function setupMusic() {
    bgMusic = new Audio(ASSETS.music);
    bgMusic.loop = true;
    bgMusic.preload = 'auto';
    applyGameMusicSettings();
  }

  function setupSounds() {
    enemyExplosionSound = createAudioPool(ASSETS.enemyExplosionSound, 10, 0.5);
    uiClickSound = createAudioPool(ASSETS.uiClickSound, 4, 0.8);
    upgradeSound = createAudioPool('./sounds/game/soundEffects/powerUp.wav', 3);
  }

  function playGameButtonClick() {
    if (!uiClickSound) return;
    uiClickSound.play();
  }

  function bindGameButtonClicks() {
    if (gameButtonClicksBound) return;
    gameButtonClicksBound = true;

    document.addEventListener('click', (event) => {
      const button = event.target?.closest?.('button');
      if (!button || button.disabled) return;
      playGameButtonClick();
    });
  }

  function playUpgradeSound() {
    if (!upgradeSound) return;
    upgradeSound.play();
  }

  function playEnemyExplosionSound() {
    if (!enemyExplosionSound) return;
    enemyExplosionSound.play();
  }

  function getPlayerHitAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!playerHitAudioCtx) {
      playerHitAudioCtx = new AudioContextClass();
    }

    return playerHitAudioCtx;
  }

  function playPlayerHitSound() {
    if (!getAudioEnabled() || getAudioVolume() === 0) return;

    const nowMs = performance.now();
    if (nowMs - lastPlayerHitSoundAt < 120) return;
    lastPlayerHitSoundAt = nowMs;

    const audioCtx = getPlayerHitAudioContext();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});

    const now = audioCtx.currentTime;
    const master = audioCtx.createGain();
    const compressor = audioCtx.createDynamicsCompressor();
    master.gain.setValueAtTime(getSfxVolume(0.62), now);
    compressor.threshold.setValueAtTime(-22, now);
    compressor.knee.setValueAtTime(16, now);
    compressor.ratio.setValueAtTime(5, now);
    compressor.attack.setValueAtTime(0.003, now);
    compressor.release.setValueAtTime(0.13, now);
    master.connect(compressor).connect(audioCtx.destination);

    const pulse = (gain, start, peak, duration, attack = 0.006) => {
      const t = now + start;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(peak, t + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    };

    const playTone = (
      type,
      from,
      to,
      start,
      duration,
      peak,
      filterType = null,
      filterFreq = 1200,
      filterQ = 1
    ) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      let target = gain;

      osc.type = type;
      osc.frequency.setValueAtTime(from, now + start);
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(20, to),
        now + start + duration
      );

      if (filterType) {
        const filter = audioCtx.createBiquadFilter();
        filter.type = filterType;
        filter.frequency.setValueAtTime(filterFreq, now + start);
        filter.Q.setValueAtTime(filterQ, now + start);
        gain.connect(filter).connect(master);
        target = filter;
        window.setTimeout(() => target.disconnect(), 420);
      } else {
        gain.connect(master);
      }

      pulse(gain, start, peak, duration);
      osc.connect(gain);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.03);
      window.setTimeout(() => osc.disconnect(), 420);
      window.setTimeout(() => gain.disconnect(), 420);
    };

    const playNoise = (
      start,
      duration,
      peak,
      filterType,
      filterFreq,
      filterQ,
      crackle = false
    ) => {
      const length = Math.max(1, Math.floor(audioCtx.sampleRate * duration));
      const buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      let held = 0;

      for (let i = 0; i < length; i++) {
        const fade = Math.pow(1 - i / length, 1.6);
        if (!crackle || i % 9 === 0) held = Math.random() * 2 - 1;
        data[i] = held * fade;
      }

      const source = audioCtx.createBufferSource();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      source.buffer = buffer;
      filter.type = filterType;
      filter.frequency.setValueAtTime(filterFreq, now + start);
      filter.Q.setValueAtTime(filterQ, now + start);
      pulse(gain, start, peak, duration, 0.003);
      source.connect(filter).connect(gain).connect(master);
      source.start(now + start);
      source.stop(now + start + duration + 0.03);
      window.setTimeout(() => {
        source.disconnect();
        filter.disconnect();
        gain.disconnect();
      }, 430);
    };

    playTone('sine', 118, 54, 0, 0.22, 0.32);
    playTone('triangle', 420, 185, 0.012, 0.18, 0.2, 'bandpass', 760, 5.5);
    playTone('square', 1800, 680, 0.018, 0.075, 0.09, 'highpass', 900, 0.8);
    playNoise(0, 0.09, 0.28, 'highpass', 2600, 0.9, true);
    playNoise(0.025, 0.18, 0.14, 'bandpass', 980, 4.8);

    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    window.setTimeout(() => {
      master.disconnect();
      compressor.disconnect();
    }, 460);
  }

  function startMusic() {
    if (!bgMusic || musicStarted) return;
    if (!getMusicEnabled() || getMusicVolume() === 0) return;

    applyGameMusicSettings();

    bgMusic
      .play()
      .then(() => {
        musicStarted = true;
      })
      .catch(() => {});
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'music' || e.key === 'musicVolume') {
      applyGameMusicSettings();
    }
  });

  function stopMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    bgMusic.currentTime = 0;
    musicStarted = false;
  }

  let cached = {};

  let EXPLOSION_IMG = null;
  let background = null;
  let stars = null;
  let game = null;
  let bgMusic = null;
  let musicStarted = false;
  let gameMusicDuckScale = 1;
  let gameMusicDuckRaf = 0;

  async function preload() {
    const [bgImg, explosionImg] = await Promise.all([
      loadImage(ASSETS.bg),
      loadImage(ASSETS.explosion),
    ]);
    cached.bgImg = bgImg;
    cached.explosionImg = explosionImg;
  }

  // canvas settings
  const canvas = document.getElementById('gameBoard');
  const ctx =
    canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
      powerPreference: 'high-performance',
    }) || canvas.getContext('2d');
  let logicalW = 0;
  let logicalH = 0;
  let renderDpr = 1;
  let renderQualityScale = GAME_PERFORMANCE_PROFILE.renderScale;

  function isMobileRuntime() {
    return (
      window.matchMedia?.('(pointer: coarse)').matches ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    );
  }

  function getRenderDpr(rect) {
    const rawDpr = window.devicePixelRatio || 1;
    const maxDpr =
      GAME_PERFORMANCE_PROFILE.tier === 'low'
        ? 1
        : GAME_PERFORMANCE_PROFILE.tier === 'medium'
          ? 1.2
          : MOBILE_RUNTIME
            ? 1.45
            : 1.5;
    const maxPixels =
      GAME_PERFORMANCE_PROFILE.tier === 'low'
        ? 420000
        : GAME_PERFORMANCE_PROFILE.tier === 'medium'
          ? 650000
          : MOBILE_RUNTIME
            ? 820000
            : 1400000;
    const cssPixels = Math.max(1, rect.width * rect.height);

    return Math.max(
      MOBILE_RUNTIME ? 0.8 : 0.55,
      Math.min(rawDpr, maxDpr, Math.sqrt(maxPixels / cssPixels)) *
        renderQualityScale
    );
  }

  const MOBILE_RUNTIME = isMobileRuntime();
  const MAX_PLAYER_PROJECTILES =
    GAME_PERFORMANCE_PROFILE.tier === 'low'
      ? 64
      : GAME_PERFORMANCE_PROFILE.tier === 'medium'
        ? 82
        : MOBILE_RUNTIME
          ? 90
          : 140;
  const MAX_PARTICLES =
    GAME_PERFORMANCE_PROFILE.tier === 'low'
      ? 38
      : GAME_PERFORMANCE_PROFILE.tier === 'medium'
        ? 70
        : MOBILE_RUNTIME
          ? 90
          : 160;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const dpr = getRenderDpr({ width, height });

    if (width === logicalW && height === logicalH && dpr === renderDpr) {
      return false;
    }

    renderDpr = dpr;

    logicalW = width;
    logicalH = height;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(canvas.width / width, canvas.height / height);
    return true;
  }

  resizeCanvas();
  window.addEventListener('resize', () => {
    if (!resizeCanvas()) return;
    if (background) background.resize();
    if (stars) stars.resize();
    if (game) {
      game.width = logicalW;
      game.height = logicalH;
    }
  });

  function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function smoothstep(edge0, edge1, x) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  let _vignette = null;
  function drawVignette(ctx, w, h) {
    if (!_vignette || _vignette.width !== w || _vignette.height !== h) {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const gctx = c.getContext('2d');
      const g = gctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        Math.min(w, h) * 0.2,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.78
      );
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,0.55)');
      gctx.fillStyle = g;
      gctx.fillRect(0, 0, w, h);
      _vignette = c;
    }

    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(_vignette, 0, 0);
    ctx.restore();
  }

  let _scan = null;
  function drawScanlines(ctx, w, h) {
    if (!GAME_PERFORMANCE_PROFILE.scanlines) return;
    if (MOBILE_RUNTIME) return;

    if (!_scan || _scan.width !== w || _scan.height !== h) {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const g = c.getContext('2d');

      g.fillStyle = 'rgba(255,255,255,0.03)';
      for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1);

      _scan = c;
    }

    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = 0.35;
    ctx.drawImage(_scan, 0, 0);
    ctx.restore();
  }

  const PROJECTILE_FRAME_COUNT = 8;
  let _laserProjectileFrames = null;
  let _triangleProjectileFrames = null;

  function createLaserProjectileFrames() {
    const frames = [];

    for (let i = 0; i < PROJECTILE_FRAME_COUNT; i++) {
      const c = document.createElement('canvas');
      c.width = 40;
      c.height = 54;
      const g = c.getContext('2d');

      const t = (i / PROJECTILE_FRAME_COUNT) * Math.PI * 2;
      const pulse = 0.8 + 0.2 * Math.sin(t * 3);
      const cx = c.width / 2;
      const topY = 14;
      const botY = 36;
      const w = 3;

      g.save();
      g.globalCompositeOperation = 'lighter';

      g.globalAlpha = 0.15 * pulse;
      g.lineWidth = w * 8;
      g.strokeStyle = 'rgba(0,180,255,1)';
      g.beginPath();
      g.moveTo(cx, botY);
      g.lineTo(cx, topY);
      g.stroke();

      const grad = g.createLinearGradient(cx, botY, cx, topY);
      grad.addColorStop(0, 'rgba(0,120,255,0)');
      grad.addColorStop(0.2, 'rgba(0,200,255,0.7)');
      grad.addColorStop(0.5, 'rgba(120,255,255,1)');
      grad.addColorStop(0.8, 'rgba(255,255,255,1)');
      grad.addColorStop(1, 'rgba(255,255,255,1)');

      g.globalAlpha = 0.95;
      g.lineWidth = w * 2.2;
      g.strokeStyle = grad;
      g.beginPath();
      g.moveTo(cx, botY);
      g.lineTo(cx, topY);
      g.stroke();

      g.globalAlpha = 1;
      g.lineWidth = Math.max(1.5, w * 0.8);
      g.strokeStyle = 'white';
      g.beginPath();
      g.moveTo(cx, botY);
      g.lineTo(cx, topY);
      g.stroke();

      const tipRadius = 3.5 + 1.2 * Math.sin(t * 4);
      const tipGrad = g.createRadialGradient(
        cx,
        topY,
        0,
        cx,
        topY,
        tipRadius * 3
      );
      tipGrad.addColorStop(0, 'rgba(255,255,255,1)');
      tipGrad.addColorStop(0.3, 'rgba(120,255,255,1)');
      tipGrad.addColorStop(1, 'rgba(0,150,255,0)');

      g.fillStyle = tipGrad;
      g.beginPath();
      g.arc(cx, topY, tipRadius * 2.5, 0, Math.PI * 2);
      g.fill();

      g.globalAlpha = 0.35;
      g.lineWidth = w * 1.4;
      g.strokeStyle = 'rgba(180,255,255,1)';
      g.beginPath();
      g.moveTo(cx + Math.sin(t * 5) * 1.2, botY);
      g.lineTo(cx, topY + 6);
      g.stroke();

      g.restore();
      frames.push(c);
    }

    return frames;
  }

  function getLaserProjectileFrames() {
    if (!_laserProjectileFrames) {
      _laserProjectileFrames = createLaserProjectileFrames();
    }

    return _laserProjectileFrames;
  }

  function createTriangleProjectileFrames() {
    const frames = [];

    for (let i = 0; i < PROJECTILE_FRAME_COUNT; i++) {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 72;
      const g = c.getContext('2d');

      const t = (i / PROJECTILE_FRAME_COUNT) * Math.PI * 2;
      const pulse = 0.85 + 0.15 * Math.sin(t * 2);
      const len = 22 * 1.1;
      const wid = 18 * 0.55;

      g.save();
      g.translate(c.width / 2, c.height / 2);
      g.globalCompositeOperation = 'lighter';

      g.globalAlpha = 0.22 * pulse;
      g.shadowColor = 'rgba(0,255,255,0.9)';
      g.shadowBlur = 26;
      g.fillStyle = 'rgba(0,180,255,0.35)';
      g.beginPath();
      g.ellipse(0, 0, wid * 1.35, len * 0.85, 0, 0, Math.PI * 2);
      g.fill();

      g.shadowBlur = 0;
      const body = g.createLinearGradient(0, -len, 0, len);
      body.addColorStop(0, 'rgba(255,255,255,1)');
      body.addColorStop(0.25, 'rgba(120,255,255,1)');
      body.addColorStop(0.65, 'rgba(0,200,255,0.95)');
      body.addColorStop(1, 'rgba(0,120,255,0)');

      g.globalAlpha = 0.95;
      g.fillStyle = body;
      g.beginPath();
      g.moveTo(0, -len);
      g.bezierCurveTo(-wid, -len * 0.25, -wid * 0.85, len * 0.55, 0, len);
      g.bezierCurveTo(wid * 0.85, len * 0.55, wid, -len * 0.25, 0, -len);
      g.closePath();
      g.fill();

      g.globalAlpha = 0.9;
      g.lineWidth = Math.max(2, wid * 0.25);
      g.strokeStyle = 'rgba(255,255,255,0.95)';
      g.beginPath();
      g.moveTo(0, len * 0.55);
      g.lineTo(0, -len * 0.85);
      g.stroke();

      const tipR = 4 + 2 * Math.sin(t * 3);
      const tip = g.createRadialGradient(
        0,
        -len * 0.92,
        0,
        0,
        -len * 0.92,
        tipR * 3
      );
      tip.addColorStop(0, 'rgba(255,255,255,1)');
      tip.addColorStop(0.35, 'rgba(120,255,255,1)');
      tip.addColorStop(1, 'rgba(0,180,255,0)');

      g.globalAlpha = 1;
      g.fillStyle = tip;
      g.beginPath();
      g.arc(0, -len * 0.92, tipR * 2.2, 0, Math.PI * 2);
      g.fill();

      g.globalAlpha = 0.28;
      g.lineWidth = wid * 0.35;
      g.strokeStyle = 'rgba(0,220,255,1)';
      for (let j = 0; j < 3; j++) {
        const ox = Math.sin(t * 2.6 + j) * 0.7 * wid * 0.25;
        const oy1 = len * (0.2 + j * 0.18);
        const oy2 = len * (0.65 + j * 0.18);
        g.beginPath();
        g.moveTo(ox, oy1);
        g.lineTo(ox, oy2);
        g.stroke();
      }

      g.restore();
      frames.push(c);
    }

    return frames;
  }

  function getTriangleProjectileFrames() {
    if (!_triangleProjectileFrames) {
      _triangleProjectileFrames = createTriangleProjectileFrames();
    }

    return _triangleProjectileFrames;
  }

  function drawThrusterRaw(
    ctx,
    x,
    y,
    w,
    h,
    isRed = false,
    isDark = false,
    isCelestial = false,
    isGolden = false,
    isStarBreaker = false,
    t = performance.now() * 0.008
  ) {
    const cx = x + w * 0.5;
    const baseY = y + h * 0.56;

    const len = h * (0.55 + 0.08 * Math.sin(t * 2));
    const baseW = w * (0.75 + 0.06 * Math.sin(t * 3));
    const sideW = w * (0.45 + 0.05 * Math.sin(t * 2.4));

    const C = isRed
      ? {
          shadow: 'rgba(255,80,90,0.9)',
          haze1: 'rgba(255,255,255,0.35)',
          haze2: 'rgba(255,120,120,0.28)',
          haze3: 'rgba(255,30,40,0)',
          core1: 'rgba(255,255,255,0.95)',
          core2: 'rgba(255,150,150,0.85)',
          core3: 'rgba(255,70,70,0.45)',
          core4: 'rgba(180,0,20,0)',
          side1: 'rgba(255,255,255,0.8)',
          side2: 'rgba(255,130,130,0.65)',
          side3: 'rgba(255,30,40,0)',
        }
      : isDark
        ? {
            shadow: 'rgba(120, 40, 255, 0.75)',
            haze1: 'rgba(255,255,255,0.10)',
            haze2: 'rgba(120, 40, 255, 0.22)',
            haze3: 'rgba(0,0,0,0)',
            core1: 'rgba(220,220,255,0.55)',
            core2: 'rgba(140, 60, 255, 0.55)',
            core3: 'rgba(50, 0, 110, 0.35)',
            core4: 'rgba(0,0,0,0)',
            side1: 'rgba(210,210,255,0.22)',
            side2: 'rgba(120, 40, 255, 0.28)',
            side3: 'rgba(0,0,0,0)',
          }
        : isCelestial
          ? {
              shadow: 'rgba(255, 150, 205, 0.85)',
              haze1: 'rgba(255,255,255,0.36)',
              haze2: 'rgba(250, 118, 184, 0.3)',
              haze3: 'rgba(255,120,190,0)',
              core1: 'rgba(255,255,255,0.96)',
              core2: 'rgba(255, 103, 186, 0.88)',
              core3: 'rgba(255, 123, 196, 0.48)',
              core4: 'rgba(255,120,190,0)',
              side1: 'rgba(255,255,255,0.82)',
              side2: 'rgba(255, 109, 187, 0.68)',
              side3: 'rgba(255,140,200,0)',
            }
          : isGolden
            ? {
                shadow: 'rgba(255,215,60,0.95)',
                haze1: 'rgba(255,255,255,0.55)',
                haze2: 'rgba(255,215,0,0.45)',
                haze3: 'rgba(255,180,0,0)',
                core1: 'rgba(255,255,255,1)',
                core2: 'rgba(255,235,120,0.95)',
                core3: 'rgba(255,200,0,0.65)',
                core4: 'rgba(255,150,0,0)',
                side1: 'rgba(255,255,255,0.95)',
                side2: 'rgba(255,215,0,0.85)',
                side3: 'rgba(255,180,0,0)',
              }
            : {
                shadow: 'rgba(0,200,255,0.85)',
                haze1: 'rgba(255,255,255,0.35)',
                haze2: 'rgba(0,220,255,0.28)',
                haze3: 'rgba(0,120,255,0)',
                core1: 'rgba(255,255,255,0.95)',
                core2: 'rgba(0,235,255,0.85)',
                core3: 'rgba(0,140,255,0.45)',
                core4: 'rgba(0,80,255,0)',
                side1: 'rgba(255,255,255,0.8)',
                side2: 'rgba(0,220,255,0.65)',
                side3: 'rgba(0,120,255,0)',
              };

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    ctx.globalAlpha = 0.55;
    ctx.shadowColor = C.shadow;
    ctx.shadowBlur = 34;

    const haze = ctx.createRadialGradient(
      cx,
      baseY,
      0,
      cx,
      baseY + len * 0.35,
      len * 0.95
    );
    haze.addColorStop(0, C.haze1);
    haze.addColorStop(0.25, C.haze2);
    haze.addColorStop(1, C.haze3);
    ctx.fillStyle = haze;
    ctx.beginPath();
    ctx.ellipse(
      cx,
      baseY + len * 0.25,
      baseW * 0.55,
      len * 0.55,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.globalAlpha = 0.95;
    ctx.shadowBlur = 26;

    const core = ctx.createRadialGradient(cx, baseY, 0, cx, baseY + len, len);
    core.addColorStop(0, C.core1);
    core.addColorStop(0.28, C.core2);
    core.addColorStop(0.6, C.core3);
    core.addColorStop(1, C.core4);
    ctx.fillStyle = core;

    ctx.beginPath();
    ctx.moveTo(cx, baseY);
    ctx.bezierCurveTo(
      cx - baseW * 0.55,
      baseY + len * 0.18,
      cx - baseW * 0.25,
      baseY + len * 0.75,
      cx,
      baseY + len
    );
    ctx.bezierCurveTo(
      cx + baseW * 0.25,
      baseY + len * 0.75,
      cx + baseW * 0.55,
      baseY + len * 0.18,
      cx,
      baseY
    );
    ctx.closePath();
    ctx.fill();

    const ox = w * 0.22;

    const side = (sx) => {
      const g = ctx.createRadialGradient(
        sx,
        baseY,
        0,
        sx,
        baseY + len * 0.9,
        len * 0.85
      );
      g.addColorStop(0, C.side1);
      g.addColorStop(0.35, C.side2);
      g.addColorStop(1, C.side3);
      ctx.fillStyle = g;

      ctx.beginPath();
      ctx.moveTo(sx, baseY);
      ctx.bezierCurveTo(
        sx - sideW * 0.42,
        baseY + len * 0.22,
        sx - sideW * 0.18,
        baseY + len * 0.78,
        sx,
        baseY + len * 0.95
      );
      ctx.bezierCurveTo(
        sx + sideW * 0.18,
        baseY + len * 0.78,
        sx + sideW * 0.42,
        baseY + len * 0.22,
        sx,
        baseY
      );
      ctx.closePath();
      ctx.fill();
    };

    side(cx - ox);
    side(cx + ox);

    ctx.globalAlpha = 0.9;
    ctx.shadowBlur = 18;
    ctx.fillStyle = isDark
      ? 'rgba(210,190,255,0.35)'
      : isCelestial
        ? 'rgba(255,225,240,0.88)'
        : 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.ellipse(cx, baseY + len * 0.15, w * 0.08, h * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  const THRUSTER_FRAME_COUNT = 8;
  const _thrusterFrameCache = new Map();

  function getThrusterKey(isRed, isDark, isCelestial, isGolden, isStarBreaker) {
    return [
      isRed ? 1 : 0,
      isDark ? 1 : 0,
      isCelestial ? 1 : 0,
      isGolden ? 1 : 0,
      isStarBreaker ? 1 : 0,
    ].join('');
  }

  function getThrusterFrames(
    isRed,
    isDark,
    isCelestial,
    isGolden,
    isStarBreaker
  ) {
    const key = getThrusterKey(
      isRed,
      isDark,
      isCelestial,
      isGolden,
      isStarBreaker
    );

    if (_thrusterFrameCache.has(key)) {
      return _thrusterFrameCache.get(key);
    }

    const frames = [];
    for (let i = 0; i < THRUSTER_FRAME_COUNT; i++) {
      const c = document.createElement('canvas');
      c.width = 180;
      c.height = 220;
      const g = c.getContext('2d');
      const t = (i / THRUSTER_FRAME_COUNT) * Math.PI * 2;

      drawThrusterRaw(
        g,
        40,
        40,
        100,
        120,
        isRed,
        isDark,
        isCelestial,
        isGolden,
        isStarBreaker,
        t
      );

      frames.push(c);
    }

    _thrusterFrameCache.set(key, frames);
    return frames;
  }

  function drawThruster(
    ctx,
    x,
    y,
    w,
    h,
    isRed = false,
    isDark = false,
    isCelestial = false,
    isGolden = false,
    isStarBreaker = false
  ) {
    const frames = getThrusterFrames(
      isRed,
      isDark,
      isCelestial,
      isGolden,
      isStarBreaker
    );
    const frame = Math.floor(performance.now() * 0.048) % THRUSTER_FRAME_COUNT;
    const sprite = frames[frame];
    const scaleX = w / 100;
    const scaleY = h / 120;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(
      sprite,
      x - 40 * scaleX,
      y - 40 * scaleY,
      sprite.width * scaleX,
      sprite.height * scaleY
    );
    ctx.restore();
  }

  window.drawRoundedRect = drawRoundedRect;
  window.checkCollision = checkCollision;

  function getPlayerWeaponDamage(player, baseDamage) {
    const multiplier = Number.isFinite(player.damageMultiplier)
      ? player.damageMultiplier
      : 1;
    return baseDamage * multiplier;
  }

  const WEAPON_BEHAVIOR = {
    laser: {
      fireRate: 200,
      fire(player) {
        const centerX = player.x + player.width / 2;
        const y = player.y;
        const damage = getPlayerWeaponDamage(player, 1);
        const piercing = !!player.piercingShot;

        const p1 = new Projectile(player.game, centerX - 8, y);
        p1.damage = damage;
        p1.piercing = piercing;
        player.projectiles.push(p1);

        if (player.doubleShot) {
          const p2 = new Projectile(player.game, centerX + 8, y);
          p2.damage = damage;
          p2.piercing = piercing;
          player.projectiles.push(p2);
        }
      },
    },

    missile: {
      fireRate: 700,
      fire(player) {
        const centerX = player.x + player.width / 2;
        const y = player.y;
        const damage = getPlayerWeaponDamage(player, 5);
        const piercing = !!player.piercingShot;
        const spacing = 20;

        const m1 = new Missile(player.game, centerX - spacing, y);
        m1.damage = damage;
        m1.piercing = piercing;
        player.projectiles.push(m1);

        if (player.doubleShot) {
          const m2 = new Missile(player.game, centerX + spacing, y);
          m2.damage = damage;
          m2.piercing = piercing;
          player.projectiles.push(m2);
        }
      },
    },

    triangleShooter: {
      fireRate: 700,
      fire(player) {
        const centerX = player.x + player.width / 2;
        const y = player.y;
        const damage = getPlayerWeaponDamage(player, 5);
        const piercing = !!player.piercingShot;

        const t1 = new TriangleProjectile(player.game, centerX - 13, y);
        t1.damage = damage;
        t1.piercing = piercing;
        player.projectiles.push(t1);

        if (player.doubleShot) {
          const t2 = new TriangleProjectile(player.game, centerX + 13, y);
          t2.damage = damage;
          t2.piercing = piercing;
          player.projectiles.push(t2);
        }
      },
    },
  };

  class Mouse {
    constructor(game) {
      this.game = game;
      this.pressed = false;
      this.x = 0;
      this.y = 0;
      this.fireInterval = null;
      this.activePointerId = null;

      const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };

      const startFiring = () => {
        this.pressed = true;
      };

      const stopFiring = () => {
        this.pressed = false;
        this.activePointerId = null;
        canvas.style.cursor = 'default';
      };

      canvas.addEventListener(
        'pointerdown',
        (e) => {
          e.preventDefault();
          startMusic();

          this.activePointerId = e.pointerId;
          canvas.setPointerCapture(e.pointerId);

          const p = getPos(e);
          this.x = p.x;
          this.y = p.y;

          this.pressed = true;

          if (this.game.stageIntroActive) {
            this.handleClick(this.x, this.y);
            stopFiring();
            return;
          }

          if (this.game.upgradeCardsShowing) {
            if (!this.game.upgradePending) {
              this.handleClick(this.x, this.y);
            }
            stopFiring();
            return;
          }

          startFiring();
        },
        { passive: false }
      );

      canvas.addEventListener(
        'pointermove',
        (e) => {
          if (
            this.activePointerId !== null &&
            e.pointerId !== this.activePointerId
          )
            return;
          e.preventDefault();
          const p = getPos(e);
          this.x = p.x;
          this.y = p.y;
        },
        { passive: false }
      );

      canvas.addEventListener('pointerup', stopFiring, { passive: true });
      canvas.addEventListener('pointercancel', stopFiring, { passive: true });
      canvas.addEventListener('lostpointercapture', stopFiring, {
        passive: true,
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'r' && this.game.gameOver) restartGame();
      });
    }

    handleClick(mx, my) {
      if (this.game.upgradePending) return;

      if (this.game.stageIntroActive) {
        const btn = this.game.getIntroSkipButtonRect();

        if (
          mx > btn.x &&
          mx < btn.x + btn.width &&
          my > btn.y &&
          my < btn.y + btn.height
        ) {
          this.game.skipStageIntro();
        }

        return;
      }

      if (this.game.upgradePending) return;

      this.game.upgradeCards.forEach((card) => {
        if (
          mx > card.x &&
          mx < card.x + card.width &&
          my > card.y &&
          my < card.y + card.height
        ) {
          this.game.applyUpgrade(card.type);
          this.game.upgradeCardsShowing = false;
          if (this.game.level >= 31) {
            this.game.nextRageScore += 20;
          } else this.game.nextRageScore += 10;
        }
      });
    }

    restartFire() {}
  }

  class ScrollingBackground {
    constructor(canvas, image, speed = 1) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.image = image;
      this.speed = speed;

      const rect = canvas.getBoundingClientRect();
      this.w = rect.width;
      this.h = rect.height;
      this.cover = null;
      this.coverCanvas = null;

      this.y1 = 0;
      this.y2 = -this.h;
      this.updateCover();
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.w = rect.width;
      this.h = rect.height;

      this.y1 = 0;
      this.y2 = -this.h;
      this.updateCover();
    }

    updateCover() {
      const img = this.image;
      if (!img.complete || !img.naturalWidth) {
        this.cover = null;
        this.coverCanvas = null;
        return;
      }

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(this.w / iw, this.h / ih);
      const sw = this.w / scale;
      const sh = this.h / scale;

      this.cover = {
        sx: (iw - sw) / 2,
        sy: (ih - sh) / 2,
        sw,
        sh,
      };

      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(this.w));
      c.height = Math.max(1, Math.round(this.h + 2));
      const g = c.getContext('2d', { alpha: false });
      g.drawImage(
        img,
        this.cover.sx,
        this.cover.sy,
        this.cover.sw,
        this.cover.sh,
        0,
        0,
        this.w,
        this.h + 2
      );

      this.coverCanvas = c;
    }

    update(deltaTime) {
      const dt = deltaTime / 16.67;

      this.y1 += this.speed * dt;
      this.y2 += this.speed * dt;

      if (this.y1 >= this.h) this.y1 = this.y2 - this.h;
      if (this.y2 >= this.h) this.y2 = this.y1 - this.h;
    }

    drawCover(y) {
      const img = this.image;
      const cover = this.cover;
      if (!cover) return;

      const drawY = Math.round(y) - 1;
      if (this.coverCanvas) {
        this.ctx.drawImage(this.coverCanvas, 0, drawY);
      } else {
        this.ctx.drawImage(
          img,
          cover.sx,
          cover.sy,
          cover.sw,
          cover.sh,
          0,
          drawY,
          this.w,
          this.h + 2
        );
      }
    }

    draw() {
      this.drawCover(this.y1);
      this.drawCover(this.y2);
    }
  }

  class Starfield {
    constructor(canvas, count = 150) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.count =
        GAME_PERFORMANCE_PROFILE.starCount === 0
          ? 0
          : MOBILE_RUNTIME
            ? Math.min(GAME_PERFORMANCE_PROFILE.starCount, 70)
            : Math.min(count, GAME_PERFORMANCE_PROFILE.starCount);
      this.stars = [];
      this.layers = [];
      this.time = 0;
      this.w = logicalW || canvas.getBoundingClientRect().width;
      this.h = logicalH || canvas.getBoundingClientRect().height;
      this.seed();
    }

    seed() {
      const rect = this.canvas.getBoundingClientRect();
      this.w = logicalW || rect.width;
      this.h = logicalH || rect.height;
      this.stars.length = 0;
      this.layers.length = 0;

      if (this.count === 0) return;

      const layerDefs = [
        { depth: 0.22, share: 0.42, alpha: 0.72, phase: 0.4 },
        { depth: 0.58, share: 0.36, alpha: 0.88, phase: 2.1 },
        { depth: 0.92, share: 0.22, alpha: 1, phase: 4.2 },
      ];
      let remaining = this.count;

      for (let i = 0; i < layerDefs.length; i++) {
        const def = layerDefs[i];
        const layerCount =
          i === layerDefs.length - 1
            ? remaining
            : Math.max(
                0,
                Math.min(remaining, Math.round(this.count * def.share))
              );
        if (layerCount <= 0) continue;
        remaining -= layerCount;
        this.layers.push(this.createStarLayer(def, layerCount));
      }
    }

    createStarLayer(def, count) {
      const layerHeight = Math.max(1, Math.ceil(this.h * 2));
      const layerCanvas = document.createElement('canvas');
      layerCanvas.width = Math.max(1, Math.ceil(this.w));
      layerCanvas.height = layerHeight;
      const layerCtx = layerCanvas.getContext('2d');
      const drawGlow = !MOBILE_RUNTIME || renderQualityScale > 0.9;

      layerCtx.save();
      layerCtx.globalCompositeOperation = 'screen';

      for (let i = 0; i < count; i++) {
        const starDepth = Math.max(
          0,
          Math.min(1, def.depth + rand(-0.12, 0.12))
        );
        const x = Math.random() * this.w;
        const y = Math.random() * layerHeight;
        const r = 0.55 + starDepth * 1.45 + Math.random() * 0.45;
        const a = (0.28 + Math.random() * 0.55) * (0.72 + starDepth * 0.38);

        layerCtx.globalAlpha = Math.min(1, a * 1.35);
        layerCtx.fillStyle = 'white';
        layerCtx.beginPath();
        layerCtx.arc(x, y, r, 0, Math.PI * 2);
        layerCtx.fill();

        if (drawGlow) {
          layerCtx.globalAlpha = Math.min(1, a * 0.48);
          layerCtx.beginPath();
          layerCtx.arc(x, y, r * (1.6 + starDepth * 1.2), 0, Math.PI * 2);
          layerCtx.fill();
        }
      }

      layerCtx.restore();

      return {
        canvas: layerCanvas,
        height: layerHeight,
        offset: Math.random() * layerHeight,
        speed: 0.35 + def.depth * 1.2,
        alpha: def.alpha,
        phase: def.phase,
      };
    }

    resize() {
      this.seed();
    }

    update(deltaTime, speed = 1.2) {
      if (this.count === 0) return;
      const dt = deltaTime / 16.67;
      this.time += deltaTime * 0.001;

      for (let i = 0; i < this.layers.length; i++) {
        const layer = this.layers[i];
        layer.offset += speed * layer.speed * dt;
        if (layer.offset >= layer.height) layer.offset %= layer.height;
      }
    }

    draw() {
      if (this.count === 0) return;
      const ctx = this.ctx;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < this.layers.length; i++) {
        const layer = this.layers[i];
        const y = Math.round(layer.offset);
        const twinkle = 0.88 + 0.12 * Math.sin(this.time * 1.8 + layer.phase);

        ctx.globalAlpha = layer.alpha * twinkle;
        ctx.drawImage(layer.canvas, 0, y - layer.height);
        ctx.drawImage(layer.canvas, 0, y);
      }

      ctx.restore();
    }
  }

  class Particle {
    constructor(x, y, vx, vy, life, size, hue) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.life = life;
      this.maxLife = life;
      this.size = size;
      this.hue = hue;
      this.markedForDeletion = false;
    }

    update(dt) {
      const k = dt / 16.67;
      this.x += this.vx * k;
      this.y += this.vy * k;
      this.vy += 0.08 * k;

      this.life -= dt;
      if (this.life <= 0) this.markedForDeletion = true;
    }

    draw(ctx) {
      const p = clamp(this.life / this.maxLife, 0, 1);
      const r = this.size * (0.3 + 0.7 * p);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.9 * p;

      ctx.shadowColor = `hsla(${this.hue},100%,60%,1)`;
      ctx.shadowBlur = MOBILE_RUNTIME ? 6 : 14;
      ctx.fillStyle = `hsla(${this.hue},100%,60%,1)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.8 * p;
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, r * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 100;
      this.height = 120;
      this.x = this.game.width / 2 - this.width / 2;
      this.y = this.game.height - this.height - 20;
      this.speedX = 0;
      this.speedY = 0;
      this.projectiles = [];
      this.lives = 3;
      this.damage = 1;
      this.damageMultiplier = 1;
      this.moveBoost = 1;
      this.piercingShot = false;
      this.doubleShot = false;
      this.invulnerable = false;
      this.invulnerableTimer = 0;
      this.invulnerableInterval = 3000;
      this.shieldActive = false;
      this.shieldTimer = 0;
      this.shieldDuration = 0;
      this.goldenReviveLife = false;
      this.shootingInterval = 200;
      this.lastFireTime = 0;
      this.weapon = localStorage.getItem('equippedWeapon') || 'laser';
      this.magnetLocked = false;
      this.blinded = false;
      this.blindTimer = 0;
      this.blindDuration = 2500;
      this.cursorHidden = false;

      const skinId = getEquippedSkin();
      this.isRedClassic = skinId === 'redclassic';
      this.isDarkReaper = skinId === 'darkreaper' || skinId === 'darkvoid';
      this.isCelestialSakura = skinId === 'celestialsakura';
      this.isGoldenCore = skinId === 'goldencore';
      this.isStarBreaker = skinId === 'starbreaker';

      const skinDef = SKIN_TO_PLAYER_IMG_ID[skinId];

      let imgId = 'player';
      let frameY = this.isRedClassic ? 0 : 1;

      if (typeof skinDef === 'string') {
        imgId = skinDef;
      } else if (skinDef && typeof skinDef === 'object') {
        imgId = skinDef.imgId || imgId;
        if (Number.isFinite(skinDef.frameY)) frameY = skinDef.frameY;
      }

      this.slowed = false;
      this.slowTimer = 0;
      this.slowDuration = 1400;
      this.moveSlowMultiplier = 0.15;

      this.image =
        document.getElementById(imgId) ||
        cached?.dom?.[imgId] ||
        document.getElementById('player') ||
        cached?.dom?.player;

      this.frameX = 0;
      this.frameY = frameY;

      this.frameTimer = 0;
      this.frameInterval = 120;
      this.spriteWidth = 128;
      this.spriteHeight = 128;
      this.fireRateMult = 1;
    }

    activateShield(durationMs) {
      this.invulnerable = true;
      this.invulnerableTimer = 0;
      this.shieldActive = true;
      this.shieldTimer = 0;
      this.shieldDuration = Math.max(0, durationMs);
    }

    update(deltaTime) {
      const dt = deltaTime / 16.67;
      this.frameTimer += getSpriteAnimationDelta(deltaTime);
      if (this.frameTimer > this.frameInterval) {
        this.frameX++;
        if (this.frameX >= 6) this.frameX = 0;
        this.frameTimer = 0;
      }

      if (this.slowed) {
        this.slowTimer += deltaTime;
        if (this.slowTimer >= this.slowDuration) {
          this.slowed = false;
          this.slowTimer = 0;
        }
      }

      const shouldHideCursor =
        !MOBILE_RUNTIME && !this.magnetLocked && this.game.mouse.pressed;
      if (shouldHideCursor !== this.cursorHidden) {
        canvas.style.cursor = shouldHideCursor ? 'none' : 'default';
        this.cursorHidden = shouldHideCursor;
      }

      if (!this.magnetLocked && this.game.mouse.pressed) {
        const targetX = this.game.mouse.x - this.width / 2;
        const targetY = this.game.mouse.y - this.height / 2;
        const boost = this.moveBoost || 1;
        const moveFactor = this.slowed
          ? 0.22 * this.moveSlowMultiplier * boost
          : 0.22 * boost;

        const moveEase = 1 - Math.pow(1 - moveFactor, dt);
        this.x += (targetX - this.x) * moveEase;
        this.y += (targetY - this.y) * moveEase;
      }

      if (this.x < 0) this.x = 0;
      if (this.x + this.width > this.game.width) {
        this.x = this.game.width - this.width;
      }
      if (this.y < 0) this.y = 0;
      if (this.y + this.height > this.game.height) {
        this.y = this.game.height - this.height;
      }

      for (let i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].update(deltaTime);
      }
      compactArray(this.projectiles);

      if (this.blinded) {
        this.blindTimer += deltaTime;
        if (this.blindTimer >= this.blindDuration) {
          this.blinded = false;
          this.blindTimer = 0;
        }
      }
    }

    draw(context) {
      context.save();

      if (this.invulnerable) context.globalAlpha = 0.65;

      if (this.isGoldenCore) {
        const t = performance.now() * 0.008;
        const cx = this.x + this.width * 0.5;
        const cy = this.y + this.height * 0.88;

        context.save();
        context.globalCompositeOperation = 'lighter';

        const aura = context.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          this.width * 0.42
        );
        aura.addColorStop(0, 'rgba(255,255,220,0.28)');
        aura.addColorStop(0.35, 'rgba(255,215,90,0.22)');
        aura.addColorStop(1, 'rgba(255,180,0,0)');
        context.globalAlpha = 0.9;
        context.fillStyle = aura;
        context.beginPath();
        context.arc(cx, cy, this.width * 0.42, 0, Math.PI * 2);
        context.fill();

        for (let i = 0; i < 7; i++) {
          const ang = t * 1.2 + i * 0.9;
          const r = this.width * (0.12 + (i % 3) * 0.05);
          const sx = cx + Math.cos(ang) * r;
          const sy = cy + Math.sin(ang * 1.4) * 8 - i * 3;

          const sparkle = 0.65 + 0.35 * Math.sin(t * 4 + i * 2);

          context.globalAlpha = sparkle;
          context.fillStyle = 'rgba(255,235,140,0.95)';
          context.beginPath();
          context.arc(sx, sy, 1.5 + (i % 2), 0, Math.PI * 2);
          context.fill();

          context.globalAlpha = sparkle * 0.8;
          context.strokeStyle = 'rgba(255,250,210,0.95)';
          context.lineWidth = 1.2;
          context.beginPath();
          context.moveTo(sx - 4, sy);
          context.lineTo(sx + 4, sy);
          context.moveTo(sx, sy - 4);
          context.lineTo(sx, sy + 4);
          context.stroke();
        }

        if (this.isStarBreaker) {
          const t = performance.now() * 0.006;
          const cx = this.x + this.width * 0.5;
          const cy = this.y + this.height * 0.52;

          context.save();
          context.globalCompositeOperation = 'lighter';

          const aura = context.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            this.width * 0.55
          );
          aura.addColorStop(0, 'rgba(255,255,255,0.22)');
          aura.addColorStop(0.35, 'rgba(140,220,255,0.18)');
          aura.addColorStop(1, 'rgba(60,100,255,0)');
          context.fillStyle = aura;
          context.beginPath();
          context.arc(cx, cy, this.width * 0.55, 0, Math.PI * 2);
          context.fill();

          for (let i = 0; i < 7; i++) {
            const ang = t * 1.4 + i * 0.9;
            const r = this.width * (0.18 + (i % 3) * 0.06);
            const sx = cx + Math.cos(ang) * r;
            const sy = cy + Math.sin(ang * 1.3) * r * 0.45;

            context.fillStyle = 'rgba(200,240,255,0.95)';
            context.beginPath();
            context.arc(sx, sy, 2 + (i % 2), 0, Math.PI * 2);
            context.fill();

            context.strokeStyle = 'rgba(255,255,255,0.8)';
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(sx - 4, sy);
            context.lineTo(sx + 4, sy);
            context.moveTo(sx, sy - 4);
            context.lineTo(sx, sy + 4);
            context.stroke();
          }

          context.restore();
        }

        for (let i = 0; i < 5; i++) {
          const rise = (t * 35 + i * 17) % 26;
          const px =
            this.x +
            this.width * (0.28 + ((i * 0.17 + Math.sin(t + i)) * 0.22 + 0.22));
          const py = this.y + this.height * 0.95 - rise;

          const size = 1.8 + ((i + 1) % 3);
          const alpha = 0.35 + 0.45 * (1 - rise / 26);

          context.globalAlpha = alpha;
          context.fillStyle = 'rgba(255,210,70,0.95)';
          context.beginPath();
          context.arc(px, py, size, 0, Math.PI * 2);
          context.fill();

          context.globalAlpha = alpha * 0.9;
          context.fillStyle = 'rgba(255,255,255,0.95)';
          context.beginPath();
          context.arc(px, py, size * 0.45, 0, Math.PI * 2);
          context.fill();
        }

        const pulseR = this.width * (0.16 + 0.03 * Math.sin(t * 3));
        const pulse = context.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          pulseR * 2.4
        );
        pulse.addColorStop(0, 'rgba(255,255,255,0.9)');
        pulse.addColorStop(0.4, 'rgba(255,225,110,0.65)');
        pulse.addColorStop(1, 'rgba(255,180,0,0)');
        context.globalAlpha = 0.8;
        context.fillStyle = pulse;
        context.beginPath();
        context.arc(cx, cy, pulseR * 2.2, 0, Math.PI * 2);
        context.fill();

        context.restore();
      }
      drawThruster(
        context,
        this.x,
        this.y,
        this.width,
        this.height,
        this.isRedClassic,
        this.isDarkReaper,
        this.isCelestialSakura,
        this.isGoldenCore,
        this.isStarBreaker
      );

      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );

      if (this.shieldActive) {
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        const pulse = 1 + Math.sin(performance.now() * 0.012) * 0.04;
        context.save();
        context.globalAlpha = 1;
        context.globalCompositeOperation = 'lighter';
        context.strokeStyle = 'rgba(255, 215, 70, 0.95)';
        context.fillStyle = 'rgba(255, 190, 30, 0.1)';
        context.lineWidth = 4;
        context.shadowColor = 'rgba(255, 190, 40, 1)';
        context.shadowBlur = 20;
        context.beginPath();
        context.ellipse(
          cx,
          cy,
          this.width * 0.66 * pulse,
          this.height * 0.58 * pulse,
          0,
          0,
          Math.PI * 2
        );
        context.fill();
        context.stroke();
        context.restore();
      }

      context.restore();

      for (let i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].draw(context);
      }
    }

    fire() {
      const now = performance.now();
      const weapon = WEAPON_BEHAVIOR[this.weapon];
      if (!weapon) return;

      const effectiveRate = Math.max(60, weapon.fireRate * this.fireRateMult);
      if (now - this.lastFireTime < effectiveRate) return;
      if (this.projectiles.length >= MAX_PLAYER_PROJECTILES) return;

      this.lastFireTime = now;
      this.shootingInterval = effectiveRate;
      weapon.fire(this);
    }
  }

  class Explosion {
    constructor(game, x, y) {
      this.game = game;
      this.spriteWidth = 200;
      this.spriteHeight = 200;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;

      this.x = x - this.width / 2;
      this.y = y - this.height / 2;

      this.frameX = 0;
      this.frameY = 0;

      this.fps = 60;
      this.timer = 0;
      this.interval = 1000 / this.fps;

      this.markedForDeletion = false;
      this.maxFrame = 8;

      this.image = EXPLOSION_IMG;

      if (this.game && this.game.spawnSparks) {
        this.game.spawnSparks(x, y, 16, 190);
      }
    }

    update(deltaTime) {
      if (this.timer > this.interval) {
        this.frameX++;
        this.timer = 0;
      } else {
        this.timer += getSpriteAnimationDelta(deltaTime);
      }

      if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
    draw(context) {
      if (!this.image) return;

      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  window.Explosion = Explosion;

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.width = 4;
      this.height = 14;
      this.x = x;
      this.y = y;
      this.speedY = -7.5;

      this.damage = 1;
      this.markedForDeletion = false;

      this.len = 22;
      this.w = 3;
      this.phase = Math.random() * Math.PI * 2;
      this.hitTargets = null;
    }

    hasHitTarget(target) {
      return !!this.hitTargets?.has(target);
    }

    addHitTarget(target) {
      if (!this.hitTargets) this.hitTargets = new Set();
      this.hitTargets.add(target);
    }

    update(deltaTime) {
      const dt = deltaTime / 16.67;
      this.y += this.speedY * dt;
      if (this.y < -this.len - 30) this.markedForDeletion = true;
    }

    draw(ctx) {
      const cx = this.x + this.width / 2;
      const frames = getLaserProjectileFrames();
      const frame =
        Math.floor((performance.now() * 0.048 + this.phase) % frames.length) |
        0;
      const sprite = frames[frame];

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(sprite, cx - sprite.width / 2, this.y - 14);
      ctx.restore();
    }
  }

  class Missile extends Projectile {
    constructor(game, x, y) {
      super(game, x, y);
      this.width = 25;
      this.height = 30;

      this.vy = -4.5;
      this.accY = -0.25;
      this.maxSpeed = -14;

      this.damage = 5;

      this.image = document.getElementById('missile');
      this.frameX = 0;
      this.frameY = 0;
      this.frameTimer = 0;
      this.frameInterval = 80;
      this.spriteWidth = 25;
      this.spriteHeight = 30;
      this.maxFrame = 7;
    }

    update(deltaTime) {
      const dt = deltaTime / 16.67;

      this.vy += this.accY * dt;
      if (this.vy < this.maxSpeed) this.vy = this.maxSpeed;

      this.y += this.vy * dt;

      if (this.y < -this.height) this.markedForDeletion = true;

      this.frameTimer += getSpriteAnimationDelta(deltaTime);
      if (this.frameTimer > this.frameInterval) {
        this.frameX = (this.frameX + 1) % this.maxFrame;
        this.frameTimer = 0;
      }
    }

    draw(context) {
      if (!this.image) return;

      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class TriangleProjectile extends Projectile {
    constructor(
      game,
      x,
      y,
      speedX = 0,
      speedY = -10,
      canSplit = true,
      graceMs = 0
    ) {
      super(game, x, y);

      this.width = 18;
      this.height = 22;

      this.speedX = speedX;
      this.speedY = speedY;

      this.damage = 5;
      this.split = canSplit;

      this.grace = graceMs;
    }

    update(deltaTime) {
      const dt = deltaTime / 16.67;
      this.x += this.speedX * dt;
      this.y += this.speedY * dt;

      if (this.grace > 0) this.grace -= deltaTime;

      if (
        this.y < -this.height ||
        this.x < -this.width ||
        this.x > this.game.width + this.width
      ) {
        this.markedForDeletion = true;
      }
    }
    draw(ctx) {
      const cx = this.x + this.width / 2;
      const cy = this.y + this.height / 2;

      const dx = this.speedX || 0;
      const dy = this.speedY || -1;
      const ang = Math.atan2(dy, dx) + Math.PI / 2;
      const frames = getTriangleProjectileFrames();
      const frame =
        Math.floor((performance.now() * 0.04 + this.phase) % frames.length) | 0;
      const sprite = frames[frame];

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang);
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
      ctx.restore();
    }
  }

  const PET_CLASSES = {
    dog: Pet,
    siren: Siren,
  };

  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 32;
      this.fontFamily =
        '"Orbitron", "Rubik", "Archivo Black", system-ui, sans-serif';
      this.color = 'white';

      this.bossText = '';
      this.bossTimer = 0;
      this.bossDuration = 4500;

      this.prevLives = game.player.lives;
      this.hurtPulse = 0;
      this.prevScore = game.score;
      this.scorePulse = 0;
      this.scoreGain = 0;
      this.scoreGainPulse = 0;

      this.superColors = [
        { p: 0.0, c: { r: 0, g: 200, b: 255 } },
        { p: 0.25, c: { r: 0, g: 150, b: 255 } },
        { p: 0.5, c: { r: 0, g: 255, b: 180 } },
        { p: 0.75, c: { r: 180, g: 255, b: 80 } },
        { p: 1.0, c: { r: 255, g: 220, b: 80 } },
      ];
    }

    update(deltaTime) {
      if (this.bossTimer > 0) {
        this.bossTimer -= deltaTime;
        if (this.bossTimer < 0) this.bossTimer = 0;
      }

      const dt = deltaTime / 16.67;
      const score = this.game.score;
      if (score > this.prevScore) {
        this.scoreGain = score - this.prevScore;
        this.scorePulse = 1;
        this.scoreGainPulse = 1;
      }
      this.prevScore = score;
      this.scorePulse *= Math.pow(0.84, dt);
      this.scoreGainPulse *= Math.pow(0.88, dt);

      const lives = Math.max(0, this.game.player.lives);
      if (lives < this.prevLives) {
        this.hurtPulse = 1;
        playPlayerHitSound();
      }
      this.prevLives = lives;
      this.hurtPulse *= Math.pow(0.9, dt);
    }

    draw(ctx) {
      ctx.save();

      this.drawScore(ctx);
      this.drawLives(ctx);
      this.drawSuperGauge(ctx);

      ctx.restore();

      this.drawBossText(ctx);
    }

    drawScore(ctx) {
      const score = this.game.score;

      const scoreText = this.game.isInfinityWorld
        ? `${score}`
        : `${score} / ${this.game.winningScore}`;
      const x = this.game.width - 20;
      const y = 36;
      const pulse = this.scorePulse;
      const scale = 1 + pulse * 0.22;
      const lift = -pulse * 5;

      ctx.save();
      ctx.translate(x, y + lift);
      ctx.scale(scale, scale);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.font = `900 ${this.fontSize}px ${this.fontFamily}`;
      ctx.shadowColor = 'rgba(70, 220, 255, 0.95)';
      ctx.shadowBlur = 12 + pulse * 18;
      ctx.lineWidth = 4;
      ctx.strokeStyle = `rgba(0, 45, 120, ${0.55 + pulse * 0.25})`;
      ctx.strokeText(scoreText, 0, 0);
      ctx.fillStyle = `rgb(${210 + pulse * 45}, ${245}, 255)`;
      ctx.fillText(scoreText, 0, 0);
      ctx.restore();

      if (this.scoreGainPulse > 0.03 && this.scoreGain > 0) {
        const p = this.scoreGainPulse;
        ctx.save();
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.font = `900 ${14 + p * 8}px ${this.fontFamily}`;
        ctx.globalAlpha = p;
        ctx.shadowColor = 'rgba(80, 230, 255, 0.95)';
        ctx.shadowBlur = 16;
        ctx.fillStyle = 'rgba(160, 245, 255, 0.95)';
        ctx.fillText(`+${this.scoreGain}`, x - 8, y + 24 - (1 - p) * 24);
        ctx.restore();
      }
    }

    drawLives(ctx) {
      const lives = Math.max(0, this.game.player.lives);

      const startX = 14;
      const y = 50;

      const shake =
        this.hurtPulse > 0.02
          ? Math.sin(performance.now() * 0.06) * 3 * this.hurtPulse
          : 0;

      const pop = 1 + this.hurtPulse * 0.35;

      ctx.save();
      ctx.translate(shake, 0);

      const heartSize = this.fontSize + 8;
      ctx.font = `700 ${heartSize}px ${this.fontFamily}`;
      const gap = 40;
      const maxLives = 3;

      for (let i = 0; i < maxLives; i++) {
        const isFull = i < lives;
        const isGolden = isFull && this.game.player.goldenReviveLife && i === 0;
        const icon = isFull ? '\u2665' : '\u2661';

        ctx.save();
        const ix = startX + i * gap;

        if (isFull && this.hurtPulse > 0.02) {
          ctx.translate(ix + 10, y - 10);
          ctx.scale(pop, pop);
          ctx.translate(-(ix + 10), -(y - 10));
        }

        ctx.globalAlpha = isFull ? 1 : 0.35;
        ctx.shadowColor = isGolden
          ? 'rgba(255, 190, 20, 1)'
          : isFull
            ? 'rgba(70, 220, 255, 0.95)'
            : 'rgba(80, 160, 220, 0.45)';
        ctx.shadowBlur = isFull ? 14 + this.hurtPulse * 18 : 6;
        ctx.lineWidth = 3;
        ctx.strokeStyle = isGolden
          ? 'rgba(125, 62, 0, 0.95)'
          : isFull
            ? 'rgba(0, 45, 120, 0.8)'
            : 'rgba(40, 80, 130, 0.55)';
        ctx.fillStyle = isGolden
          ? 'rgb(255, 215, 55)'
          : isFull
            ? 'rgb(170, 245, 255)'
            : 'rgba(145, 205, 230, 0.75)';
        ctx.strokeText(icon, ix, y);
        ctx.fillText(icon, ix, y);
        ctx.restore();
      }

      ctx.restore();
    }

    drawSuperGauge(ctx) {
      const barWidth = 200;
      const barHeight = 16;
      const x = this.game.width / 2 - barWidth / 2;
      const y = this.game.height - 30;

      const progress = Math.min(this.game.superGaugeVisual, 1);

      ctx.save();

      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(x, y, barWidth, barHeight);

      const color = this.getSuperColor(progress);

      if (progress > 0.85) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth * progress, barHeight);

      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, barWidth, barHeight);

      if (progress >= 1) {
        ctx.fillStyle = color;
        ctx.font = `800 14px ${this.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText('SUPER READY', this.game.width / 2, y - 6);
      }

      ctx.restore();
    }

    getSuperColor(progress) {
      for (let i = 0; i < this.superColors.length - 1; i++) {
        const a = this.superColors[i];
        const b = this.superColors[i + 1];

        if (progress >= a.p && progress <= b.p) {
          const t = (progress - a.p) / (b.p - a.p);
          return this.lerpColor(a.c, b.c, t);
        }
      }
      return 'white';
    }

    lerp(a, b, t) {
      return a + (b - a) * t;
    }

    lerpColor(c1, c2, t) {
      return `rgb(
      ${Math.round(this.lerp(c1.r, c2.r, t))},
      ${Math.round(this.lerp(c1.g, c2.g, t))},
      ${Math.round(this.lerp(c1.b, c2.b, t))}
    )`;
    }

    showBoss(text) {
      this.bossText = text;
      this.bossTimer = this.bossDuration;
    }

    drawBossText(ctx) {
      if (this.bossTimer <= 0 || !this.bossText) return;

      const progress = 1 - this.bossTimer / this.bossDuration;
      const fadeIn = Math.min(progress / 0.2, 1);
      const fadeOut = Math.min(this.bossTimer / 600, 1);
      const alpha = Math.min(fadeIn, fadeOut);

      const pulse = 1 + Math.sin(performance.now() * 0.01) * 0.05;
      const scale = (0.9 + fadeIn * 0.25) * pulse;

      const x = this.game.width / 2;
      const y = this.game.height / 2;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const fontSize = Math.min(this.game.width * 0.09, 70);
      ctx.font = `900 ${fontSize}px ${this.fontFamily}`;

      const textWidth = ctx.measureText(this.bossText).width;

      const gradient = ctx.createLinearGradient(
        -textWidth / 2,
        0,
        textWidth / 2,
        0
      );
      gradient.addColorStop(0, '#ff2a2a');
      gradient.addColorStop(0.5, '#ffffff');
      gradient.addColorStop(1, '#ff2a2a');

      ctx.globalAlpha = alpha;
      ctx.shadowColor = 'rgba(255,0,0,1)';
      ctx.shadowBlur = 35;

      ctx.fillStyle = gradient;
      ctx.fillText(this.bossText, 0, 0);

      ctx.shadowBlur = 0;
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#5a0000';
      ctx.strokeText(this.bossText, 0, 0);

      ctx.restore();
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;

      this.shakeTime = 0;
      this.shakeDuration = 0;
      this.shakeMagnitude = 0;

      this.bossSpawned = false;
      this.bossActive = false;
      this.bossKilled = false;

      this.level = currentLevel;
      this.isInfinityWorld = isInfinityMode;

      this.stage = 1;
      this.score = 0;

      this.enemyTimer = 0;
      const spawnSettings = this.getSpawnSettings();
      this.enemyInterval = spawnSettings.enemyInterval;
      this.maxOnScreen = spawnSettings.maxOnScreen;
      this.spawnStageCache = this.stage;
      this.enemies = [];
      this.enemyMines = [];

      this.player = new Player(this);

      const petId = getEquippedPet();
      this.pet =
        petId && PET_CLASSES[petId] ? new PET_CLASSES[petId](this) : null;
      this.petCooldownMult = 1;
      this.petCooldownMin = 2000;

      this.mouse = new Mouse(this);
      this.ui = new UI(this);
      this.explosions = [];
      this.enemyBullets = [];

      if (this.level >= 51) this.nextRageScore = 20;
      else this.nextRageScore = 10;

      if (this.isInfinityWorld) this.winningScore = Infinity;
      else if (this.level === 100) this.winningScore = 999;
      else if (this.level >= 51) this.winningScore = 100;
      else if (this.level >= 31) this.winningScore = 70;
      else if (this.level >= 11) this.winningScore = 50;
      else if (this.level == 1) this.winningScore = 15;
      else this.winningScore = 30;

      this.equippedSuper =
        localStorage.getItem('equippedSuper') || 'superLaser';
      this.superAttacks = [];
      this.superAttackGauge = 0;
      const superMap = window.SUPER_TYPES || {};
      const superData = superMap[this.equippedSuper];
      this.superAttackReadyGauge = superData?.charge ?? 5;
      this.superReady = false;
      this.superActive = false;

      this.gameOver = false;
      this.win = false;
      this.lost = false;

      this.upgradeCards = [];
      this.upgradeCardsShowing = false;
      this.upgradePending = false;

      this.rewardGiven = false;
      this.reviveAdUsed = false;
      this.redirectScheduled = false;

      this.superGaugeVisual = 0;

      this.fireTrails = [];
      this.particles = [];
      this.shake = 0;
      this.mindTintCanvas = document.createElement('canvas');
      this.mindTintCtx = this.mindTintCanvas.getContext('2d');

      this.isBossRushLevel = this.level === 100 && !this.isInfinityWorld;

      this.bossRushQueue = this.isBossRushLevel
        ? [
            { type: Boss2, text: 'CORE AWAKENS' },
            { type: Boss3, text: 'MIRROR CHAOS' },
            { type: Boss4, text: 'SPLIT PROTOCOL' },
            { type: Boss5, text: 'HUNTER MODE' },
            { type: Boss6, text: 'SHIELD SYSTEM' },
            { type: Boss7, text: 'LASER LOCKDOWN' },
            { type: Boss8, text: 'MAGNETIC STORM' },
            { type: Boss9, text: 'WAVE OF DOOM' },
            { type: Boss10, text: 'THUNDER DESCENDS' },
            { type: BossPortalMaster, text: 'PORTAL MASTER' },
          ]
        : [];

      this.currentBossRushIndex = 0;
      this.bossRushPendingSpawn = false;
      this.bossRushCleared = false;
      this.bossEntranceMusicWaiting = false;
      this.bossEntranceMusicDucked = false;
      this.bossEntranceDarkness = 0;
      this.finalBossEntranceActive = false;
      this.finalBossEntranceTimer = 0;
      this.finalBossEntranceDuration = 5200;
      this.finalBossEntranceEntry = null;
      this.finalBossEntranceStarted = false;
      const hasCompletedFinalStage = getMaxUnlockedLevel() > 100;
      this.stageIntroActive = this.level === 100 && !hasCompletedFinalStage;
      this.stageIntroDone = this.level !== 100 || hasCompletedFinalStage;
      this.stageIntroDelay = 1200;
      this.stageIntroTimer = 0;

      this.stageIntroTitle =
        this.level === 100 ? this.getStageIntroTitle() : '';
      this.stageIntroText = this.level === 100 ? this.getStageIntroText() : [];
      this.maxStage = this.computeMaxStage();
      this.lastScoreStage = 0;
      this.bossByLevel = {
        1: Boss1,
        10: Boss2,
        20: Boss3,
        30: Boss4,
        40: Boss5,
        50: Boss6,
        60: Boss7,
        70: Boss8,
        80: Boss9,
        90: Boss10,
      };
      this.standardBossLevel = !!this.bossByLevel[this.level];
    }

    triggerShake(duration = 420, magnitude = 18) {
      this.shakeDuration = duration;
      this.shakeTime = duration;
      this.shakeMagnitude = Math.max(this.shakeMagnitude, magnitude);
    }

    beginBossEntranceMusicDuck() {
      if (this.bossEntranceMusicDucked) return;
      this.bossEntranceMusicDucked = true;
      this.bossEntranceMusicWaiting = true;
      duckGameMusicForBossEntrance();
    }

    updateBossEntranceMusicDuck() {
      if (!this.bossEntranceMusicWaiting) return;

      const boss = this.enemies.find(
        (enemy) => enemy?.isBoss && !enemy.markedForDeletion
      );

      if (!boss) {
        if (!this.finalBossEntranceActive) {
          this.bossEntranceMusicWaiting = false;
          this.bossEntranceMusicDucked = false;
          restoreGameMusicAfterBossEntrance();
        }
        return;
      }

      const bossSettled =
        boss.entered === true ||
        (Number.isFinite(boss.baseY) && boss.y >= boss.baseY - 1);

      if (!bossSettled) return;

      this.bossEntranceMusicWaiting = false;
      this.bossEntranceMusicDucked = false;
      restoreGameMusicAfterBossEntrance();
    }

    updateBossEntranceDarkness(deltaTime) {
      const target = this.bossEntranceMusicDucked ? 1 : 0;
      const speed = target > this.bossEntranceDarkness ? 0.012 : 0.006;
      const ease = 1 - Math.pow(1 - speed, deltaTime);
      this.bossEntranceDarkness += (target - this.bossEntranceDarkness) * ease;

      if (this.bossEntranceDarkness < 0.01) this.bossEntranceDarkness = 0;
      if (this.bossEntranceDarkness > 0.99) this.bossEntranceDarkness = 1;
    }

    drawBossEntranceDarkness(ctx) {
      if (this.bossEntranceDarkness <= 0 || this.finalBossEntranceActive)
        return;

      const alpha = 0.58 * this.bossEntranceDarkness;
      const cx = this.width / 2;
      const cy = this.height * 0.26;

      ctx.save();
      const shade = ctx.createRadialGradient(cx, cy, 40, cx, cy, this.height);
      shade.addColorStop(0, `rgba(33, 8, 48, ${alpha * 0.58})`);
      shade.addColorStop(0.42, `rgba(4, 8, 24, ${alpha * 0.82})`);
      shade.addColorStop(1, `rgba(0, 0, 0, ${alpha})`);
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = `rgba(255, 35, 83, ${0.08 * this.bossEntranceDarkness})`;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.restore();
    }

    addSuperCharge(amount = 1) {
      if (this.gameOver) return;
      const need = this.superAttackReadyGauge || 5;
      this.superAttackGauge = Math.min(need, this.superAttackGauge + amount);
    }

    spawnSparks(x, y, amount = 18, hue = 190) {
      const room = MAX_PARTICLES - this.particles.length;
      if (room <= 0) return;

      const qualityAmount =
        MOBILE_RUNTIME && renderQualityScale < 0.95
          ? Math.ceil(amount * 0.72 * GAME_PERFORMANCE_PROFILE.particleScale)
          : Math.ceil(amount * GAME_PERFORMANCE_PROFILE.particleScale);
      const count = Math.min(qualityAmount, room);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = rand(1.2, 4.8);
        const vx = Math.cos(a) * sp;
        const vy = Math.sin(a) * sp;

        this.particles.push(
          new Particle(
            x,
            y,
            vx,
            vy,
            rand(220, 520),
            rand(2.5, 6),
            hue + rand(-25, 25)
          )
        );
      }
    }

    computeMaxStage() {
      const stages = ENEMY_SPAWN_TABLE?.[this.level]?.stages;
      if (!stages) return 1;

      let maxStage = 1;
      for (const key in stages) {
        const n = Number(key);
        if (n > maxStage) maxStage = n;
      }

      return maxStage;
    }

    refreshSpawnSettings() {
      if (this.spawnStageCache === this.stage) return;

      const spawnSettings = this.getSpawnSettings();
      this.enemyInterval = spawnSettings.enemyInterval;
      this.maxOnScreen = spawnSettings.maxOnScreen;
      this.spawnStageCache = this.stage;
    }

    updateStageByScore() {
      const scoreStage = this.isInfinityWorld
        ? Math.min(12, Math.floor(this.score / 15) + 1)
        : Math.min(Math.floor(this.score / 10) + 1, this.maxStage);

      if (scoreStage === this.lastScoreStage) return;

      this.lastScoreStage = scoreStage;
      this.stage = scoreStage;
      this.refreshSpawnSettings();
    }

    spawnStandardBoss() {
      const BossClass = this.bossByLevel[this.level];
      if (!BossClass || this.bossSpawned || this.score < this.winningScore) {
        return false;
      }

      this.bossSpawned = true;
      this.bossActive = true;
      this.enemies.length = 0;
      this.enemies.push(new BossClass(this));
      this.ui.showBoss('BOSS INCOMING!');
      this.beginBossEntranceMusicDuck();
      return true;
    }

    shouldWinFromScore() {
      return (
        !this.standardBossLevel &&
        this.level !== 100 &&
        !this.gameOver &&
        !this.upgradeCardsShowing &&
        !this.upgradePending &&
        this.score >= this.winningScore
      );
    }

    beginUpgradeCards() {
      if (this.upgradeCardsShowing || this.upgradePending) return;

      this.upgradePending = true;
      this.upgradeCardsShowing = true;

      const spawnSettings = this.getSpawnSettings();
      this.enemyInterval = spawnSettings.enemyInterval;
      this.maxOnScreen = spawnSettings.maxOnScreen;
      this.spawnStageCache = this.stage;
      window.createUpgradeCards(this);
    }

    update(deltaTime) {
      this.deltaTime = deltaTime;
      const dt = deltaTime / 16.67;

      if (this.tutorialPaused) {
        this.mouse.pressed = false;
        this.player.speedX = 0;
        this.player.speedY = 0;
        return;
      }

      if (this.upgradePending) {
        this.player.speedX = 0;
        this.player.speedY = 0;

        for (let i = 0; i < this.upgradeCards.length; i++) {
          this.upgradeCards[i].update(deltaTime);
        }

        for (let i = 0; i < this.player.projectiles.length; i++) {
          this.player.projectiles[i].update(deltaTime);
        }
        compactArray(this.player.projectiles);

        for (let i = 0; i < this.explosions.length; i++) {
          this.explosions[i].update(deltaTime);
        }
        compactArray(this.explosions);

        if (
          this.player.projectiles.length === 0 &&
          this.explosions.length === 0
        ) {
          this.upgradePending = false;
        }
        return;
      }

      if (this.upgradeCardsShowing) {
        this.player.speedX = 0;
        this.player.speedY = 0;

        for (let i = 0; i < this.upgradeCards.length; i++) {
          this.upgradeCards[i].update(deltaTime);
        }
        return;
      }

      this.ui.update(deltaTime);
      this.updateBossEntranceDarkness(deltaTime);
      if (this.finalBossEntranceActive) {
        this.updateFinalBossEntrance(deltaTime);
        return;
      }

      if (this.stageIntroActive) {
        this.stageIntroTimer += deltaTime;

        if (this.player) {
          this.player.speedX = 0;
          this.player.speedY = 0;
        }

        return;
      }
      this.updateStageByScore();
      this.player.update(deltaTime);
      if (
        this.mouse.pressed &&
        !this.gameOver &&
        !this.tutorialSuppressFire &&
        !this.upgradeCardsShowing &&
        !this.upgradePending &&
        !this.isSuperLaserActive() &&
        !this.stageIntroActive
      ) {
        this.player.fire();
      }

      this.shake *= Math.pow(0.86, dt);

      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update(deltaTime);
      }
      compactArray(this.particles);

      if (this.pet) this.pet.update(deltaTime);

      if (!this.bossActive && !this.tutorialSuppressSpawns) {
        if (this.enemyTimer >= this.enemyInterval && !this.gameOver) {
          if (this.enemies.length < this.maxOnScreen) {
            this.addEnemy();
          }

          this.enemyTimer = 0;
        } else {
          this.enemyTimer += deltaTime;
        }
      }

      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].update(deltaTime);
      }
      compactArray(this.enemies);
      this.updateBossEntranceMusicDuck();

      if (this.pet && this.pet.markedForDeletion) this.pet = null;

      for (let i = 0; i < this.enemies.length; i++) {
        const enemy = this.enemies[i];

        if (
          !this.tutorialInvulnerable &&
          !this.player.invulnerable &&
          checkCollision(enemy, this.player) &&
          !this.gameOver
        ) {
          this.player.lives--;
          this.triggerShake(520, 26);
          this.player.invulnerable = true;
          this.player.invulnerableTimer = 0;
        }

        if (
          this.pet &&
          !this.pet.invulnerable &&
          checkCollision(this.pet, enemy) &&
          !this.gameOver
        ) {
          this.pet.lives--;
          this.pet.invulnerable = true;
          this.pet.invulnerableTimer = 0;

          if (this.pet.lives <= 0 && !this.pet.markedForDeletion) {
            const px = this.pet.x + this.pet.width / 2;
            const py = this.pet.y + this.pet.height / 2;
            this.explosions.push(new Explosion(this, px, py));
            this.pet.markedForDeletion = true;
          }
        }
      }

      for (let i = 0; i < this.enemyBullets.length; i++) {
        this.enemyBullets[i].update(deltaTime);
      }
      compactArray(this.enemyBullets);

      if (this.player.invulnerable && !this.gameOver) {
        if (this.player.shieldActive) {
          this.player.shieldTimer += deltaTime;
          if (this.player.shieldTimer >= this.player.shieldDuration) {
            this.player.shieldActive = false;
            this.player.shieldTimer = 0;
            this.player.invulnerable = false;
            this.player.invulnerableTimer = 0;
          }
        } else {
          this.player.invulnerableTimer += deltaTime;
          if (
            this.player.invulnerableTimer >= this.player.invulnerableInterval
          ) {
            this.player.invulnerable = false;
            this.player.invulnerableTimer = 0;
          }
        }
      }

      if (this.pet && this.pet.invulnerable && !this.gameOver) {
        this.pet.invulnerableTimer += deltaTime;
        if (this.pet.invulnerableTimer >= this.pet.invulnerableInterval) {
          this.pet.invulnerable = false;
          this.pet.invulnerableTimer = 0;
        }
      }

      const newProjectiles = [];

      for (let i = 0; i < this.player.projectiles.length; i++) {
        const p = this.player.projectiles[i];

        if (this.canPiercingDestroyBossBullets(p)) {
          this.destroyEnemyBulletsWithProjectile(p);
        }

        for (let j = 0; j < this.enemies.length; j++) {
          const enemy = this.enemies[j];

          if (p.markedForDeletion || enemy.markedForDeletion) continue;

          let collided = false;

          if (enemy instanceof Boss2) {
            if (!enemy.coreBroken) {
              const hitBox = enemy.getHitBoxRect();
              collided = checkCollision(p, hitBox);
              if (!collided) continue;
              if (p.hasHitTarget(enemy)) continue;

              enemy.damageCore(p.damage ?? 1);
              p.addHitTarget(enemy);

              if (!p.piercing) {
                p.markedForDeletion = true;
              }
            } else {
              collided = checkCollision(p, enemy);
              if (!collided) continue;
              if (p.hasHitTarget(enemy)) continue;

              enemy.damageBoss(p.damage ?? 1);
              p.addHitTarget(enemy);

              if (p instanceof TriangleProjectile && p.split) {
                p.split = false;

                const cy = p.y + p.height * 0.35;
                const leftX = p.x - 6;
                const rightX = p.x + 6;
                const grace = 140;

                newProjectiles.push(
                  new TriangleProjectile(
                    this,
                    leftX - 8,
                    cy - 10,
                    -9,
                    -1.5,
                    false,
                    grace
                  )
                );

                newProjectiles.push(
                  new TriangleProjectile(
                    this,
                    rightX + 8,
                    cy - 10,
                    9,
                    -1.5,
                    false,
                    grace
                  )
                );
              }

              if (!p.piercing) {
                p.markedForDeletion = true;
              }
            }
          } else {
            if (p.hasHitTarget(enemy) || !checkCollision(p, enemy)) continue;

            if (p instanceof Missile) {
              enemy.lives -= p.damage ?? 1;
              p.addHitTarget(enemy);

              if (enemy instanceof Angler7) {
                enemy.reflectProjectile(p);
              }

              if (!p.piercing) {
                p.markedForDeletion = true;
              }
            } else {
              if (p instanceof TriangleProjectile && p.grace > 0) continue;

              enemy.lives -= p.damage ?? 1;
              p.addHitTarget(enemy);

              if (enemy instanceof Angler7) {
                enemy.reflectProjectile(p);
              }

              if (p instanceof TriangleProjectile && p.split) {
                p.split = false;

                const cy = p.y + p.height * 0.35;
                const leftX = p.x - 6;
                const rightX = p.x + 6;
                const grace = 140;

                newProjectiles.push(
                  new TriangleProjectile(
                    this,
                    leftX - 8,
                    cy - 10,
                    -9,
                    -1.5,
                    false,
                    grace
                  )
                );

                newProjectiles.push(
                  new TriangleProjectile(
                    this,
                    rightX + 8,
                    cy - 10,
                    9,
                    -1.5,
                    false,
                    grace
                  )
                );
              }

              if (!p.piercing) {
                p.markedForDeletion = true;
              }
            }
          }

          if (enemy.lives <= 0 && !enemy.markedForDeletion) {
            this.handleEnemyDeath(enemy);
          }

          if (p.markedForDeletion && !p.piercing) {
            break;
          }
        }
      }

      if (newProjectiles.length > 0) {
        const room = MAX_PLAYER_PROJECTILES - this.player.projectiles.length;
        if (room > 0) {
          this.player.projectiles.push(...newProjectiles.slice(0, room));
        }
      }
      for (let i = 0; i < this.explosions.length; i++) {
        this.explosions[i].update(deltaTime);
      }
      compactArray(this.explosions);
      if (
        !this.bossActive &&
        this.score >= this.nextRageScore &&
        !this.upgradeCardsShowing &&
        !this.upgradePending &&
        !this.tutorialControlsUpgrades &&
        this.score < this.winningScore
      ) {
        this.beginUpgradeCards();
      }

      if (this.upgradePending) return;

      this.spawnStandardBoss();

      if (this.player.lives <= 0 && !this.gameOver) {
        this.gameOver = true;
        this.lost = true;
      }

      if (this.bossKilled && !this.gameOver) {
        this.gameOver = true;
        this.win = true;
      }

      if (this.isBossRushLevel && !this.gameOver) {
        if (
          !this.bossSpawned &&
          !this.bossActive &&
          !this.upgradeCardsShowing &&
          !this.upgradePending
        ) {
          this.spawnNextBossRushBoss();
        }

        if (
          this.bossRushPendingSpawn &&
          !this.bossActive &&
          !this.upgradeCardsShowing &&
          !this.upgradePending
        ) {
          this.spawnNextBossRushBoss();
        }
      }
      if (this.shouldWinFromScore()) {
        this.gameOver = true;
        this.win = true;
      }

      if (this.gameOver) {
        this.player.speedX = 0;
        this.player.speedY = 0;

        for (let i = 0; i < this.player.projectiles.length; i++) {
          this.player.projectiles[i].markedForDeletion = true;
        }

        for (let i = 0; i < this.enemies.length; i++) {
          if (!Object.hasOwn(this.enemies[i], '_speedBeforeGameOver')) {
            this.enemies[i]._speedBeforeGameOver = this.enemies[i].speedY;
          }
          this.enemies[i].speedY = 0;
        }

        this.player.invulnerable = false;
      }
      if (this.pet && Array.isArray(this.pet.petBullets)) {
        for (let i = 0; i < this.pet.petBullets.length; i++) {
          const bullet = this.pet.petBullets[i];
          if (bullet.markedForDeletion) continue;

          const br = bullet.r ?? bullet.size * 0.5;
          const bulletRect = {
            x: bullet.x - br,
            y: bullet.y - br,
            width: br * 2,
            height: br * 2,
          };

          for (let j = 0; j < this.enemies.length; j++) {
            const enemy = this.enemies[j];
            if (enemy.markedForDeletion) continue;

            if (enemy instanceof Boss3) {
              let hitClone = false;

              for (let k = 0; k < enemy.clones.length; k++) {
                const clone = enemy.clones[k];
                if (checkCollision(bulletRect, clone)) {
                  bullet.markedForDeletion = true;
                  hitClone = true;
                  break;
                }
              }

              if (hitClone) break;
              if (!checkCollision(bulletRect, enemy)) continue;

              enemy.lives -= bullet.damage ?? 1;
              bullet.markedForDeletion = true;

              if (enemy.lives <= 0 && !enemy.markedForDeletion) {
                this.handleEnemyDeath(enemy);
              }
              break;
            }

            let collided = false;

            if (enemy instanceof Boss2) {
              if (!enemy.coreBroken) {
                const hitBox = enemy.getHitBoxRect();
                collided = checkCollision(bulletRect, hitBox);
                if (!collided) continue;

                enemy.damageCore(bullet.damage ?? 1);
                bullet.markedForDeletion = true;
              } else {
                collided = checkCollision(bulletRect, enemy);
                if (!collided) continue;

                enemy.damageBoss(bullet.damage ?? 1);
                bullet.markedForDeletion = true;
              }
            } else {
              if (!checkCollision(bulletRect, enemy)) continue;

              enemy.lives -= bullet.damage ?? 1;
              bullet.markedForDeletion = true;
            }

            if (enemy.lives <= 0 && !enemy.markedForDeletion) {
              this.handleEnemyDeath(enemy);
            }

            if (bullet.markedForDeletion) break;
          }
        }
      }

      if (this.gameOver && !this.rewardGiven) {
        this.clearSuperAttacks();
        if (bgMusic) bgMusic.pause();

        if (this.win) {
          const reward = Math.floor(22 + this.level * 3.5 + this.score * 0.4);
          grantCoins(reward);
          unlockNextLevel(this.level);
          void window.OrbitVelocityCloud?.recordLevelComplete?.(this.level);
          showVictoryScreen({ win: true, reward, level: this.level });
        } else {
          showVictoryScreen({
            win: false,
            reward: 0,
            level: this.level,
            infinity: this.isInfinityWorld,
            score: this.score,
          });
        }

        this.rewardGiven = true;
      }

      for (let i = 0; i < this.superAttacks.length; i++) {
        const superAtk = this.superAttacks[i];

        if (superAtk instanceof SuperLaser) continue;

        const giveSuperCharge = !(superAtk instanceof SuperAttack1);

        for (let j = 0; j < this.enemies.length; j++) {
          const enemy = this.enemies[j];

          if (enemy.markedForDeletion || enemy.hitBySuper) continue;

          let collided = false;

          if (enemy instanceof Boss2) {
            if (!enemy.coreBroken) {
              const hitBox = enemy.getHitBoxRect();
              collided = checkCollision(superAtk, hitBox);
              if (!collided) continue;

              enemy.damageCore(superAtk.damage);
            } else {
              collided = checkCollision(superAtk, enemy);
              if (!collided) continue;

              enemy.damageBoss(superAtk.damage);
            }
          } else {
            collided = checkCollision(superAtk, enemy);
            if (!collided) continue;

            enemy.lives -= superAtk.damage;
          }

          enemy.hitBySuper = true;

          if (enemy.lives <= 0 && !enemy.markedForDeletion) {
            this.handleEnemyDeath(enemy, giveSuperCharge);
          }

          if (enemy.enemyBullets && enemy.enemyBullets.length > 0) {
            for (let k = 0; k < enemy.enemyBullets.length; k++) {
              const bullet = enemy.enemyBullets[k];

              if (bullet.markedForDeletion) continue;
              if (!checkCollision(superAtk, bullet)) continue;

              bullet.markedForDeletion = true;
            }
          }
        }
      }

      if (
        this.superAttackGauge >= this.superAttackReadyGauge &&
        !this.superActive &&
        !this.gameOver
      ) {
        this.activateSuper();
      }

      for (let i = 0; i < this.superAttacks.length; i++) {
        this.superAttacks[i].update(deltaTime);
      }
      compactArray(this.superAttacks);

      const target = this.superAttackGauge / this.superAttackReadyGauge;
      const gaugeEase = 1 - Math.pow(1 - 0.08, dt);
      this.superGaugeVisual += (target - this.superGaugeVisual) * gaugeEase;

      if (this.shakeTime > 0) {
        this.shakeTime -= deltaTime;
        if (this.shakeTime < 0) this.shakeTime = 0;
      }

      for (let i = 0; i < this.enemyMines.length; i++) {
        this.enemyMines[i].update(deltaTime);
      }
      compactArray(this.enemyMines);

      for (let i = 0; i < this.fireTrails.length; i++) {
        this.fireTrails[i].update(deltaTime);
      }
      compactArray(this.fireTrails);
    }

    draw(context) {
      let shakeX = 0;
      let shakeY = 0;

      if (this.shakeTime > 0) {
        const p = this.shakeTime / this.shakeDuration;
        const ease = p * p;
        const mag = this.shakeMagnitude * ease;

        shakeX += (Math.random() * 2 - 1) * mag;
        shakeY += (Math.random() * 2 - 1) * mag;
      }

      if (this.shake > 0.2) {
        const s = this.shake;
        shakeX += (Math.random() * 2 - 1) * s;
        shakeY += (Math.random() * 2 - 1) * s;
      }

      context.save();
      context.translate(shakeX, shakeY);

      // Ground hazards and trails stay behind every character.
      for (let i = 0; i < this.fireTrails.length; i++) {
        this.fireTrails[i].draw(context);
      }

      for (let i = 0; i < this.enemyMines.length; i++) {
        this.enemyMines[i].draw(context);
      }

      // Characters occupy the main world layer.
      for (let i = 0; i < this.enemies.length; i++) {
        this.drawEnemy(context, this.enemies[i]);
      }

      if (this.pet) this.pet.draw(context);

      // Super attacks, including the laser, must remain visible over enemies.
      for (let i = 0; i < this.superAttacks.length; i++) {
        this.superAttacks[i].draw(context);
      }

      this.player.draw(context);

      // Hostile shots stay readable above ships and enemies.
      for (let i = 0; i < this.enemyBullets.length; i++) {
        this.enemyBullets[i].draw(context);
      }

      // Impact effects finish the shaken world stack.
      for (let i = 0; i < this.explosions.length; i++) {
        this.explosions[i].draw(context);
      }

      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].draw(context);
      }

      context.restore();

      if (this.player.blinded) {
        const p = this.player.blindTimer / this.player.blindDuration;

        let darkness = 0;
        if (p < 0.2) darkness = p / 0.2;
        else if (p > 0.75) darkness = 1 - (p - 0.75) / 0.25;
        else darkness = 1;

        darkness = Math.max(0, Math.min(1, darkness));

        const px = this.player.x + this.player.width / 2;
        const py = this.player.y + this.player.height / 2;

        const pulse = Math.sin(performance.now() * 0.008) * 8;
        const innerRadius = 55 + pulse;
        const outerRadius = 170 + pulse * 1.5;

        context.save();

        const g = context.createRadialGradient(
          px,
          py,
          innerRadius,
          px,
          py,
          outerRadius
        );

        g.addColorStop(0, `rgba(0,0,0,0)`);
        g.addColorStop(0.25, `rgba(0,0,0,${0.25 * darkness})`);
        g.addColorStop(0.6, `rgba(0,0,0,${0.72 * darkness})`);
        g.addColorStop(1, `rgba(0,0,0,${0.96 * darkness})`);

        context.fillStyle = g;
        context.fillRect(0, 0, this.width, this.height);

        context.restore();
      }

      this.drawBossEntranceDarkness(context);

      // HUD layers do not shake and always stay above the battlefield.
      const boss4s = [];
      for (let i = 0; i < this.enemies.length; i++) {
        const enemy = this.enemies[i];
        if (enemy instanceof Boss4) boss4s.push(enemy);
      }

      boss4s.sort((a, b) => a.x - b.x);
      for (let i = 0; i < boss4s.length; i++) {
        boss4s[i].drawTopHealthBar(context, i, boss4s.length);
      }

      this.ui.draw(context);

      if (this.stageIntroActive) {
        this.drawStageIntro(context);
      }

      if (this.finalBossEntranceActive) {
        this.drawFinalBossEntrance(context);
      }

      // Upgrade cards are the topmost interactive layer.
      if (this.upgradeCardsShowing) {
        for (let i = 0; i < this.upgradeCards.length; i++) {
          this.upgradeCards[i].draw(context);
        }
      }
    }

    drawEnemy(context, enemy) {
      if (!enemy?.mindControlled || !this.mindTintCtx) {
        enemy.draw(context);
        return;
      }

      const pad = 18;
      const w = Math.ceil(enemy.width + pad * 2);
      const h = Math.ceil(enemy.height + pad * 2);
      const tintCanvas = this.mindTintCanvas;
      const tintCtx = this.mindTintCtx;

      if (tintCanvas.width < w) tintCanvas.width = w;
      if (tintCanvas.height < h) tintCanvas.height = h;

      tintCtx.clearRect(0, 0, w, h);
      tintCtx.save();
      tintCtx.translate(-enemy.x + pad, -enemy.y + pad);
      enemy.draw(tintCtx);
      tintCtx.restore();

      tintCtx.save();
      tintCtx.globalCompositeOperation = 'source-atop';
      tintCtx.globalAlpha = 0.62;
      tintCtx.fillStyle = '#a100ff';
      tintCtx.fillRect(0, 0, w, h);
      tintCtx.restore();

      context.save();
      context.globalCompositeOperation = 'lighter';
      context.globalAlpha = 0.34;
      context.shadowColor = '#b14cff';
      context.shadowBlur = 16;
      context.fillStyle = 'rgba(177, 76, 255, 0.32)';
      context.beginPath();
      context.ellipse(
        enemy.x + enemy.width / 2,
        enemy.y + enemy.height / 2,
        enemy.width * 0.56,
        enemy.height * 0.56,
        0,
        0,
        Math.PI * 2
      );
      context.fill();
      context.restore();

      context.drawImage(
        tintCanvas,
        0,
        0,
        w,
        h,
        enemy.x - pad,
        enemy.y - pad,
        w,
        h
      );
    }

    getEnemyBulletRect(bullet) {
      if (!bullet) return null;
      const diameter =
        (Number.isFinite(bullet.radius) ? bullet.radius * 2 : null) ??
        (Number.isFinite(bullet.r) ? bullet.r * 2 : null) ??
        10;
      const width = bullet.width ?? bullet.w ?? bullet.size ?? diameter;
      const height = bullet.height ?? bullet.h ?? bullet.size ?? diameter;
      const x =
        bullet.width !== undefined || bullet.w !== undefined
          ? bullet.x
          : bullet.x - width / 2;
      const y =
        bullet.height !== undefined || bullet.h !== undefined
          ? bullet.y
          : bullet.y - height / 2;

      return { x, y, width, height };
    }

    destroyEnemyBulletArrayWithProjectile(projectile, bullets) {
      if (!Array.isArray(bullets)) return;

      for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        if (!bullet || bullet.markedForDeletion) continue;

        const rect = this.getEnemyBulletRect(bullet);
        if (!rect || !checkCollision(projectile, rect)) continue;

        bullet.markedForDeletion = true;
        this.spawnSparks(
          rect.x + rect.width / 2,
          rect.y + rect.height / 2,
          8,
          190
        );
      }

      compactArray(bullets);
    }

    destroyEnemyBulletsWithProjectile(projectile) {
      this.destroyEnemyBulletArrayWithProjectile(projectile, this.enemyBullets);

      for (let i = 0; i < this.enemies.length; i++) {
        this.destroyEnemyBulletArrayWithProjectile(
          projectile,
          this.enemies[i]?.enemyBullets
        );
      }
    }

    canPiercingDestroyBossBullets(projectile) {
      return (
        this.level === 100 &&
        !this.isInfinityWorld &&
        projectile?.piercing &&
        !projectile.markedForDeletion
      );
    }

    handleEnemyDeath(enemy, giveSuperCharge = true) {
      if (!enemy || enemy.markedForDeletion) return;
      playEnemyExplosionSound();

      if (enemy instanceof Boss4) {
        if (enemy.splitLevel < 2) {
          enemy.split();
          enemy.markedForDeletion = true;

          this.explosions.push(
            new Explosion(
              this,
              enemy.x + enemy.width / 2,
              enemy.y + enemy.height / 2
            )
          );

          return;
        }

        enemy.markedForDeletion = true;

        let hasOtherBoss4 = false;

        for (let i = 0; i < this.enemies.length; i++) {
          const e = this.enemies[i];
          if (e !== enemy && e instanceof Boss4 && !e.markedForDeletion) {
            hasOtherBoss4 = true;
            break;
          }
        }

        if (!hasOtherBoss4) {
          this.bossActive = false;

          if (this.isBossRushLevel) {
            this.score++;
            this.addSuperCharge(2);

            if (this.currentBossRushIndex >= this.bossRushQueue.length) {
              this.bossKilled = true;
              this.bossRushCleared = true;
              return;
            } else {
              this.bossRushPendingSpawn = true;
              this.beginUpgradeCards();
            }
          } else {
            this.bossKilled = true;
          }
        }

        this.explosions.push(
          new Explosion(
            this,
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2
          )
        );

        return;
      }
      if (enemy instanceof Angler5) {
        enemy.split();
      }

      enemy.markedForDeletion = true;

      const isBossEnemy =
        enemy instanceof Boss1 ||
        enemy instanceof Boss2 ||
        enemy instanceof Boss3 ||
        enemy instanceof Boss5 ||
        enemy instanceof Boss6 ||
        enemy instanceof Boss7 ||
        enemy instanceof Boss8 ||
        enemy instanceof Boss9 ||
        enemy instanceof Boss10 ||
        enemy instanceof BossPortalMaster;

      if (isBossEnemy) {
        this.bossActive = false;

        if (this.isBossRushLevel) {
          this.score++;

          if (giveSuperCharge) this.addSuperCharge(2);

          if (this.currentBossRushIndex >= this.bossRushQueue.length) {
            this.bossKilled = true;
            this.bossRushCleared = true;
          } else {
            this.bossRushPendingSpawn = true;
            this.beginUpgradeCards();
          }
        } else {
          this.bossKilled = true;
        }
      } else {
        this.score++;
        if (giveSuperCharge) this.addSuperCharge(1);
      }

      this.explosions.push(
        new Explosion(
          this,
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2
        )
      );
    }

    addEnemy() {
      if (this.isInfinityWorld) {
        this.addInfinityEnemy();
        return;
      }

      if (this.level === 100) return;
      if (this.level === 1) {
        this.enemies.push(new Angler1(this));
        return;
      }

      if (this.bossActive) return;

      const fallbackLevel = ENEMY_SPAWN_TABLE?.[1];
      const levelData = ENEMY_SPAWN_TABLE?.[this.level] || fallbackLevel;

      if (!levelData || !levelData.stages) return;

      const stageKeys = Object.keys(levelData.stages).map(Number);
      if (!stageKeys.length) return;

      const lastStage = Math.max(...stageKeys);
      const stageData =
        levelData.stages[this.stage] || levelData.stages[lastStage];

      if (!Array.isArray(stageData) || !stageData.length) return;

      const enemyClass = this.pickWeighted(stageData);
      if (!enemyClass) return;

      this.enemies.push(new enemyClass(this));
    }

    addInfinityEnemy() {
      const pool = [
        Angler4,
        Angler5,
        Angler6,
        Angler7,
        Angler8,
        Angler9,
        Angler10,
        Angler11,
        Angler12,
      ];
      const pressure = Math.min(this.stage - 1, 11);
      const start = Math.min(Math.floor(pressure / 3), pool.length - 1);
      const choices = pool.slice(start);
      const enemyClass = choices[Math.floor(Math.random() * choices.length)];
      if (enemyClass) this.enemies.push(new enemyClass(this));
    }

    pickWeighted(pool) {
      const total = pool.reduce((sum, entry) => sum + entry.weight, 0);
      let roll = Math.random() * total;

      for (const entry of pool) {
        roll -= entry.weight;
        if (roll <= 0) return entry.type;
      }

      return pool[pool.length - 1]?.type || null;
    }

    getSpawnSettings() {
      if (this.isInfinityWorld) {
        const pressure = Math.min(this.stage - 1, 11);
        return {
          enemyInterval: Math.max(260, 620 - pressure * 32),
          maxOnScreen: Math.min(12 + pressure, 24),
        };
      }

      const level = this.level;
      const stage = this.stage;

      const baseInterval = Math.max(700, 1750 - level * 35);
      const stageIntervalBonus = Math.max(0.72, 1 - (stage - 1) * 0.07);
      const enemyInterval = Math.max(500, baseInterval * stageIntervalBonus);

      const baseMaxOnScreen = Math.min(5 + Math.floor(level / 3), 10);
      const stageBonus = Math.min(stage - 1, 4);
      const maxOnScreen = Math.min(baseMaxOnScreen + stageBonus, 14);

      return {
        enemyInterval,
        maxOnScreen,
      };
    }

    applyUpgrade(type) {
      playUpgradeSound();
      switch (type) {
        case 'doubleShooter':
          this.player.doubleShot = true;
          break;

        case 'plusHp':
          this.player.lives++;
          break;

        case 'fasterShoter':
          this.player.fireRateMult = Math.max(
            0.25,
            this.player.fireRateMult * 0.65
          );
          break;

        case 'shild':
          this.player.activateShield(20000);

          break;

        case 'petFaster':
          if (this.pet) {
            this.petCooldownMult = Math.max(0.55, this.petCooldownMult - 0.15);
          }
          break;
        case 'damageUp':
          this.player.damageMultiplier =
            (this.player.damageMultiplier || 1) * 1.5;
          this.player.damage = this.player.damageMultiplier;
          break;

        case 'speedBoost':
          this.player.moveBoost = (this.player.moveBoost || 1) + 0.2;
          break;

        case 'piercingShot':
          this.player.piercingShot = true;
          break;

        case 'superCharge':
          this.addSuperCharge(2);
          break;
      }
    }

    getClosestEnemy(x, y) {
      let closest = null;
      let minDistSq = Infinity;

      for (let i = 0; i < this.enemies.length; i++) {
        const enemy = this.enemies[i];
        if (enemy.markedForDeletion) continue;

        const dx = enemy.x + enemy.width * 0.5 - x;
        const dy = enemy.y + enemy.height * 0.5 - y;
        const distSq = dx * dx + dy * dy;

        if (distSq < minDistSq) {
          minDistSq = distSq;
          closest = enemy;
        }
      }

      return closest;
    }

    spawnNextBossRushBoss() {
      if (!this.isBossRushLevel) return;
      if (this.currentBossRushIndex >= this.bossRushQueue.length) {
        this.bossRushCleared = true;
        this.bossActive = false;
        this.bossKilled = true;
        return;
      }

      const entry = this.bossRushQueue[this.currentBossRushIndex];

      if (entry.type === BossPortalMaster && !this.finalBossEntranceStarted) {
        this.startFinalBossEntrance(entry);
        return;
      }

      this.currentBossRushIndex++;

      this.bossActive = true;
      this.bossSpawned = true;
      this.bossRushPendingSpawn = false;

      this.enemies = [];
      this.enemyBullets = [];
      this.enemyMines = [];

      this.ui.showBoss(entry.text);
      this.enemies.push(new entry.type(this));
    }

    startFinalBossEntrance(entry) {
      this.finalBossEntranceActive = true;
      this.finalBossEntranceTimer = 0;
      this.finalBossEntranceEntry = entry;
      this.finalBossEntranceStarted = true;
      this.bossRushPendingSpawn = false;
      this.bossActive = true;
      this.bossSpawned = true;

      this.enemies = [];
      this.enemyBullets = [];
      this.enemyMines = [];
      this.player.projectiles.forEach((p) => (p.markedForDeletion = true));
      this.mouse.pressed = false;
      this.beginBossEntranceMusicDuck();
      this.triggerShake(1600, 18);
    }

    updateFinalBossEntrance(deltaTime) {
      this.finalBossEntranceTimer += deltaTime;

      if (this.player) {
        this.player.speedX = 0;
        this.player.speedY = 0;
      }

      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update(deltaTime);
      }
      compactArray(this.particles);

      for (let i = 0; i < this.explosions.length; i++) {
        this.explosions[i].update(deltaTime);
      }
      compactArray(this.explosions);

      const t = this.finalBossEntranceTimer;
      if (t > 900 && t < 4400 && Math.random() < 0.55) {
        const cx = this.width / 2 + rand(-90, 90);
        const cy = this.height * 0.28 + rand(-50, 80);
        this.spawnSparks(cx, cy, 3, 270);
      }

      if (t > 2100 && t < 2600) {
        this.shake = Math.max(this.shake, 0.9);
      }

      if (t < this.finalBossEntranceDuration) return;

      const entry = this.finalBossEntranceEntry;
      this.finalBossEntranceActive = false;
      this.finalBossEntranceEntry = null;
      this.finalBossEntranceTimer = 0;

      this.currentBossRushIndex++;
      this.bossActive = true;
      this.bossSpawned = true;
      this.bossRushPendingSpawn = false;
      this.enemies = [];
      this.enemyBullets = [];
      this.enemyMines = [];

      this.triggerShake(1300, 34);
      this.ui.showBoss(entry?.text || 'PORTAL MASTER');
      this.enemies.push(new (entry?.type || BossPortalMaster)(this));
    }

    drawFinalBossEntrance(ctx) {
      const duration = this.finalBossEntranceDuration || 5200;
      const t = Math.max(
        0,
        Math.min(1, this.finalBossEntranceTimer / duration)
      );
      const cx = this.width / 2;
      const cy = this.height * 0.31;
      const pulse = Math.sin(t * Math.PI * 8) * 0.5 + 0.5;
      const open = smoothstep(0.14, 0.46, t);
      const reveal = smoothstep(0.42, 0.78, t);
      const fade = 1 - smoothstep(0.9, 1, t);

      ctx.save();
      ctx.globalAlpha = fade;

      const dark = ctx.createRadialGradient(cx, cy, 70, cx, cy, this.height);
      dark.addColorStop(0, `rgba(23, 9, 50, ${0.25 + open * 0.25})`);
      dark.addColorStop(0.42, `rgba(2, 4, 18, ${0.58 + open * 0.2})`);
      dark.addColorStop(1, `rgba(0, 0, 0, ${0.88 + open * 0.1})`);
      ctx.fillStyle = dark;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((performance.now() * 0.0008) % (Math.PI * 2));

      for (let i = 0; i < 4; i++) {
        const radius = (44 + i * 27 + open * 78 + pulse * 8) * open;
        if (radius <= 0) continue;
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          radius * 1.28,
          radius * 0.48,
          i * 0.62,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle =
          i % 2 === 0
            ? `rgba(135, 92, 255, ${0.28 + open * 0.35})`
            : `rgba(80, 225, 255, ${0.22 + open * 0.32})`;
        ctx.lineWidth = 2 + open * 2;
        ctx.shadowColor = i % 2 === 0 ? '#8b5cf6' : '#38dfff';
        ctx.shadowBlur = 18 + pulse * 14;
        ctx.stroke();
      }

      ctx.restore();

      const portalRadius = (32 + open * 130 + pulse * 10) * open;
      const portal = ctx.createRadialGradient(cx, cy, 8, cx, cy, portalRadius);
      portal.addColorStop(0, `rgba(255, 255, 255, ${0.85 * open})`);
      portal.addColorStop(0.16, `rgba(91, 241, 255, ${0.72 * open})`);
      portal.addColorStop(0.42, `rgba(139, 92, 246, ${0.62 * open})`);
      portal.addColorStop(0.72, `rgba(35, 12, 82, ${0.65 * open})`);
      portal.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = portal;
      ctx.beginPath();
      ctx.arc(cx, cy, portalRadius, 0, Math.PI * 2);
      ctx.fill();

      const beam = ctx.createLinearGradient(0, cy - 20, 0, this.height);
      beam.addColorStop(0, `rgba(150, 95, 255, ${0.36 * reveal})`);
      beam.addColorStop(0.36, `rgba(56, 220, 255, ${0.18 * reveal})`);
      beam.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(cx - portalRadius * 0.24, cy);
      ctx.lineTo(cx + portalRadius * 0.24, cy);
      ctx.lineTo(cx + portalRadius * 0.75, this.height);
      ctx.lineTo(cx - portalRadius * 0.75, this.height);
      ctx.closePath();
      ctx.fill();

      const silhouetteAlpha = smoothstep(0.55, 0.86, t) * fade;
      if (silhouetteAlpha > 0) {
        const w = 122 + pulse * 10;
        const h = 144 + pulse * 14;
        const y = cy - h * 0.46 + Math.sin(performance.now() * 0.005) * 5;
        ctx.save();
        ctx.globalAlpha = silhouetteAlpha;
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 30;
        ctx.fillStyle = 'rgba(5, 0, 18, 0.92)';
        drawRoundedRect(ctx, cx - w / 2, y, w, h, 32);
        ctx.fill();
        ctx.restore();
      }

      this.drawFinalBossEntranceText(ctx, t, fade);

      ctx.restore();
    }

    drawFinalBossEntranceText(ctx, t, fade) {
      const cx = this.width / 2;
      const titleAlpha =
        smoothstep(0.18, 0.36, t) * (1 - smoothstep(0.76, 0.9, t)) * fade;
      const nameAlpha = smoothstep(0.5, 0.72, t) * fade;
      const subtitleAlpha = smoothstep(0.64, 0.82, t) * fade;

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (titleAlpha > 0) {
        ctx.globalAlpha = titleAlpha;
        ctx.font =
          '900 16px "Orbitron", "Archivo Black", system-ui, sans-serif';
        ctx.fillStyle = 'rgba(198, 238, 255, 0.95)';
        ctx.shadowColor = '#38dfff';
        ctx.shadowBlur = 16;
        ctx.fillText(
          gameT('game.finalBoss.gateOpening'),
          cx,
          this.height * 0.58
        );
      }

      if (nameAlpha > 0) {
        ctx.globalAlpha = nameAlpha;
        ctx.font = `900 ${Math.max(27, Math.min(40, this.width * 0.09))}px "Bungee", "Archivo Black", sans-serif`;
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(10, 0, 30, 0.9)';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 24;
        const bossName = gameT('game.finalBoss.name');
        ctx.strokeText(bossName, cx, this.height * 0.62);
        ctx.fillText(bossName, cx, this.height * 0.62);
      }

      if (subtitleAlpha > 0) {
        ctx.globalAlpha = subtitleAlpha;
        ctx.font = '800 12px "Orbitron", "Rubik", system-ui, sans-serif';
        ctx.fillStyle = 'rgba(196, 230, 255, 0.88)';
        ctx.shadowColor = '#38dfff';
        ctx.shadowBlur = 10;
        ctx.fillText(gameT('game.finalBoss.detected'), cx, this.height * 0.68);
      }

      ctx.restore();
    }

    getStageIntroTitle() {
      if (this.level === 100) return gameT('game.stage.100.title');
      if (this.level === 90) return gameT('game.stage.90.title');
      if (this.level === 80) return gameT('game.stage.80.title');
      if (this.level === 70) return gameT('game.stage.70.title');
      if (this.level === 60) return gameT('game.stage.60.title');
      return gameT('game.level', { level: this.level });
    }

    getStageIntroText() {
      if (this.level === 100) {
        return [
          gameT('game.stage.100.1'),
          gameT('game.stage.100.2'),
          gameT('game.stage.100.3'),
          gameT('game.stage.100.4'),
          gameT('game.stage.100.5'),
          gameT('game.stage.100.6'),
        ];
      }

      if (this.level === 90) {
        return [gameT('game.stage.90.1'), gameT('game.stage.90.2')];
      }

      if (this.level === 80) {
        return [gameT('game.stage.80.1'), gameT('game.stage.80.2')];
      }

      return [gameT('game.stage.default.1'), gameT('game.stage.default.2')];
    }

    getStageIntroLayout() {
      const boxW = Math.min(this.width * 0.9, 620);
      const boxH = Math.min(this.height * 0.84, 610);
      const boxX = (this.width - boxW) / 2;
      const boxY = (this.height - boxH) / 2;
      const buttonW = Math.min(270, boxW - 54);
      const buttonH = Math.max(50, Math.min(58, boxH * 0.105));

      return {
        boxW,
        boxH,
        boxX,
        boxY,
        button: {
          x: this.width / 2 - buttonW / 2,
          y: boxY + boxH - buttonH - 20,
          width: buttonW,
          height: buttonH,
        },
      };
    }

    getIntroSkipButtonRect() {
      return this.getStageIntroLayout().button;
    }

    drawStageIntro(ctx) {
      if (this.level !== 100 || !this.stageIntroActive) return;

      ctx.save();

      const layout = this.getStageIntroLayout();
      const { boxW, boxH, boxX, boxY, button } = layout;
      const cx = this.width / 2;
      const rtl = getLang?.() === 'he';

      const overlay = ctx.createRadialGradient(
        cx,
        this.height * 0.42,
        30,
        cx,
        this.height * 0.42,
        this.height * 0.75
      );
      overlay.addColorStop(0, 'rgba(24, 12, 55, 0.84)');
      overlay.addColorStop(0.5, 'rgba(3, 8, 24, 0.94)');
      overlay.addColorStop(1, 'rgba(0, 1, 8, 0.985)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.save();
      ctx.globalAlpha = 0.42;
      for (let i = 0; i < 24; i++) {
        const sx = (i * 97 + 31) % this.width;
        const sy = (i * 163 + 47) % this.height;
        const size = i % 5 === 0 ? 1.7 : 0.9;
        ctx.fillStyle = i % 4 === 0 ? '#efb9ff' : '#b8eeff';
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.save();
      ctx.shadowColor = 'rgba(155, 58, 255, 0.48)';
      ctx.shadowBlur = 28;
      const panelGradient = ctx.createLinearGradient(
        boxX,
        boxY,
        boxX + boxW,
        boxY + boxH
      );
      panelGradient.addColorStop(0, 'rgba(18, 25, 55, 0.985)');
      panelGradient.addColorStop(0.52, 'rgba(8, 12, 31, 0.99)');
      panelGradient.addColorStop(1, 'rgba(22, 6, 31, 0.99)');
      ctx.fillStyle = panelGradient;
      drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 22);
      ctx.fill();
      ctx.restore();

      const frameGradient = ctx.createLinearGradient(
        boxX,
        boxY,
        boxX + boxW,
        boxY + boxH
      );
      frameGradient.addColorStop(0, 'rgba(75, 225, 255, 0.82)');
      frameGradient.addColorStop(0.5, 'rgba(137, 75, 255, 0.5)');
      frameGradient.addColorStop(1, 'rgba(255, 70, 150, 0.78)');
      ctx.strokeStyle = frameGradient;
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 22);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(160, 220, 255, 0.12)';
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, boxX + 7, boxY + 7, boxW - 14, boxH - 14, 17);
      ctx.stroke();

      const corner = 30;
      ctx.strokeStyle = 'rgba(100, 235, 255, 0.9)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(boxX + 16, boxY);
      ctx.lineTo(boxX + 16 + corner, boxY);
      ctx.moveTo(boxX, boxY + 16);
      ctx.lineTo(boxX, boxY + 16 + corner);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 82, 166, 0.85)';
      ctx.beginPath();
      ctx.moveTo(boxX + boxW - 16 - corner, boxY + boxH);
      ctx.lineTo(boxX + boxW - 16, boxY + boxH);
      ctx.moveTo(boxX + boxW, boxY + boxH - 16 - corner);
      ctx.lineTo(boxX + boxW, boxY + boxH - 16);
      ctx.stroke();

      const badgeW = Math.min(150, boxW * 0.45);
      const badgeH = 23;
      const badgeX = cx - badgeW / 2;
      const badgeY = boxY + 19;
      ctx.fillStyle = 'rgba(116, 48, 190, 0.28)';
      ctx.strokeStyle = 'rgba(198, 130, 255, 0.55)';
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 11);
      ctx.fill();
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '800 9px "Orbitron", "Archivo Black", system-ui, sans-serif';
      ctx.fillStyle = 'rgba(230, 206, 255, 0.92)';
      ctx.fillText('FINAL MISSION', cx, badgeY + badgeH / 2 + 0.5);

      ctx.font = `900 ${Math.max(23, Math.min(31, boxW * 0.075))}px "Bungee", "Archivo Black", sans-serif`;
      const titleGradient = ctx.createLinearGradient(
        cx - boxW * 0.28,
        0,
        cx + boxW * 0.28,
        0
      );
      titleGradient.addColorStop(0, '#dffbff');
      titleGradient.addColorStop(0.55, '#ffffff');
      titleGradient.addColorStop(1, '#ffd9f2');
      ctx.fillStyle = titleGradient;
      ctx.shadowColor = 'rgba(122, 208, 255, 0.6)';
      ctx.shadowBlur = 14;
      ctx.fillText(this.stageIntroTitle, cx, boxY + 67);
      ctx.shadowBlur = 0;

      const dividerY = boxY + 91;
      const divider = ctx.createLinearGradient(
        boxX + 24,
        0,
        boxX + boxW - 24,
        0
      );
      divider.addColorStop(0, 'rgba(60, 220, 255, 0)');
      divider.addColorStop(0.5, 'rgba(126, 205, 255, 0.75)');
      divider.addColorStop(1, 'rgba(255, 75, 166, 0)');
      ctx.strokeStyle = divider;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(boxX + 24, dividerY);
      ctx.lineTo(boxX + boxW - 24, dividerY);
      ctx.stroke();

      const wrapText = (text, maxWidth) => {
        const words = text.split(' ');
        const lines = [];
        let line = '';

        for (let i = 0; i < words.length; i++) {
          const testLine = line ? line + ' ' + words[i] : words[i];
          const testWidth = ctx.measureText(testLine).width;

          if (testWidth > maxWidth && line) {
            lines.push(line);
            line = words[i];
          } else {
            line = testLine;
          }
        }

        if (line) lines.push(line);
        return lines;
      };

      const rules = this.stageIntroText || [];
      const listTop = dividerY + 13;
      const listBottom = button.y - 14;
      const rowGap = 5;
      const rowH = Math.max(
        38,
        (listBottom - listTop - rowGap * Math.max(0, rules.length - 1)) /
          Math.max(1, rules.length)
      );
      const rowX = boxX + 17;
      const rowW = boxW - 34;
      const numberSize = Math.min(27, rowH - 9);
      const fontSize = Math.max(10, Math.min(13.5, boxW * 0.034));
      const lineHeight = fontSize + 3;

      rules.forEach((paragraph, index) => {
        const y = listTop + index * (rowH + rowGap);
        const isReward = index === rules.length - 1;
        const rowGradient = ctx.createLinearGradient(rowX, y, rowX + rowW, y);
        rowGradient.addColorStop(
          0,
          isReward ? 'rgba(255, 180, 45, 0.15)' : 'rgba(48, 177, 255, 0.1)'
        );
        rowGradient.addColorStop(
          1,
          isReward ? 'rgba(255, 91, 154, 0.08)' : 'rgba(140, 65, 220, 0.07)'
        );
        ctx.fillStyle = rowGradient;
        ctx.strokeStyle = isReward
          ? 'rgba(255, 203, 91, 0.42)'
          : 'rgba(111, 205, 255, 0.16)';
        ctx.lineWidth = 1;
        drawRoundedRect(ctx, rowX, y, rowW, rowH, 8);
        ctx.fill();
        ctx.stroke();

        const numberX = rtl
          ? rowX + rowW - 12 - numberSize / 2
          : rowX + 12 + numberSize / 2;
        const numberY = y + rowH / 2;
        ctx.fillStyle = isReward
          ? 'rgba(255, 185, 48, 0.22)'
          : 'rgba(65, 185, 255, 0.16)';
        ctx.strokeStyle = isReward
          ? 'rgba(255, 218, 115, 0.7)'
          : 'rgba(90, 220, 255, 0.55)';
        ctx.beginPath();
        ctx.arc(numberX, numberY, numberSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.font = `900 ${Math.max(9, fontSize - 1)}px "Orbitron", "Archivo Black", sans-serif`;
        ctx.fillStyle = isReward ? '#ffe599' : '#c9f7ff';
        ctx.fillText(
          String(index + 1).padStart(2, '0'),
          numberX,
          numberY + 0.5
        );

        const textLeft = rtl ? rowX + 12 : numberX + numberSize / 2 + 12;
        const textRight = rtl
          ? numberX - numberSize / 2 - 12
          : rowX + rowW - 12;
        const textWidth = Math.max(70, textRight - textLeft);
        ctx.font = `700 ${fontSize}px "Rubik", Arial, sans-serif`;
        const wrappedLines = wrapText(paragraph, textWidth).slice(0, 2);
        ctx.textAlign = rtl ? 'right' : 'left';
        ctx.direction = rtl ? 'rtl' : 'ltr';
        ctx.fillStyle = isReward
          ? 'rgba(255, 238, 184, 0.96)'
          : 'rgba(232, 246, 255, 0.9)';
        const textX = rtl ? textRight : textLeft;
        let textY = numberY - ((wrappedLines.length - 1) * lineHeight) / 2;
        wrappedLines.forEach((line) => {
          ctx.fillText(line, textX, textY);
          textY += lineHeight;
        });
      });

      ctx.direction = 'inherit';
      ctx.save();
      ctx.shadowColor = 'rgba(255, 45, 130, 0.55)';
      ctx.shadowBlur = 18;
      const buttonGradient = ctx.createLinearGradient(
        button.x,
        button.y,
        button.x + button.width,
        button.y + button.height
      );
      buttonGradient.addColorStop(0, '#ff4e72');
      buttonGradient.addColorStop(0.55, '#c82fff');
      buttonGradient.addColorStop(1, '#634dff');
      ctx.fillStyle = buttonGradient;
      drawRoundedRect(ctx, button.x, button.y, button.width, button.height, 12);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,0.42)';
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, button.x, button.y, button.width, button.height, 12);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = `900 ${Math.max(14, Math.min(18, button.height * 0.31))}px "Orbitron", "Archivo Black", system-ui, sans-serif`;
      ctx.shadowColor = 'rgba(20,0,40,0.7)';
      ctx.shadowBlur = 6;
      ctx.fillText(
        gameT('game.enterChaos'),
        button.x + button.width / 2,
        button.y + button.height / 2 + 1
      );
      ctx.shadowBlur = 0;

      ctx.restore();
    }

    skipStageIntro() {
      if (this.level !== 100) return;
      this.stageIntroActive = false;
      this.stageIntroDone = true;
    }

    activateSuper() {
      const superMap = window.SUPER_TYPES || {};
      const superData = superMap[this.equippedSuper];
      if (!superData || !superData.class) return;
      if (this.superActive) return;

      this.superAttackReadyGauge =
        superData.charge ?? this.superAttackReadyGauge;

      this.superActive = true;
      this.superAttackGauge = 0;

      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].hitBySuper = false;
      }

      this.superAttacks.push(new superData.class(this));

      setTimeout(() => {
        this.superActive = false;
      }, superData.duration ?? 500);
    }

    clearSuperAttacks() {
      for (let i = 0; i < this.superAttacks.length; i++) {
        const attack = this.superAttacks[i];
        attack?.stopSound?.();
        if (attack) attack.markedForDeletion = true;
      }
      this.superAttacks.length = 0;
      this.superActive = false;
    }

    isSuperLaserActive() {
      return this.superAttacks.some((s) => s instanceof SuperLaser);
    }
  }

  function checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  window.checkCollision = checkCollision;

  function grantCoins(amount) {
    const current = Number(localStorage.getItem('coins')) || 0;
    localStorage.setItem('coins', current + amount);
    window.OrbitVelocityCloud?.markDirty?.();
  }

  (async () => {
    function waitDomImg(id) {
      return new Promise((resolve) => {
        const img = document.getElementById(id);
        if (!img) return resolve(null);
        img.decoding = 'async';

        const done = () => resolve(img);

        if (img.complete && (img.naturalWidth || img.width)) return done();

        img.onload = done;
        img.onerror = () => resolve(null);
      });
    }

    const PRELOAD_DOM_IMAGES = [
      'player',
      'playerRedClassic',
      'playerDarkReaper',
      'playerCelestialSakura',
      'playerGoldenCore',
      'missile',
      'chimboSprite',
      'sirenSprite',
      'angler1Sprite',
      'angler2Sprite',
      'angler3Sprite',
      'boss1Sprite',
    ];

    async function preload() {
      const [bgImg, explosionImg, ...domImgs] = await Promise.all([
        loadImage(ASSETS.bg),
        loadImage(ASSETS.explosion),
        ...PRELOAD_DOM_IMAGES.map(waitDomImg),
      ]);

      cached.bgImg = bgImg;
      cached.explosionImg = explosionImg;

      cached.dom = {};
      for (let i = 0; i < PRELOAD_DOM_IMAGES.length; i++) {
        cached.dom[PRELOAD_DOM_IMAGES[i]] = domImgs[i];
      }
    }
    setupMusic();
    setupSounds();
    bindGameButtonClicks();
    await preload();
    applyGameMusicSettings();

    EXPLOSION_IMG = cached.explosionImg;

    background = new ScrollingBackground(canvas, cached.bgImg, 1.2);
    stars = new Starfield(canvas, GAME_PERFORMANCE_PROFILE.starCount);

    game = new Game(logicalW, logicalH);
    window.currentOrbitVelocityGame = game;
    window.dispatchEvent(
      new CustomEvent('orbitvelocity:game-ready', { detail: { game } })
    );
    window.resumeOrbitVelocityMusic = applyGameMusicSettings;

    const FIXED_STEP = 1000 / 60;
    const MAX_FRAME_DELTA = 250;
    const MAX_UPDATE_STEPS = MOBILE_RUNTIME ? 3 : 5;
    let lastTime = 0;
    let accumulator = 0;
    let perfWindowTime = 0;
    let perfWindowFrames = 0;
    let perfLowWindows = 0;
    const resultScreen = document.getElementById('victoryScreen');

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        accumulator = 0;
        lastTime = 0;
      }
    });

    function tuneRenderQuality(frameDelta) {
      if (!MOBILE_RUNTIME || frameDelta <= 0) return;

      perfWindowTime += frameDelta;
      perfWindowFrames++;

      if (perfWindowTime < 900) return;

      const fps = (perfWindowFrames * 1000) / perfWindowTime;
      perfWindowTime = 0;
      perfWindowFrames = 0;

      if (
        fps < 48 &&
        renderQualityScale > GAME_PERFORMANCE_PROFILE.minRenderScale
      ) {
        perfLowWindows++;
        if (perfLowWindows >= 2) {
          renderQualityScale = Math.max(
            GAME_PERFORMANCE_PROFILE.minRenderScale,
            renderQualityScale - 0.08
          );
          resizeCanvas();
          perfLowWindows = 0;
        }
        return;
      }

      if (
        fps > 57 &&
        renderQualityScale < GAME_PERFORMANCE_PROFILE.renderScale
      ) {
        perfLowWindows = 0;
        renderQualityScale = Math.min(
          GAME_PERFORMANCE_PROFILE.renderScale,
          renderQualityScale + 0.04
        );
        resizeCanvas();
      }
    }

    function loop(timeStamp) {
      if (lastTime === 0) lastTime = timeStamp;

      if (
        game.gameOver &&
        resultScreen &&
        !resultScreen.classList.contains('hidden')
      ) {
        lastTime = timeStamp;
        accumulator = 0;
        requestAnimationFrame(loop);
        return;
      }

      let frameDelta = timeStamp - lastTime;
      lastTime = timeStamp;

      if (frameDelta > MAX_FRAME_DELTA) frameDelta = MAX_FRAME_DELTA;
      if (frameDelta < 0) frameDelta = 0;
      tuneRenderQuality(frameDelta);

      accumulator += frameDelta;

      let updateSteps = 0;
      while (accumulator >= FIXED_STEP && updateSteps < MAX_UPDATE_STEPS) {
        if (!game.upgradeCardsShowing) {
          background.update(FIXED_STEP);
          stars.update(FIXED_STEP, GAME_PERFORMANCE_PROFILE.starSpeed);
        }
        game.update(FIXED_STEP);
        accumulator -= FIXED_STEP;
        updateSteps++;
      }

      if (updateSteps >= MAX_UPDATE_STEPS && accumulator >= FIXED_STEP) {
        accumulator = 0;
      }

      ctx.clearRect(0, 0, logicalW, logicalH);

      background.draw();

      stars.draw();

      game.draw(ctx);

      drawVignette(ctx, logicalW, logicalH);
      drawScanlines(ctx, logicalW, logicalH);

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  })();
});

function restartGame() {
  game?.clearSuperAttacks?.();
  game = new Game(logicalW, logicalH);
}

function showVictoryScreen(data) {
  const gameCanvas = document.getElementById('gameBoard');
  if (gameCanvas) gameCanvas.style.cursor = 'default';

  if (typeof bgMusic !== 'undefined' && bgMusic) {
    bgMusic.pause();
  }

  const screen = document.getElementById('victoryScreen');
  const box = screen.querySelector('.victoryBox');
  const text = document.getElementById('rewardText');
  const title = screen.querySelector('h2');
  const nextBtn = document.getElementById('btnNext');
  const lobbyBtn = document.getElementById('btnLobby');
  const reviveBtn = document.getElementById('btnReviveAd');

  window.OrbitVelocityAds?.recordNaturalBreak();

  const navigateWithPossibleAd = (url) => {
    const navigate = () => {
      window.location.href = url;
    };
    window.OrbitVelocityAds?.runAfterInterstitial(navigate) ?? navigate();
  };

  screen.classList.remove('hidden', 'is-win', 'is-lose');
  box.classList.remove('is-win', 'is-lose');

  if (data.win) {
    reviveBtn?.classList.add('hidden');
    if (data.level === 100) {
      const isNew = unlockSkinReward('starbreaker');

      if (isNew) {
        showSkinRewardPopup('starbreaker', () => {
          window.location.href = 'loadingScreen.html?to=main.html';
        });
        return;
      }
    }

    screen.classList.add('is-win');
    box.classList.add('is-win');

    title.textContent = gameT('game.victory');
    text.textContent = gameT('game.reward', { coins: data.reward });

    if (data.level === 100) {
      nextBtn.classList.add('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = gameT('game.nextLevel');
    }

    nextBtn.onclick = () => {
      const nextLevel = `game.html?level=${data.level + 1}`;
      navigateWithPossibleAd(
        `loadingScreen.html?to=${encodeURIComponent(nextLevel)}&always=1`
      );
    };

    lobbyBtn.onclick = () => {
      navigateWithPossibleAd('loadingScreen.html?to=main.html');
    };
  } else {
    screen.classList.add('is-lose');
    box.classList.add('is-lose');

    title.textContent = gameT('game.gameOver');
    text.textContent = data.infinity
      ? `Infinity Score: ${data.score}`
      : gameT('game.betterLuck');
    nextBtn.textContent = gameT('game.tryAgain');
    nextBtn.classList.remove('hidden');

    const activeGame = window.currentOrbitVelocityGame;
    if (reviveBtn && activeGame && !activeGame.reviveAdUsed) {
      reviveBtn.classList.remove('hidden');
      reviveBtn.disabled = false;
      reviveBtn.textContent = gameT('game.reviveAd');
      reviveBtn.onclick = async () => {
        if (activeGame.reviveAdUsed || reviveBtn.disabled) return;

        reviveBtn.disabled = true;
        reviveBtn.textContent = gameT('game.reviveLoading');
        const result = await window.OrbitVelocityAds?.showRewardedAd();

        if (!result?.shown) {
          reviveBtn.disabled = false;
          reviveBtn.textContent = gameT('game.reviveUnavailable');
          return;
        }

        activeGame.reviveAdUsed = true;
        if (!result.rewarded) {
          reviveBtn.disabled = true;
          reviveBtn.textContent = gameT('game.reviveIncomplete');
          return;
        }

        reviveFromRewardedAd(activeGame);
      };
    } else {
      reviveBtn?.classList.add('hidden');
    }

    nextBtn.onclick = () => {
      const url = data.infinity
        ? 'game.html?mode=infinity'
        : `game.html?level=${data.level}`;
      navigateWithPossibleAd(url);
    };

    lobbyBtn.onclick = () => {
      navigateWithPossibleAd('loadingScreen.html?to=main.html');
    };
  }
}

function reviveFromRewardedAd(activeGame) {
  if (!activeGame?.gameOver || activeGame.win) return;

  activeGame.gameOver = false;
  activeGame.lost = false;
  activeGame.rewardGiven = false;
  activeGame.player.lives = 1;
  activeGame.player.goldenReviveLife = true;
  activeGame.player.activateShield(5000);

  for (const enemy of activeGame.enemies) {
    if (Object.hasOwn(enemy, '_speedBeforeGameOver')) {
      enemy.speedY = enemy._speedBeforeGameOver;
      delete enemy._speedBeforeGameOver;
    }
  }

  const screen = document.getElementById('victoryScreen');
  screen?.classList.add('hidden');
  screen?.classList.remove('is-win', 'is-lose');
  screen?.querySelector('.victoryBox')?.classList.remove('is-win', 'is-lose');
  window.resumeOrbitVelocityMusic?.();
}

function enterFullscreen() {
  const isMobile =
    window.matchMedia?.('(pointer: coarse)').matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isMobile) return;

  const el = document.documentElement;
  const request =
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.msRequestFullscreen;

  if (!request || document.fullscreenElement) return;

  try {
    const result = request.call(el);
    if (result?.catch) result.catch(() => {});
  } catch (e) {}
}

function compactArray(arr) {
  let write = 0;
  for (let read = 0; read < arr.length; read++) {
    if (!arr[read].markedForDeletion) {
      arr[write++] = arr[read];
    }
  }
  arr.length = write;
}

function updateAndCompact(arr, deltaTime) {
  let write = 0;

  for (let read = 0; read < arr.length; read++) {
    const item = arr[read];
    item.update(deltaTime);

    if (!item.markedForDeletion) {
      arr[write++] = item;
    }
  }

  arr.length = write;
}
