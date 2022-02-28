/* --- GAME SETUP -- */
const newGameBtn = document.getElementById("new-game-btn");
const canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');


// set middle line/net
const NET_LINE_HEIGHT = 50;
const NET_LINE_WIDTH = 2;
const NET_LINE_GAP = 11;
const NET_LINE_COLOR = "white";
const BACKGROUND_COLOR = "black";


// init ball to middle and set speed
let ballWidth = 10;
let ballHeight = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballColor = "white";

// set initial direction to left
let ballSpeedX = -7;

// set random initial Y direction 
let upDown = Math.random() > 0.5 ? -1: 1
let ballSpeedY = Math.random() * 7 * upDown;

// init rackets
const RACKET_HEIGHT = 100;
const RACKET_WIDTH = 5;
const RACKET_COLOR = "white";
const RACKET_GAP = 2;

const RACKET_LEFT_X = RACKET_GAP;
const RACKET_RIGHT_X = canvas.width - RACKET_WIDTH - RACKET_GAP;

let racketLeftY = (canvas.height - RACKET_HEIGHT) / 2;
let racketRightY = (canvas.height - RACKET_HEIGHT) / 2;

// init FPS and mousepos and start drawing game
canvas.addEventListener("mousemove", e => {
    let mousePos = getMousePos(e);

    // change racket position and center it to mouse
    racketLeftY = mousePos.y - RACKET_HEIGHT / 2;

    // lock in edge overflow
    racketLeftY + RACKET_HEIGHT > canvas.height ? racketLeftY = canvas.height - RACKET_HEIGHT: null;
    racketLeftY < 0 ? racketLeftY = 0: null;
})
let gameFPS = 30;
setInterval(() => {
    draw(); 
    move();
}, 1000/gameFPS);



/* --- GAME FUNCTIONS --- */

function draw() {
    // draw background
    drawRect(0,0,canvas.width, canvas.height, BACKGROUND_COLOR);

    // draw middle line/net
    for (let i = 0; i < canvas.height + NET_LINE_HEIGHT + NET_LINE_GAP; i += NET_LINE_HEIGHT + NET_LINE_GAP) {
        drawRect(
            (canvas.width/2) - (NET_LINE_WIDTH/2),
            i,
            NET_LINE_WIDTH,
            NET_LINE_HEIGHT,
            NET_LINE_COLOR
        );
    };

    // draw ball
    drawCircle(ballX, ballY, ballWidth, ballColor);

    // get mouse position for moving rackets
    // draw left racket
    drawRect(RACKET_LEFT_X, racketLeftY, RACKET_WIDTH, RACKET_HEIGHT, RACKET_COLOR);

    // draw right racket
    drawRect(RACKET_RIGHT_X, racketRightY, RACKET_WIDTH, RACKET_HEIGHT, RACKET_COLOR);
}


function move() {
    // horizontal movement
    // if ball is max left, check if is in range of racket
    if (ballX <= 0 + ballWidth + RACKET_WIDTH && inRange(ballY, racketLeftY, racketLeftY + RACKET_HEIGHT)) {
        // reverse direction
        ballSpeedX = ballSpeedX * -1;
    }
    else if (ballX <= 0 + ballWidth + RACKET_WIDTH && !inRange(ballY, racketLeftY, racketLeftY + RACKET_HEIGHT)) {
        ballReset();
    }
    ballX += ballSpeedX;

    // if ball is max right, check if is in range of racket
    if (ballX >= canvas.width - ballWidth - RACKET_WIDTH && inRange(ballY, racketRightY, racketRightY + RACKET_HEIGHT)) {
        ballSpeedX = ballSpeedX * -1;
    }
    else if (ballX >= canvas.width - ballWidth - RACKET_WIDTH && !inRange(ballY, racketRightY, racketRightY + RACKET_HEIGHT)) {
        ballReset();
    }

    //vertical movement
    ballY > canvas.height - ballWidth ? ballSpeedY = ballSpeedY * -1: null;
    ballY < 0 + ballWidth ? ballSpeedY = ballSpeedY * -1: null;
    ballY += ballSpeedY;
}

function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

function inRange(x, min, max) {
    return x >= min && x <= max;
}

async function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 0;
    ballSpeedY = 0;
    await newGameClicked(newGameBtn, 'click');
    ballSpeedX = -7;
    upDown = Math.random() > 0.5 ? -1: 1
    ballSpeedY = Math.random() * 7 * upDown;
}

function newGameClicked(item, event) {
    return new Promise((resolve) => {
        const listener = () => {
        item.removeEventListener(event, listener);
        resolve();
        }
        item.addEventListener(event, listener);
    })
}


/* --- DRAW FUNCTIONS --- */

function drawRect(x, y, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, width, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, width/2, 0, Math.PI*2, false);
    ctx.fill();
}