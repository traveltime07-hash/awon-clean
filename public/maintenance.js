(function(){
  try{
    var meta = document.querySelector('meta[name="x-maintenance"]');
    var on = meta && (meta.content === '1' || meta.content === 'true');
    if(!on) return;
    var mask = document.createElement('div');
    mask.id = 'maintenance-mask';
    var card = document.createElement('div');
    card.id = 'maintenance-card';
    card.innerHTML = '<h1>Tryb konserwacji</h1><p>Staging jest chwilowo wyłączony na czas prac.</p><p>Spróbuj ponownie za chwilę.</p>';
    mask.appendChild(card);
    document.documentElement.appendChild(mask);
  }catch(e){ console && console.warn('maintenance overlay error', e);}
})();
