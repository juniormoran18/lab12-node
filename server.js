var express = require('express'),
app =  express(),
http = require('http').Server(app),
port = process.env.PORT || 3000;
user = require('./models/user');
io = require('socket.io')(http);

app.set('view engine', 'jade');

app.use('/static', express.static('public'));

app.get('/', function(req, res) {
    res.render('main');
});

io.on('connection', function(socket) {
    console.log("User connected");
    socket.on('disconnect', function() {
        console.log('User unconnected');
    });

    socket.on('crear', function(data) {
        user.create(data, function(rpta) {
            io.emit('nuevo', rpta);
        });
        console.log(data);
    });

    user.show(function(data) {
        socket.emit('listar', data);
    });

    socket.on('listar', function (data) {
        data = JSON.parse(data);
        for(var i=0, j=data.length; i<j; i++) {
            fill(data[i]);
        }
    });

    socket.on('actualizar', function (data) {
        user.update(data, function (rpta) {
            io.emit('nuevo', rpta);
        });
    });

    socket.on('eliminar', function (data) {
        user.delete(data, function (rpta) {
            io.emit('borrado', rpta);
        });
    });
});

http.listen(port, function() {
    console.log("Empezo el show en: " + port);
});