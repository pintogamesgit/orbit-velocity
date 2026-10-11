const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

for (const kind of ['lobby', 'game']) {
  test(`${kind} tutorial waits for account restoration before checking completion`, async () => {
    let finishRestore;
    const ready = new Promise(resolve => { finishRestore = resolve; });
    const storage = new Map();
    const handlers = {};
    const timers = [];
    let overlays = 0;
    const context = {
      URLSearchParams,
      localStorage: { getItem: key => storage.get(key) ?? null },
      requestAnimationFrame: () => 1,
      window: {
        location: { search: '?level=1' },
        OrbitVelocityCloud: { ready, canStartTutorial: () => true },
        addEventListener: (name, handler) => { handlers[name] = handler; },
        setTimeout: fn => { timers.push(fn); },
      },
      document: {
        addEventListener: (name, handler) => { handlers[name] = handler; },
        createElement: () => { overlays++; throw new Error('Completed tutorial must not open'); },
      },
    };
    const file = kind === 'lobby' ? 'main/lobbyTutorial.js' : 'game/gameTutorial.js';
    vm.runInNewContext(fs.readFileSync(`www/javaScriptFiles/${file}`, 'utf8'), context);
    const game = { mouse: {}, superAttacks: [] };
    const pending = kind === 'lobby'
      ? handlers.DOMContentLoaded()
      : handlers['orbitvelocity:game-ready']({ detail: { game } });
    assert.equal(timers.length, 0);
    assert.equal(overlays, 0);
    if (kind === 'game') assert.equal(game.tutorialPaused, true);
    for (const key of ['orbitvelocity.lobbyTutorialCompleted.v3',
      'orbitvelocity.interactiveGameTutorialCompleted.v2',
      'orbitvelocity.interactiveBossTutorialCompleted.v3']) storage.set(key, '1');
    finishRestore();
    await pending;
    timers.forEach(fn => fn());
    assert.equal(overlays, 0);
    if (kind === 'game') assert.equal(game.tutorialPaused, false);
  });
}
