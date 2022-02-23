const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
const audioContext2 = new AudioContext();
// get the audio element
const audioElement = document.querySelector('#text');
const audioElement2 = document.querySelector('#whale');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
const track2 = audioContext2.createMediaElementSource(audioElement2);
// select our play button
const playButton = document.querySelector('#btn1');
const playButton2 = document.querySelector('#btn2');

playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);
playButton2.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext2.state === 'suspended') {
        audioContext2.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement2.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement2.pause();
        this.dataset.playing = 'false';
    }

}, false);
audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
}, false);
audioElement2.addEventListener('ended', () => {
    playButton2.dataset.playing = 'false';
}, false);

const gainNode = audioContext.createGain();
const gainNode2 = audioContext2.createGain();
track.connect(gainNode).connect(audioContext.destination);
track2.connect(gainNode2).connect(audioContext2.destination);

const volumeControl = document.querySelector('#volume1');
const volumeControl2 = document.querySelector('#volume2');
volumeControl.addEventListener('input', function(){
    gainNode.gain.value=this.value;
}, false);
volumeControl2.addEventListener('input', function(){
    gainNode2.gain.value=this.value;
}, false);