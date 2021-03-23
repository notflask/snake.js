const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "ground.png";

var fps;
var controls = "arrows";

var forwardKey;
var leftKey;
var rightKey;
var behindKey;

var gradient_green = ctx.createLinearGradient(0, 0, 1000, 100);
gradient_green.addColorStop(0, "green");
gradient_green.addColorStop(1, "lime");

var gradient_blue = ctx.createLinearGradient(0, 0, 1000, 100);
gradient_blue.addColorStop(0, "MediumBlue");
gradient_blue.addColorStop(1, "LightSkyBlue");

var gradient_red = ctx.createLinearGradient(0, 0, 1000, 100);
gradient_red.addColorStop(0, "LightCoral");
gradient_red.addColorStop(1, "Maroon");

var gradient_purple = ctx.createLinearGradient(0, 0, 1000, 100);
gradient_purple.addColorStop(0, "DarkMagenta");
gradient_purple.addColorStop(1, "BlueViolet");


let carrotCheckBoxIsChecked = false;
let appleCheckBoxIsChecked = false;
let grapeCheckBoxIsChecked = false;

let color = gradient_green;

window.onload = function() {
	var appleCheckBox = document.getElementById('appleCheckbox');
	var grapeCheckBox = document.getElementById('grapeCheckbox');
	var carrotCheckBox = document.getElementById('carrotCheckbox');

	var fps30 = document.getElementById('30fps');
	var fps60 = document.getElementById('60fps');
	var fps80 = document.getElementById('80fps');

	var arrowsCheckBox = document.getElementById('arrows');
	var wasdCheckBox = document.getElementById('wasd');

	var blueCheckBox = document.getElementById('blueCheckbox');
	var redCheckBox = document.getElementById('redCheckbox');
	var purpleCheckBox = document.getElementById('purpleCheckbox');

	appleCheckBox.checked = false;
	grapeCheckBox.checked = false;
	carrotCheckBox.checked = false;

	fps30.checked = false;
	fps60.checked = false;
	fps80.checked = false;

	blueCheckBox.checked = false;
	redCheckBox.checked = false;
	purpleCheckBox.checked = false;

	//controls
	if (arrowsCheckBox.checked == false && wasdCheckBox.checked == false) {
		controls = "arrows";
		console.log(controls)
		forwardKey = 38;
		leftKey = 37;
		behindKey = 40;
		rightKey = 39;
	}

	wasdCheckBox.onchange = function () {
		controls = "wasd";
		console.log(controls)
		forwardKey = 87;
		leftKey = 65;
		behindKey = 83;
		rightKey = 68;
	}

	//food
	if (carrotCheckBox.checked == false && grapeCheckBox.checked == false && appleCheckBox.checked == false) {
		foodImg.src = "carrot.png";
	}

	appleCheckBox.onchange = function() {
		foodImg.src = "apple.png";
		appleCheckBoxIsChecked = true;
	}

	carrotCheckBox.onchange = function() {
		foodImg.src = "carrot.png";
		carrotCheckBoxIsChecked = true;
		
	}

	grapeCheckBox.onchange = function() {
		foodImg.src = "grape.png";
		grapeCheckBoxIsChecked = true;
	}

	//fps
	if (fps30.checked == false && fps60.checked == false && fps80.checked == false) {
		fps = 100;
		localStorage.setItem("fps", fps)
	}

	fps30.onchange = function() {
		fps = 30;
		localStorage.setItem("fps", fps)
		console.log(fps)
	}
	fps60.onchange = function() {
		fps = 60;
		localStorage.setItem("fps", fps)
		console.log(fps)
	}
	fps80.onchange = function() {
		fps = 80;
		localStorage.setItem("fps", fps)
		console.log(fps)
	}


	//colors

	if (blueCheckBox == false && redCheckBox.checked == false) {
		color = gradient_green;
	}

	redCheckBox.onchange = function() {
		color = gradient_red;
	}

	blueCheckBox.onchange = function() {
		color = gradient_blue;
	}

	purpleCheckBox.onchange = function() {
		color = gradient_purple;
	}
}

const foodImg = new Image();
foodImg.src = "carrot.png";

let box = 32;

let score = 0;

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

function drawingText(text) {
	h1 = document.createElement("h1");
	Text = document.createTextNode(text);

	h1.appendChild(Text);
	document.body.appendChild(h1);
}

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode == leftKey && dir != "right")
		dir = "left";
	else if(event.keyCode == forwardKey && dir != "down")
		dir = "up";
	else if(event.keyCode == rightKey && dir != "left")
		dir = "right";
	else if(event.keyCode == behindKey && dir != "up")
		dir = "down";
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
		document.location.reload();
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y);

	for(let i = 0; i < snake.length; i++) {
		// ctx.fillStyle = i == 0 ? color : color;
		ctx.fillStyle = color;
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "45px Verdana";
	ctx.fillText(score, box * 2.5, box * 1.7);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else
		snake.pop();

	if(snakeX < box || snakeX > box * 17
		|| snakeY < 3 * box || snakeY > box * 16)
		document.location.reload();

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead);
}

let game = setInterval(drawGame, localStorage.getItem("fps"));
