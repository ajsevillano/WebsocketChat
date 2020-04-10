var express = require('express');
var socket = require('socket.io');
var ent = require('ent'); // Blocks HTML characters (security equivalent to htmlentities in PHP)
const port = 4000;

//Setting up de App
var app = express();
var server = app.listen(port, () => {
	console.log(`Listen up at port ${port}`);
});

Colors = [
	'#c0392b',
	'#d35400',
	'#457b9d',
	'#8e44ad',
	'#27ae60',
	'#16a085',
	'#2980b9',
	'#2c3e50',
	'#474787',
];

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

	socket.on('Newconnection', (name, randomColor) => {
		var randomColor = Colors[Math.floor(Math.random() * Colors.length)];
		users['name'] = name;
		users['color'] = randomColor;
		socket.broadcast.emit('userConnected', users);
	});

	socket.on('disconnect', () => {
		if (users['name'] != null) {
			socket.broadcast.emit('userDisconnected', users['name']);
			delete users['socket.id'];
		}
	});
});
