(function(){
  fetch('/api/event-log-debug', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body: JSON.stringify({ type:'test', path: location.pathname, ts:new Date().toISOString() })
  }).then(r=>r.json()).then(function(d){
    var pre=document.getElementById('out'); pre.textContent = JSON.stringify(d, null, 2);
  }).catch(function(){ document.getElementById('out').textContent='Błąd wysyłki'; });
})();
