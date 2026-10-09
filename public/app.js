'use strict';
const settings = window.SWAT_SITE || {};
const phone = /^\+\d{7,15}$/.test(settings.phoneE164 || '') ? settings.phoneE164 : '+15618010080';
document.querySelectorAll('[data-call]').forEach(link => { link.href = `tel:${phone}`; });
document.querySelectorAll('[data-text]').forEach(link => { link.href = `sms:${phone}`; });
document.querySelectorAll('[data-phone]').forEach(label => { label.textContent = settings.phoneDisplay || '(561) 801-0080'; });
let booking;
try {
  if (settings.bookingUrl) {
    const url = new URL(settings.bookingUrl);
    if (url.protocol === 'https:') booking = url.href;
  }
} catch { /* Keep the usable phone link if the optional URL is incomplete. */ }
document.querySelectorAll('[data-booking]').forEach(link => {
  link.href = booking || `tel:${phone}`;
  link.textContent = booking ? 'Book your ride' : 'Call to book';
  if (booking) link.rel = 'noopener';
});
if (settings.reviewMode === false) document.querySelectorAll('[data-review-banner]').forEach(banner => { banner.hidden = true; });

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const narrow = window.matchMedia('(max-width: 799px)');
function setMenu(open) {
  navigation.classList.toggle('is-collapsed', !open && narrow.matches);
  menu.setAttribute('aria-expanded', String(open || !narrow.matches));
  menu.textContent = open && narrow.matches ? 'Close menu' : 'Menu';
}
if (menu && navigation) {
  menu.hidden = false;
  setMenu(false);
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => { if (event.target.closest('a') && narrow.matches) setMenu(false); });
  narrow.addEventListener('change', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && narrow.matches && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false); menu.focus();
    }
  });
}


// Decorative local video; the poster works without JavaScript or playback.
const hero = document.querySelector('.hero');
const heroVideo = document.querySelector('#hero-video');
const videoToggle = document.querySelector('.video-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let videoLoaded = false;
let videoPausedByVisitor = false;
function updateVideoButton() {
  videoToggle.textContent = heroVideo.paused ? 'Play background video' : 'Pause background video';
}
function playHeroVideo() {
  if (!videoLoaded) {
    const source = heroVideo.querySelector('source');
    source.src = source.dataset.src;
    heroVideo.load();
    videoLoaded = true;
  }
  heroVideo.play().catch(updateVideoButton);
}
if (hero && heroVideo && videoToggle) {
  videoToggle.hidden = false;
  heroVideo.addEventListener('playing', () => {
    hero.classList.add('has-video');
    updateVideoButton();
  });
  heroVideo.addEventListener('pause', updateVideoButton);
  function showHeroPoster() {
    hero.classList.remove('has-video');
    videoToggle.hidden = true;
  }
  heroVideo.addEventListener('error', showHeroPoster);
  heroVideo.querySelector('source').addEventListener('error', showHeroPoster);
  videoToggle.addEventListener('click', () => {
    videoPausedByVisitor = !heroVideo.paused;
    if (videoPausedByVisitor) heroVideo.pause();
    else playHeroVideo();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      heroVideo.pause();
      hero.classList.remove('has-video');
    } else if (!videoPausedByVisitor && !navigator.connection?.saveData) playHeroVideo();
  });
  if (!reducedMotion.matches && !navigator.connection?.saveData) playHeroVideo();
}
