let playbtn = document.querySelector(".ri-play-line");
let pausebtn = document.querySelector(".ri-pause-line");
let nextbtn = document.querySelector(".ri-speed-line")
let backbtn = document.querySelector(".ri-rewind-line")
let vinyl = document.querySelector("#rotate")
vinyl.style.animationPlayState = "paused"

let songs = [
    "./stronger.mp3",
    "./power.mp3",
    "./heartless.mp3",
    "./runaway.mp3"
];
let currentIndex = 0;
let audio = new Audio();


function playSong(index) {
    audio.src = songs[index];
    audio.play();
}

document.querySelectorAll(".song-1").forEach((song, index) => {
    song.addEventListener("click", () => {
        currentIndex = index;
        playSong(currentIndex);
    });
});


nextbtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= songs.length) {
        currentIndex = 0; 
    }

    playSong(currentIndex);
});

backbtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }

    playSong(currentIndex);
});

playbtn.addEventListener("click", () => {
    audio.play();
});

pausebtn.addEventListener("click", () => {
    audio.pause();
});

audio.addEventListener("play", () => {
    vinyl.style.animationPlayState = "running"
    playbtn.style.display = "none";
    pausebtn.style.display = "block";
});

audio.addEventListener("pause", () => {
    pausebtn.style.display = "none";
    vinyl.style.animationPlayState = "paused"
    playbtn.style.display = "block";
});