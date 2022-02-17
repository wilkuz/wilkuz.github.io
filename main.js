/* animating the art-arrow down */
const artArrow = document.querySelector(".art-arrow");
const artText = document.querySelector(".art-arrow-text");

artText.addEventListener('mouseenter', () => {
    artArrow.style.width = "80px";
});

artText.addEventListener('mouseout', () => {
    artArrow.style.width = "85px";
});

artArrow.addEventListener('mouseenter', () => {
    artArrow.style.width = "80px";
});

artArrow.addEventListener('mouseout', () => {
    artArrow.style.width = "85px";
});

/* adding toggle event for dark mode */

const body = document.querySelector('body');
const toggleBtn = document.getElementById('toggle-dark-mode');
const toggleContainer = document.getElementById('toggle-dark-mode-box');
const headerLogo = document.getElementsByClassName('header-logo');
const navListItems = document.getElementsByClassName('nav-bar-list-item');

toggleBtn.addEventListener('click', (e) => {
    // shift button position and switch to light mode
    if (toggleContainer.style.justifyContent === "flex-end") {
        toggleContainer.style.justifyContent = "flex-start";
        body.classList.remove("dark-mode-active");
        headerLogo[0].style.backgroundImage = "url(images/logo-header-bg-lightmode.png)";
        for (let item of navListItems) {
            item.style.border = "1px dashed black";
        }
    }
    //shift button position and switch to dark mode
    else {
        toggleContainer.style.justifyContent = "flex-end";
        document.body.setAttribute("class", "dark-mode-active");
        headerLogo[0].style.backgroundImage = "url(images/logo-header-bg-darkmode.png)";
        for (let item of navListItems) {
            item.style.border = "1px dashed white";
        }
    }    
});