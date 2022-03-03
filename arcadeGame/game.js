
/* --- GAME SETUP -- */
const displayWinnerDiv = document.querySelector('#game-overlay');
const displayWinnerText = document.querySelector('#winner-header');
const newGameBtn = document.getElementById("new-game-btn");
const pauseBtn = document.getElementById("pause-game-btn");
const canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');

// init sound variables
const ballHit = document.getElementById('ballHit');
ballHit.volume = 0.2;
const countdownAudio = document.getElementById('countdownAudio');
countdownAudio.volume = 0.2;
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.2;
backgroundMusic.play();

const audioToggle = document.getElementById('audioToggle');
const audioUp = document.getElementById('audioUp');
const audioDown = document.getElementById('audioDown');

audioToggle.addEventListener('click', () => {
    if (audioToggle.classList.contains('playing')) {
        audioToggle.classList.remove('fa-volume-high');
        audioToggle.classList.add('fa-volume-xmark');
        audioToggle.classList.remove('playing');
        audioToggle.classList.add('paused')
        backgroundMusic.pause();
        ballHit.volume = 0;
    } else {
        audioToggle.classList.remove('fa-volume-xmark');
        audioToggle.classList.add('fa-volume-high');
        audioToggle.classList.remove('paused');
        audioToggle.classList.add('playing');
        backgroundMusic.play();
        ballHit.volume = 0.2;
    }
    
});

audioUp.addEventListener('click', () => {
    backgroundMusic.volume <= 1 ? backgroundMusic.volume += 0.05: null;
});

audioDown.addEventListener('click', () => {
    backgroundMusic.volume >= 0 ? backgroundMusic.volume -= 0.05: null;
})



// set middle line/net
const NET_LINE_HEIGHT = 80;
const NET_LINE_WIDTH = 2;   
const NET_LINE_GAP = 20;
const NET_LINE_COLOR = "white";
const BACKGROUND_COLOR = "black";

// init score
let currentScoreLeft = 0;
let currentScoreRight = 0;
let winner = "";
let gameState = "paused";

// init ball to middle and set speed
let ballWidth = 10;
let ballHeight = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballColor = "white";

// set initial direction to left
let ballSpeedX = -10;

// set random initial Y direction 
let upDown = Math.random() > 0.5 ? -1: 1
let ballSpeedY = Math.random() * 20 * upDown;

// init rackets
const RACKET_HEIGHT = 100;
const RACKET_WIDTH = 5;
const RACKET_COLOR = "white";
const RACKET_GAP = 10;

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


// start the game
let gameFPS = 60;

setInterval(() => {
    draw(); 
    move();
}, 1000/gameFPS);



/* --- GAME FUNCTIONS --- */

function draw() {
    // draw background
    drawRect(0,0,canvas.width, canvas.height, BACKGROUND_COLOR);

    // draw middle line/net
    for (let i = NET_LINE_GAP / 2; i < canvas.height + NET_LINE_HEIGHT + NET_LINE_GAP; i += NET_LINE_HEIGHT + NET_LINE_GAP) {
        drawRect(
            (canvas.width/2) - (NET_LINE_WIDTH/2),
            i,
            NET_LINE_WIDTH,
            NET_LINE_HEIGHT,
            NET_LINE_COLOR
        );
    };

    //draw score
    ctx.fillStyle = "white";
    ctx.font = "2em Nova Square"
    let currentScoreText = currentScoreLeft.toString();
    ctx.fillText(currentScoreText, canvas.width*0.38, canvas.height*0.2);
    currentScoreText = currentScoreRight.toString();
    ctx.fillText(currentScoreText, canvas.width*0.6, canvas.height*0.2);


    // draw ball
    drawCircle(ballX, ballY, ballWidth, ballColor);

    // get mouse position for moving rackets
    // draw left racket
    drawRect(RACKET_LEFT_X, racketLeftY, RACKET_WIDTH, RACKET_HEIGHT, RACKET_COLOR);

    // draw right racket
    drawRect(RACKET_RIGHT_X, racketRightY, RACKET_WIDTH, RACKET_HEIGHT, RACKET_COLOR);
}


function move() {
    if (gameState == "running") {
        // horizontal movement
        // if ball is max left, check if is in range of racket
        if (ballX <= 0 + ballWidth + RACKET_WIDTH + RACKET_GAP && inRange(ballY, racketLeftY, racketLeftY + RACKET_HEIGHT)) {
            // reverse direction
            ballSpeedX = ballSpeedX * -1;
            ballHit.play();
        }
        else if (ballX <= 0 + ballWidth + RACKET_WIDTH + RACKET_GAP && !inRange(ballY, racketLeftY, racketLeftY + RACKET_HEIGHT)) {
            currentScoreRight += 1;
            if (currentScoreRight >= 5) {
                newGameBtn.classList.remove("hidden");
                displayWinnerDiv.classList.remove("hidden");
                displayWinnerText.textContent = "Player 2 wins!"
                gameReset();
            } else {
                ballReset();
            }
        }

        // if ball is max right, check if is in range of racket
        if (ballX >= canvas.width - ballWidth - RACKET_WIDTH - RACKET_GAP && inRange(ballY, racketRightY, racketRightY + RACKET_HEIGHT)) {
            // reverse direction
            ballSpeedX = ballSpeedX * -1;
            ballHit.play();
        }
        else if (ballX >= canvas.width - ballWidth - RACKET_WIDTH - RACKET_GAP && !inRange(ballY, racketRightY, racketRightY + RACKET_HEIGHT)) {
            currentScoreLeft += 1;
            if (currentScoreLeft >= 5) {
                newGameBtn.classList.remove("hidden");
                displayWinnerDiv.classList.remove("hidden");
                displayWinnerText.textContent = "Player 1 wins!"
                gameReset();
            } else {
                ballReset();
            }
        }
        ballX += ballSpeedX;

        //vertical movement
        ballY > canvas.height - ballWidth ? ballSpeedY = ballSpeedY * -1: null;
        ballY < 0 + ballWidth ? ballSpeedY = ballSpeedY * -1: null;
        ballY += ballSpeedY;

        racketRightY = ballY - RACKET_HEIGHT / 2;
    };
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


function displayCountDown(num, ms) {
    return new Promise((resolve) => {
        displayWinnerDiv.classList.remove("hidden");
        displayWinnerText.textContent = num;
        setTimeout(resolve, ms);
    })
}

async function ballReset() {
    gameState = "paused";
    await displayCountDown("3", 1000);
    await displayCountDown("2", 1000);
    await displayCountDown("1", 1000);
    displayWinnerDiv.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    gameState = "running";
}
// initialize the game with a start btn and then ballreset

/************* ADD A START BUTTON HERE*********/
// ballReset();

async function gameReset() {
    currentScoreLeft = 0;
    currentScoreRight = 0;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 0;
    ballSpeedY = 0;
    racketRightY = 0;
    pauseBtn.classList.add("hidden");
    await newGameClicked(newGameBtn, 'click');
    ballReset();
    ballSpeedX = -10;
    upDown = Math.random() > 0.5 ? -1: 1
    ballSpeedY = Math.random() * 20 * upDown;
}

function newGameClicked(item, event) {
    return new Promise((resolve) => {
        const listener = () => {
        item.removeEventListener(event, listener);
        newGameBtn.classList.add("hidden");
        displayWinnerDiv.classList.add("hidden");
        resolve();
        }
        item.addEventListener(event, listener);
    })
}

// pause/unpause event listeners
pauseBtn.addEventListener('click', gamePause);
document.addEventListener('keydown', gamePause);

async function gamePause(evt) {
    if (evt.type == 'click' && gameState == "running") {
        // save ballspeed for resuming later and set current ballspeed to 0
        gameState = "paused";
        // change button to resume
        pauseBtn.textContent = "Resume";
        displayWinnerDiv.classList.remove("hidden");
        displayWinnerText.textContent = "Game paused"
        await unpauseClicked(pauseBtn, 'click');
        displayWinnerDiv.classList.add("hidden");
        pauseBtn.textContent = "Pause [P]";
    } else if (evt.key == "p" && gameState == "running") {
        gameState = "paused";
        pauseBtn.textContent = "Resume";
        displayWinnerDiv.classList.remove("hidden");
        displayWinnerText.textContent = "Game paused"
        await unpauseClicked(pauseBtn, 'click');
        displayWinnerDiv.classList.add("hidden");
        pauseBtn.textContent = "Pause [P]";
    };
}

function unpauseClicked(item, event) {
    return new Promise((resolve) => {
        const listener = () => {
            item.removeEventListener(event, listener);
            gameState = "running";
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