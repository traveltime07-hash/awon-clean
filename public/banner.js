(function(){
  var meta = document.querySelector('meta[name="x-banner"]');
  var show = meta && (meta.content==='1' || meta.content==='true');
  if(!show) return;
  var textMeta = document.querySelector('meta[name="x-banner-text"]');
  var text = (textMeta && textMeta.content) || 'Wersja testowa';
  var bar = document.createElement('div');
  bar.id='feature-banner';
  bar.textContent = text;
  document.body.appendChild(bar);
})();
