var socket = io();

function clickHostRole() {
    document.getElementById("roleButtons").innerHTML = "";
}

function clickPlayerRole() {
	document.getElementById("canvasDiv").innerHTML = "";
    document.getElementById("roleButtons").innerHTML = "";
}

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

// function clickDown(position){
	// if (event.clientx<document.body.clientWidth/3){
		// movement.left = true;
	// }
	// else if (event.clientx> 2 * (document.body.clientWidth/3)){
		// movement.right = true;
	// }
	// else if (event.clienty> document.body.clientWidth/2){
		// movement.down = true;
	// }
	// else{
		// movement.up = true;
	// }
// }

document.addEventListener('mousedown', function(event) {
	console.log(event);
  if (event.clientX<document.body.clientWidth/3){
		movement.left = true;
	}
	else if (event.clientX> 2 * (document.body.clientWidth/3)){
		movement.right = true;
	}
	else if (event.clientY> document.body.clientHeight/2){
		movement.down = true;
	}
	else{
		movement.up = true;
	}
});
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
