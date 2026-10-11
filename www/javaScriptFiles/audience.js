(function () {
  'use strict';
  const key = 'orbitvelocity.ageBand.v1';
  const bands = ['5-and-under', '6-8', '9-12', '13-15', '16-17', '18-plus', 'unknown'];
  let band = null;
  try { const saved = localStorage.getItem(key); if (bands.includes(saved)) band = saved; } catch (_) {}
  let resolveReady;
  let dialog = null;
  const ready = new Promise(resolve => { resolveReady = resolve; });
  const copy = {
    en: ['Choose your age group', 'Select your age group to continue.', 'Select…', '5 and under', '6–8', '9–12', '13–15', '16–17', '18 and over', 'Prefer not to say', 'Continue', 'Privacy policy'],
    he: ['בחירת קבוצת גיל', 'בחרו את קבוצת הגיל שלכם כדי להמשיך.', 'בחירה…', '5 ומטה', '6–8', '9–12', '13–15', '16–17', '18 ומעלה', 'מעדיף/ה לא לציין', 'המשך', 'מדיניות פרטיות'],
    es: ['Elige tu grupo de edad', 'Selecciona tu grupo de edad para continuar.', 'Seleccionar…', '5 o menos', '6–8', '9–12', '13–15', '16–17', '18 o más', 'Prefiero no decirlo', 'Continuar', 'Política de privacidad'],
    ar: ['اختر فئتك العمرية', 'اختر فئتك العمرية للمتابعة.', 'اختر…', '5 أو أقل', '6–8', '9–12', '13–15', '16–17', '18 أو أكثر', 'أفضل عدم الإجابة', 'متابعة', 'سياسة الخصوصية'],
  };
  const isAdult = () => band === '18-plus';
  function restoreBand(saved) {
    if (!bands.includes(saved)) return false;
    band = saved;
    document.documentElement.classList.toggle('adult-audience', isAdult());
    if (dialog) { dialog.close(); dialog.remove(); dialog = null; }
    resolveReady(band);
    return true;
  }
  window.OrbitVelocityAudience = { ready, isAdult, getBand: () => band, restoreBand };
  // Fail closed even when storage is missing, corrupted, or unavailable.
  document.documentElement.classList.toggle('adult-audience', isAdult());
  document.addEventListener('click', event => {
    if (!isAdult() && event.target.closest?.('#socialBtn, #socialDiv')) {
      event.preventDefault(); event.stopImmediatePropagation();
    }
  }, true);
  function mount() {
    // Play Games does not depend on audience.ready, so this cannot form a cycle.
    const cloudReady = window.OrbitVelocityCloud?.ready;
    if (cloudReady) cloudReady.then(showAgeDialog, showAgeDialog);
    else showAgeDialog();
  }
  function showAgeDialog() {
    try { restoreBand(localStorage.getItem(key)); } catch (_) {}
    let lang;
    try { lang = localStorage.getItem('language'); } catch (_) {}
    lang = lang || navigator.language?.split('-')[0] || 'en';
    const words = copy[lang] || copy.en;
    const policy = document.getElementById('privacyPolicyLink');
    if (policy) policy.textContent = words[11];
    if (band) { resolveReady(band); return; }
    dialog = document.createElement('dialog');
    dialog.className = 'audience-dialog';
    dialog.dir = ['he', 'ar'].includes(lang) ? 'rtl' : 'ltr';
    dialog.setAttribute('aria-labelledby', 'audience-title');
    dialog.innerHTML = '<form><h1 id="audience-title"></h1><p></p><select required aria-labelledby="audience-title"></select><button type="submit" disabled></button><a href="./privacy.html"></a></form>';
    dialog.querySelector('h1').textContent = words[0];
    dialog.querySelector('p').textContent = words[1];
    const select = dialog.querySelector('select');
    select.add(new Option(words[2], '', true, true));
    select.options[0].disabled = true;
    bands.forEach((value, index) => select.add(new Option(words[index + 3], value)));
    const button = dialog.querySelector('button');
    button.textContent = words[10];
    const link = dialog.querySelector('a');
    link.textContent = words[11];
    select.addEventListener('change', () => { button.disabled = !bands.includes(select.value); });
    dialog.addEventListener('cancel', event => event.preventDefault());
    dialog.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      if (!bands.includes(select.value)) return;
      band = select.value;
      try { localStorage.setItem(key, band); } catch (_) {}
      window.OrbitVelocityCloud?.markDirty?.();
      void window.OrbitVelocityCloud?.saveNow?.();
      document.documentElement.classList.toggle('adult-audience', isAdult());
      dialog.close(); dialog.remove(); dialog = null; resolveReady(band);
    });
    document.body.append(dialog); dialog.showModal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
