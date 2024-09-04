let startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', startGame);

function startGame() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = true;
    h2.innerText = `Level ${level}`;
    levelUp();
}

let buttonColors = ['red', 'green', 'yellow', 'blue'];
let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;
let highScore = 0;

const h2 = document.querySelector("h2");
const flashOverlay = document.getElementById("flashOverlay");

if (localStorage.getItem('highScore')) {
    highScore = parseInt(localStorage.getItem('highScore'), 10);
    updateHighScoreDisplay();
}

document.addEventListener('keypress', function() {
    if (!started) {
        started = true;
        console.log("Game is started");
        levelUp();
    }
});

function flash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randInd = Math.floor(Math.random() * buttonColors.length);
    let randCol = buttonColors[randInd];
    
    gameSeq.push(randCol);
    console.log(`Game Sequence = ${gameSeq}`);
    
    for (let i = 0; i < gameSeq.length; i++) {
        (function(i) {
            setTimeout(function() {
                let randBtn = document.querySelector(`.${gameSeq[i]}`);
                flash(randBtn);
            }, i * 500); 
        })(i);
    }
}

function checkAns(ind) {
    if (userSeq[ind] === gameSeq[ind]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); 
        }
    } else {
        let finalScore = level - 1;
        h2.innerText = `Game Over. Your Score was ${finalScore}. Press Any Key to start again`;
        started = false;

        if (finalScore > highScore) {
            highScore = finalScore;
            localStorage.setItem('highScore', highScore);
            updateHighScoreDisplay();
        }

        flashOverlay.style.opacity = 1;
        setTimeout(function() {
            flashOverlay.style.opacity = 0;
        }, 1000); 
        setTimeout(function() {
            flashOverlay.style.opacity = 0;
        }, 2000); 
        
        level = 0;
        userSeq = [];
        gameSeq = [];
    }
}

function btnPress() {
    if (!started) return;

    let btn = this;
    flash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    setTimeout(() => {
        checkAns(userSeq.length - 1);
    }, 1500); 
}

function updateHighScoreDisplay() {
    let highScoreDisplay = document.querySelector("#highScore");
    if (highScoreDisplay) {
        highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
}

let allBtns = document.querySelectorAll(".box");

for (let btn of allBtns) {
    btn.addEventListener('click', btnPress);
}
