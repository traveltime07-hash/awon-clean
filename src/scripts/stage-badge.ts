// src/scripts/stage-badge.ts
// Pokaż badge tylko na hostach staging
const el = document.getElementById('stage-badge');
if (el) {
  const host = location.hostname;
  const isStaging = host === 'staging.awonsystem.pl' || host.startsWith('staging.');
  if (isStaging) el.classList.remove('hidden');
}
