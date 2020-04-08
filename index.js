var express = require('express');
var socket = require('socket.io');
var port = 4000;

//Setting up de App
var app = express();
var server = app.listen(port, () => {
	console.log('Escuchando en el puerto 4000');
});

// Public folder for Static files

app.use(express.static('public'));

//Socket setup
var io = socket(server);

const users = {};

io.on('connection', (socket) => {
	console.log('Client ' + socket.id + ' connected');

	socket.on('chat', (data) => {
		io.sockets.emit('chat', data);
	});

	socket.on('Newconnection', (name) => {
		users[socket.id] = name;
		socket.broadcast.emit('userConnected', name);
	});

	socket.on('disconnect', () => {
		socket.broadcast.emit('userDisconnected', users[socket.id]);
		delete users[socket.id];
	});
});
