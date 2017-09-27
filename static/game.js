var socket = io();
var WIDTH = document.body.clientWidth - (document.body.clientWidth*0.02);
var HEIGHT = document.body.clientHeight - (document.body.clientHeight*0.02);
var newDeck = deck.slice();
var myTurn = false;


function clickHostRole() {
	console.log(newDeck);
	socket.emit('newDeck', newDeck);
    document.getElementById('roleButtons').innerHTML = '';
	document.getElementById('cardButtons').innerHTML = '';
	document.getElementById('canvasDiv').innerHTML = '<canvas id=\"canvas\"></canvas>';
	var canvas = document.getElementById('canvas');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.style.letterSpacing = '-8px';
	var context = canvas.getContext('2d');
	context.font = '48px serif';
	socket.on('state', function(currentDeck) {
		console.log(currentDeck);
		context.clearRect(0, 0, WIDTH, HEIGHT);
		for(i=0; i<currentDeck.length; i++){
			context.fillText(currentDeck[i].name,((i%13))*(WIDTH/14)+(Math.floor(i/13)*45),((i%13)+1)*(HEIGHT/14));
		}
	});
}

function clickPlayerRole() {
	document.getElementById('roleButtons').innerHTML = '';
	document.getElementById('nameCreation').style.visibility = 'visible';
	}
function submitName(){
	var name = document.getElementById('playerName').value;
	console.log(name);
	socket.emit('new player', name);
	document.getElementById('nameCreation').innerHTML = '';
	socket.on('turn', function(currentTurn) {
		console.log(currentTurn.name);
		console.log(socket.id);
		if(currentTurn.playerID === socket.id){
			console.log("MY TURN");
			myTurn = true;
			document.getElementById('cardButtons').style.visibility = 'visible';
		}
		else{
			console.log("not MY TURN");
			myTurn = false;
			document.getElementById('cardButtons').style.visibility = 'hidden';
		}
	});
}

var move = {
	guess:''
}

function guess(value){
	if(myTurn){
		move.guess = value;
		console.log(value);
		socket.emit('move',move);
	}
}