var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bax3 = new Image();
var bg2 = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bax3.src = "img/bax3.png";
bg2.src = "img/bg2.jpg";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/askme.mp3";
score_audio.src = "audio/ass.mp3";

var gap = 120;

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
var grav = 2;

function draw() {
 ctx.drawImage(bg2, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--;

 if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + bax3.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bax3.height >= pipe[i].y + pipeUp.height + gap) || yPos + bax3.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 }

 if(pipe[i].x == 5) {
 score++;
 score_audio.play();
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bax3, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;