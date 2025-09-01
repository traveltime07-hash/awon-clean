(function () {
  try {
    var host = (location && location.hostname || '').toLowerCase();
    var label = '';
    var bg = '#111827';

    if (host.startsWith('staging.')) { label = 'STAGING'; bg = '#f59e0b'; }
    else if (host.startsWith('localhost')) { label = 'DEV'; bg = '#2563eb'; }

    if (label) {
      var el = document.getElementById('env-badge');
      if (el) {
        el.textContent = label;
        el.style.background = bg;
        el.style.display = 'inline-flex';
      }
    }
  } catch (e) {
    console && console.warn && console.warn('ENV badge error:', e);
  }
})();
