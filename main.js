const log= console.log;

let canvas = document.querySelector('#snake');

let context = canvas.getContext('2d');

let box= 32;
let snake = []; //parts of the snake
snake[0]={
    x: 8 * box,
    y: 8 * box,
}
let counter = 1;

const left  =   37;
const up    =   38;
const right =   39;
const down  =   40;


let direction = 'right';
document.addEventListener('keydown', update);

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




///se a direção anteriro nao for a contraria
function update(e){
  if(e.keyCode == left && direction != 'right'){
       direction='left' ;
  }
  if(e.keyCode==up && direction != 'down'){
      direction = 'up'
  }
  if(e.keyCode== right && direction != 'left'){
      direction='right';
  }
  if(e.keyCode == down && direction != 'up'){
      direction= 'down';
  }
}


//game loop
function GameLoop(){
   
// LOGIC
if(snake[0].x > (15 * box) && direction == 'right') snake[0].x=0;
if(snake[0].x< 0 && direction == 'left') snake[0].x = box* 16;
if(snake[0].y< 0 && direction == 'up') snake[0].y = box* 16;
if(snake[0].y> box * 16 && direction == 'down') snake[0].y = 0;

    createBG();
    createSnake();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if(direction =='right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    snake.pop(); // take out a tail

    //put a ne head
    let newHead = {
        x:snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

}


let game = setInterval(GameLoop,100);



