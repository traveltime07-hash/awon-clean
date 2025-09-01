(function(){
  try {
    var root = document.documentElement;
    var KEY = 'theme';
    var saved = localStorage.getItem(KEY);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var initial = saved || (prefersDark ? 'dark' : 'dark'); // domyślnie DARK
    function apply(mode){
      if(mode==='dark') root.classList.add('dark'); else root.classList.remove('dark');
      var lbl = document.getElementById('theme-label');
      if(lbl) lbl.textContent = root.classList.contains('dark') ? 'Jasny' : 'Ciemny';
    }
    apply(initial);
    window.addEventListener('DOMContentLoaded', function(){
      var btn = document.getElementById('theme-toggle');
      if(btn) btn.addEventListener('click', function(){
        var now = root.classList.contains('dark') ? 'light' : 'dark';
        apply(now); localStorage.setItem(KEY, now);
      });
    });
  } catch(e) {}
})();
