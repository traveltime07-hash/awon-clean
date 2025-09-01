(function(){
  const $ = (id)=>document.getElementById(id);
  $("time").textContent = new Date().toISOString();
  fetch("/api/version",{cache:"no-store"})
    .then(r=>r.json())
    .then(d=>{
      $("env").textContent = d.env || "";
      $("commit").innerHTML = d.commitShort
        ? `<a href="https://github.com/${d.repoOwner}/${d.repoSlug}/commit/${d.commit}" target="_blank" rel="noopener">${d.commitShort}</a>`
        : "(brak)";
      $("author").textContent = d.author || "";
      $("repo").textContent = (d.repoOwner && d.repoSlug) ? `${d.repoOwner}/${d.repoSlug}` : "";
      $("url").textContent = d.vercelUrl || location.host;
      $("json").textContent = JSON.stringify(d, null, 2);
    })
    .catch(()=>{ $("json").textContent = "Nie udało się pobrać /api/version"; });
})();
