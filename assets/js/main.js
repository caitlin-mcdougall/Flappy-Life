var canvas;
var gameScreen;
var player;
var pipe;
var pipes = [];


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
var start = true;

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
    var txt = canvas.getContext('2d');
    gameScreen.fillStyle = "lightblue";
    gameScreen.fillRect(screenX, screenY, SCREENWIDTH, SCREENHEIGHT);
    txt.font = "30px Arial";
    txt.fillStyle = "red";
    txt.textAlign = "center";
    txt.fillText("Flappy Life", SCREENWIDTH/2,SCREENHEIGHT/2);
;    
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
    pipes = []; 
    redraw();  
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
        alert("game ended");
        clearInterval(drawInterval);
        clearInterval(edgeCheckInterval);
        clearInterval(edgeCheckInterval);
        clearInterval(moveInterval);
        clearInterval(pipeMoveInterval);
        start = false;
        reset();
        startScreen();
    }
}

