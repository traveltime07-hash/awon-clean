(function(){
  const $ = (id) => document.getElementById(id);

  const host = location.hostname.toLowerCase();
  $("host").textContent = host;
  $("time").textContent = new Date().toISOString();
  $("mode").textContent =
    host.startsWith('staging.') ? 'staging' :
    host.startsWith('localhost') ? 'dev' : 'production';

  // Local health.json
  fetch('/health.json?cb=' + Date.now(), { cache: 'no-store' })
    .then(async r => {
      const t = $("loc-status");
      const pre = $("loc-json");
      if (r.ok) {
        t.innerHTML = '<span class="ok">OK:</span> /health.json dostępny.';
        pre.textContent = JSON.stringify(await r.json(), null, 2);
      } else {
        t.innerHTML = '<span class="err">BŁĄD:</span> /health.json zwrócił status ' + r.status + '.';
      }
    })
    .catch(() => {
      $("loc-status").innerHTML = '<span class="err">BŁĄD:</span> nie udało się pobrać /health.json';
    });

  // API przez nasz proxy (brak CORS)
  fetch('/api/health-proxy?cb=' + Date.now(), { cache: 'no-store' })
    .then(async r => {
      const t = $("api-status");
      const pre = $("api-json");
      const txt = await r.text();
      if (r.ok) {
        t.innerHTML = '<span class="ok">OK:</span> API przez proxy odpowiedziało ' + r.status + '.';
      } else {
        t.innerHTML = '<span class="warn">UWAGA:</span> API przez proxy odpowiedziało statusem ' + r.status + '.';
      }
      pre.textContent = txt;
    })
    .catch(() => {
      $("api-status").innerHTML = '<span class="err">BŁĄD:</span> proxy nie odpowiedziało.';
    });
})();
