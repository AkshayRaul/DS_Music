
var socket = new WebSocket("ws://localhost:5000");

socket.addEventListener('message', function (event) {
    console.log('Message from server', event.data);
    changeAudioParams(JSON.parse(event.data));
});
loadingSample = true;
socket.onopen = function () {
    console.log("Open");
    
}
