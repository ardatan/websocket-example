const WebSocketServer = require('websocket').server;
const http = require('http');

const httpServer = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

const webSocketServer = new WebSocketServer({
    httpServer
});

webSocketServer.on('request', request => {
    //Bu kisim her baglanti istendiginde cagirilir.
    //Her cagiran icin ayri ayri!
    const webSocket = request.accept();
    console.log((new Date()) + ' Connection accepted.');
    webSocket.sendUTF('Hello World!');
    webSocket.on('message', message => {
        if(message.type == 'utf8'){
            console.log('Received Message: ' + message.utf8Data);
        }
    })
    webSocket.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + webSocket.remoteAddress + ' disconnected.');
    });
});

httpServer.listen(9000);