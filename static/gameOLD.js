var socket = io();

function clickHostRole() {
    document.getElementById("roleButtons").innerHTML = "";
	document.getElementById("canvasDiv").innerHTML = "<canvas id=\"canvas\"></canvas>";
	var canvas = document.getElementById('canvas');
	// canvas.width = 800;
	// canvas.height = 600;
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	var context = canvas.getContext('2d');
	socket.on('state', function(players) {
		// console.log(players);
		context.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
		context.fillStyle = 'green';
		for (var id in players) {
			var player = players[id];
			context.beginPath();
			context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
			context.fill();
		}
	});
}

function clickPlayerRole() {
    document.getElementById("roleButtons").innerHTML = "<div style=\"text-align:center;\"><button onmousedown=\"moveUp()\">UP</button></div>" +
	"<div style=\"text-align:center;\"><button onmousedown=\"moveLeft()\">LEFT</button>" +
	"<button onmousedown=\"moveRight()\">RIGHT</button></div>" +
	"<div style=\"text-align:center;\"><button onmousedown=\"moveDown()\">DOWN</button></div>";
	socket.emit('new player');
	setInterval(function() {
		socket.emit('movement', movement);
	}, 1000 / 30);
}

var movement = {
	up: false,
	down: false,
	left: false,
	right: false
}

function moveUp(){
	movement.up = true;
	movement.down = false;
}
function moveDown(){
	movement.down = true;
	movement.up = false;
}
function moveLeft(){
	movement.left = true;
	movement.right = false;
}
function moveRight(){
	movement.right = true;
	movement.left = false;
}



