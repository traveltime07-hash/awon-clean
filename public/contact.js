(function(){
  var form = document.getElementById('contact-form');
  var info = document.getElementById('contact-info');

  function setInfo(msg, ok){
    if(!info) return;
    info.textContent = msg;
    info.className = ok ? 'ok' : 'err';
  }

  if(!form){ return; }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    setInfo('Wysyłanie…', true);

    var fd = new FormData(form);
    var payload = Object.fromEntries(fd.entries());

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function(r){ return r.json().catch(function(){ return { ok:false, error:'Brak JSON' }; }); })
    .then(function(d){
      if(d && d.ok){
        // PRZEKIEROWANIE po sukcesie (z parametrem info dla ewentualnej diagnostyki)
        location.href = '/thanks.html?from=contact&ts=' + encodeURIComponent(new Date().toISOString());
      }else{
        setInfo('Ups… '+(d && d.error ? d.error : 'spróbuj ponownie'), false);
      }
    })
    .catch(function(){
      setInfo('Błąd połączenia. Spróbuj za chwilę.', false);
    });
  });
})();
