const log= console.log;

let canvas = document.querySelector('#snake');

let context = canvas.getContext('2d');

let box= 32;
let snake = []; //parts of the snake

// HEAD SIZE
snake[0]={
    x: 8 * box,
    y: 8 * box,
}


// DIRECTIONS
const left  =   37;
const up    =   38;
const right =   39;
const down  =   40;


food={
    x: Math.floor(Math.random() * 15+1) * box,
    y: Math.floor(Math.random() * 15+1) * box,
    
}


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


function drawFood(){
    context.fillStyle='red';
    context.fillRect(food.x, food.y, box, box);
}

function warp(){
if(snake[0].x > 15 * box && direction == 'right') snake[0].x=0;
    if(snake[0].x< 0 && direction == 'left') snake[0].x = box* 16;
    if(snake[0].y< 0 && direction == 'up') snake[0].y = box* 16;
    if(snake[0].y> box * 16 && direction == 'down') snake[0].y = 0;
}


function GameOver(){
    clearInterval(GameLoop);
}

function biteItself(){
    for(let i=1; i< snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            GameOver();
            alert("Game Over")
        }
    }
}



//game loop
function GameLoop(){
    
    warp(); // LOGIC to warp (appear on the other side)

    biteItself(); ///head touches any body part
    
    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

// if snake  doesn't touch the fruit, remove its tail to redraw later
 if(snakeX != food.x || snakeY != food.y){
     snake.pop(); // take out a tail
    }else{
        //if it touches the fruit, dont remove the tail to seem like it gained a new piece of tail
        food.x= Math.floor(Math.random() * 15+1) * box;
        food.y= Math.floor(Math.random() * 15+1) * box;

        
    }
    
  
    
    
    if(direction =='right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;
    
    
    //put a ne head
    let newHead = {
        x:snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead)
    
    
    
   
    
}


let game = setInterval(GameLoop,100);



