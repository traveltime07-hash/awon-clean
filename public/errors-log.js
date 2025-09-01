(function(){
  var meta = document.querySelector('meta[name="x-log-errors"]');
  var on = meta && (meta.content==='1' || meta.content==='true');
  if(!on) return;

  function send(payload){
    try{
      fetch('/api/event-log', {
        method:'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify(Object.assign({ type:'front-error', ts:new Date().toISOString() }, payload))
      }).catch(function(){});
    }catch(_){}
  }

  // Globalne błędy
  window.addEventListener('error', function(e){
    send({
      kind:'error',
      message: String(e.message || 'Error'),
      stack: e.error && e.error.stack || '',
      path: location.pathname,
      ua: navigator.userAgent
    });
  });

  // Nieobsłużone Promise
  window.addEventListener('unhandledrejection', function(e){
    var r = e && e.reason;
    send({
      kind:'unhandledrejection',
      message: (r && (r.message || String(r))) || 'Unhandled rejection',
      stack: (r && r.stack) || '',
      path: location.pathname,
      ua: navigator.userAgent
    });
  });

  // Kopia console.error
  var origErr = console.error;
  console.error = function(){
    try{
      var args = Array.prototype.slice.call(arguments).map(function(a){
        if(a && a.stack){ return {msg:String(a), stack:String(a.stack)}; }
        try{ return JSON.stringify(a); } catch(_){ return String(a); }
      });
      send({ kind:'console.error', args: args, path: location.pathname, ua: navigator.userAgent });
    }catch(_){}
    return origErr.apply(console, arguments);
  };
})();
