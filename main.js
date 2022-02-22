/* animating the about-me-arrow down */
const aboutmeArrow = document.querySelector(".about-me-arrow");
const aboutmeText = document.querySelector(".about-me-arrow-text");

aboutmeText.addEventListener('mouseenter', () => {
    aboutmeArrow.style.width = "3rem";
});

aboutmeText.addEventListener('mouseout', () => {
    aboutmeArrow.style.width = "3.5rem";
});

aboutmeArrow.addEventListener('mouseenter', () => {
    aboutmeArrow.style.width = "3rem";
});

aboutmeArrow.addEventListener('mouseout', () => {
    aboutmeArrow.style.width = "3.5rem";
});

/* animating portfolio arrow */

/* animating the portfolio-arrow down */
const portfolioArrow = document.querySelector(".portfolio-arrow");
const portfolioText = document.querySelector(".portfolio-arrow-text");

portfolioText.addEventListener('mouseenter', () => {
    portfolioArrow.style.width = "3rem";
});

portfolioText.addEventListener('mouseout', () => {
    portfolioArrow.style.width = "3.5rem";
});

portfolioArrow.addEventListener('mouseenter', () => {
    portfolioArrow.style.width = "3rem";
});

portfolioArrow.addEventListener('mouseout', () => {
    portfolioArrow.style.width = "3.5rem";
});

/* animating the art-arrow down */
const artArrow = document.querySelector(".art-arrow");
const artText = document.querySelector(".portfolio-arrow-text");

artText.addEventListener('mouseenter', () => {
    artArrow.style.width = "3rem";
});

artText.addEventListener('mouseout', () => {
    artArrow.style.width = "3.5rem";
});

artArrow.addEventListener('mouseenter', () => {
    artArrow.style.width = "3rem";
});

artArrow.addEventListener('mouseout', () => {
    artArrow.style.width = "3.5rem";
});

/* animating the contact-arrow down */
const contactArrow = document.querySelector(".contact-arrow");
const contactText = document.querySelector(".contact-arrow-text");

contactText.addEventListener('mouseenter', () => {
    contactArrow.style.width = "3rem";
});

contactText.addEventListener('mouseout', () => {
    contactArrow.style.width = "3.5rem";
});

contactArrow.addEventListener('mouseenter', () => {
    contactArrow.style.width = "3rem";
});

contactArrow.addEventListener('mouseout', () => {
    contactArrow.style.width = "3.5rem";
});


/* adding toggle event for dark mode */

const body = document.querySelector('body');
// const toggleBtn = document.getElementById('toggle-dark-mode');
const toggleContainer = document.getElementById('toggle-dark-mode-box');
const headerLogo = document.getElementsByClassName('header-logo');
const navListItems = document.getElementsByClassName('nav-bar-list-item');

toggleContainer.addEventListener('click', (e) => {
    // IF DARKMODE IS ACTIVE
    if (toggleContainer.style.justifyContent === "flex-end") {
        toggleContainer.style.justifyContent = "flex-start";
        body.classList.remove("dark-mode-active");
        headerLogo[0].style.backgroundImage = "url(images/logo-header-bg-lightmode.png)";
        for (let item of navListItems) {
            item.style.border = "1px dashed black";
        }
        // switch arrows to black
        let arrows = document.querySelectorAll('img[src="images/Arrow-down-darkmode.png"]');
        for (let arrow of arrows) {
            arrow.src = "images/Arrow-down.svg";
        }
        // // switch face to black
        // let face = document.querySelector(".contact-image");
        // face.src = "images/face.png"
    }

    // IF LIGHTMODE IS ACTIVE
    else {
        toggleContainer.style.justifyContent = "flex-end";
        document.body.setAttribute("class", "dark-mode-active");
        headerLogo[0].style.backgroundImage = "url(images/logo-header-bg-darkmode.png)";
        for (let item of navListItems) {
            item.style.border = "1px dashed white";
        }
        // switch arrows to white
        let arrows = document.querySelectorAll('img[src="images/Arrow-down.svg"]');
        for (let arrow of arrows) {
            arrow.src = "images/Arrow-down-darkmode.png";
        }

        sketchOverlay.style.display = "none";
        // // switch face to white
        // let face = document.querySelector(".contact-image");
        // face.src = "images/face-darkmode.png"
    }    
});

/* Removing overlay from sketch */

const sketchBtn = document.getElementById('sketch-btn');
const sketchOverlay = document.getElementsByClassName('sketch-overlay')[0];
const sketch = document.getElementById('#sketch-holder');

sketchBtn.addEventListener('click', () => {
    sketchOverlay.style.backgroundColor = "transparent";
    sketchBtn.style.display = "none";
}, {
    once: true
});

sketchOverlay.addEventListener('click', () => {
    sketchOverlay.style.backgroundColor = "transparent";
    sketchBtn.style.display = "none";
}, {
    once: true // This will fire the event once and remove it afterwards
});