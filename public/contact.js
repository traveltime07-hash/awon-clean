(function(){
  var form = document.getElementById('contact-form');
  var info = document.getElementById('contact-info');

  function setInfo(msg, ok){
    info.textContent = msg;
    info.className = ok ? 'ok' : 'err';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    setInfo('Wysyłanie…', true);

    var fd = new FormData(form);
    // Możemy wysłać jako JSON (czytelniejsze w logach)
    var payload = Object.fromEntries(fd.entries());

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function(r){ return r.json().catch(function(){ return { ok:false, error:'Brak JSON' }; }); })
    .then(function(d){
      if(d && d.ok){
        setInfo('Dziękujemy! Odezwiemy się wkrótce.', true);
        form.reset();
      }else{
        setInfo('Ups… '+(d && d.error ? d.error : 'spróbuj ponownie'), false);
      }
    })
    .catch(function(){
      setInfo('Błąd połączenia. Spróbuj za chwilę.', false);
    });
  });
})();
