(function(){
  function show(title, detail){
    try{
      if(document.getElementById('error-mask')) return;
      var mask=document.createElement('div'); mask.id='error-mask';
      var card=document.createElement('div'); card.id='error-card';
      var h=document.createElement('h2'); h.textContent='Wystąpił błąd';
      var p=document.createElement('div'); p.className='err-title'; p.textContent=title||'Nieznany błąd';
      var pre=document.createElement('pre'); pre.textContent=detail||'';
      card.appendChild(h); card.appendChild(p); card.appendChild(pre);
      mask.appendChild(card); document.documentElement.appendChild(mask);
    }catch(e){}
  }
  window.addEventListener('error', function(e){
    show(String(e.message||'Error'), (e.error && e.error.stack) || '');
  });
  window.addEventListener('unhandledrejection', function(e){
    var d = e && e.reason;
    show('Unhandled promise rejection', (d && d.stack) || String(d||''));
  });
})();
