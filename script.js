const { floor } = Math;
var fps, current;
var canvas, ctx, h, w;

var particles, stops;
var run = false,
   score;
const ringSpeed = 0.4;
var ringWidth;

var colors = [
   "#8C1178",
   "#F23869",
   "#BF30B6",
   "#1B4C8C",
   "#0F8AA6",
   "#3DFF00",
   "#FFFF00"
];

//function to change visual when window is resized and on loading
window.addEventListener("load", init);
window.addEventListener("resize", function() {
   if (run != false) {
      cancelAnimationFrame(run);
   }
   init();
});

function init() {
   //to get fps
   current = Date.now();
   fps = document.getElementById("fps");

   //establishing some stuff
   canvas = document.getElementById("canvas");
   ctx = canvas.getContext("2d");
   h = canvas.height = window.innerHeight;
   w = canvas.width = window.innerWidth;
   ringWidth = floor(h / 12);
   allowed = true;
   //onclick function
   canvas.onclick = e => {
      if (allowed) {
         e.preventDefault();
         let dot = new Particle("#fff");

         dot.x = e.pageX;
         dot.y = e.pageY;
         dot.ring = true;
         particles.push(dot);
         score--;
         allowed = false;
      } else {
         cancelAnimationFrame(run);
         init();
      }
   };

   particles = [];
   stops = [];
   num = floor((h > w ? h : w) / 5);
   speed = 2.2;
   rad = 3.2;
   score = 00;
   document.getElementById("score").innerText =
      floor((score / num) * 100) + "%";

   //console.log("width : " + w + "\nheight : " + h);
   for (let i = 0; i < num; i++) {
      let col = colors[i % colors.length];
      particles.push(new Particle(col));
   }

   //begin animation
   animate();
}

//animation
function animate() {
   //to calculate fps
   calcFPS();
   document.getElementById("score").innerText =
      floor((score / num) * 100) + "%";
   clear();

   //to update obstacles
   for (let p of particles) {
      p.update();
      p.bounce();
      p.draw();
   }

   //request next animation recursively
   run = requestAnimationFrame(animate);
}

const clear = () => {
   ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
   ctx.fillRect(0, 0, w, h);
};

//to generate random number between range
const random = (min = 0, max = 1) => Math.random() * (max - min) + min;

const circle = (x, y, r, color, fill) => {
   ctx.beginPath();
   ctx.arc(x, y, r, 0, 2 * Math.PI);
   if (fill) {
      ctx.fillStyle = color;
      ctx.fill();
   } else {
      ctx.strokeStyle = color;
      ctx.stroke();
   }
   ctx.closePath();
};

//utility functions
const calcFPS = () => {
   let timeDiff = Date.now() - current;
   current = Date.now();
   fps.innerText = `FPS : ${floor(1000 / timeDiff)}`;
};

//for info tab
function infoHide() {
   let tab = document.getElementById("info");

   tab.style.zIndex = "0";
   document.getElementById("canvas").style.filter = "blur(0)";
   //init();
}
function infoShow() {
   let tab = document.getElementById("info");

   tab.style.zIndex = "4";
   document.getElementById("canvas").style.filter = "blur(2px)";
   //cancelAnimationFrame(run);
}
