// Create your global variables below:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [0,1,2,3,4,5];
var isPaused = false;
//flag that indicates whether player is playing(false) or paused(true). player plays song initially by default
var currVol = 3; //the current volume. 3 is default
var currTrackIndex = 0; //the current track index
var currSec = 0; //the current play time in seconds
var musicTimer  = setInterval(function(){ //the setInterval function that updates currSec everysecond
   if(currSec<180 && !isPaused){
   currSec++;
   updateTimeDisplay();
   console.log(currSec);
   }
   if(currSec==180){
     nextSong();
   }
 },
  1000);

function init() {
  currSec = 0;
	document.getElementById("player-playbar").value = currSec;
  for(i=1;i<=currVol;i++){ //set current volume to default(=3)
      document.getElementById("vl" + i.toString()).style.background='pink';
  }
  updateTimeDisplay();
};

function changeTime(newTime){ //change the position of playbar within song to newTime
  console.log(newTime);
  currSec=newTime;
  updateTimeDisplay();
}

function volUp() { //increase volume level by 1
  if(currVol<6){ //when volume is not max
    currVol++;
    document.getElementById("vl" + currVol.toString()).style.background='pink';
  }
}

function volDown() { //decrease volume level by 1
  if(currVol>0){ //when volue is not minimum
    document.getElementById("vl" + currVol.toString()).style.background='none';
    currVol--;
  }

  console.log(currVol)
}

function switchPlay() { //handle the clicking of play/pause button
  console.log('swtichPlay called')
  if(isPaused==false){ //if player is playing, pause the song
    pause();
    document.getElementById("playpauseicon").innerHTML = "play_arrow";
  } else if(isPaused=true){ //if player is paused, resume the song
    resume();
    document.getElementById("playpauseicon").innerHTML = "pause";
  }
  console.log("currState is " + currState);
}

function resume(){ //resume the paused song
  console.log('play called')
  isPaused=false;
  musicTimer = setInterval(function(){
     if(currSec<180){
     currSec++;
     updateTimeDisplay();
     console.log(currSec);
     }
     if(currSec==180){
       nextSong();
     }
   },
    1000);

}

function pause(){ //pause the playing song
  isPaused=true;
  clearInterval(musicTimer);
}

function nextSong() { //skip to next song

  if (currTrackIndex == tracklist.length - 1){
    currTrackIndex = 0;
  } else currTrackIndex++;
  document.getElementById("songtitle").innerHTML = tracklist[currTrackIndex];
  init();

}

function prevSong() { //skip to previous song
  if(currTrackIndex==0) {
    currTrackIndex = tracklist.length - 1
  } else currTrackIndex--;
  document.getElementById("songtitle").innerHTML = tracklist[currTrackIndex];
  init();
}

function updateTimeDisplay(){ //update the display of the current time progress on screen
  document.getElementById("player-playbar").value = currSec.toString();
  document.getElementById("player-currtime").innerHTML = secondsToMs(currSec);
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();
