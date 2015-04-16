/**
 * Created by Xerato on 2015-04-16.
 */

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server)
    ;;;
var nicknames=[];
server.listen(80);
app.get('/chat02', function (req, res) {
    res.sendfile(__dirname + '/chat02.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('new user', function(nick, callback){
        if(nicknames.indexOf(nick) != -1){
            callback(false);
        }else{
            callback(true);
            socket.nickname = nick;
            nicknames.push(socket.nickname);
            updateNicknames();
        }
    });


    var updateNicknames = function(){
        io.sockets.emit('usernames', nicknames);
    };

    socket.on('send message', function (data) {
        io.sockets.emit('new message', {"msg":data, "nick":socket.nickname});
    });

    socket.on('disconnect', function(data){
        if(!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname),1);
        updateNicknames();

    });

//<embed src="http://player.bgmstore.net/0aAfo" allowscriptaccess="always" allowfullscreen="true" width="422" height="180"></embed><br>
});



