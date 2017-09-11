var socket = io();

function clickHostRole() {
    document.getElementById("roleButtons").innerHTML = "";
}

function clickPlayerRole() {
	document.getElementById("canvasDiv").innerHTML = "<div style=\"text-align:center;\"><button onmousedown=\"moveUp()\">UP</button></div>" +
	"<div style=\"text-align:center;\"><button onmousedown=\"moveLeft()\">LEFT</button>" +
	"<button onmousedown=\"moveRight()\">RIGHT</button></div>" +
	"<div style=\"text-align:center;\"><button onmousedown=\"moveDown()\">DOWN</button></div>";
	
	// <button ontouchstart="moveup()" onmousedown="moveup()" onmouseup="clearmove()">UP</button><br><br>
  // <button ontouchstart="moveleft()" onmousedown="moveleft()" onmouseup="clearmove()">LEFT</button>
  // <button ontouchstart="moveright()" onmousedown="moveright()" onmouseup="clearmove()">RIGHT</button><br><br>
  // <button ontouchstart="movedown()" onmousedown="movedown()" onmouseup="clearmove()">DOWN</button></div>
    document.getElementById("roleButtons").innerHTML = "";
}

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

function moveUp(){
	movement.up = true;
}
function moveDown(){
	movement.down = true;
}
function moveLeft(){
	movement.left = true;
}
function moveRight(){
	movement.right = true;
}


// document.addEventListener('mousedown', function(event) {
	// console.log(event);
  // if (event.clientX<document.body.clientWidth/3){
		// movement.left = true;
	// }
	// else if (event.clientX> 2 * (document.body.clientWidth/3)){
		// movement.right = true;
	// }
	// else if (event.clientY> document.body.clientHeight/2){
		// movement.down = true;
	// }
	// else{
		// movement.up = true;
	// }
// });
document.addEventListener('mouseup', function(event) {
      movement.left = false;
      movement.up = false;
      movement.right = false;
      movement.down = false;
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  // console.log(players);
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 3 * Math.PI);
    context.fill();
  }
});
