const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

//create unit
const box = 32;

function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  var z = mobileCheck()
  console.log(mobileCheck());
//load images

const ground = new Image()
ground.src= "background.png";

const arrowKey = new Image();
if(mobileCheck()) {arrowKey.src = "swipe.png"}
else {arrowKey.src = "arrow1.png"}
const img =new Image();

const foodImg = new Image()
foodImg.src= "food.png";
const foodImg1 = new Image()
foodImg1.src= "food1.png";
const foodImg2 = new Image()
foodImg2.src= "food2.png";
const foodImg3 = new Image()
foodImg3.src= "food3.png";

//load audio
const dead = new Audio();
const eat = new Audio();
const directionAudio = new Audio();


eat.src="eat.mp3";
dead.src="gameOver.mp3";
directionAudio.src="turn.mp3";

//snake

let snake = [];
snake[0] = {
    x:9*box,
    y:10*box,
}
//
let gameOver=false;
//create food

let food = {
    x : Math.floor(Math.random()*14+2)*box,
    y : Math.floor(Math.random()*14+2)*box,
}

//create score

let score = 0;

//control snake
let d;

document.addEventListener("keydown",direction);

function direction(event){
    directionAudio.play();
    if(event.keyCode==37 && d != "RIGHT"){
        
        d = "LEFT";
    }
    else if(event.keyCode==38 && d != "DOWN"){
        d = "UP";
    }
    else if(event.keyCode==39 && d != "LEFT"){
        d = "RIGHT";
    }
    else if(event.keyCode==40 && d != "UP"){
        d = "DOWN";
    }

}
function collision(head,array){
    for(let i = 0 ; i<array.length ; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

//random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
//draw everthing to canvas
let x=0;
function draw(){
    ctx.beginPath();
    //ctx.drawImage(ground,0,0);
    //ctx.fillStyle = "black";
    ctx.fillStyle = "rgb(37, 40, 37)";
    ctx.fill();
    ctx.fillRect(0,0,544,544);
    ctx.beginPath();
    //ctx.ellipse(50,50,15,10,0,2*Math.PI,false);
    ctx.fillStyle = "white";
    ctx.fillRect(0,60,544,4);
    ctx.drawImage(arrowKey,450,-5,80,70);
    
    for(let i = 0 ; i<snake.length ; i++){
        ctx.fillStyle = (i == 0)?  "rgb(68, 201, 77)" :"rgb(131, 232, 129)";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        //ctx.ellipse(snake[i].x+16,snake[i].y+16,16,16,0,2*Math.PI,false);
        //ctx.fillText(".",snake[i].x,snake[i].y);
   
        ctx.lineJoin = "round";
        ctx.lineWidth = "3";
        ctx.strokeStyle = "green";
        
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        
    }
    ctx.drawImage(img,food.x,food.y,box+7,box+7);    
    ctx.fill();
    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(swipedir == "LEFT") snakeX -= box;
    if(swipedir == "UP") snakeY -= box;
    if(swipedir == "RIGHT") snakeX += box;
    if(swipedir == "DOWN") snakeY += box;

    //if snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        eat.play();
        console.log(snake);
        score+=1;
        food = {
            x : Math.floor(Math.random()*14+2)*box,
            y : Math.floor(Math.random()*14+3)*box,
        }
        console.log(food.x);
        
        console.log(food.y);
    }
    else{
        snake.pop();
    }
  

    //add new head

    let newHead={
        x : snakeX,
        y : snakeY
    }
     //game over
     if(snakeX < 0 || snakeX > 16*box || snakeY <2*box || snakeY > 16*box || collision(newHead,snake)){
     
        clearInterval(game);
        over();
        
      }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,box,1.6*box);
}


//call draw function every 100ms
var speed=100
if(z){
    speed=150
}
let game = setInterval(draw,speed)

setInterval(()=>{
    if(x==0){
        img.src= "food.png";
        x=1;
    }
    else if(x==1){
        img.src= "food1.png";
        x=2;
    }
    else if(x==2){
        
        img.src= "food2.png";
        x=3;
    }
    else if(x==3){
        
        img.src= "food3.png";
        x=0;
    }
    },400);

function over(){
    dead.play();
   
    if(z){
        ctx.fillStyle = "white";
        ctx.font = "30px serif";

        ctx.fillText("   Tap to Restart...!!",130,1.6*box);
    
        ctx.font = "45px serif";
        ctx.fillText("...GAME OVER...",100,300);
        var tapped = false
        window.addEventListener("touchstart",function(e){
                  swipedir='none'
                  e.preventDefault()
                  if(swipedir=='none'){
                    console.log("aa");
                    location.reload();
                }
        });
        
      
    }else{
        
        ctx.fillStyle = "white";
        ctx.font = "30px serif";
    
        ctx.fillText("Press Space to Restart...!!",130,1.6*box);
    
        ctx.font = "45px serif";
        ctx.fillText("...GAME OVER...",100,300);
    
        document.addEventListener("keydown",(event)=>{
            if(event.keyCode == 32 ){
            
                location.reload();
            }
        })
    }

}

//check for mobile browser


  
  if(mobileCheck){
    var startX,startY,dist,threshold = 10,restraint = 100, allowedTime = 500,elapsedTime,startTime,swipedir = 'none'
        
    window.addEventListener('touchstart', function(e){
        
        var touchobj = e.changedTouches[0]

        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    window.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
    
    window.addEventListener('touchend', function(e){
        var swipedir1 = 'none'
       var touchobj = e.changedTouches[0]
            distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
            distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
            console.log(distX);
            elapsedTime = new Date().getTime() - startTime // get time elapsed
            console.log(elapsedTime);
            if (elapsedTime <= allowedTime){ // first condition for awipe met
               console.log("time") 
               if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                    swipedir1 = (distX < 0)? 'LEFT' : 'RIGHT' // if dist traveled is negative, it indicates left swipe
                }
                else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                    swipedir1 = (distY < 0)? 'UP' : 'DOWN' // if dist traveled is negative, it indicates up swipe
                }
                if(swipedir=='LEFT' && swipedir1=='RIGHT' ||swipedir=='RIGHT' && swipedir1=='LEFT' 
                || swipedir=='UP' && swipedir1=='DOWN' || swipedir=='DOWN' && swipedir1=='UP' || swipedir1=='none'){
                    //
                }
                else{
                    directionAudio.play();
                    swipedir=swipedir1
                }
            }
            console.log(swipedir);

       e.preventDefault()    
    }, false)
  }
