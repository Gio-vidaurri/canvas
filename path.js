// CANVAS
var canvas, context;
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
var particleCounter = 300;
var PI2 = Math.PI*2;

function init () {
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
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
	this.x = args.x || (Math.random() * window.innerWidth);
	this.y = args.y || (Math.random() * window.innerHeight);
	this.radius = args.radius || (Math.random() * 5);
	return this;
}

function render() {
	context.clearRect(0, 0, maxWidth, maxHeight);
	for (var i = 0; i < particles.length; i++) {
		var particle = particles[i];
		context.beginPath();
		context.arc(particle.x, particle.y, particle.radius, PI2, false);
		context.stroke();
		context.closePath();
	}

}

init();
render();