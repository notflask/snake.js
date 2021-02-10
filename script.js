const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "ground.png";

var gradient_green = ctx.createLinearGradient(0, 0, 1000, 100);
gradient_green.addColorStop(0, "green");
gradient_green.addColorStop(1, "lime");

var gradient_blue = ctx.createLinearGradient(0, 0, 1000, 100);
gradient_blue.addColorStop(0, "MediumBlue");
gradient_blue.addColorStop(1, "LightSkyBlue");

var gradient_red = ctx.createLinearGradient(0, 0, 1000, 100);
gradient_red.addColorStop(0, "LightCoral");
gradient_red.addColorStop(1, "Maroon");

let carrotCheckBoxIsChecked = false;
let appleCheckBoxIsChecked = false;
let grapeCheckBoxIsChecked = false;

let color = gradient_green;

window.onload = function() {
	var appleCheckBox = document.getElementById('appleCheckbox');
	var grapeCheckBox = document.getElementById('grapeCheckbox');
	var carrotCheckBox = document.getElementById('carrotCheckbox');

	var blueCheckBox = document.getElementById('blueCheckbox');
	var redCheckBox = document.getElementById('redCheckbox');

	appleCheckBox.checked = false;
	grapeCheckBox.checked = false;
	carrotCheckBox.checked = false;

	blueCheckBox.checked = false;
	redCheckBox.checked = false;

	//food
	if (carrotCheckBox == false && grapeCheckBox.checked == false && appleCheckBox == false) {
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
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
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
		clearInterval(game);

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

let game = setInterval(drawGame, 100);







