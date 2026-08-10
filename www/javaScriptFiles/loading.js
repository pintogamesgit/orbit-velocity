const params = new URLSearchParams(location.search);
const to = params.get('to')
  ? decodeURIComponent(params.get('to'))
  : 'main.html';

const fillEl = document.getElementById('loadingFill');
const pctEl = document.getElementById('loadingPct');
const titleEl = document.getElementById('loadingTitle');
const subtitleEl = document.getElementById('loadingSubtitle');
const modeLabelEl = document.getElementById('loadingModeLabel');
const sectorEl = document.getElementById('loadingSector');

const LOADING_COPY = {
  en: {
    boot: ['INITIALIZING ORBIT VELOCITY', 'Starting cosmic flight systems'],
    level: ['PREPARING LEVEL {level}', 'Mapping enemies and battle sector'],
    infinity: ['ENTERING INFINITY', 'Charting an endless battle sector'],
  },
  he: {
    boot: ['מאתחל את ORBIT VELOCITY', 'מפעיל את מערכות הטיסה הקוסמיות'],
    level: ['מכין את שלב {level}', 'טוען אויבים וממפה את אזור הקרב'],
    infinity: ['נכנסים לאינסוף', 'מכין אזור קרב ללא סוף'],
  },
  es: {
    boot: ['INICIANDO ORBIT VELOCITY', 'Activando sistemas de vuelo cósmico'],
    level: ['PREPARANDO NIVEL {level}', 'Cargando enemigos y sector de batalla'],
    infinity: ['ENTRANDO AL INFINITO', 'Trazando un sector de batalla eterno'],
  },
};
const loadingLanguage = localStorage.getItem('language') || 'en';
Object.assign(LOADING_COPY.en, {
  language: ['LOADING NEW LANGUAGE', 'Updating the game text and interface'],
  modeGame: 'SECTOR DATA',
  modeBoot: 'GAME SYSTEMS',
  modeLanguage: 'LANGUAGE DATA',
  sectorInfinity: 'INFINITY SECTOR',
  sectorGame: 'SECTOR {level}',
  sectorLanguage: 'TEXT SYSTEMS',
  sectorHome: 'HOME SECTOR',
});
LOADING_COPY.he = {
  boot: [
    '\u05de\u05d0\u05ea\u05d7\u05dc \u05d0\u05ea ORBIT VELOCITY',
    '\u05de\u05e4\u05e2\u05d9\u05dc \u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05d8\u05d9\u05e1\u05d4 \u05e7\u05d5\u05e1\u05de\u05d9\u05d5\u05ea',
  ],
  level: [
    '\u05de\u05db\u05d9\u05df \u05d0\u05ea \u05e9\u05dc\u05d1 {level}',
    '\u05d8\u05d5\u05e2\u05df \u05d0\u05d5\u05d9\u05d1\u05d9\u05dd \u05d5\u05de\u05de\u05e4\u05d4 \u05d0\u05ea \u05d0\u05d6\u05d5\u05e8 \u05d4\u05e7\u05e8\u05d1',
  ],
  infinity: [
    '\u05e0\u05db\u05e0\u05e1\u05d9\u05dd \u05dc\u05d0\u05d9\u05e0\u05e1\u05d5\u05e3',
    '\u05de\u05db\u05d9\u05df \u05d0\u05d6\u05d5\u05e8 \u05e7\u05e8\u05d1 \u05dc\u05dc\u05d0 \u05e1\u05d5\u05e3',
  ],
  language: [
    '\u05d8\u05d5\u05e2\u05df \u05e9\u05e4\u05d4 \u05d7\u05d3\u05e9\u05d4',
    '\u05de\u05e2\u05d3\u05db\u05df \u05d0\u05ea \u05d8\u05e7\u05e1\u05d8\u05d9 \u05d4\u05de\u05e9\u05d7\u05e7 \u05d5\u05d4\u05de\u05de\u05e9\u05e7',
  ],
  modeGame: '\u05e0\u05ea\u05d5\u05e0\u05d9 \u05d0\u05d6\u05d5\u05e8',
  modeBoot: '\u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05de\u05e9\u05d7\u05e7',
  modeLanguage: '\u05e0\u05ea\u05d5\u05e0\u05d9 \u05e9\u05e4\u05d4',
  sectorInfinity: '\u05d0\u05d6\u05d5\u05e8 \u05d0\u05d9\u05e0\u05e1\u05d5\u05e3',
  sectorGame: '\u05d0\u05d6\u05d5\u05e8 {level}',
  sectorLanguage: '\u05de\u05e2\u05e8\u05db\u05ea \u05d8\u05e7\u05e1\u05d8',
  sectorHome: '\u05d0\u05d6\u05d5\u05e8 \u05d4\u05d1\u05d9\u05ea',
};
Object.assign(LOADING_COPY.es, {
  boot: ['INICIANDO ORBIT VELOCITY', 'Activando sistemas de vuelo cosmico'],
  language: ['CARGANDO NUEVO IDIOMA', 'Actualizando textos e interfaz del juego'],
  modeGame: 'DATOS DEL SECTOR',
  modeBoot: 'SISTEMAS DEL JUEGO',
  modeLanguage: 'DATOS DE IDIOMA',
  sectorInfinity: 'SECTOR INFINITO',
  sectorGame: 'SECTOR {level}',
  sectorLanguage: 'SISTEMA DE TEXTO',
  sectorHome: 'SECTOR BASE',
});
LOADING_COPY.ar = {
  boot: [
    '\u062a\u0647\u064a\u0626\u0629 ORBIT VELOCITY',
    '\u062a\u0634\u063a\u064a\u0644 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0637\u064a\u0631\u0627\u0646 \u0627\u0644\u0643\u0648\u0646\u064a\u0629',
  ],
  level: [
    '\u062a\u062d\u0636\u064a\u0631 \u0627\u0644\u0645\u0631\u062d\u0644\u0629 {level}',
    '\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0623\u0639\u062f\u0627\u0621 \u0648\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0642\u062a\u0627\u0644',
  ],
  infinity: [
    '\u062f\u062e\u0648\u0644 \u0627\u0644\u0644\u0627\u0646\u0647\u0627\u064a\u0629',
    '\u0631\u0633\u0645 \u0645\u0646\u0637\u0642\u0629 \u0642\u062a\u0627\u0644 \u0628\u0644\u0627 \u0646\u0647\u0627\u064a\u0629',
  ],
  language: [
    '\u062a\u062d\u0645\u064a\u0644 \u0644\u063a\u0629 \u062c\u062f\u064a\u062f\u0629',
    '\u062a\u062d\u062f\u064a\u062b \u0646\u0635\u0648\u0635 \u0627\u0644\u0644\u0639\u0628\u0629 \u0648\u0627\u0644\u0648\u0627\u062c\u0647\u0629',
  ],
  modeGame: '\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0646\u0637\u0642\u0629',
  modeBoot: '\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0644\u0639\u0628\u0629',
  modeLanguage: '\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0644\u063a\u0629',
  sectorInfinity: '\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0644\u0627\u0646\u0647\u0627\u064a\u0629',
  sectorGame: '\u0645\u0646\u0637\u0642\u0629 {level}',
  sectorLanguage: '\u0646\u0638\u0627\u0645 \u0627\u0644\u0646\u0635\u0648\u0635',
  sectorHome: '\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0642\u0627\u0639\u062f\u0629',
};
const safeLoadingLanguage = LOADING_COPY[loadingLanguage] ? loadingLanguage : 'en';
document.documentElement.lang = safeLoadingLanguage;
document.documentElement.dir =
  safeLoadingLanguage === 'he' || safeLoadingLanguage === 'ar' ? 'rtl' : 'ltr';
if (document.body) {
  document.body.dir =
    safeLoadingLanguage === 'he' || safeLoadingLanguage === 'ar'
      ? 'rtl'
      : 'ltr';
}
const targetUrl = new URL(to, location.href);
const forceBenchmark = params.get('benchmark') === '1';
const forceFreshLoading = params.get('language') === '1';
const isGameTarget = to.includes('game.html');
const isInfinityTarget = targetUrl.searchParams.get('mode') === 'infinity';
const targetLevel = Number(targetUrl.searchParams.get('level')) || 1;
const loadingMode = isInfinityTarget
  ? 'infinity'
  : isGameTarget
    ? 'level'
    : 'boot';
const languageCopy = LOADING_COPY[safeLoadingLanguage] || LOADING_COPY.en;
const loadingCopy = forceFreshLoading
  ? languageCopy.language
  : languageCopy[loadingMode];
const formatLoadingText = (text) =>
  text.replace('{level}', String(targetLevel));

if (titleEl) titleEl.textContent = formatLoadingText(loadingCopy[0]);
if (subtitleEl) subtitleEl.textContent = formatLoadingText(loadingCopy[1]);
if (modeLabelEl) {
  modeLabelEl.textContent = forceFreshLoading
    ? languageCopy.modeLanguage
    : isGameTarget
    ? languageCopy.modeGame
    : languageCopy.modeBoot;
}
if (sectorEl) {
  sectorEl.textContent = forceFreshLoading
    ? languageCopy.sectorLanguage
    : isInfinityTarget
    ? languageCopy.sectorInfinity
    : isGameTarget
      ? formatLoadingText(languageCopy.sectorGame).replace(
          String(targetLevel),
          String(targetLevel).padStart(2, '0')
        )
      : languageCopy.sectorHome;
}

const MIN_LOADING_SCREEN_MS = 1800;
const MAIN_INPUT_WARMUP_PENDING_KEY = 'orbitvelocity.mainInputWarmupPending';
let displayedProgress = 0;
let detectedDeviceInfoPromise = null;

function getWebGlRenderer() {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) return 'unavailable';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return gl.getParameter(gl.RENDERER) || 'unknown';

    return (
      gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ||
      gl.getParameter(gl.RENDERER) ||
      'unknown'
    );
  } catch {
    return 'unavailable';
  }
}

function getWebGlVendor() {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) return 'unavailable';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return gl.getParameter(gl.VENDOR) || 'unknown';

    return (
      gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) ||
      gl.getParameter(gl.VENDOR) ||
      'unknown'
    );
  } catch {
    return 'unavailable';
  }
}

async function getBrowserDeviceInfo() {
  const uaData = navigator.userAgentData;
  let highEntropy = {};

  if (uaData?.getHighEntropyValues) {
    try {
      highEntropy = await uaData.getHighEntropyValues([
        'architecture',
        'bitness',
        'model',
        'platform',
        'platformVersion',
        'uaFullVersion',
      ]);
    } catch {}
  }

  return {
    source: 'browser',
    platform: highEntropy.platform || navigator.platform || 'unknown',
    model: highEntropy.model || 'unavailable',
    architecture: highEntropy.architecture || 'unavailable',
    bitness: highEntropy.bitness || 'unavailable',
    platformVersion: highEntropy.platformVersion || 'unavailable',
    uaFullVersion: highEntropy.uaFullVersion || 'unavailable',
    userAgent: navigator.userAgent || 'unknown',
  };
}

async function getNativeDeviceInfo() {
  const capacitor = window.Capacitor;
  const plugin =
    capacitor?.Plugins?.DeviceInfo ||
    (capacitor?.registerPlugin
      ? capacitor.registerPlugin('DeviceInfo')
      : null);

  if (!plugin?.getInfo) return null;

  try {
    return {
      source: 'native',
      ...(await plugin.getInfo()),
    };
  } catch {
    return null;
  }
}

function formatDeviceDebug(info) {
  const deviceName =
    [info.manufacturer, info.model].filter(Boolean).join(' ') ||
    info.model ||
    'unknown';

  return [
    `Device: ${deviceName}`,
    `Source: ${info.source || 'unknown'}`,
    `Brand: ${info.brand || 'unavailable'}`,
    `Device code: ${info.device || 'unavailable'}`,
    `Product: ${info.product || 'unavailable'}`,
    `Hardware: ${info.hardware || 'unavailable'}`,
    `Android: ${info.release || 'unavailable'} (SDK ${info.sdkInt || 'unavailable'})`,
    `Platform: ${info.platform || navigator.platform || 'unknown'}`,
    `CPU cores: ${navigator.hardwareConcurrency || 'unavailable'}`,
    `Memory: ${navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'unavailable'}`,
    `GPU vendor: ${getWebGlVendor()}`,
    `GPU renderer: ${getWebGlRenderer()}`,
    `Screen: ${screen.width}x${screen.height} DPR ${window.devicePixelRatio || 1}`,
    `Viewport: ${innerWidth}x${innerHeight}`,
    `Benchmark FPS: ${info.strength?.avgFps ?? 'unavailable'}`,
    `Worst frame: ${info.strength?.worstFrameMs ?? 'unavailable'}ms`,
    `UA: ${info.userAgent || navigator.userAgent || 'unknown'}`,
  ].join('\n');
}

function getDeviceName(info) {
  return (
    [info.manufacturer, info.model].filter(Boolean).join(' ') ||
    info.model ||
    'unknown'
  );
}

function createBenchmarkParticles(count, width, height) {
  return Array.from({ length: count }, (_, index) => ({
    x: (index * 73) % width,
    y: (index * 131) % height,
    vx: ((index % 9) - 4) * 0.28,
    vy: (((index * 3) % 11) - 5) * 0.22,
    size: 2 + (index % 9),
    hue: (index * 29) % 360,
    spin: (index % 31) * 0.1,
  }));
}

function drawBenchmarkFrame(ctx, particles, width, height, frame) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#02040d';
  ctx.fillRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(
    width * 0.5,
    height * 0.45,
    10,
    width * 0.5,
    height * 0.45,
    width * 0.75
  );
  gradient.addColorStop(0, 'rgba(54,226,255,0.22)');
  gradient.addColorStop(0.48, 'rgba(40,103,255,0.12)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'lighter';
  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < -20) particle.x = width + 20;
    if (particle.x > width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = height + 20;
    if (particle.y > height + 20) particle.y = -20;

    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(frame * 0.018 + particle.spin);
    ctx.fillStyle = `hsla(${particle.hue}, 92%, 62%, 0.36)`;
    ctx.shadowColor = `hsla(${particle.hue}, 92%, 62%, 0.65)`;
    ctx.shadowBlur = particle.size * 1.8;
    ctx.fillRect(
      -particle.size * 0.5,
      -particle.size * 0.5,
      particle.size,
      particle.size
    );
    ctx.restore();
  }

  ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 18; i++) {
    const radius = 18 + ((frame * 3 + i * 37) % 180);
    ctx.strokeStyle = `rgba(54,226,255,${0.2 - i * 0.008})`;
    ctx.lineWidth = 1 + (i % 3);
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function scoreBenchmark(avgFps, worstFrameMs, gpuResult = null) {
  let score = 0;

  if (avgFps >= 12) score += 7;
  else if (avgFps >= 8) score += 5;
  else if (avgFps >= 5) score += 3;
  else score += 1;

  if (worstFrameMs <= 120) score += 3;
  else if (worstFrameMs <= 220) score += 2;
  else if (worstFrameMs <= 320) score += 1;

  if (gpuResult?.available) {
    if (gpuResult.avgFps >= 54) score += 4;
    else if (gpuResult.avgFps >= 42) score += 3;
    else if (gpuResult.avgFps >= 28) score += 2;
    else if (gpuResult.avgFps >= 16) score += 1;

    if (gpuResult.worstFrameMs <= 34) score += 1;
  }

  const tier = score >= 8 ? 'strong' : score >= 5 ? 'medium' : 'weak';
  return { tier, score };
}

function compileBenchmarkShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createGpuBenchmarkProgram(gl) {
  const vertex = compileBenchmarkShader(
    gl,
    gl.VERTEX_SHADER,
    `
      attribute vec2 a_position;
      attribute float a_phase;
      uniform float u_time;
      varying float v_phase;

      void main() {
        float wave = sin(u_time * 1.7 + a_phase) * 0.018;
        vec2 pos = a_position + vec2(wave, wave * 0.55);
        gl_Position = vec4(pos, 0.0, 1.0);
        v_phase = a_phase;
      }
    `
  );
  const fragment = compileBenchmarkShader(
    gl,
    gl.FRAGMENT_SHADER,
    `
      precision mediump float;
      varying float v_phase;
      uniform float u_time;

      void main() {
        float pulse = 0.55 + 0.45 * sin(u_time * 2.3 + v_phase);
        vec3 color = vec3(
          0.18 + 0.42 * pulse,
          0.58 + 0.28 * sin(v_phase * 1.7),
          0.92
        );
        gl_FragColor = vec4(color, 0.34);
      }
    `
  );

  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function createGpuBenchmarkVertices(triangleCount) {
  const data = new Float32Array(triangleCount * 3 * 3);
  let offset = 0;

  for (let i = 0; i < triangleCount; i++) {
    const col = i % 42;
    const row = Math.floor(i / 42);
    const cx = -1 + ((col + 0.5) / 42) * 2;
    const cy = -1 + (((row % 54) + 0.5) / 54) * 2;
    const size = 0.018 + ((i * 17) % 9) * 0.0018;
    const phase = (i * 0.618) % 6.283;
    const spin = phase + (i % 5) * 0.52;

    for (let p = 0; p < 3; p++) {
      const angle = spin + p * 2.094;
      data[offset++] = cx + Math.cos(angle) * size;
      data[offset++] = cy + Math.sin(angle) * size;
      data[offset++] = phase + p * 0.37;
    }
  }

  return data;
}

async function runGpuPerformanceBenchmark(width, height, dpr) {
  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    }) ||
    canvas.getContext('experimental-webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

  if (!gl) {
    return {
      available: false,
      avgFps: 0,
      worstFrameMs: 999,
      reason: 'GPU WebGL benchmark unavailable',
    };
  }

  const scaledDpr = Math.min(dpr || 1, 1.5);
  canvas.width = Math.max(1, Math.round(width * scaledDpr));
  canvas.height = Math.max(1, Math.round(height * scaledDpr));
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;opacity:0.01;pointer-events:none;z-index:0;';
  (document.querySelector('.phone-frame') || document.body).appendChild(canvas);

  const program = createGpuBenchmarkProgram(gl);
  if (!program) {
    canvas.remove();
    return {
      available: false,
      avgFps: 0,
      worstFrameMs: 999,
      reason: 'GPU shader benchmark unavailable',
    };
  }

  const triangleCount = isGameTarget ? 1900 : 1300;
  const vertices = createGpuBenchmarkVertices(triangleCount);
  const buffer = gl.createBuffer();
  const posLoc = gl.getAttribLocation(program, 'a_position');
  const phaseLoc = gl.getAttribLocation(program, 'a_phase');
  const timeLoc = gl.getUniformLocation(program, 'u_time');

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.CULL_FACE);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 12, 0);
  gl.enableVertexAttribArray(phaseLoc);
  gl.vertexAttribPointer(phaseLoc, 1, gl.FLOAT, false, 12, 8);

  const durationMs = 760;
  const warmupMs = 120;
  const frameTimes = [];
  let lastNow = performance.now();
  const startedAt = lastNow;

  return new Promise((resolve) => {
    function finish(elapsed) {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      canvas.remove();

      const measuredMs = Math.max(1, elapsed - warmupMs);
      const avgFps = (frameTimes.length / measuredMs) * 1000;
      const worstFrameMs = frameTimes.length ? Math.max(...frameTimes) : 999;
      resolve({
        available: true,
        avgFps: Math.round(avgFps),
        worstFrameMs: Math.round(worstFrameMs),
        triangleCount,
        reason: `GPU WebGL ${Math.round(avgFps)} FPS`,
      });
    }

    function step(now) {
      const elapsed = now - startedAt;
      const frameMs = now - lastNow;
      lastNow = now;

      gl.clearColor(0.01, 0.015, 0.04, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, elapsed * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, triangleCount * 3);
      gl.flush();

      if (elapsed > warmupMs) frameTimes.push(frameMs);

      if (elapsed < durationMs) {
        requestAnimationFrame(step);
        return;
      }

      finish(elapsed);
    }

    requestAnimationFrame(step);
  });
}

async function runGamePerformanceBenchmark() {
  const canvas = document.createElement('canvas');
  const width = Math.min(420, Math.max(320, innerWidth || 360));
  const height = Math.min(740, Math.max(520, innerHeight || 640));
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const particleCount = isGameTarget ? 360 : 260;
  const durationMs = 950;
  const warmupMs = 180;
  const ctx = canvas.getContext('2d', { alpha: false });

  if (!ctx) {
    return {
      tier: 'weak',
      score: 0,
      avgFps: 0,
      worstFrameMs: 999,
      reasons: ['canvas benchmark unavailable'],
    };
  }

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;opacity:0.01;pointer-events:none;z-index:0;';
  (document.querySelector('.phone-frame') || document.body).appendChild(canvas);
  ctx.scale(dpr, dpr);

  const particles = createBenchmarkParticles(particleCount, width, height);
  const frameTimes = [];
  let frames = 0;
  let lastNow = performance.now();
  const startedAt = lastNow;

  return new Promise((resolve) => {
    async function step(now) {
      const elapsed = now - startedAt;
      const frameMs = now - lastNow;
      lastNow = now;

      drawBenchmarkFrame(ctx, particles, width, height, frames);

      if (elapsed > warmupMs) {
        frameTimes.push(frameMs);
      }

      frames++;

      if (elapsed < durationMs) {
        requestAnimationFrame(step);
        return;
      }

      const measuredMs = Math.max(1, elapsed - warmupMs);
      const avgFps = (frameTimes.length / measuredMs) * 1000;
      const worstFrameMs = frameTimes.length ? Math.max(...frameTimes) : 999;
      canvas.remove();

      const gpuResult = await runGpuPerformanceBenchmark(width, height, dpr);
      const strength = scoreBenchmark(avgFps, worstFrameMs, gpuResult);
      const reasons = [
        `canvas ${Math.round(avgFps)} FPS`,
        `worst frame ${Math.round(worstFrameMs)}ms`,
        `${particleCount} particles`,
      ];

      if (gpuResult.available) {
        reasons.push(gpuResult.reason);
        reasons.push(`GPU worst frame ${gpuResult.worstFrameMs}ms`);
        reasons.push(`${gpuResult.triangleCount} GPU triangles`);
      } else if (gpuResult.reason) {
        reasons.push(gpuResult.reason);
      }

      resolve({
        ...strength,
        avgFps: Math.round(avgFps),
        worstFrameMs: Math.round(worstFrameMs),
        gpuFps: gpuResult.avgFps,
        gpuWorstFrameMs: gpuResult.worstFrameMs,
        gpuAvailable: gpuResult.available,
        gpuTriangles: gpuResult.triangleCount || 0,
        reasons,
      });
    }

    requestAnimationFrame(step);
  });
}

async function getDeviceInfo() {
  const nativeInfo = await getNativeDeviceInfo();
  const browserInfo = await getBrowserDeviceInfo();
  return {
    ...browserInfo,
    ...(nativeInfo || {}),
  };
}

async function showDeviceDebug() {
  return getDeviceInfo();
}

function detectDeviceInfo() {
  if (!detectedDeviceInfoPromise) {
    detectedDeviceInfoPromise = showDeviceDebug();
  }

  return detectedDeviceInfoPromise;
}

function savePerformanceDetection(info) {
  const strength = info?.strength || { tier: 'medium', score: 0, reasons: [] };
  const tierTextByName = {
    strong: 'HIGH',
    medium: 'MID',
    weak: 'LOW',
  };
  const tierText = tierTextByName[strength.tier] || tierTextByName.medium;

  localStorage.setItem('orbitvelocity.performance.autoTier', strength.tier);
  localStorage.setItem('orbitvelocity.performance.autoLabel', tierText);
  localStorage.setItem('orbitvelocity.performance.deviceInfo', JSON.stringify({
    source: info.source || 'unknown',
    manufacturer: info.manufacturer || '',
    brand: info.brand || '',
    model: info.model || '',
    device: info.device || '',
    product: info.product || '',
    hardware: info.hardware || '',
    platform: info.platform || '',
    architecture: info.architecture || '',
    androidRelease: info.androidRelease || info.release || '',
    sdkInt: info.sdkInt || info.sdk || '',
    renderer: info.renderer || '',
    vendor: info.vendor || '',
    cpuCores: info.cpuCores || navigator.hardwareConcurrency || '',
    supportedAbis: info.supportedAbis || '',
    totalRamMb: info.totalRamMb || '',
    availableRamMb: info.availableRamMb || '',
    memoryThresholdMb: info.memoryThresholdMb || '',
    lowMemory: info.lowMemory ?? '',
    browserDeviceMemoryGb: navigator.deviceMemory || '',
    hardwareConcurrency: navigator.hardwareConcurrency || '',
    screenWidth: screen.width,
    screenHeight: screen.height,
    devicePixelRatio: window.devicePixelRatio || 1,
    viewportWidth: innerWidth,
    viewportHeight: innerHeight,
    userAgent: info.userAgent || '',
    savedAt: Date.now(),
  }));
  localStorage.setItem('orbitvelocity.performance.benchmark', JSON.stringify({
    score: strength.score,
    fps: strength.avgFps,
    worstFrameMs: strength.worstFrameMs,
    gpuFps: strength.gpuFps,
    gpuWorstFrameMs: strength.gpuWorstFrameMs,
    gpuAvailable: strength.gpuAvailable,
    gpuTriangles: strength.gpuTriangles,
    reasons: strength.reasons,
    savedAt: Date.now(),
  }));
}

const MAIN_KNOWN_ASSETS = [
  './images/logo.png',
  './images/backgroundImages/homePage.png',
  './images/backgroundImages/centerIconeImage.png',
  './images/logosImage/weaponlogo.png',
  './images/logosImage/petIcone.png',
  './images/logosImage/superIcone.png',
  './images/logosImage/upgreatIcone.png',
  './images/logosImage/weaponImg/leserIcone.png',
  './images/logosImage/weaponImg/missileIcone.png',
  './images/logosImage/weaponImg/triangleShooter.png',
  './images/logosImage/weaponImg/lockIcone.png',
  './images/shopAInventoryicons/petsSIcone/ChimpoIcone.png',
  './images/shopAInventoryicons/petsSIcone/sirenIcone.png',
  './images/logosImage/superLogosImage/superLaser.png',
  './images/logosImage/superLogosImage/waveShield.png',
];

const GAME_BOOT_ASSETS = [
  './images/logo.png',
  './images/game/sprites/playerSkins/playerSkin1.png',
  './images/game/sprites/playerSkins/playerRedSkin.png',
  './images/game/sprites/playerSkins/playerDarkReaper.png',
  './images/game/sprites/playerSkins/playerCelestialSakura.png',
  './images/game/sprites/playerSkins/playerGoldenCore.png',
  './images/game/sprites/playerSkins/star_breaker.png',

  './images/game/sprites/missileSprite.png',

  './images/game/sprites/petSprites/chimboSprite.png',
  './images/game/sprites/petSprites/sirenSprite.png',

  './images/game/sprites/enemiesSprites/Angler1Sprite.png',
  './images/game/sprites/enemiesSprites/Angler2Sprite.png',
  './images/game/sprites/enemiesSprites/Angler3Sprite.png',
  './images/game/sprites/bossesSprites/boss1Sprite.png',
  './images/game/sprites/smokeExplosion.png',
];

function getBackgroundForLevel(level) {
  if (level > 100) return './images/game/background/blueSpace.png';
  if (level >= 91) return './images/game/background/goldSpace.png';
  if (level >= 81) return './images/game/background/blackSpace.png';
  if (level >= 71) return './images/game/background/yellowSpace.png';
  if (level >= 61) return './images/game/background/lightblueSpace.png';
  if (level >= 51) return './images/game/background/orangeSpace.png';
  if (level >= 41) return './images/game/background/purpleSpace.png';
  if (level >= 31) return './images/game/background/redSpace.png';
  if (level >= 21) return './images/game/background/pinkSpace.png';
  if (level >= 11) return './images/game/background/greenSpace.png';
  return './images/game/background/blueSpace.png';
}

function getGameBootAssets(target) {
  const targetUrl = new URL(target, location.href);
  const isInfinity = targetUrl.searchParams.get('mode') === 'infinity';
  const level = isInfinity
    ? 101
    : Number(targetUrl.searchParams.get('level')) || 1;

  return [getBackgroundForLevel(level), ...GAME_BOOT_ASSETS];
}

function setProgress(p) {
  const value = Math.max(0, Math.min(100, Math.round(p)));
  displayedProgress = value;
  if (fillEl) fillEl.style.width = value + '%';
  if (pctEl) pctEl.textContent = value + '%';
}

function animateProgressToComplete(startedAt) {
  const elapsed = performance.now() - startedAt;
  const duration = Math.max(350, MIN_LOADING_SCREEN_MS - elapsed);
  const startProgress = displayedProgress;

  return new Promise((resolve) => {
    const animationStart = performance.now();

    function step(now) {
      const t = Math.min(1, (now - animationStart) / duration);
      const eased = 1 - Math.pow(1 - t, 1.7);
      setProgress(startProgress + (100 - startProgress) * eased);

      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }

    requestAnimationFrame(step);
  });
}

function isAudio(src) {
  return /\.(mp3|wav|ogg|m4a)$/i.test(src);
}

function isImage(src) {
  return /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(src);
}

function normalizeAssetUrl(src, basePath) {
  if (!src) return '';
  if (/^(data:|blob:|https?:|\/\/)/i.test(src)) return src;

  try {
    return new URL(src, basePath).pathname.replace(/^\//, './');
  } catch {
    return src;
  }
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';

    img.onload = async () => {
      try {
        if (img.decode) await img.decode();
      } catch {}

      resolve(true);
    };

    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function loadAudio(src) {
  return new Promise((resolve) => {
    const audio = new Audio();
    const done = (ok) => resolve(ok);

    audio.addEventListener('canplaythrough', () => done(true), { once: true });
    audio.addEventListener('error', () => done(false), { once: true });

    audio.preload = 'auto';
    audio.src = src;
    audio.load();
  });
}

async function collectMainHtmlAssets(pagePath) {
  try {
    const res = await fetch(pagePath, { cache: 'force-cache' });
    if (!res.ok) return [];

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const basePath = new URL(pagePath, location.href);

    const assets = [];

    doc.querySelectorAll('[src]').forEach((el) => {
      if (el.getAttribute('loading') === 'lazy') return;

      const src = el.getAttribute('src');
      const normalized = normalizeAssetUrl(src, basePath);

      if (normalized && (isImage(normalized) || isAudio(normalized))) {
        assets.push(normalized);
      }
    });

    doc.querySelectorAll('link[href]').forEach((el) => {
      const rel = (el.getAttribute('rel') || '').toLowerCase();
      const href = el.getAttribute('href');
      if (!href) return;
      if (!rel.includes('icon') && !rel.includes('preload')) return;

      const normalized = normalizeAssetUrl(href, basePath);
      if (normalized && isImage(normalized)) {
        assets.push(normalized);
      }
    });

    return assets;
  } catch {
    return [];
  }
}

async function preloadAssets(list, sessionKey) {
  const alreadyLoaded = forceFreshLoading
    ? []
    : JSON.parse(sessionStorage.getItem(sessionKey) || '[]');
  const loadedSet = new Set(alreadyLoaded);

  const unique = Array.from(new Set(list))
    .filter(Boolean)
    .filter((src) => !loadedSet.has(src));

  const total = unique.length;

  if (total === 0) {
    setProgress(68);
    return;
  }

  let loaded = 0;
  setProgress(0);

  const batchSize = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? 4
    : 8;
  const chunks = chunkArray(unique, batchSize);

  for (const group of chunks) {
    await Promise.allSettled(
      group.map(async (src) => {
        if (isAudio(src)) {
          await loadAudio(src);
        } else {
          await loadImage(src);
        }

        loadedSet.add(src);
        loaded++;
        setProgress(6 + (loaded / total) * 72);
      })
    );
  }

  sessionStorage.setItem(sessionKey, JSON.stringify([...loadedSet]));

}

(async () => {
  const loadingStartedAt = performance.now();
  const PASS_KEY = 'passedLoading:' + to;
  const ASSET_CACHE_KEY = 'preloadedAssets:' + to;

  sessionStorage.setItem(PASS_KEY, '1');
  if (to.includes('main.html')) {
    sessionStorage.setItem(MAIN_INPUT_WARMUP_PENDING_KEY, '1');
  }

  try {
    let assets = [];

    if (to.includes('main.html')) {
      const mainHtmlAssets = await collectMainHtmlAssets('./main.html');
      assets = [...MAIN_KNOWN_ASSETS, ...mainHtmlAssets];
    } else if (to.includes('game.html')) {
      assets = getGameBootAssets(to);
    }

    await preloadAssets(assets, ASSET_CACHE_KEY);
    await animateProgressToComplete(loadingStartedAt);
    const hasBenchmark = !!localStorage.getItem('orbitvelocity.performance.benchmark');
    if (forceBenchmark || !hasBenchmark) {
      const deviceInfo = await detectDeviceInfo();
      deviceInfo.strength = await runGamePerformanceBenchmark();
      savePerformanceDetection(deviceInfo);
    }

    const root = document.querySelector('.phone-frame');
    if (root) root.classList.add('loadingOut');

    setTimeout(() => {
      if (forceBenchmark && to.includes('main.html')) {
        const resultUrl = new URL(to, location.href);
        resultUrl.searchParams.set('benchmarkResult', '1');
        location.replace(`${resultUrl.pathname.split('/').pop()}${resultUrl.search}`);
        return;
      }
      location.replace(to);
    }, 300);
  } catch {
    location.replace(to);
  }
})();
