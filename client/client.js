const webSocket = new WebSocket('ws://localhost:9000');

webSocket.onmessage = function(event){
    alert('Received Message: ' + event.data);
}

function sendMessage(){
    const messageElement = document.getElementById('message');
    const message = messageElement.value;
    webSocket.send(message);
}