// app.js
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)
 ;;;

server.listen(80);
app.get('/chat01', function (req, res) {




    res.sendfile(__dirname + '/chat01.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('send message', function (data) {
        io.sockets.emit('new message', data);
    });
})