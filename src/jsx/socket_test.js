var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('connected.');
});

server.listen(3000);
