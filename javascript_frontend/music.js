//@js-check
//variables



var context;
var soundBuffer;
var source;
var frequency=1;
var quality=1;

//functions
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    console.log("Hi");
  }
  catch (e) {
    alert('Web Audio API is not supported in this browser');
  }
}
function loadSound() {
  var request = new XMLHttpRequest();
  request.open('GET', "http://localhost:3000/getMusic1", true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function () {

    context.decodeAudioData(request.response, function (buffer) {
      soundBuffer = buffer;
      console.log(buffer);
    }, onError);
  }
  request.send();
}

function sendChanges(message, name, node) {
  var request = new XMLHttpRequest();
  console.log(message.id);
  console.log(name);
  var id=message.id;
  if (id.toString().includes("Freq")){
    frequency=message.value;
  }
  if (id.toString().includes("Qual")){
    quality=message.value;
  }
  request.open('POST', "http://localhost:3000/change");
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  console.log(JSON.stringify({
    "id": node,
    "instrument": name,
    "frequency": frequency,
    "quality": quality
  }));
  request.send(JSON.stringify({
    "id": node,
    "instrument": name,
    "frequency": frequency,
    "quality": quality
  }));
}

function onError() {
  console.log("error");
}
function onToggle() {
  FilterSample.playing ? FilterSample.stop() : FilterSample.play();
  FilterSample.playing = !FilterSample.playing;
}

function playSound(buffer) {
  console.log(buffer);
  source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);
  source.loop = true;                           // play the source now
  var filter = context.createBiquadFilter();
  // Create the audio graph.
  source.connect(filter);
  filter.connect(context.destination);
  // Create and specify parameters for the low-pass filter.
  filter.type = 'lowpass'; // Low-pass filter. See BiquadFilterNode docs
  filter.frequency.value = 440; // Set cutoff to 440 HZ
  // Playback the sound.
  source.start(0);
  console.log(source);
  // note: on older systems, may have to use deprecated noteOn(time);
}

//Frequency And Quality
var FilterSample = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
  playing: false
};

FilterSample.play = function () {
  // Create the source.
  source = context.createBufferSource();
  source.buffer = soundBuffer;
  // Create the filter.
  var filter = context.createBiquadFilter();
  //filter.type is defined as string type in the latest API. But this is defined as number type in old API.
  filter.type = (typeof filter.type === 'string') ? 'lowpass' : 0; // LOWPASS
  filter.frequency.value = 5000;
  // Connect source to filter, filter to destination.
  source.connect(filter);
  filter.connect(context.destination);
  // Play!
  if (!source.start)
    source.start = source.noteOn;
  source.start(0);
  source.loop = true;
  // Save source and filterNode for later access.
  this.source = source;
  this.filter = filter;
};

FilterSample.stop = function () {
  if (!this.source.stop)
    this.source.stop = source.noteOff;
  this.source.stop(0);
  //this.source.noteOff(0);
};

FilterSample.toggle = function () {
  this.playing ? this.stop() : this.play();
  this.playing = !this.playing;
};

FilterSample.changeFrequency = function (element) {
  // Clamp the frequency between the minimum value (40 Hz) and half of the
  // sampling rate.
  var minValue = 40;
  var maxValue = context.sampleRate / 2;
  // Logarithm (base 2) to compute how many octaves fall in the range.
  var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
  // Compute a multiplier from 0 to 1 based on an exponential scale.
  var multiplier = Math.pow(2, numberOfOctaves * (parseFloat(element) - 1.0));
  // Get back to the frequency value between min and max.
  this.filter.frequency.value = maxValue * multiplier;
};

FilterSample.changeQuality = function (element) {
  this.filter.Q.value = parseFloat(element) * this.QUAL_MUL;
};

FilterSample.toggleFilter = function (element) {
  this.source.disconnect(0);
  this.filter.disconnect(0);
  // Check if we want to enable the filter.
  if (element.checked) {
    // Connect through the filter.
    this.source.connect(this.filter);
    this.filter.connect(context.destination);
  } else {
    // Otherwise, connect directly.
    this.source.connect(context.destination);
  }
};

loadSound();
function changeAudioParams(data){
  console.log("SUCCESS");
  
  FilterSample.changeFrequency(data.frequency);
  FilterSample.changeQuality(data.frequency);
  
}

//test
function ping(){
  var xhttp=new XMLHttpRequest();
  xhttp.open('GET',"http://localhost:3000/change",true);
  xhttp.onreadystatechange=function(){
    if(this.readyState==4&&this.status==200){
      console.log("DONE");
    }
  }
  xhttp.send();

}