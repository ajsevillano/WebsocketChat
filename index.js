var express = require('express');
var socket = require('socket.io');

//Setting up de App
var app = express();
var server = app.listen(4000, () => {
	console.log('Escuchando en el puerto 4000');
});

// Public folder for Static files

app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', (socket) => {
	console.log('made socket connection');
});
