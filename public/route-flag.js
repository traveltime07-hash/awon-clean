(function(){
  try{
    var p = location.pathname.replace(/\/+$/,'');
    var slug = p ? p.replace(/^\/+/,'').replace(/[^a-z0-9]+/gi,'-') : 'home';
    document.documentElement.classList.add('route-' + slug.toLowerCase());
  }catch(e){}
})();
