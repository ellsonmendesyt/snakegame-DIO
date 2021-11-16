const log= console.log;

let canvas = document.querySelector('#snake');

let context = canvas.getContext('2d');

let box= 32;
let snake = []; //parts of the snake
snake[0]={
    x: 8 * box,
    y: 8 * box,
}

function createBG(){
    context.fillStyle='lightgreen';
    context.fillRect(0,0,16*box, 16*box);
}



function createSnake(){
    for(let i=0; i< snake.length;i++){
        context.fillStyle="green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


createBG();
createSnake();








