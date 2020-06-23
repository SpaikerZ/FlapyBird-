let cvs = document.getElementById("canvas")
let ctx = cvs.getContext("2d")




let bird = new Image();
let bg = new Image();
let vv = new Image();
let vn = new Image();
let ground = new Image();



bird.src = "img/bird.png"
bg.src = "img/bg.png"
vv.src = "img/vv.png"
vn.src = "img/vn.png"
ground.src = "img/ground.png"


function  play()  {
ctx.playImage(bg, 0,0)

} 

ground.onload = play