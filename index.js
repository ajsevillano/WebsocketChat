var express = require('express');
var socket = require('socket.io');
var ent = require('ent'); // Blocks HTML characters (security equivalent to htmlentities in PHP)
var port = 4000;

//Setting up de App
var app = express();
var server = app.listen(port, () => {
	console.log('Listen up at port 4000');
});

// Public folder for Static files

app.use(express.static('public'));

//Socket setup
var io = socket(server);

const users = {};

io.on('connection', (socket) => {
	console.log('Client ' + socket.id + ' connected');

	socket.on('chat', (data) => {
		data.message = ent.encode(data.message);
		io.sockets.emit('chat', data);
	});

	socket.on('Newconnection', (name) => {
		users[socket.id] = name;
		socket.broadcast.emit('userConnected', name);
	});

	socket.on('disconnect', () => {
		console.log('Client ' + socket.id + ' disconnected');
		socket.broadcast.emit('userDisconnected', users[socket.id]);
		delete users[socket.id];
	});
});
