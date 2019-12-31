var canvas;
var gameScreen;
var player;

var SCREENWIDTH;
var SCREENHEIGHT;
var PLAYERWIDTH = 20;
var PLAYERHEIGHT = 20;

var screenX = 10;
var screenY = 10;
var playerX = 40;
var playerY = 40;

var playerSpeed=1;
var jump = false;

function init(){
    canvas = document.getElementById('gameCanvas');
    SCREENHEIGHT = canvas.height;
    SCREENWIDTH = canvas.width;
    gameScreen = canvas.getContext('2d');
    
    player = canvas.getContext('2d');
    //setInterval(playerMove, 100); 
    setInterval(redraw, 100);

    document.onkeydown = playerJump;

}

function clear(c) {
    c.clearRect(0,0, SCREENWIDTH, SCREENHEIGHT);
}

function redraw(){
    clear(gameScreen);
    clear(player);
    gameScreen.fillStyle="lightblue";
    gameScreen.fillRect(screenX,screenY,SCREENWIDTH,SCREENHEIGHT);
    player.fillStyle="yellow";
    player.fillRect(playerX, playerY, PLAYERWIDTH,PLAYERHEIGHT);
    
}

function playerJump(e){
    if(e.keyCode == '32'){
        jump = true;
    }
}

function playerMove(){
    if (jump == true){
        playerY = playerY - 10 - (3*playerSpeed);
        jump = false;
        playerSpeed = 1;
    }
    else{
        playerY = playerY + playerSpeed;
        playerSpeed = playerSpeed + 2;
    }
}

