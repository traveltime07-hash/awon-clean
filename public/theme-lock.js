(function(){
  try{
    // Ustaw domyślnie DARK jeśli nic nie zapisano
    if(!localStorage.getItem('theme')) localStorage.setItem('theme','dark');
    var root=document.documentElement;
    root.classList.add('dark');
    // Gdy SPA (aplikacja) próbuje usunąć 'dark' — przywracamy
    var mo=new MutationObserver(function(){
      if(!root.classList.contains('dark')) root.classList.add('dark');
    });
    mo.observe(root,{attributes:true, attributeFilter:['class']});
  }catch(e){}
})();
