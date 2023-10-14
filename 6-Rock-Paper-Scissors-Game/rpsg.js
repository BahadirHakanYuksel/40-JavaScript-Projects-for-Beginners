const selection_div = document.getElementById('selection');
const try_play = document.getElementById('try_play');
const number_btns = document.querySelectorAll('.number_btn');
const selection2 = document.getElementById('selection2');
const numberOfGamePanel = document.getElementById('numberOfGame');
const user_score_panel = document.getElementById('user_score');
const computer_score_panel = document.getElementById('computer_score');
const select_repeat_number_of_the_game = document.getElementById('select_repeat_number_of_the_game');

const selection1_icons = document.querySelectorAll('#selection > i');
const selection2_icons = document.querySelectorAll('#selection2 > i');

const n1 = document.querySelector('.n1');
const n2 = document.querySelector('.n2');

let selection_of_user = "";
let selection_of_computer = "";
var user_score = 0;
var computer_score = 0;
let numberOfGame = 0;
let numberOfGame_2 = 0;

events();

function events(){
    selection1_icons.forEach(icon => {
        icon.addEventListener('click',selections_click_actions);
    })
    selection2_icons.forEach(icon => {
        icon.addEventListener('click',selections_click_actions);
    })

    try_play.addEventListener('click',removeScreen);
    select_repeat_number_of_the_game.addEventListener('click',removeScreen2);
    number_btns.forEach(numberBtn => {
        numberBtn.addEventListener('click', () => {
            start(numberBtn.children[0].textContent);
        })
    });
}

function start(selectedNumberOfGame){
    numberOfGame = Number(selectedNumberOfGame);
    numberOfGame_2 = Number(selectedNumberOfGame);
    numberOfGamePanel.textContent = numberOfGame;
    removeScreen();
}

function selections_click_actions(e){
    if(numberOfGame >=1){
        const result_of_user = document.getElementById('result_of_user');
        if(e.target.id === 'rock' || e.target.id === 'Rock'){
            result_of_user.className = 'fa-regular fa-hand-back-fist';
            selection_of_user = 'rock';
        }
        if(e.target.id === 'papper' || e.target.id === 'Papper'){
            result_of_user.className = 'fa-regular fa-hand';
            selection_of_user = 'papper';
        }
        if(e.target.id === 'scissor' || e.target.id === 'Scissor'){
            result_of_user.className = 'fa-regular fa-hand-scissors';
            selection_of_user = 'scissor';
        }

        numberOfGame--;
        numberOfGamePanel.textContent = numberOfGame;
        openResultScreen();

    }
}

function openResultScreen(){
    const screen = document.getElementById('screen');
    selection_div.classList.remove('active_screen');
    screen.classList.add('active_screen');
    selection2.classList.add('active_screen');
    select_repeat_number_of_the_game.classList.add('active_screen');

    result_of_computer_animation();
}

function removeScreen(){
    const selectionTheNumberOfGame = document.getElementById('selectionTheNumberOfGame');
    const screen = document.getElementById('screen');
    selection_div.classList.add('active_screen');
    screen.classList.remove('active_screen');
    selectionTheNumberOfGame.classList.remove('active_screen');
    try_play.classList.remove('try_play_active');
    selection2.classList.remove("active_screen");
    select_repeat_number_of_the_game.classList.remove('active_screen');

    numberOfGame = numberOfGame_2;
    user_score = 0 ;
    computer_score = 0;
    user_score_panel.textContent = user_score;
    computer_score_panel.textContent = computer_score;

    n1.style.backgroundColor = '#223';
    n2.style.backgroundColor = 'rgb(51, 75, 104)';

}

function removeScreen2(){
    removeScreen();
    const selectionTheNumberOfGame = document.getElementById('selectionTheNumberOfGame');
    selectionTheNumberOfGame.classList.add('active_screen');

    user_score = 0 ;
    computer_score = 0;
    user_score_panel.textContent = user_score;
    computer_score_panel.textContent = computer_score;
}

function result_of_computer_animation(){
    const result_of_computer = document.getElementById('result_of_computer');
    selection2.classList.add('selection2_pause');
    let counter = 0;
    while(counter < 3600){
        setTimeout(() => {
            result_of_computer.className = 'fa-regular fa-hand-back-fist'
        }, counter);
        counter+=200;
        setTimeout(() => {
            result_of_computer.className = 'fa-regular fa-hand'
        }, counter);
        counter+=200;
        setTimeout(() => {
            result_of_computer.className = 'fa-regular fa-hand-scissors'
        }, counter);
        counter+=200;
    }

    setTimeout(() => {
        resultOfGame();
        if(numberOfGame > 0){
            selection2.classList.remove('selection2_pause');
        }if(numberOfGame === 0) try_play.classList.add('try_play_active');
    }, 3600);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resultOfGame(){

    ComputerSelection();

    const beforeScoreOfUser = user_score;
    const beforeScoreOfComputer = computer_score;

    if(selection_of_user != selection_of_computer){
        if(selection_of_user === 'rock' && selection_of_computer === 'papper' ||
        selection_of_user === 'papper' && selection_of_computer === 'scissor' ||
        selection_of_user === 'scissor' && selection_of_computer === 'rock'){
            // user_score--;
            computer_score++;
        }
        else{
            user_score++;
            // computer_score--;
        }
    }

    user_score_panel.textContent = user_score;
    computer_score_panel.textContent = computer_score;

    if(numberOfGame === 0){
        if(user_score > computer_score) n1.style.backgroundColor = 'rgb(10, 153, 58)'
        if(computer_score > user_score) n2.style.backgroundColor = 'rgb(10, 153, 58)'
        else{
            n1.style.backgroundColor = 'rgb(0, 89, 255)';
            n2.style.backgroundColor = 'rgb(0, 89, 255)'
        }
    }


    if(numberOfGame + user_score < computer_score || numberOfGame + computer_score < user_score){
        if(user_score > computer_score) n1.style.backgroundColor = 'rgb(10, 153, 58)'
        if(computer_score > user_score) n2.style.backgroundColor = 'rgb(10, 153, 58)'
        numberOfGame = 0;
        try_play.classList.add('try_play_active');
        selection2.classList.add('selection2_pause');
    }
    

    ScoreAnimation(user_score,computer_score,beforeScoreOfUser,beforeScoreOfComputer);
}

function ComputerSelection(){
    const result_of_computer = document.getElementById('result_of_computer');
    const rndInt = randomIntFromInterval(1, 3);
    if(rndInt === 1){
        result_of_computer.className = 'fa-regular fa-hand-back-fist'
        selection_of_computer = 'rock';
    }
    else if(rndInt === 2){
        result_of_computer.className = 'fa-regular fa-hand'
        selection_of_computer = 'papper';
    }
    else{
        result_of_computer.className = 'fa-regular fa-hand-scissors'
        selection_of_computer = 'scissor';
    }
}

function ScoreAnimation(userNow,computerNow,userBef,computerBef){
    const computer_score_panel = document.getElementById('computer_score');
    const user_score_panel = document.getElementById('user_score');
    const result_of_computer = document.getElementById('result_of_computer');
    if(userNow > userBef){
        result_of_user.style.color = 'rgb(10, 153, 58)';
        result_of_user.style.border = '0.2rem solid rgb(10, 153, 58)';
        user_score_panel.style.backgroundColor = 'rgb(10, 153, 58)';
        setTimeout(() => {
            result_of_user.style.color = '';
            result_of_user.style.border = '';
            user_score_panel.style.backgroundColor = ''
        },600);
    }
    if(computerNow > computerBef){
        result_of_computer.style.color = 'rgb(10, 153, 58)';
        result_of_computer.style.border = '0.2rem solid rgb(10, 153, 58)';
        computer_score_panel.style.backgroundColor = 'rgb(10, 153, 58)';
        setTimeout(() => {
            result_of_computer.style.color = '';
            result_of_computer.style.border = '';
            computer_score_panel.style.backgroundColor = ''
        },600);

    }else{
        result_of_user.style.color = 'rgb(0, 89, 255)';
        result_of_user.style.border = '0.2rem solid rgb(0, 89, 255)';
        user_score_panel.style.backgroundColor = 'rgb(0, 89, 255)';

        result_of_computer.style.color = 'rgb(0, 89, 255)';
        result_of_computer.style.border = '0.2rem solid rgb(0, 89, 255)';
        computer_score_panel.style.backgroundColor = 'rgb(0, 89, 255)';

        setTimeout(() => {
            result_of_user.style.color = '';
            result_of_user.style.border = '';
            user_score_panel.style.backgroundColor = ''
            
            result_of_computer.style.color = '';
            result_of_computer.style.border = '';
            computer_score_panel.style.backgroundColor = ''
        },600);
    }
}