(function(){
  function g(n){ var m=document.querySelector('meta[name="'+n+'"]'); return m?m.content:''; }
  var data = {
    maintenance: g('x-maintenance'),
    banner: g('x-banner'),
    bannerText: g('x-banner-text'),
    log: g('x-log'),
    time: new Date().toISOString()
  };
  document.getElementById('out').textContent = JSON.stringify(data, null, 2);
})();
