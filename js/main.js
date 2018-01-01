

// Global variables

var workClicks = 10;
var breakClicks = 1;
var workDisplay = document.getElementById('work-display');
var breakDisplay = document.getElementById('break-display');
var count = 0;
var workSession;
var breakSession;


// öka tid work

var increaseWork = document.getElementById('addWorkButton'); // lägger till eventlisner som ökar talen med 1
    increaseWork.addEventListener("click", function(){
  workClicks+= 1;
  workDisplay.innerHTML = workClicks;
},false);

// minska tid work

var decreaseWork = document.getElementById('minusWorkButton'); // lägger till eventlisner som minskar talen med 1
    decreaseWork.addEventListener("click", function(){
  workClicks-= 1;
  workDisplay.innerHTML = workClicks;
  if(workClicks < 1){
    workClicks = 1;
    workDisplay.innerHTML = workClicks;
  }
});

// öka tid break

var increaseBreak = document.getElementById('addBreakButton'); // lägger till eventlisner som ökar talen med 1
    increaseBreak.addEventListener("click", function(){
  breakClicks+= 1;
  breakDisplay.innerHTML = breakClicks;
},false);

// minska tid break

var decreaseBreak = document.getElementById('minusBreakButton'); // lägger till eventlisner som minskar talen med 1
  decreaseBreak.addEventListener("click", function(){
  breakClicks-= 1;
  breakDisplay.innerHTML = breakClicks;
  if(breakClicks < 1){
    breakClicks = 1;
    breakDisplay.innerHTML = breakClicks;
  }
}, false);


// function start

function start(){
  count = workClicks * 60; // converting workClicks to seconds
  workSession = setInterval(workCountDown, 1000); // kör workCountDown() varje sekund
}

function workCountDown(){
  var seconds = count;
  var hours = Math.floor(seconds/3600);
  seconds -= hours*3600; // för att hämta ut resten av sekunder efter man för Math.floor
  var minutes = Math.floor(seconds/60);
  seconds -= minutes*60;
  document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) + ":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);
  count --;
  if(count < 0 ){
    clearInterval(workSession);
    workSession = null;
    document.getElementById("showtime").innerHTML = "Starta Rasten";
    var breakDelay = setTimeout(function(){
      startBreak();
    },3000);
  }
}

// Paus knappen

function pause(){
  clearInterval(workSession);
  clearInterval(breakSession);
  workSession = null;
  breakSession = null;
}

// Resume knappen

function resume() {
  workSession = setInterval(workCountDown, 1000);
}

// reset

function reset(){
  if(workSession) {
    clearInterval(workSession);
    workSession = null;
  } else {
    clearInterval(breakSession);
    breakSession = null;
  }
  document.getElementById('showtime').innerHTML = "";
  document.getElementById('timer-panel').style.backgroundColor = "#fff";
  document.getElementById('pause').disabled = false;
  document.getElementById('resume').disabled = false;
}

// startBreak

function startBreak(){
  count = breakClicks * 60;
  breakSession = setInterval(breakCountDown, 1000);
  document.getElementById('pause').disabled = true;
  document.getElementById('resume').disabled = true;
}

function breakCountDown(){
  document.getElementById('timer-panel').style.backgroundColor = 'black';
  var seconds = count;
  var hours = Math.floor(seconds/3600);
  seconds -= hours*3600; // för att hämta ut resten av sekunder efter man för Math.floor
  var minutes = Math.floor(seconds/60);
  seconds -= minutes*60;
  document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) + ":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);
  count --;
  if(count < 0) {
    clearInterval(breakSession);
    breakSession = null;
    var message = setTimeout(function(){
      document.getElementById('showtime').innerHTML = "Rasten är Slut";
    },3000);
  }
}
