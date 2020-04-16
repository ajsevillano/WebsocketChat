let express, socket, ent, server, app, port;

//Setting up de App
port = 4000;
express = require('express');
socket = require('socket.io');
ent = require('ent'); // Blocks HTML characters (security equivalent to htmlentities in PHP)
app = express();
server = app.listen(port, () => {
	console.log(`Listen up at port ${port}`);
});

function getTimeWithLeadingZeros() {
	let today,
		minutesTwoDigitsWithLeadingZero,
		secondsTwoDigitsWithLeadingZero,
		time;

	today = new Date();
	minutesTwoDigitsWithLeadingZero = ('0' + today.getMinutes()).substr(-2);
	secondsTwoDigitsWithLeadingZero = ('0' + today.getSeconds()).substr(-2);
	time =
		today.getHours() +
		':' +
		minutesTwoDigitsWithLeadingZero +
		':' +
		secondsTwoDigitsWithLeadingZero;
	return time;
}

// Public folder for Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

const userData = {};

io.on('connection', (socket) => {
	console.log(`User ${socket.id} connected`);
	let numberOfClients = io.engine.clientsCount;
	io.sockets.emit('ClientsCounter', numberOfClients);

	socket.on('Newconnection', (name) => {
		let time = getTimeWithLeadingZeros();
		userData['name'] = name;
		userData['time'] = time;
		socket.broadcast.emit('userConnected', userData);
	});

	socket.on('chat', (data) => {
		data.message = ent.encode(data.message);
		io.sockets.emit('chat', data);
	});

	socket.on('disconnect', () => {
		let DisconnectTime = getTimeWithLeadingZeros();
		let updateClients = io.engine.clientsCount;
		if (userData['name'] != null) {
			userData['time'] = DisconnectTime;
			userData['numberOfClients'] = updateClients;
			socket.broadcast.emit('userDisconnected', userData);
			console.log(`User ${userData['name']} disconnected.`);
			delete userData['name'];
		}
	});
});
