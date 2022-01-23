
//song
const song = new Audio(`shadmehr.mp3`);

// console.log(song);
//convert seconds into mm:ss format
function formatTime(totalSeconds) {
  totalSeconds = parseInt(totalSeconds);
  let hours = Math.floor(totalSeconds / 3600),
    minutes = Math.floor((totalSeconds / 3600) * 60),
    seconds = totalSeconds - hours * 3600 - minutes * 60;

  minutes < 10 ? (minutes = "0" + minutes) : minutes;
  seconds < 10 ? (seconds = "0" + seconds) : seconds;

  return minutes + ":" + seconds;
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    //input slider
    let slider = document.querySelector(".slider"),
      //song starting and ending time showing elements
      start = document.querySelector("#start"),
      end = document.querySelector("#end"),
      //music player button
      btn = document.querySelector(".button"),
      //play and pause icon element
      i = document.querySelector(".button i"),
      speaker = document.querySelector(".speaker"),
      //store interval info
      interval,
      check = true;

    //slider initial value
    slider.value = 0;
    slider.min = 0;

    //play pause button
    btn.addEventListener("click", handleClick, true);

    function handleClick() {
      /*
      code in following if block run only once, to update slider
      (html input) max value, when btn is clicked first time
    */

      if (check) {
        //update slider max value
        slider.max = parseInt(song.duration);
        end.textContent = formatTime(song.duration);
        check = false;
      }

      if (song.paused) {
        song.play();
        i.classList.remove("fa-play");
        i.classList.add("fa-pause");

        /*
         call UpdateSongInfo method after every 
          1s to display updated song info
       */
        interval = setInterval(UpdateSongInfo, 1000);
        console.log("song is playing");
      } else {
        song.pause();
        i.classList.remove("fa-pause");
        i.classList.add("fa-play");

        /* 
         if interval is not empty clear it, or 
          don't update song time, if it is pused
       */

        if (interval) clearInterval(interval);
        console.log("song is paused");
      }
    }

    //change song playing time with slider
    slider.addEventListener("input", () => {
      song.currentTime = slider.value;
    });

    function UpdateSongInfo() {
      //display song live timing as mm:ss
      start.textContent = formatTime(song.currentTime);
      slider.value = parseInt(song.currentTime);

      //when song ends
      if (song.currentTime === song.duration) {
        clearInterval(interval);
        song.currenTime = 0;
        i.classList.remove("fa-pause");
        i.classList.add("fa-play");
        slider.value = 0;
        start.textContent = "00:00";
      }
    }

    //mute or unmute song
    speaker.addEventListener(
      "click",
      () => {
        if (song.muted) {
          song.muted = false;
          speaker.classList.remove("fa-volume-mute");
          speaker.classList.add("fa-volume-up");
        } else {
          song.muted = true;
          speaker.classList.remove("fa-volume-up");
          speaker.classList.add("fa-volume-mute");
        }
      },
      true
    );
  },
  true
);
//testing upload file
// const inputFile = document.querySelector(".inputFile");
// inputFile.addEventListener("change", (event) => {
// console.log(inputFile.files[0].name);
// uploadedFileName = event.target.files[0].name;
//   const song = new Audio(`${uploadedFileName}`);
// console.log(uploadedFileName);
// });
// function handleFiles(event) {
//   var files = event.target.files;
//   $("#src").attr("src", URL.createObjectURL(files[0]));
//   document.getElementById("audio").load();
// }

// document
//   .getElementById("upload")
//   .addEventListener("change", handleFiles, false);

// const source = document.querySelector("#src");
// source.addEventListener("change", (e) => {
//   console.log(e);
// });

// console.log(`${uploadedFileName}`);