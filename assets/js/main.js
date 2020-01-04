var canvas;
var gameScreen;
var player;
var pipe;
var pipes = [];

var button ={
    x:0,
    y:0,
    width: 100,
    height: 80
};


var SCREENWIDTH;
var SCREENHEIGHT;
var PLAYERWIDTH = 20;
var PLAYERHEIGHT = 20;

var screenX = 10;
var screenY = 10;
var playerX = 40;
var playerY = 40;

var pipeX;
var pipeY = 10;
var pipeHeight;
var pipeWidth = 30;

var playerSpeed=1;
var jump = false;


var pipeMoveInterval;
var moveInterval;
var drawInterval;
var edgeCheckInterval;
var edgeCheckInterval;


var MINGAP = 80;


function startScreen(){
    canvas = document.getElementById('gameCanvas');
    gameScreen = canvas.getContext('2d');
    SCREENHEIGHT = canvas.height;
    SCREENWIDTH = canvas.width;
    gameScreen.fillStyle = "lightblue";
    gameScreen.fillRect(screenX, screenY, SCREENWIDTH, SCREENHEIGHT);

    var txt = canvas.getContext('2d');
    txt.font = "40px Gothic";
    txt.fillStyle = "darkgreen";
    txt.textAlign = "center";
    txt.fillText("Flappy Life", SCREENWIDTH/2,SCREENHEIGHT/2);

    var butt = canvas.getContext('2d');
    butt.fillStyle = "yellow";
    butt.fillRect(SCREENWIDTH/2-100/2, SCREENHEIGHT/2 + 50, 100, 80);
    button.x = SCREENWIDTH/2-100/2
    button.y = SCREENHEIGHT/2 + 50;
    butt.textAlign = "center";
    butt.font = "30px Gothic"
    butt.fillStyle = "red";
    butt.fillText("Start", SCREENWIDTH/2, SCREENHEIGHT/2 + 100);
    canvas.addEventListener('click', function(evt){
        
        var mousePosition = getMousePosition(canvas, evt);
        if (isIntersecting(mousePosition, button)){
            init();
        }
        
    }, false);
    
  
}

function init(){
    
    
    player = canvas.getContext('2d');
    pipe = canvas.getContext('2d');

    pipeInterval = setInterval(spawnPipe, 2300);
    pipeMoveInterval = setInterval(pipeMove,100);
    moveInterval = setInterval(playerMove, 101); 
    drawInterval = setInterval(redraw, 100);
    edgeCheckInterval = setInterval(pipeAtEdge, 100);
    endCheckInterval = setInterval(isEnd, 80);
    document.onkeydown = playerJump;


}

function getMousePosition(canvas, event){
    var button = canvas.getBoundingClientRect();
    return {
        x: event.clientX - button.left,
        y: event.clientY - button.top
    };
}

function isIntersecting(mousePos, button){
    return mousePos.x > button.x && mousePos.x < button.x+button.width && mousePos.y < button.y+button.height && mousePos.y > button.y
}
function clear(c) {
    c.clearRect(0,0, SCREENWIDTH, SCREENHEIGHT);
}

function redraw(){
    clear(gameScreen);
    clear(player);
    clear(pipe);
    gameScreen.fillStyle="lightblue";
    gameScreen.fillRect(screenX,screenY,SCREENWIDTH,SCREENHEIGHT);
    player.fillStyle="yellow";
    player.fillRect(playerX, playerY, PLAYERWIDTH,PLAYERHEIGHT);
    pipe.fillStyle="green";
    pipes.forEach(p => {
        pipe.fillRect(p[0], p[1], p[2], p[3]);
    })
}

function reset(){
    playerX = 40;
    playerY = 40;
    playerSpeed = 1;
    pipes = [];   
}

function playerJump(e){
    if(e.keyCode == '32'){
        jump = true;
    }
}

function playerMove(){
    if (jump == true){
        playerY = playerY - 10 - (playerSpeed);
        jump = false;
        playerSpeed = 1;
    }
    else{
        playerY = playerY + playerSpeed;
        playerSpeed = playerSpeed + 2;
    }
}
function pipeMove(){
    pipes.forEach(p => {
        p[0] = p[0] - 5
    });
}

function spawnPipe(){
    pipeX = SCREENWIDTH;
    pipeY = 10;
    pipeHeight;
    pipeWidth = 30;

    pipeHeight = Math.floor(Math.random() * (SCREENHEIGHT-(MINGAP*2) + MINGAP+10));
    pipes.push([pipeX, pipeY, pipeWidth, pipeHeight]);
    var bottomPipeY = pipeY + pipeHeight +MINGAP;
    var bottompipeHeight = SCREENHEIGHT - bottomPipeY;
    pipes.push([pipeX, bottomPipeY, pipeWidth, bottompipeHeight]);

}

function pipeAtEdge(){
    if (pipes[0][0] <= 0){
        pipes.shift();
    }
}

function isEnd(){
    var end =false;
    if (playerY > SCREENHEIGHT + screenY){
        end = true;
    }
    else{
        pipes.forEach(p => {
            if(!(playerX + PLAYERWIDTH  < p[0] || playerX > p[0] + p[2] || playerY + PLAYERHEIGHT < p[1] || playerY > p[1] + p[3])){
                end = true;
            }
        })
        
    }
    
    if (end){
        clearInterval(drawInterval);
        clearInterval(pipeInterval);
        clearInterval(edgeCheckInterval);
        clearInterval(moveInterval);
        clearInterval(pipeMoveInterval);
        clearInterval(endCheckInterval);
        reset();
        location.reload();
    }
    return;
}

