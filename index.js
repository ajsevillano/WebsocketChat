let express, socket, ent, server, app, port;

//Setting up de App
port = 3000;
express = require('express');
socket = require('socket.io');
ent = require('ent'); // Blocks HTML characters (security equivalent to htmlentities in PHP)
app = express();
server = app.listen(port, () => {
  console.log(`Listen up at port ${port}`);
});

// Public folder for Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

const userData = {};

io.on('connection', (socket) => {
  let numberOfClients = io.engine.clientsCount;
  io.sockets.emit('ClientsCounter', numberOfClients);

  socket.on('Newconnection', (name) => {
    userData[socket.id] = name;
    socket.broadcast.emit('userConnected', name);
  });

  socket.on('disconnect', () => {
    if (userData[socket.id] != null) {
      let updateClients = io.engine.clientsCount;
      UserUpdate = [userData[socket.id], updateClients];
      socket.broadcast.emit('userDisconnected', UserUpdate);
      delete userData[socket.id];
    }
  });

  socket.on('chat', (data) => {
    data.message = ent.encode(data.message);
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
