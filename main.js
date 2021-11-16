const log= console.log;

let canvas = document.querySelector('#snake');

let context = canvas.getContext('2d');
let invencibleTime= 3000; //3 seconds
let box= 32;
let snake = []; //parts of the snake
let speed = 300;  // quanto menor, mais rapido, mais fificil
// HEAD SIZE
snake[0]={
    x: 8 * box,
    y: 8 * box,
}

let hearts = 0;

let invencible= false;

let snakeX;
let snakeY;

let newHead = {
    x:snakeX,
    y: snakeY
}
// DIRECTIONS
const left  =   37;
const up    =   38;
const right =   39;
const down  =   40;

let direction = 'right';

food={
    x: Math.floor(Math.random() * 15+1) * box,
    y: Math.floor(Math.random() * 15+1) * box,
    
}


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
if(snake[0].x > 15 * box && direction == 'right'){snake[0].x=0;} ;

    if(snake[0].x< 0 && direction == 'left') snake[0].x = box* 16;

    if(snake[0].y< 0 && direction == 'up') snake[0].y = box* 16;

    if(snake[0].y> box * 16 && direction == 'down') snake[0].y = 0;
}


function getInvencible(){
    if(hearts < 1) return;
        
    
    invencible=true; //get invencible
    setTimeout(()=>{
        invencible=false;
        console.log(invencible)
    },invencibleTime)
}

function hitWalls(){
    if((snake[0].x > 15 * box || snake[0].x< 0 || snake[0].y< 0 ||snake[0].y> box * 15) && !invencible){

        if(hearts >0){
            takeDamage();
            getInvencible();

        }else{
            clearInterval(game)
            log('fim')
            GameOver();
        }
      
    }
    
}

function spawnSnake(){
    newHead = {
        x:snakeX,
        y: snakeY
    }
}

function GameOver(){
  
    clearInterval(game);
    
}

function biteItself(){
    for(let i=1; i< snake.length;i++){
        if((snake[0].x == snake[i].x && snake[0].y == snake[i].y) && !invencible){
             takeDamage();
           log(snake.length)
        }
    }
}

// every time we take a damage we get incencible for 3 secs
function takeDamage(){
    snake.pop(); // take out a tail
}

function changeDirection(){
    if(direction =='right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;
}


function spawnFood(){
    food.x= Math.floor(Math.random() * 15+1) * box;
        food.y= Math.floor(Math.random() * 15+1) * box;
}


function eatFood(){
    return snakeX != food.x || snakeY != food.y
}

//game loop
function GameLoop(){
    
    hearts =snake.length-1;
    ///store snake current position
    snakeX = snake[0].x;
    snakeY = snake[0].y;
    changeDirection()    
    // warp(); // LOGIC to warp (appear on the other side)
    
    hitWalls(); //lose a body part if it hits the wall
    biteItself(); ///head touches any body part
    
    createBG();
    createSnake();
    drawFood();



 if(eatFood()){
    snake.pop(); 
     
    }else{
        //if it touches the fruit, dont remove the tail to seem like it gained a new piece of tail
        spawnFood();

        
    }
    
  
    
    
    //put a ne head
  
    spawnSnake();
    
    
    snake.unshift(newHead)
    log(hearts)
    
   
    
}


let game = setInterval(GameLoop,speed);



