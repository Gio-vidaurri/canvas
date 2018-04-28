var canvas, context;
var maxWidth, maxHeight;
var time = new Date().getTime();

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

function render() {
	context.clearRect(0, 0, maxWidth, maxHeight);

	context.fillStyle = "red";
	
	context.fillRect(0, 0, 100, 100);

	context.beginPath();
	context.moveTo(maxWidth/2, maxHeight/2);
	context.lineTo(10, 200);
	context.lineTo(10, 400);
	context.lineTo(200, 100);

	context.lineTo(maxWidth/2, maxHeight/2);
	context.strokeStyle = "blue";
	context.stroke();
	context.closePath();

}

init();
render();