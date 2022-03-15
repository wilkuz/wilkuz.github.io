/* --- MOBILE NAVBAR SLIDE --- */
const hamburger = document.querySelector('[hamburger-menu]');
const navMenu = document.querySelector('.main-nav');
const navOverlay = document.querySelector('[mob-nav-overlay]');

let menuOpen = false;

hamburger.addEventListener('click', (e) => {
    navMenu.classList.toggle('nav-mobile-hidden');
    navMenu.classList.toggle('nav-mobile-visible');
    navOverlay.classList.toggle('nav-overlay-disabled');
    navOverlay.classList.toggle('nav-overlay-active');
    if (!menuOpen) {
        hamburger.classList.add('open');
        menuOpen = true;
    } else {
        hamburger.classList.remove('open');
        menuOpen = false;
    }
})