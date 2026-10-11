const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('www/javaScriptFiles/playGames.js', 'utf8');
const audienceSource = fs.readFileSync('www/javaScriptFiles/audience.js', 'utf8');

function game(band, acceptsSignIn, initialValues = {}) {
  const values = new Map([['coins', '123'], ['orbitvelocity.ageBand.v1', band]]);
  for (const [key, value] of Object.entries(initialValues)) values.set(key, value);
  const calls = [];
  const account = { disabled: false, querySelector() { return null; }, addEventListener() {} };
  const elements = { playGamesAccountBtn: account, playGamesPlayerName: {},
    playGamesConnectionStatus: { dataset: {} }, playGamesCloudStatus: {}, playGamesCloudDetails: {} };
  const handlers = {};
  const timers = new Map();
  let nextTimer = 0;
  const context = {
    console, clearTimeout(id) { timers.delete(id); }, clearInterval() {},
    CustomEvent: function (type) { this.type = type; },
    localStorage: { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) },
    document: { visibilityState: 'visible', addEventListener(name, fn) { handlers[name] = fn; }, getElementById: id => elements[id] || null },
    window: {
      addEventListener(name, fn) { handlers[name] = fn; }, dispatchEvent() {}, setInterval() {},
      setTimeout(fn) { const id = ++nextTimer; timers.set(id, fn); return id; },
      location: { reload() { calls.push(['reload']); } },
      OrbitVelocityAudience: { ready: Promise.resolve(band), isAdult: () => band === '18-plus' },
      Capacitor: { Plugins: { PlayGames: {
        async getStatus() { return { configured: true, signedIn: false }; },
        async signIn(options) {
          calls.push(['signIn', options.interactive]);
          return { signedIn: options.interactive && acceptsSignIn, displayName: 'Tester' };
        },
        async loadGame() { calls.push(['load']); return { found: false }; },
        async saveGame(options) { calls.push(['save', JSON.parse(options.data)]); return { saved: true, cloudVerified: true }; },
      } } },
    },
  };
  vm.runInNewContext(source, context);
  return { api: context.window.OrbitVelocityCloud, account, calls, values, elements, handlers, timers,
    plugin: context.window.Capacitor.Plugins.PlayGames };
}

test('clearing all app storage restores progress and preferences from a shared cloud save', async () => {
  let serverSave = null;
  const attachCloud = state => {
    state.plugin.loadGame = async () => ({ found: serverSave !== null, data: serverSave });
    state.plugin.saveGame = async options => {
      serverSave = options.data;
      state.calls.push(['save', JSON.parse(serverSave)]);
      return { saved: true, cloudVerified: true };
    };
  };
  const original = game('18-plus', true);
  attachCloud(original);
  const progress = { coins: '4200', maxUnlockedLevel: '51', ownedWeapons: '["laser","plasma"]',
    language: 'he', music: 'off', audio: 'on', musicVolume: '0', audioVolume: '35',
    musicVolumeBeforeMute: '27', audioVolumeBeforeMute: '35',
    'orbitvelocity.lobbyTutorialCompleted.v3': '1',
    'orbitvelocity.interactiveBossTutorialCompleted.v3': '1',
    'orbitvelocity.interactiveGameTutorialCompleted.v2': '1', dailyGiftLastClaim: '2026-10-04' };
  for (const [key, value] of Object.entries(progress)) original.values.set(key, value);
  await original.api.initialize();
  await original.api.connect();
  assert.ok(serverSave);

  // Exercise a second upload, including every account-save field. This catches
  // a save that only uploaded the initial inventory and never updated it.
  Object.assign(progress, {
    coins: '1700', maxUnlockedLevel: '61',
    ownedSkins: '["default","neon"]', equippedSkin: 'neon',
    ownedWeapons: '["laser","plasma"]', equippedWeapon: 'plasma',
    ownedPets: '["chimpo","siren"]', equippedPet: 'siren',
    ownedSupers: '["superlaser","meteor"]', equippedSuper: 'meteor',
    ownedDaily: '["daily-test-item"]', ownedFeatured: '1',
    language: 'he', music: 'on', audio: 'off', musicVolume: '27', audioVolume: '0',
    musicVolumeBeforeMute: '27', audioVolumeBeforeMute: '35',
    'orbitvelocity.ageBand.v1': '18-plus',
    'orbitvelocity.accountCreatedAt': '1700000000000',
    dailyGiftToday: '{"date":"2026-10-05","id":"test-gift"}',
    dailyGiftPoolVersion: '2', dailyGiftLastClaim: '2026-10-05',
    'orbitvelocity.shopAdRewardDate': '2026-10-05',
  });
  for (const [key, value] of Object.entries(progress)) original.values.set(key, value);
  original.api.markDirty();
  assert.equal(await original.api.saveNow(), true);
  const uploaded = JSON.parse(serverSave).data;
  assert.deepEqual(Object.keys(uploaded).sort(), Object.keys(progress).sort());
  for (const [key, value] of Object.entries(progress)) {
    const actual = Array.isArray(uploaded[key]) ? JSON.stringify(uploaded[key]) : String(uploaded[key]);
    assert.equal(actual, value, `uploaded ${key}`);
  }

  // A new VM and storage map represent Clear storage, not just closing the UI.
  const cleared = game('18-plus', true);
  cleared.values.clear();
  cleared.values.set('coins', '50');
  cleared.values.set('language', 'en');
  cleared.values.set('ownedPets', '["chimpo"]');
  attachCloud(cleared);
  await cleared.api.initialize();
  await cleared.api.connect();
  for (const [key, value] of Object.entries(progress)) assert.equal(cleared.values.get(key), value, key);
  assert.equal(cleared.calls.some(call => call[0] === 'save'), false);
  assert.equal(cleared.calls.filter(call => call[0] === 'reload').length, 1);
});

for (const legacy of [false, true]) {
  test(`Android-restored ${legacy ? 'legacy' : 'tracked'} backup cannot overwrite newer cloud progress`, async () => {
    const state = game('18-plus', true, {
      coins: '131', maxUnlockedLevel: '2',
      'orbitvelocity.cloudSaveMeta.v1': JSON.stringify({
      synced: true, updatedAt: Date.now() + 86400000, stateHash: 'old-backup',
      ...(!legacy ? { installationId: 'previous-install' } : {}),
      }),
    });
    state.plugin.getStatus = async () => ({ configured: true,
      installationId: 'new-install', freshInstall: true });
    const cloud = JSON.stringify({ version: 1, updatedAt: Date.now() - 10000,
      data: { coins: 181, maxUnlockedLevel: 3, 'orbitvelocity.ageBand.v1': '18-plus' } });
    state.plugin.loadGame = async () => ({ found: true, data: cloud });
    await state.api.initialize();
    await state.api.connect();
    assert.equal(state.values.get('coins'), '181');
    assert.equal(state.values.get('maxUnlockedLevel'), '3');
    assert.equal(state.calls.some(call => call[0] === 'save'), false);
    assert.equal(JSON.parse(state.values.get('orbitvelocity.cloudSaveMeta.v1')).installationId, 'new-install');
    // Further progress in this installation must upload normally.
    state.values.set('coins', '220');
    state.api.markDirty();
    await state.api.connect();
    assert.equal(state.calls.filter(call => call[0] === 'save').at(-1)[1].data.coins, 220);
  });
}

for (const installationId of [undefined, 'same-install']) {
  test(`in-place update preserves unsynced progress with ${installationId ? 'existing' : 'legacy'} metadata`, async () => {
    const state = game('18-plus', true, {
      coins: '240', maxUnlockedLevel: '3',
      'orbitvelocity.cloudSaveMeta.v1': JSON.stringify({ synced: true,
        updatedAt: Date.now(), stateHash: 'previous-state', installationId }),
    });
    state.plugin.getStatus = async () => ({ configured: true,
      installationId: 'same-install', freshInstall: false });
    state.plugin.loadGame = async () => ({ found: true, data: JSON.stringify({
      version: 1, updatedAt: 1000, data: { coins: 131, maxUnlockedLevel: 2 },
    }) });
    await state.api.initialize();
    await state.api.connect();
    assert.equal(state.values.get('coins'), '240');
    assert.equal(state.calls.filter(call => call[0] === 'save').at(-1)[1].data.coins, 240);
  });
}

test('missing or unavailable cloud save cannot upload a restored Android backup; retry restores even lower balances', async () => {
  const state = game('18-plus', true, {
    coins: '131', maxUnlockedLevel: '2',
    'orbitvelocity.cloudSaveMeta.v1': JSON.stringify({ synced: true,
      updatedAt: Date.now(), stateHash: 'old-backup', installationId: 'old-install' }),
  });
  state.plugin.getStatus = async () => ({ configured: true, installationId: 'new-install', freshInstall: true });
  await state.api.initialize();
  state.plugin.loadGame = async () => { throw { code: 'PGS_CLOUD_LOAD_7' }; };
  await state.api.connect();
  assert.equal(await state.api.saveNow(), false);
  state.plugin.loadGame = async () => ({ found: false });
  await state.api.connect();
  assert.match(state.elements.playGamesCloudStatus.textContent, /PGS_CLOUD_RESTORE_NOT_FOUND/);
  assert.equal(await state.api.saveNow(), false);
  assert.equal(state.calls.some(call => call[0] === 'save'), false);
  assert.equal(state.values.get('coins'), '131');
  state.plugin.loadGame = async () => ({ found: true, data: JSON.stringify({
    version: 1, updatedAt: 1000, data: { coins: 0, maxUnlockedLevel: 3 },
  }) });
  await state.api.connect();
  assert.equal(state.values.get('coins'), '0');
  assert.equal(state.values.get('maxUnlockedLevel'), '3');
  assert.equal(state.calls.some(call => call[0] === 'save'), false);
});

test('account age restores even when local gameplay is further ahead', async () => {
  const state = game('18-plus', true);
  state.values.set('maxUnlockedLevel', '80');
  state.plugin.loadGame = async () => ({ found: true, data: JSON.stringify({
    version: 1, updatedAt: 1000, data: { coins: 5, maxUnlockedLevel: 2, 'orbitvelocity.ageBand.v1': '9-12' },
  }) });
  await state.api.initialize();
  await state.api.connect();
  assert.equal(state.values.get('maxUnlockedLevel'), '80');
  assert.equal(state.values.get('orbitvelocity.ageBand.v1'), '9-12');
  const save = state.calls.find(call => call[0] === 'save')[1];
  assert.equal(save.data['orbitvelocity.ageBand.v1'], '9-12');
});

test('zero coins and settings-only saves beat fresh-install defaults', async () => {
  for (const coins of [0, 50]) {
    const state = game('18-plus', true);
    state.values.set('coins', '50');
    state.values.set('ownedSkins', '["default"]');
    state.values.set('ownedPets', '["chimpo"]');
    state.values.set('ownedWeapons', '["laser"]');
    state.values.set('language', 'en');
    state.plugin.loadGame = async () => ({ found: true, data: JSON.stringify({
      version: 1, updatedAt: 1000, data: { coins, maxUnlockedLevel: 1,
        language: 'he', music: 'off', musicVolume: '0' },
    }) });
    await state.api.initialize();
    await state.api.connect();
    assert.equal(state.values.get('coins'), String(coins));
    assert.equal(state.values.get('language'), 'he');
    assert.equal(state.values.get('music'), 'off');
    assert.equal(state.calls.some(call => call[0] === 'save'), false);
  }
});

test('an offline commit is not reported as a confirmed cloud backup', async () => {
  const state = game('18-plus', true);
  state.plugin.saveGame = async () => ({ saved: true, cloudVerified: false });
  await state.api.initialize();
  await state.api.connect();
  assert.match(state.elements.playGamesCloudStatus.textContent, /not confirmed/);
  assert.equal(state.account.disabled, false);
  assert.equal(state.account.textContent, 'SYNC NOW');
  assert.equal(await state.api.saveNow(), false);
  const pendingMeta = JSON.parse(state.values.get('orbitvelocity.cloudSaveMeta.v1'));
  assert.equal(pendingMeta.synced, false);
  assert.equal(pendingMeta.pendingUpload, true);
  state.plugin.saveGame = async () => ({ saved: true, cloudVerified: true });
  assert.equal(await state.api.saveNow(), true);
  assert.equal(state.elements.playGamesCloudStatus.textContent, 'Progress saved to the cloud');
  assert.equal(JSON.parse(state.values.get('orbitvelocity.cloudSaveMeta.v1')).pendingUpload, false);
});

test('retrying an unconfirmed upload keeps newer local spending instead of restoring older richer data', async () => {
  const state = game('18-plus', true);
  state.plugin.saveGame = async () => ({ saved: true, cloudVerified: false });
  await state.api.initialize();
  await state.api.connect();
  state.values.set('coins', '0');
  state.api.markDirty();
  await state.api.saveNow();
  state.plugin.loadGame = async () => ({ found: true, data: JSON.stringify({
    version: 1, updatedAt: 1000, data: { coins: 9000, maxUnlockedLevel: 1 },
  }) });
  let uploaded;
  state.plugin.saveGame = async options => {
    uploaded = JSON.parse(options.data);
    return { saved: true, cloudVerified: true };
  };
  await state.api.connect();
  assert.equal(state.values.get('coins'), '0');
  assert.equal(uploaded.data.coins, 0);
});

test('stale empty cloud results never create a replacement save', async () => {
  const state = game('18-plus', true);
  state.plugin.loadGame = async () => ({ found: false, stale: true });
  await state.api.initialize();
  await state.api.connect();
  assert.match(state.elements.playGamesCloudStatus.textContent, /PGS_CLOUD_LOAD_STALE/);
  assert.equal(await state.api.saveNow(), false);
  assert.equal(state.calls.some(call => call[0] === 'save'), false);
});

test('a fresh device restores cloud coins and unlocked worlds despite newer local defaults', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  state.api.markDirty();
  state.plugin.loadGame = async () => ({ found: true, data: JSON.stringify({
    version: 1, updatedAt: 1000, data: { coins: 9876, maxUnlockedLevel: 41 },
  }) });
  await state.api.connect();
  assert.equal(state.values.get('coins'), '9876');
  assert.equal(state.values.get('maxUnlockedLevel'), '41');
  assert.equal(state.calls.some(call => call[0] === 'save'), false);
  assert.equal(state.calls.filter(call => call[0] === 'reload').length, 1);
  state.plugin.loadGame = async () => ({ found: true, data: JSON.stringify({
    version: 1, updatedAt: 2000, data: { coins: 8000, maxUnlockedLevel: 61 },
  }) });
  await state.api.connect();
  assert.equal(state.values.get('coins'), '8000');
  assert.equal(state.values.get('maxUnlockedLevel'), '61');
  assert.equal(state.calls.filter(call => call[0] === 'reload').length, 2);
});

test('a purchase made between page visits uploads the new balance even without a dirty notification', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  await state.api.connect();
  const remote = state.calls.find(call => call[0] === 'save')[1];
  remote.updatedAt = 1000;
  const meta = JSON.parse(state.values.get('orbitvelocity.cloudSaveMeta.v1'));
  state.values.set('orbitvelocity.cloudSaveMeta.v1', JSON.stringify({ ...meta, updatedAt: 1000 }));
  state.values.set('coins', '0');
  state.values.set('maxUnlockedLevel', '21');
  state.plugin.loadGame = async () => ({ found: true, data: JSON.stringify(remote) });
  await state.api.connect();
  const latest = state.calls.filter(call => call[0] === 'save').at(-1)[1];
  assert.equal(latest.data.coins, 0);
  assert.equal(latest.data.maxUnlockedLevel, 21);
  assert.ok(latest.updatedAt > 1000);
});

test('sync uploads new progress when the unchanged cloud save has a future timestamp', async () => {
  const state = game('18-plus', true);
  let server = JSON.stringify({ version: 1, updatedAt: Date.now() + 86400000,
    data: { coins: 131, maxUnlockedLevel: 1, 'orbitvelocity.ageBand.v1': '18-plus' } });
  state.plugin.loadGame = async () => ({ found: true, data: server });
  state.plugin.saveGame = async options => {
    server = options.data;
    return { saved: true, cloudVerified: true };
  };
  await state.api.initialize();
  await state.api.connect();
  assert.equal(state.values.get('coins'), '131');
  state.values.set('coins', '240');
  state.api.markDirty();
  await state.api.connect();
  assert.equal(state.values.get('coins'), '240');
  assert.equal(JSON.parse(server).data.coins, 240);
  assert.match(state.elements.playGamesCloudDetails.textContent, /240 coins/);
  const reinstalled = game('18-plus', true);
  reinstalled.values.clear();
  reinstalled.values.set('coins', '50');
  reinstalled.plugin.loadGame = async () => ({ found: true, data: server });
  await reinstalled.api.initialize();
  await reinstalled.api.connect();
  assert.equal(reinstalled.values.get('coins'), '240');
  assert.equal(reinstalled.calls.some(call => call[0] === 'save'), false);
  assert.match(reinstalled.elements.playGamesCloudDetails.textContent, /240 coins/);
});

test('cloud details keep the last confirmed balance when a new upload is not confirmed', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  await state.api.connect();
  assert.match(state.elements.playGamesCloudDetails.textContent, /123 coins/);
  state.values.set('coins', '999');
  state.plugin.saveGame = async () => ({ saved: true, cloudVerified: false });
  await state.api.saveNow();
  assert.match(state.elements.playGamesCloudDetails.textContent, /123 coins/);
  assert.match(state.elements.playGamesCloudStatus.textContent, /not confirmed/);
});

test('continuous changes do not postpone saving indefinitely', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  await state.api.connect();
  state.values.set('coins', '456');
  state.api.markDirty();
  const firstTimer = [...state.timers.keys()][0];
  state.values.set('coins', '789');
  state.values.set('maxUnlockedLevel', '31');
  state.api.markDirty();
  assert.deepEqual([...state.timers.keys()], [firstTimer]);
  await state.timers.get(firstTimer)();
  const latest = state.calls.filter(call => call[0] === 'save').at(-1)[1];
  assert.equal(latest.data.coins, 789);
  assert.equal(latest.data.maxUnlockedLevel, 31);
});

test('flushing during an upload also writes progress earned while that upload was pending', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  await state.api.connect();
  const uploads = [];
  let finish;
  state.plugin.saveGame = async options => {
    uploads.push(JSON.parse(options.data));
    if (uploads.length === 1) await new Promise(resolve => { finish = resolve; });
    return { saved: true, cloudVerified: true };
  };
  state.values.set('coins', '500');
  const first = state.api.saveNow();
  await new Promise(resolve => setImmediate(resolve));
  state.values.set('coins', '600');
  state.values.set('maxUnlockedLevel', '51');
  const flush = state.api.saveNow();
  finish();
  await Promise.all([first, flush]);
  assert.equal(uploads.length, 2);
  assert.equal(uploads[1].data.coins, 600);
  assert.equal(uploads[1].data.maxUnlockedLevel, 51);
});

test('cloud errors expose a native diagnostic while retaining the connected player', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  state.plugin.loadGame = async () => { throw { code: 'PGS_CLOUD_LOAD_26502' }; };
  await state.api.connect();
  assert.equal(state.api.isSignedIn(), true);
  assert.match(state.elements.playGamesCloudStatus.textContent, /PGS_CLOUD_LOAD_26502/);
  assert.equal(state.values.get('coins'), '123');
});

for (const band of ['5-and-under', '6-8', '9-12', '13-15', '16-17', '18-plus', 'unknown']) {
  test(`${band}: optional connection can save progress`, async () => {
    const state = game(band, true);
    await state.api.initialize();
    assert.equal(state.account.disabled, false);
    assert.equal(state.account.textContent, 'CONNECT PLAY GAMES');
    assert.equal(state.calls.some(call => call[0] === 'save'), false);
    await state.api.connect();
    assert.equal(state.api.isSignedIn(), true);
    assert.equal(state.elements.playGamesPlayerName.textContent, 'Tester');
    assert.equal(state.elements.playGamesConnectionStatus.dataset.state, 'connected');
    assert.equal(state.elements.playGamesCloudStatus.textContent, 'Progress saved to the cloud');
    const save = state.calls.find(call => call[0] === 'save')[1];
    assert.equal(save.data.coins, 123);
    assert.equal(save.data['orbitvelocity.ageBand.v1'], band);
  });

  test(`${band}: denied connection preserves local progress and permits retry`, async () => {
    const state = game(band, false);
    await state.api.initialize();
    await state.api.connect();
    assert.equal(state.api.isSignedIn(), false);
    assert.equal(state.account.disabled, false);
    assert.equal(state.elements.playGamesConnectionStatus.dataset.state, 'failed');
    assert.equal(state.account.textContent, 'TRY AGAIN');
    assert.equal(await state.api.saveNow(), false);
    assert.equal(state.calls.some(call => call[0] === 'load' || call[0] === 'save'), false);
    assert.equal(state.values.get('coins'), '123');
  });
}

test('child audience click guard permits Play Games but still blocks social links', () => {
  let click;
  vm.runInNewContext(audienceSource, {
    window: {}, localStorage: { getItem: () => '9-12' },
    document: { readyState: 'loading', documentElement: { classList: { toggle() {} } },
      addEventListener(name, fn) { if (name === 'click') click = fn; } },
  });
  for (const [id, expected] of [['playGamesAccountBtn', false], ['socialBtn', true]]) {
    let blocked = false;
    click({ target: { closest: selector => selector.split(',').map(s => s.trim()).includes(`#${id}`) },
      preventDefault() { blocked = true; }, stopImmediatePropagation() {} });
    assert.equal(blocked, expected);
  }
});

test('cloud load failure preserves signed-in name and reports sync failure without writing', async () => {
  const state = game('9-12', true);
  await state.api.initialize();
  state.plugin.loadGame = async () => { throw new Error('offline'); };
  await state.api.connect();
  assert.equal(state.api.isSignedIn(), true);
  assert.equal(state.elements.playGamesPlayerName.textContent, 'Tester');
  assert.equal(state.elements.playGamesConnectionStatus.dataset.state, 'connected');
  assert.match(state.elements.playGamesCloudStatus.textContent, /sync failed/);
  assert.equal(state.calls.some(call => call[0] === 'save'), false);
  state.api.markDirty();
  assert.equal(await state.api.saveNow(), false);
  assert.equal(state.calls.some(call => call[0] === 'save'), false);
  assert.equal(state.account.disabled, false);
  assert.equal(state.account.textContent, 'TRY AGAIN');
  state.plugin.loadGame = async () => ({ found: false });
  await state.api.connect();
  assert.equal(state.calls.filter(call => call[0] === 'save').length, 1);
  assert.equal(state.elements.playGamesCloudStatus.textContent, 'Progress saved to the cloud');
});

test('pending cloud restore blocks uploads and concurrent reconnects', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  let finishLoad;
  state.plugin.loadGame = () => new Promise(resolve => { finishLoad = resolve; });
  const pending = state.api.connect();
  await new Promise(resolve => setImmediate(resolve));
  const signIns = state.calls.filter(call => call[0] === 'signIn').length;
  assert.equal(await state.api.saveNow(), false);
  await state.api.connect();
  state.handlers.visibilitychange();
  assert.equal(state.calls.filter(call => call[0] === 'signIn').length, signIns);
  assert.equal(state.account.disabled, true);
  finishLoad({ found: false });
  await pending;
  assert.equal(state.calls.filter(call => call[0] === 'save').length, 1);
});

test('invalid or newer cloud save cannot be overwritten by local progress', async () => {
  for (const result of [undefined, { found: true, data: 'broken' },
    { found: true, data: JSON.stringify({ version: 2, data: { coins: 999 } }) },
    { found: true, data: JSON.stringify({ version: 1, data: null }) }]) {
    const state = game('18-plus', true);
    await state.api.initialize();
    state.plugin.loadGame = async () => result;
    await state.api.connect();
    assert.equal(state.api.isSignedIn(), true);
    assert.equal(await state.api.saveNow(), false);
    assert.equal(state.calls.some(call => call[0] === 'save'), false);
    assert.equal(state.values.get('coins'), '123');
  }
});

test('pending login is visible and duplicate clicks do not launch more sign-ins', async () => {
  const state = game('unknown', true);
  await state.api.initialize();
  let resolve;
  let calls = 0;
  state.plugin.signIn = () => { calls++; return new Promise(r => { resolve = r; }); };
  const pending = state.api.connect();
  assert.equal(state.account.textContent, 'Connecting…');
  assert.equal(state.account.disabled, true);
  await state.api.connect();
  assert.equal(calls, 1);
  resolve({ signedIn: true, displayName: 'Pilot' });
  await pending;
  assert.equal(state.elements.playGamesPlayerName.textContent, 'Pilot');
});

test('native auth diagnostic reaches the screen and clears after a successful retry', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  state.plugin.signIn = async () => { throw { code: 'PGS_PROFILE_26502' }; };
  await state.api.connect();
  assert.match(state.elements.playGamesConnectionStatus.textContent, /PGS_PROFILE_26502/);
  assert.equal(state.account.disabled, false);
  state.plugin.signIn = async () => ({ signedIn: true, displayName: 'Pilot' });
  await state.api.connect();
  assert.doesNotMatch(state.elements.playGamesConnectionStatus.textContent, /PGS_/);
  assert.equal(state.elements.playGamesPlayerName.textContent, 'Pilot');
});

test('returning to app refreshes automatic login and translated status preserves player name', async () => {
  const state = game('18-plus', true);
  await state.api.initialize();
  state.plugin.signIn = async () => ({ signedIn: true, displayName: 'Returning pilot' });
  state.handlers.visibilitychange();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(state.elements.playGamesPlayerName.textContent, 'Returning pilot');
  state.values.set('language', 'he');
  state.api.refreshUi();
  assert.equal(state.elements.playGamesConnectionStatus.textContent, 'מחובר ל־Google Play Games');
  assert.equal(state.elements.playGamesPlayerName.textContent, 'Returning pilot');
});
