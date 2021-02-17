var players = [{
        "image": "img/lewandowski.jpg",
        "name": "Robert Lewandowski"
    },
        
    {
        "image": "img/muller.jpg", 
        "name": "Thomas Muller"
    },

    {
        "image": "img/gnabry.jpg",
        "name": "Serge Gnabry"
    },

    {
        "image": "img/boateng.jpg",
        "name": "Jerome Boateng"
    },

    {
        "image": "img/neuer.jpg",
        "name": "Manuel Neuer"
    },

    {
        "image": "img/kimmich.jpg",
        "name": "Joshua Kimmich"
    },

    {
        "image": "img/davies.jpg",
        "name": "Alphonso Davies"
    },

    {
        "image": "img/pavard.jpg",
        "name": "Benjamin Pavard"
    },

    {
        "image": "img/sane.jpg",
        "name": "Leroy Sane"
    }

];


var selectedImgId;
var selectedName;

//* Select a image //
const player = document.querySelectorAll(".players");
player.forEach(player => {
    player.onclick = function(){ selectIMG(player.id); }
});

const player1 = document.querySelectorAll(".players-1");
player1.forEach(player1 => {
    player1.onclick = function(){ selectNAME(player.id); }
});


//* Add's class border to the selected image //
function selectIMG(id){
    if (selectedImgId == undefined) {
        document.getElementById(id).classList.add("bordersImage");
        selectedImgId = id;
    }else{
        document.getElementById(selectedImgId).classList.remove("bordersImage");
        document.getElementById(id).classList.add("bordersImage");
        selectedImgId = id;
    }
}

function selectedName(id){
    if (selectedName == undefined) {
        document.getElementById(id).classList.add("bordersName");
        selectedName = id;
    }else{
        document.getElementById(selectedName).classList.remove("bordersName");
        document.getElementById(id).classList.add("bordersName");
        selectedName = id;
    }
}


var count = [0, 1, 2, 3, 4, 5, 6, 7, 8];

for (var i=0; i<players.length; i++){
    var random = count[Math.floor(Math.random() * count.length)];
    var countCheck = count.indexOf(random);
    count.splice(countCheck, 1);
 
}

document.getElementById('timer').innerHTML =
  001 + ":" + 00;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){alert('Time is up! GAME OVER!')}
  if(m<0){window.location = "index.html";}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}