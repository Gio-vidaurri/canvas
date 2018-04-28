Math.distance = function(a, b) {
        return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
    }
    // @see https://gist.github.com/mrdoob/838785
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}
// vars definitions
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var PI2 = Math.PI * 2;
var container, canvas, context;
//
var totalDots = isMobile ? 80 : 250;
var dots = [];
var min_distance = 200;
var friction = 0.05; //
// size
var width = window.innerWidth,
    height = window.innerHeight;
//mouse
var mouse = {
    x: 0,
    y: 0
}
var cursor = {
    x: width / 2,
    y: height / 2
}

function init() {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
    setDots();
    addEvents();
    //
    document.body.appendChild(canvas);
}

function addEvents() {
    /* throttle for PERFORMANCE */
    window.addEventListener("resize", _.throttle(onWindowResize, 250), false);
    if (isMobile) window.addEventListener("touchmove", _.throttle(onTouchMove, 250), false);
    else window.addEventListener("mousemove", _.throttle(onMouseMove, 150), false);
}

function onMouseMove(event) {
    var rect = canvas.getBoundingClientRect();
    mouse = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function onTouchMove(event) {
    var rect = canvas.getBoundingClientRect();
    var touch = event.touches[0];
    mouse = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    }
}

function setDots() {
    for (var i = 0; i < totalDots; i++) {
        var _dot = new Dot();
        dots.push(_dot);
    }
}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

var Dot = function(args) {
    if (args === undefined) var args = {};
    // this.alpha = Math.random();
    // this.rgba = "rgba(255, 255, 255, " + this.alpha + ")";
    this.radius = args.radius || this.alpha * 3;
    this.position = {
        x: args.x || Math.random() * canvas.width,
        y: args.y || Math.random() * canvas.height
    };
    this.radius = args.radius || Math.ceil(Math.random() * 3);
    this.velocity = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
    }
    this.draw = function() {
        this.updateCoords();
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, PI2);
        // context.fillStyle = this.rgba;
        context.fill();
    }
    this.updateCoords = function() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.x < 0) this.position.x = canvas.width;
        if (this.position.y < 0) this.position.y = canvas.height;
        if (this.position.x > canvas.width) this.position.x = 0;
        if (this.position.y > canvas.height) this.position.y = 0;
    }
    return this;
}

function updateCursor() {
    cursor.x += (mouse.x - cursor.x) * friction;
    cursor.y += (mouse.y - cursor.y) * friction;
    context.beginPath();
    context.fillStyle = "black";
    context.arc(cursor.x, cursor.y, 5, 0, PI2);
    context.fill();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCursor();
    for (var i = 0; i < dots.length; i++) {
        var _dot_a = dots[i];
        _dot_a.draw();
        var _distance = Math.distance(_dot_a.position, cursor);
        if (_distance < min_distance) {
            context.moveTo(_dot_a.position.x, _dot_a.position.y);
            context.lineTo(cursor.x, cursor.y);
            context.strokeStyle = "black";
            context.lineWidth = 1 - (_distance / min_distance);
            context.stroke();
        }
    }
}

init();
animate();