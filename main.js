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