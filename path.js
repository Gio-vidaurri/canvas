// CANVAS
var canvas, context;
var maxWidth, maxHeight;
var time = new Date().getTime();

// Particulas
// var particles {}; definición de un objeto

var particles = {
	x: Math.random() * window.innerWidth,
	Y: Math.random() * window.innerHeight,
	radius: Math.random() * 10,
};

var PI2 = Math.PI*2;

function init () {
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	document.body.appendChild(canvas);

	SetSize();

	window.addEventListener("resize", SetSize);
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

var particle = function(args) {
	if (args === undefined) args = {};
	this.x = args.x || (Math.random() * window.innerWidth);
	this.y = args.y || (Math.random() * window.innerHeight);
	this.radius = args.radius || (Math.random() * 10);
	return this;
}

function render() {
	context.clearRect(0, 0, maxWidth, maxHeight);
	context.arc(particle.x, particle.y, particle.radius, Math.PI*2, false);
	context.fill();

}

init();
render();