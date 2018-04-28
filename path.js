// CANVAS
var canvas, ctx;
var maxWidth, maxHeight;
var time = new Date().getTime();

// Particulas
// var particles {}; definición de un objeto

// var particles = {
// 	x: Math.random() * window.innerWidth,
// 	Y: Math.random() * window.innerHeight,
// 	radius: Math.random() * 10,
// };

var particles = [];
var particleCounter = 200;
var PI2 = Math.PI * 2;

function init() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    setParticles();
    SetSize();

    window.addEventListener("resize", SetSize);
}

function setParticles() {
    for (var i = 0; i < particleCounter; i++) {
        var particle = new Particle();
        particles.push(particle);
    }
}

function SetSize() {
    maxWidth = window.innerWidth;
    maxHeight = window.innerHeight;

    canvas.width = maxWidth;
    canvas.height = maxHeight;
}

function animate() {
    requestAnimationFrame(animate);
    time = new Date().getTime();
    render();
}

var Particle = function(args) {
    if (args === undefined) args = {};
    this.position = {
        x: args.x || (Math.random() * window.innerWidth),
        y: args.y || (Math.random() * window.innerHeight)
    }
    this.velocity = {
        x: (Math.random()) - 0.5,
        y: (Math.random()) - 0.5
    };
    this.alpha = Math.random();
    this.rgba = "rgba(255, 255, 255, " + this.alpha + ")";
    this.radius = args.radius || this.alpha * 3;
    this.draw = function(ctx) {
        this.update();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, PI2, false);
        ctx.fillStyle = this.rgba;
        ctx.fill();
        ctx.closePath();
        if (this.position.x > window.innerWidth) {
            this.position.x = 0;
        }
        if (this.position.y > window.innerWidth) {
            this.position.y = 0;
        }

        
    }
    this.update = function() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    return this;
}

function render() {
    ctx.clearRect(0, 0, maxWidth, maxHeight);
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        particle.draw(ctx);
    }

}

init();
animate();