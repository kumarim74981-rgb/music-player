const songs = [
{
title:"Tumse Behtar",
artist:"Arjit Singh",
src:"./song1.mp3",
image:"./image1.png"
},
{
title:"Itni Si Baat Hai",
artist:"Arjit Singh",
src:"./song2.mp3",
image:"./image2.png"
},
{
title:"Khat",
artist:"Navjot Ahuja",
src:"./song3.mp3",
image:"./image3.png"
},
{
title:"Sittare",
artist:"Amitabh Bhattacharya",
src:"./song4.mp3",
image:"./image4.png"
}
];
// Elements
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progressArea = document.getElementById("progress-area");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const favoriteBtn = document.getElementById("favorite");
let songIndex = 0;
let shuffle = false;
let repeat = false;
// Load Song
function loadSong(song){
title.innerText = song.title;
artist.innerText = song.artist;
audio.src = song.src;
cover.src = song.image;
}
loadSong(songs[songIndex]);
// Play
function playMusic(){
audio.play();
playBtn.innerHTML =
'<i class="fa-solid fa-pause"></i>';
cover.classList.add("rotate");
}
// Pause
function pauseMusic(){
audio.pause();
playBtn.innerHTML =
'<i class="fa-solid fa-play"></i>';
cover.classList.remove("rotate");
}
// Play Button
playBtn.onclick=()=>{
if(audio.paused){
playMusic();
}
else{
pauseMusic();
}
};
// Next Song
function nextSong(){
if(shuffle){
songIndex = Math.floor(Math.random()*songs.length);
}
else{
songIndex++;
if(songIndex >= songs.length){
songIndex = 0;
}
}
loadSong(songs[songIndex]);
playMusic();
}
// Previous Song
function prevSong(){
songIndex--;
if(songIndex < 0){
songIndex = songs.length-1;
}
loadSong(songs[songIndex]);
playMusic();
}
nextBtn.onclick = nextSong;
prevBtn.onclick = prevSong;
// Playlist
function playSong(index){
songIndex = index;
loadSong(songs[songIndex]);
playMusic();
}
// Progress
audio.addEventListener("timeupdate",()=>{
const progress =
(audio.currentTime/audio.duration)*100;
progressBar.style.width = progress + "%";
let currentMin =
Math.floor(audio.currentTime/60);
let currentSec =
Math.floor(audio.currentTime%60);
if(currentSec<10){
currentSec="0"+currentSec;
}
currentTime.innerText =
`${currentMin}:${currentSec}`;
let totalMin =
Math.floor(audio.duration/60);
let totalSec =
Math.floor(audio.duration%60);
if(totalSec<10){
totalSec="0"+totalSec;
}
if(!isNaN(audio.duration)){
duration.innerText =
`${totalMin}:${totalSec}`;
}
});
// Click Progress
progressArea.onclick=(e)=>{
const width=progressArea.clientWidth;
const clickX=e.offsetX;
audio.currentTime=
(clickX/width)*audio.duration;
};
// Volume
volume.oninput=()=>{
audio.volume=volume.value;
};
// Auto Next
audio.onended=()=>{
if(repeat){
playMusic();
}
else{
nextSong();
}
};
// ==========================
// Shuffle
// ==========================
shuffleBtn.onclick = () => {
    shuffle = !shuffle;
    if (shuffle) {
        shuffleBtn.style.color = "#00ff99";
    } else {
        shuffleBtn.style.color = "white";
    }
};
// ==========================
// Repeat
// ==========================
repeatBtn.onclick = () => {
    repeat = !repeat;
    if (repeat) {
        repeatBtn.style.color = "#00ff99";
    } else {
        repeatBtn.style.color = "white";
    }
};
// ==========================
// Favorite
// ==========================
favoriteBtn.onclick = () => {
    favoriteBtn.classList.toggle("active");
    if (favoriteBtn.classList.contains("active")) {
        favoriteBtn.style.color = "red";
    } else {
        favoriteBtn.style.color = "white";
    }
};
// ==========================
// Keyboard Controls
// ==========================
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        if (audio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    }
    if (e.code === "ArrowRight") {
        nextSong();
    }
    if (e.code === "ArrowLeft") {
        prevSong();
    }
});
// ==========================
// Initial Load
// ==========================
loadSong(songs[songIndex]);
