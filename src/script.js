music = [
  {
    music_name: "Levitating",
    singer: "Dua Lipa",
    music_image: "./images/Dua Lipa.jpg",
    music_audio: "./music/Levitating.mp3",
  },
  {
    music_name: "Chuttamalle",
    singer: "Shilpa Rao",
    music_image: "./images/chuttamalle.jpeg",
    music_audio: "./music/chuttamalle.mp3",
  },
  {
    music_name: "Aasa Kooda",
    singer: "Sai Abhyankkar",
    music_image: "./images/aasaKooda.jpg",
    music_audio: "./music/Aasa Kooda.mp3",
  },
  {
    music_name: "Hey Minnale",
    singer: "GV Prakash",
    music_image: "./images/Hey Minnale.jpeg",
    music_audio: "./music/Hey Minnale.mp3",
  },
  {
    music_name: "Matta",
    singer: "Yuvan Shankar Raja",
    music_image: "./images/matta.jpeg",
    music_audio: "./music/matta.mp3",
  },
  {
    music_name: "Golden Sparrow",
    singer: "GV Prakash",
    music_image: "./images/Golden Sparrow.jpeg",
    music_audio: "./music/golden sparrow.mp3",
  },
  {
    music_name: "Chillanjirukkiye",
    singer: "Sean Roldan",
    music_image: "./images/Chillanjirukkiye.jpg",
    music_audio: "./music/Chillanjirukkiye.mp3",
  },
  {
    music_name: "Hey Mama",
    singer: "David Guetta",
    music_image: "./images/heyMama.jpeg",
    music_audio: "./music/Hey Mama.mp3",
  },
  {
    music_name: "Lisa - Money",
    singer: "Lisa",
    music_image: "./images/money.jpg",
    music_audio: "./music/lisa.mp3",
  },
  {
    music_name: "Bulletproof",
    singer: "BTS",
    music_image: "./images/bulletproof.jpg",
    music_audio: "./music/BTS.mp3",
  }
];

let fav = document.querySelector(".fav");
let pause = document.querySelector(".pause");
let play = document.querySelector(".play");
let currentSong=0;
let audio;

function sendData(num)
{
  currentSong = num;
  document.querySelector(".thumbnail").innerHTML=`<img src="${music[num].music_image}" class="h-[220px] w-[220px] rounded-2xl shadow-lg">`
  document.querySelector(".artist-name").textContent=`${music[num].singer}`
  document.querySelector(".song-name").textContent=`${music[num].music_name}`
  
  if (audio)
  {
    pauseSong();
    audio=null;
  }

  audio = new Audio(`${music[currentSong].music_audio}`);

  audio.addEventListener("loadedmetadata",()=>{
    audioslider.max = audio.duration;
    endTime.textContent = calTime(audio.duration);
  })
  
  audio.addEventListener("timeupdate",()=>{
    audioslider.value = audio.currentTime;
    startTime.textContent = calTime(audio.currentTime);
  })
  
  audioslider.addEventListener("input",()=>{
    audio.currentTime = audioslider.value;
  })

  playSong();
}


const audioslider = document.querySelector(".audio-slider");
const startTime = document.querySelector(".startTime");
const endTime = document.querySelector(".endTime");

function playSong(){
  pause.classList.remove("hidden");
  play.classList.add("hidden");
  audio.play();
}

function pauseSong()
{
  pause.classList.add("hidden");
  play.classList.remove("hidden");
  audio.pause();
}

function calTime(seconds)
{
  let mins = Math.floor(seconds/60);
  let secs = Math.floor(seconds%60);
  return `${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`  
}

function changeColor() {
  let svg = fav.querySelector("svg");
  let path = svg.querySelector("path");
  if (path.getAttribute("fill") === "#ffffff") {
    path.setAttribute("fill", "#fe0000");
    fav.classList.add("animate-[bounce_1s]");
  } else {
    path.setAttribute("fill", "#ffffff");
    fav.classList.remove("animate-[bounce_1s]");
  }
}

function forward()
{
  let nextSong = (currentSong + 1) % music.length;
  sendData(nextSong);
}

function backward()
{
  let prevSong = (currentSong - 1 + music.length) % music.length;
  sendData(prevSong);
}

window.addEventListener("DOMContentLoaded",()=>{
  sendData(0);
  pauseSong();
})