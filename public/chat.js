let nameFromPrompt = prompt('Please enter your name', GenerateRandomName());

// Strip HTML Tags.
let name = nameFromPrompt.replace(/(<([^>]+)>)/gi, '');

// If the user doesn't choose a name, it will generate a random one.
if (name === '') name = GenerateRandomName();

function GenerateRandomName() {
	let GenerateRandomNumber = Math.floor(Math.random() * 1000) + 1;
	let RandomName = GenerateRandomNumber.toString().padStart(4, '0');
	return 'Guest' + RandomName;
}

// Querys to the DOM
let message, btn, output, chatWindow, nickHolder, feedback;

message = document.getElementById('message');
btn = document.getElementById('send');
output = document.getElementById('output');
chatWindow = document.getElementById('chat-window');
nickHolder = document.getElementById('left');
feedback = document.getElementById('typing');

// Querys to the Top bar DOM
let loginName, loginH1, loginH2;

loginName = document.getElementById('loginName');
loginH1 = document.createElement('h1');
loginH2 = document.createElement('h2');
loginName.appendChild(loginH1);
loginName.appendChild(loginH2);

loginH1.innerHTML = 'Welcome ' + name;
output.innerHTML =
	'<p>Welcome to ajsevillano.es! Please,have fun.</p><p><strong>You </strong>have joined the chat.</p>';

nickHolder.innerHTML = name;

function ScrollBar() {
	return (chatWindow.scrollTop = chatWindow.scrollHeight);
}

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

// Broadcast a message when the user is typing
document.addEventListener('keydown', (event) => {
	if (event.which != 13) socket.emit('typing', name);
});

// Emit the event when someone send a message
btn.addEventListener('click', () => {
	if (message.value.length > 0) {
		socket.emit('chat', {
			message: message.value,
			name: name,
		});
		message.removeAttribute('class');
		message.placeholder = 'Type a message';
	} else {
		message.classList.add('error');
		message.placeholder = 'You can not send an empty message.';
	}
	message.value = '';
});

// Events listeners //

// An user connect
socket.on('userConnected', (data) => {
	output.innerHTML += `<p><strong>${data}</strong> has joined the chat <span>${getTimeWithLeadingZeros()}</span></p>`;
	ScrollBar();
});

// An user disconnect
socket.on('userDisconnected', (data) => {
	output.innerHTML += `<p><strong>${
		data[0]
	}</strong> disconnected <span>${getTimeWithLeadingZeros()}</span></p>`;
	loginH2.innerHTML = 'Users: ' + data[1];
	ScrollBar();
});

// An user send a message
socket.on('chat', (data) => {
	feedback.innerHTML = '';
	output.innerHTML += `<p><strong>${
		data.name
	}</strong> <span>[${getTimeWithLeadingZeros()}]</span></br> ${
		data.message
	}</p>`;
	ScrollBar();
});

socket.on('ClientsCounter', (data) => {
	loginH2.innerHTML = 'Users: ' + data;
});

socket.on('typing', (data) => {
	ScrollBar();
	feedback.innerHTML = `<p><span>${data} is typing a message...</span></p>`;
});
