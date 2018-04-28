// var container = document.getElementById('container');
var canvas, context;
var maxWidth, maxHeight;


// init : función inicializa canvas - clases particulas detalles
// animate: funcion que se itera, se llama asimisma,

funcion init(){
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	// container.appendChild(canvas)
	document.body.appendChild(canvas);
}

funcion animate() {
	requestAnimationFrame(animate);
	time = new Date().getTime();
	render();
}


funcion render(){
	// draw methods
}

init();
animate();