const game_board = document.getElementById('game_board');
const scoreBoard = document.getElementById('score');
const highScoreBoard = document.getElementById('high_score');
const controlButtons = document.querySelectorAll('#controlButtons > i')
const gameOverScreen = document.getElementById('gameOverScreen');
const play_again_btn = document.getElementById('play_again_btn');

let foodX,foodY,
snakeX = 5,snakeY = 10,
velX = 0,velY = 0,
ms = 125,
score = 0,
highScore = localStorage.getItem("high-score") || 0,
snakeBody = [],
gameOver = false,
gameInterval;

const changeDirection = e => {
    if(e.key === "ArrowRight" && velX != -1){
        velX = 1;
        velY = 0; 
    }else if(e.key === "ArrowLeft" && velX != 1){
        velX = -1;
        velY = 0;
    }
    else if(e.key === "ArrowUp" && velY != 1){
        velX = 0;
        velY = -1;
    }
    else if(e.key === "ArrowDown" && velY != -1){
        velX = 0;
        velY = 1;
    }
    initGame();
}

const newFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const alertTheGameOver = (s,hs) => {
    clearInterval(gameInterval);
    gameOverScreen.classList.add('gameOverScreen_active');
    document.getElementById('gs_score').textContent = `Your Score : ${s}`;
    document.getElementById('gs_hscore').textContent = `High Score : ${hs}`;
    document.addEventListener('keyup',(e) => {
        if(e.key === "Enter") location.reload();
    })
}

const initGame = () => {
    if(gameOver) alertTheGameOver(score,highScore);
    let html_markup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        newFoodPosition();
        score++;
        highScore = highScore < score ? score : highScore;
        scoreBoard.textContent = `Score : ${score}`;
        highScoreBoard.textContent = `High Score : ${highScore}`;
        localStorage.setItem("high-score",highScore);

        snakeBody.push([foodX,foodY]);

        ms = ms >= 60 ? ms - ((ms/100) * 2) : ms;
        console.log(ms);
        clearInterval(gameInterval);
        gameInterval = setInterval(initGame,ms);
    }

    if(snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) gameOver = true;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX,snakeY]

    snakeX += velX;
    snakeY += velY;

    for (let i = 0; i < snakeBody.length; i++) {
        html_markup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) gameOver = true;
    }

    game_board.innerHTML = html_markup;
}

function run(){
    highScoreBoard.textContent = `High Score : ${highScore}`;
    newFoodPosition();
    gameInterval = setInterval(initGame,ms);
    document.addEventListener('keydown',changeDirection);
    controlButtons.forEach(btn => {
        btn.addEventListener('click',() => {
            changeDirection({key:btn.dataset.key});
        })
    })
    document.addEventListener('click',e => {
        
    })
    play_again_btn.addEventListener('click', () => location.reload() )
}

run();