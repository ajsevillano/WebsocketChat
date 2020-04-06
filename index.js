var express = require('express');

//Setting up de App
var app = express();
var server = app.listen(4000, () => {
	console.log('Escuchando en el puerto 4000');
});
