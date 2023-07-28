// initialize canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set starting values
let g = -60;
let on = true;
let points = [];

// declare class point on 2d canvas
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

// declare ball as object
let ball = {
    vx: 1,
    vy: 1,
    x: 30,
    y: 500,
    // method drawing ball on canvas
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, 2*Math.PI);
        ctx.fillStyle = "red";
        console.log();
        ctx.fill();
    },
    // method changing ball position
    move(t){
        ctx.clearRect(this.x-16, this.y-16, 32, 32)
        points.push(new Point(this.x, this.y));
        this.x = this.x + this.vx * t;
        this.y = this.y - this.vy * t;
        this.vy = this.vy + t * g;
        if(this.x>=1385 || this.x<=15) {
            this.vx = this.vx*(-1);
            if(this.x<=15) this.x = 16;
            else this.x = 1384;
        }
        if(this.y>=585 || this.y<=15) {
            this.vy = this.vy*(-1);
            if(this.y<=15) this.y = 16;
            else this.y = 584;
        }
        
    }
};
ball.draw();

let t = Date.now();

// function animating ball movement
function draw() {
    // calculate time between frames
    let timepassed = (Date.now() - t)/1000;
    ball.move(timepassed);
    ball.draw();
    t = Date.now();
    // animation running condition
    if(on)
        requestAnimationFrame(draw);
    else
        drawLine();
}

// drawing trajectory function
function drawLine() {
    ctx.clearRect(0, 0, 1400, 600);
    ctx.fillStyle = "green";
    points.forEach(elem => {
        ctx.fillRect(elem.x, elem.y, 2, 2);
    })
}

// function initializing animation
function start() {
    // setting values
    on = true;
    points = [];
    // preparing canvas
    ctx.clearRect(0, 0, 1400, 600);
    // geting values from form
    var fi = (parseFloat(document.getElementById("angel").value)/360)*2*Math.PI;
    var v = parseFloat(document.getElementById("vel").value);
    g = (-1) * parseFloat(document.getElementById("grav").value);
    // setting ball object values
    ball.vy = Math.sin(fi)*v;
    ball.vx = Math.cos(fi)*v;
    ball.x = 30;
    ball.y = 500;
    // start animation
    t = Date.now()
    ball.draw();
    draw();
}


// setting events on buttons clicks
document.getElementById("btn").addEventListener("click", start);
document.getElementById("btn2").addEventListener("click", function(){
    on = false;
});

