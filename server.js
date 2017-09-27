// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var serverDeck = [];
var currentTurn = 0;
var currentCard = -1;

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
	console.log('Starting server on port 5000');
});

var players = [];
io.on('connection', function(socket) {
	socket.on('new player', function(playerName) {
		players[players.length] = {
			playerID: socket.id,
			name: playerName
		};
		console.log(playerName);
		if(players.length===1){
			io.sockets.emit('turn', players[currentTurn]);
		}
	});
	socket.on('move', function(data) {
		console.log(serverDeck[Number(data.guess)].value);
		if(currentCard%13 == Number(data.guess)){
			serverDeck[currentCard].name = ' ';
			currentCard = -1;
			while(currentCard === -1){
				currentCard = Math.floor(Math.random() * 51);
				if(serverDeck[currentCard].name === ' '){
					currentCard = -1;
				}
				else{
					console.log(currentCard);
					console.log(serverDeck[currentCard].name);
				}
			}
		}
		if(currentTurn >= players.length-1){
			currentTurn = 0;
		}
		else{
			currentTurn++;
		}
		console.log(players[currentTurn]);
		io.sockets.emit('turn', players[currentTurn]);
	});
	socket.on('newDeck', function(clientDeck) {
		serverDeck = clientDeck;
		console.log(serverDeck);
		currentCard = Math.floor(Math.random() * 53);
		console.log(currentCard);
	});
	socket.on('disconnect', function(){
		console.log("DISCONNECTION " + socket.id);
		for(var i =0; i<players.length;i++){
			if(players[i].playerID === socket.id){
				players.splice(i,1);
				break;
			}
		}
		players.splice(socket.id,1);
	});
});

setInterval(function() {
	io.sockets.emit('state', serverDeck);
}, 1000);
