(function(){
  function slugify(path){
    var p=(path||'/').replace(/\/+$/,'');
    if (p===''||p==='/') return 'home';
    return p.replace(/^\/+/,'').replace(/[^a-z0-9]+/gi,'-').toLowerCase();
  }
  function apply(){
    var html=document.documentElement;
    html.className = html.className.replace(/\s*route-[a-z0-9-]+/gi,'').trim();
    html.classList.add('route-'+slugify(location.pathname));
  }
  // initial
  if (document.readyState!=='loading') apply(); else document.addEventListener('DOMContentLoaded', apply);
  // URL changes (SPA)
  addEventListener('popstate', apply);
  ['pushState','replaceState'].forEach(fn=>{
    var orig=history[fn];
    history[fn]=function(){
      var r=orig.apply(this, arguments);
      setTimeout(apply,0);
      return r;
    };
  });
  // link clicks (na wszelki wypadek)
  document.addEventListener('click', function(e){
    var a=e.target && e.target.closest && e.target.closest('a[href^="/"]');
    if (a) setTimeout(apply,0);
  }, true);
})();
