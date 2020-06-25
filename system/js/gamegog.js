var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var dranik2 = new Image();
var bg2 = new Image();
var fg = new Image();
var pipeUp2 = new Image();
var pipeBottom2 = new Image();

dranik2.src = "img/dranik2.jpg";
bg2.src = "img/bg2.jpg";
fg.src = "img/fg.png";
pipeUp2.src = "img/pipeUp2.png";
pipeBottom2.src = "img/pipeBottom2.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/yllya.mp3";
score_audio.src = "audio/кобыла.mp3";

var gap = 180;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 30;
 fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1;

function draw() {
 ctx.drawImage(bg2, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp2, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom2, pipe[i].x, pipe[i].y + pipeUp2.height + gap);

 pipe[i].x--;

 if(pipe[i].x == 85) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp2.height) - pipeUp2.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + dranik2.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp2.width
 && (yPos <= pipe[i].y + pipeUp2.height
 || yPos + dranik2.height >= pipe[i].y + pipeUp2.height + gap) || yPos + dranik2.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 }

 if(pipe[i].x == 5) {
 score++;
 score_audio.play();
 }
 }




/*

if (score >= 4){
    
    dranik2.src = "img/драник2.jpg";
}
*/








 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(dranik2, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

pipeBottom2.onload = draw;