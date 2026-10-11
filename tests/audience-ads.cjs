const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const audienceSource = fs.readFileSync('www/javaScriptFiles/audience.js', 'utf8');
const adsSource = fs.readFileSync('www/javaScriptFiles/ads.js', 'utf8');

function audience(saved, brokenStorage = false) {
  const handlers = {};
  const context = {
    window: {}, navigator: { language: 'en' },
    localStorage: { getItem() { if (brokenStorage) throw Error('blocked'); return saved; } },
    document: { readyState: 'loading', documentElement: { classList: { toggle() {} } },
      addEventListener(name, fn) { handlers[name] = fn; }, getElementById() { return null; } },
  };
  vm.runInNewContext(audienceSource, context);
  return { api: context.window.OrbitVelocityAudience, handlers };
}

for (const band of ['5-and-under', '6-8', '9-12', '13-15', '16-17', 'unknown', null, 'bad-value']) {
  test(`age ${band}: never treated as adult`, () => assert.equal(audience(band).api.isAdult(), false));
}
test('blocked storage fails closed', () => assert.equal(audience(null, true).api.isAdult(), false));
test('saved adult resolves ready', async () => {
  const { api, handlers } = audience('18-plus');
  handlers.DOMContentLoaded();
  assert.equal(await api.ready, '18-plus');
  assert.equal(api.isAdult(), true);
});

test('cloud age is restored before opening the age dialog after clearing storage', async () => {
  let finishCloud;
  const cloudReady = new Promise(resolve => { finishCloud = resolve; });
  const values = new Map();
  const handlers = {};
  let dialogs = 0;
  const context = {
    window: { OrbitVelocityCloud: { ready: cloudReady } }, navigator: { language: 'en' },
    localStorage: { getItem: key => values.get(key) ?? null },
    document: { readyState: 'loading', documentElement: { classList: { toggle() {} } },
      getElementById() { return null; }, createElement() { dialogs++; throw Error('Unexpected age dialog'); },
      addEventListener(name, fn) { handlers[name] = fn; } },
  };
  vm.runInNewContext(audienceSource, context);
  handlers.DOMContentLoaded();
  assert.equal(dialogs, 0);
  assert.equal(context.window.OrbitVelocityAudience.isAdult(), false);
  values.set('orbitvelocity.ageBand.v1', '9-12');
  finishCloud();
  assert.equal(await context.window.OrbitVelocityAudience.ready, '9-12');
  assert.equal(dialogs, 0);
  assert.equal(context.window.OrbitVelocityAudience.isAdult(), false);
  assert.equal(context.window.OrbitVelocityAudience.restoreBand('invalid'), false);
  assert.equal(context.window.OrbitVelocityAudience.getBand(), '9-12');
});

for (const selection of ['5-and-under', '13-15', 'unknown', '18-plus']) {
  test(`new user's neutral age dialog saves ${selection}`, async () => {
    const listeners = {};
    const stored = {};
    const elements = Object.fromEntries(['h1', 'p', 'button', 'a', 'form'].map(key => [key, {
      addEventListener(name, fn) { this[name] = fn; },
    }]));
    elements.select = { value: '', options: [], add(option) { this.options.push(option); },
      addEventListener(name, fn) { this[name] = fn; } };
    const dialog = { setAttribute() {}, querySelector: key => elements[key],
      addEventListener() {}, showModal() { this.open = true; }, close() { this.open = false; }, remove() {} };
    const context = { window: {}, navigator: { language: 'he' },
      Option: function(text, value, defaultSelected, selected) { return { text, value, selected }; },
      localStorage: { getItem: key => stored[key] || null, setItem: (key, value) => { stored[key] = value; } },
      document: { readyState: 'loading', documentElement: { classList: { toggle() {} } },
        body: { append() {} }, createElement: () => dialog, getElementById() { return null; },
        addEventListener: (name, fn) => { listeners[name] = fn; } },
    };
    vm.runInNewContext(audienceSource, context);
    listeners.DOMContentLoaded();
    assert.equal(dialog.open, true);
    assert.equal(dialog.dir, 'rtl');
    assert.equal(elements.select.options[0].value, '');
    assert.equal(elements.select.options[0].disabled, true);
    assert.equal(context.window.OrbitVelocityAudience.isAdult(), false);
    elements.select.value = selection;
    elements.select.change();
    assert.equal(elements.button.disabled, false);
    elements.form.submit({ preventDefault() {} });
    assert.equal(await context.window.OrbitVelocityAudience.ready, selection);
    assert.equal(stored['orbitvelocity.ageBand.v1'], selection);
    assert.equal(dialog.open, false);
    assert.equal(context.window.OrbitVelocityAudience.isAdult(), selection === '18-plus');
  });
}

function ads(isAdult, consent, ready = Promise.resolve()) {
  const calls = [];
  let initialize;
  const mock = {
    async addListener() {},
    async requestConsentInfo() { calls.push('consent'); return consent; },
    async showConsentForm() { calls.push('form'); return { canRequestAds: true }; },
    async initialize(options) {
      calls.push('initialize');
      assert.equal(options.maxAdContentRating, 'General');
      assert.equal(options.tagForChildDirectedTreatment, true);
      assert.equal(options.tagForUnderAgeOfConsent, false);
    },
    async prepareInterstitial(options) {
      calls.push('interstitial');
      assert.ok(calls.includes('initialize'));
      assert.equal(options.npa, true);
    },
    async prepareRewardVideoAd(options) {
      calls.push('rewarded');
      assert.ok(calls.includes('initialize'));
      assert.equal(options.npa, true);
    },
  };
  const context = {
    console, localStorage: { getItem() { return null; }, setItem() {} },
    document: { getElementById() { return null; } },
    window: {
      OrbitVelocityAudience: { ready, isAdult: () => isAdult },
      Capacitor: { Plugins: { AdMob: mock } },
      addEventListener(name, fn) { if (name === 'DOMContentLoaded') initialize = fn; },
    },
  };
  vm.runInNewContext(adsSource, context);
  return { calls, initialize, api: context.window.OrbitVelocityAds };
}
test('minor / unknown: no SDK or consent calls, rewarded blocked, gameplay continues', async () => {
  const state = ads(false, { canRequestAds: true });
  await state.initialize();
  assert.deepEqual(state.calls, []);
  assert.equal((await state.api.showRewardedAd()).shown, false);
  let continued = false;
  await state.api.runAfterInterstitial(() => { continued = true; });
  assert.equal(continued, true);
});
test('no SDK calls while age choice is pending', async () => {
  let resolve;
  const state = ads(true, { canRequestAds: true }, new Promise(r => { resolve = r; }));
  const pending = state.initialize();
  await Promise.resolve();
  assert.deepEqual(state.calls, []);
  resolve(); await pending;
  assert.deepEqual(state.calls, ['consent', 'initialize', 'interstitial', 'rewarded']);
});
test('adult without consent cannot initialize advertising', async () => {
  const state = ads(true, { canRequestAds: false, isConsentFormAvailable: false });
  await state.initialize();
  assert.deepEqual(state.calls, ['consent']);
});
test('adult consent form precedes SDK initialization and preloads', async () => {
  const state = ads(true, { canRequestAds: false, isConsentFormAvailable: true });
  await state.initialize();
  assert.deepEqual(state.calls, ['consent', 'form', 'initialize', 'interstitial', 'rewarded']);
});
