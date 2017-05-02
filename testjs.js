var dogBarkingBuffer = null;
// Fix up prefixing
var context;


window.AudioContext = window.AudioContext||window.webkitAudioContext;
context = new AudioContext();

function loadSound() {
  var request = new XMLHttpRequest();
  request.open('GET','http://localhost:3000/getMusic1', true);
  request.responseType = 'arraybuffer';
  
  // Decode asynchronously
  request.onload = function() {
    console.log(request.response);
    context.decodeAudioData(request.response, function(buffer) {
      dogBarkingBuffer = buffer;
      playSound(dogBarkingBuffer);   
      
    });
    
  }
  
  request.send();
  
}
function onError(){
  console.log("Error");
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  console.log(buffer);
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(10);       
                                         // note: on older systems, may have to use deprecated noteOn(time)
  var gainNode = context.createGain();
  // Connect the source to the gain node.
  source.connect(gainNode);
  // Connect the gain node to the destination.
  gainNode.connect(context.destination);
  gainNode.gain.value = 0.5;
}
console.log("hello");
loadSound();
