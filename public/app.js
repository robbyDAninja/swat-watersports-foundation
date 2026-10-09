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


// Decorative reference footage through YouTube's normal embedded player.
const hero = document.querySelector('.hero');
const videoHost = document.querySelector('#hero-video');
const videoToggle = document.querySelector('.video-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let heroPlayer;
let playerLoading = false;
let playbackWanted = false;
let videoPausedByVisitor = false;
let loopTimer;
const referenceVideo = { videoId: 'v5yWFooRxRk', startSeconds: 303, endSeconds: 315 };
function updateVideoButton(playing = false) {
  videoToggle.textContent = playing ? 'Pause background video' : 'Play background video';
}
function showHeroFallback() {
  hero.classList.remove('has-video');
  playbackWanted = false;
  videoToggle.hidden = true;
  clearInterval(loopTimer);
}
function loadHeroPlayer() {
  playbackWanted = true;
  if (heroPlayer?.playVideo) {
    heroPlayer.mute();
    heroPlayer.playVideo();
    return;
  }
  if (playerLoading) return;
  playerLoading = true;
  const previousReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    if (typeof previousReady === 'function') previousReady();
    heroPlayer = new window.YT.Player(videoHost, {
      host: 'https://www.youtube-nocookie.com',
      videoId: referenceVideo.videoId,
      playerVars: {
        autoplay: 0, controls: 0, playsinline: 1, rel: 0, disablekb: 1,
        cc_load_policy: 0, iv_load_policy: 3, origin: window.location.origin,
        start: referenceVideo.startSeconds, end: referenceVideo.endSeconds
      },
      events: {
        onReady(event) {
          const frame = event.target.getIframe();
          frame.title = 'Malibu Sportster reference footage by Bridge Marina';
          frame.tabIndex = -1;
          frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
          event.target.mute();
          if (playbackWanted) event.target.loadVideoById(referenceVideo);
          else event.target.cueVideoById(referenceVideo);
          loopTimer = setInterval(() => {
            if (playbackWanted && heroPlayer.getPlayerState() === window.YT.PlayerState.PLAYING &&
                heroPlayer.getCurrentTime() >= referenceVideo.endSeconds - 0.3) {
              heroPlayer.seekTo(referenceVideo.startSeconds, true);
            }
          }, 250);
        },
        onStateChange(event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            if (!playbackWanted) { event.target.pauseVideo(); return; }
            hero.classList.add('has-video');
            updateVideoButton(true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            updateVideoButton(false);
          } else if (event.data === window.YT.PlayerState.ENDED && playbackWanted) {
            event.target.loadVideoById(referenceVideo);
          }
        },
        onError: showHeroFallback
      }
    });
  };
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  script.onerror = showHeroFallback;
  document.head.append(script);
}
if (hero && videoHost && videoToggle) {
  videoToggle.hidden = false;
  videoToggle.addEventListener('click', () => {
    const playing = Boolean(heroPlayer && window.YT?.PlayerState && heroPlayer.getPlayerState() === window.YT.PlayerState.PLAYING);
    videoPausedByVisitor = playing || (playerLoading && playbackWanted && !heroPlayer);
    if (videoPausedByVisitor) {
      playbackWanted = false;
      heroPlayer?.pauseVideo?.();
      updateVideoButton(false);
    } else loadHeroPlayer();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      playbackWanted = false;
      heroPlayer?.pauseVideo?.();
      hero.classList.remove('has-video');
      updateVideoButton(false);
    } else if (!videoPausedByVisitor && !navigator.connection?.saveData) loadHeroPlayer();
  });
  if (!reducedMotion.matches && !navigator.connection?.saveData) loadHeroPlayer();
}
