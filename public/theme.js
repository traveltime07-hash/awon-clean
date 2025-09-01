(function(){
  var KEY='awon-theme';
  var darkColor='#0f172a';   // meta theme-color dla ciemnego
  var lightColor='#ffffff';  // meta theme-color dla jasnego

  function apply(theme){
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if(meta){ meta.setAttribute('content', theme==='light'? lightColor : darkColor); }
    var lbl = document.getElementById('theme-label');
    if(lbl){ lbl.textContent = theme==='light' ? 'Jasny' : 'Ciemny'; }
  }

  // Inicjalny wybór (z pamięci, domyślnie "dark")
  var saved = null;
  try{ saved = localStorage.getItem(KEY); }catch(_){}
  apply(saved==='light'?'light':'dark');

  // Po załadowaniu – podłącz przycisk
  window.addEventListener('DOMContentLoaded', function(){
    var btn = document.getElementById('theme-toggle');
    if(!btn) return;
    btn.addEventListener('click', function(){
      var isLight = document.documentElement.getAttribute('data-theme')==='light';
      var next = isLight? 'dark':'light';
      try{ localStorage.setItem(KEY, next); }catch(_){}
      apply(next);
    });
  });
})();
