(function(){
  function apply(){
    document.querySelectorAll('img:not([loading])').forEach(function(img){
      img.loading='lazy';
      img.decoding='async';
      if(!img.getAttribute('alt')) img.setAttribute('alt','');
    });
    document.querySelectorAll('iframe:not([loading])').forEach(function(fr){
      fr.loading='lazy';
    });
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', apply); }
  else apply();
})();
