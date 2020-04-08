let name = prompt('Please enter your name', GenerateRandomName());

function GenerateRandomName() {
	let GenerateRandomNumber = Math.floor(Math.random() * 1000) + 1;
	let RandomName = GenerateRandomNumber.toString().padStart(4, '0');
	return 'Guest' + RandomName;
}

// Querys to the DOM
let message = document.getElementById('message');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let chatWindow = document.getElementById('chat-window');

// Querys to the Top bar DOM

let loginName = document.getElementById('loginName');
let loginH1 = document.createElement('h1');

loginName.appendChild(loginH1);

loginH1.innerHTML = 'Welcome ' + name;
output.innerHTML = '<p><strong>You </strong>have joined the chat.</p>';

// Make the connection with the chat.
let socket = io.connect('http://192.168.1.223:4000');

socket.emit('Newconnection', name);

// Send the message when Return key is press and message is not empty.
document.addEventListener('keydown', (event) => {
	if (event.which === 13 && message.value === '') {
		event.preventDefault();
		window.alert('No puedes enviar un mensaje vacio');
	} else if (event.which === 13 && message.value != '') {
		btn.click();
	}
});

// Emit the events
btn.addEventListener('click', () => {
	socket.emit('chat', {
		message: message.value,
		name: name,
	});
	message.value = '';
});

// Events listeners //

// An user connect
socket.on('userConnected', (name) => {
	output.innerHTML += `<p><strong>${name}</strong> have joined the chat.</p>`;
});

// An user disconnect
socket.on('userDisconnected', (name) => {
	output.innerHTML += '<p><strong>' + name + '</strong>disconnected.</p>';
});

// An user send a message
socket.on('chat', (data) => {
	output.innerHTML +=
		'<p><strong>' + data.name + '</br></strong>' + data.message + '</p>';
});
