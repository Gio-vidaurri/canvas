var canvas, context;
var maxWidth, maxHeight;
var time = new Date().getTime();

function init () {
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	document.body.appendChild(canvas);

	SetSize();

	widow.addEventListener("resize", SetSize);
}

function SetSize() {
	maxWidth = window.innerWidth;
	maxHeight = window.innerHeight;

	canvas.width = maxWidth;
	canvas.width = maxHeight;
}

function animate() {
	requestAnimationFrame(animate);
	time = new Date().getTime();
	render();
}

function render(){
	
}

init();
render();