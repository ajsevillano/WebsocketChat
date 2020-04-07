let name = prompt('Please enter your name', GenerateRandomName());
window.onload = askForName();

function askForName() {
	if (name != null) {
		document.getElementById('handle').innerHTML = name;
	}
}

function GenerateRandomName() {
	let GenerateRandomNumber = Math.floor(Math.random() * 1000) + 1;
	let RandomName = GenerateRandomNumber.toString().padStart(4, '0');
	return 'Guest' + RandomName;
}

// Make the connection with the chat.
let socket = io.connect('http://192.168.1.223:4000');

// Querys to the DOM
let message = document.getElementById('message');
let btn = document.getElementById('send');
let output = document.getElementById('output');

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
		name: handle.innerHTML,
	});
	message.value = '';
});

// Listen for events
socket.on('chat', (data) => {
	output.innerHTML +=
		'<p><strong>' + data.name + '</br></strong>' + data.message + '</p>';
});
