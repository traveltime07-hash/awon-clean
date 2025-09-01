(function(){
  var meta = document.querySelector('meta[name="x-log"]');
  var on = meta && (meta.content==='1' || meta.content==='true');
  if(!on) return;
  try{
    fetch('/api/event-log', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({
        type:'pageview',
        path: location.pathname,
        referrer: document.referrer || '',
        ts: new Date().toISOString()
      })
    }).catch(function(){});
  }catch(_){}
})();
