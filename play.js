var players = [
{
	name: "Lewandowski",
	image: "img/lewandowski.jpg"
},
{
	name: "Kimmich",
	image: "img/kimmich.jpg"
},
{
	name: "Sane",
	image: "img/sane.jpg"
},
{
	name: "Neuer",
	image: "img/neuer.jpg"
},
{
	name: "Muller",
	image: "img/Muller.jpg"
},
{
	name: "Davies",
	image: "img/davies.jpg"
},
{
	name: "Pavard",
	image: "img/pavard.jpg"
},
{
	name: "Boateng",
	image: "img/boateng.jpg"
},
{
	name: "Gnabry",
	image: "img/gnabry.jpg"
}

];

var usedPlayers = [];


// Creates a new array as long as the chosen players from settings and picks them random
let array2 = [];
while(players.length !== 0){
	let randomIndex = Math.floor(Math.random() * players.length);
	array2.push(players[randomIndex]);
	players.splice(randomIndex, 1);
}

players = array2;
console.log(players);

var gamePeople = 9;
if(localStorage.getItem("GamePeople") != null){
	gamePeople = localStorage.getItem("GamePeople");
}


// Timer
var timerTime = 120;
if(localStorage.getItem("GameTime") != null){
	timerTime = localStorage.getItem("GameTime");
}
var interval = 1000;
var width = 100;
var timer = setTimeout(countDown, interval);
document.getElementById("timer").innerHTML = "Timer: "+timerTime+"s";

function countDown() {
	timerTime--;
    document.getElementById("timer").innerHTML = "Timer: "+timerTime+"s";
    timer = setTimeout(countDown, interval);

    if(timerTime== 0){
    	clearTimeout(timer);
		gameEnding();
		return;
    }
}


const buttons = document.querySelectorAll('.button');
// console.log(buttons);
buttons.forEach(element => {
	// console.log(element.id);
	element.onclick = function() { selectIMG(element.id); };
});

const buttons2 = document.querySelectorAll('.button-2');
// console.log(buttons2);
buttons2.forEach(element => {
	// console.log(element.id);
	element.onclick = function() { selectNAME(element.id); };
});

// Creates random numbers without repeating and places the images on the site
var numbers = [];
for(var i = 0; i < gamePeople; i++){
	numbers[i] = i;
}
// console.log(numbers);

var numbersName = [];
for(var i = 0; i < gamePeople; i++){
	numbersName[i] = i;
}
console.log(numbersName);
for (var i = 0; i < gamePeople; i++) {
	var randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
	var numberIndex = numbers.indexOf(randomNumber);
	numbers.splice(numberIndex,1);
	var randomNumberName = numbersName[Math.floor(Math.random() * numbersName.length)];
	var numberIndexName = numbersName.indexOf(randomNumberName);
	numbersName.splice(numberIndexName,1);

	// console.log(players[randomNumber].image);
	// console.log(players[randomNumber].name);
	registerUsedPlayers(randomNumber);
	document.getElementById("img-"+i).src = players[randomNumber].image;
	document.getElementById("btn-"+i).innerHTML = players[randomNumberName].name;

};

var selectedIMG;
var selectedIMGid;


// Removes not used containers
removeNotUsed();
// Select the clicked image
function selectIMG(id){
	// check if there is already a img selected and add/remove border

	if(selectedIMGid == undefined) {

		document.getElementById(id).classList.add("borderActive");
		selectedIMGid = id;
		selectedIMG = document.getElementById(id).src;
	} else{
		// document.getElementById(selectedIMGid).style.outlineStyle = "none";
		document.getElementById(selectedIMGid).classList.remove("borderActive");
		document.getElementById(id).classList.add("borderActive");
		selectedIMGid = id;
		selectedIMG = document.getElementById(id).src;
	}

	//cuts off src path from image
	selectedIMG = selectedIMG.substring(selectedIMG.indexOf("img"));
	checkMatch();
}

var selectedNAME;
var selectedNAMEid;

// Select the clicked name
function selectNAME(id){
	if(selectedNAMEid == undefined) {
		document.getElementById(id).classList.add("borderActive");
		selectedNAMEid = id;
		selectedNAME = document.getElementById(id).innerHTML;
	}
	else{
		document.getElementById(selectedNAMEid).classList.remove("borderActive");
		document.getElementById(id).classList.add("borderActive");

		selectedNAMEid = id;
		selectedNAME = document.getElementById(id).innerHTML;
	}
	checkMatch();
}

var score = 0;
var tries = 0;

// check if the selected image/name is a match
function checkMatch(){
	var selectedNoMatch;
	
	if(selectedNAME != undefined && selectedIMG != undefined){
		tries++;
		document.getElementById("triesCounter").innerHTML = tries;
		resetAnimation();

		for (var i = 0; i < players.length; i++) {
			selectedNoMatch = false;
			if(players[i].name == selectedNAME && players[i].image == selectedIMG){
				document.getElementById(selectedNAMEid).style.opacity = "0";
				document.getElementById(selectedNAMEid).style.transition = "0.5s";
				document.getElementById(selectedNAMEid).onclick = null;

				document.getElementById(selectedIMGid).style.opacity = "0";
				document.getElementById(selectedIMGid).style.transition = "0.5s";
				document.getElementById(selectedIMGid).onclick = null;
				selectedNAME = undefined;
				selectedIMG = undefined;
				score++;
				addCorrectPlayers(selectedNAMEid);
				
				document.getElementById("scoreCounter").innerHTML = score;
				if(score == gamePeople){
					gameEnding();
				}
				return;
			} else if(players[i].name != selectedNAME || players[i].image != selectedIMG){
				selectedNoMatch = true;
			}
		
		}
		if(selectedNoMatch == true){
			selectedNAME = undefined;
			selectedIMG = undefined;
			document.getElementById(selectedNAMEid).classList.remove("borderActive");
			document.getElementById(selectedIMGid).classList.remove("borderActive");
			void document.getElementById(selectedNAMEid).offsetWidth;
		    void document.getElementById(selectedIMGid).offsetWidth;
		
		}	
	} 
	
}

//reset the animation
function resetAnimation(){
		void document.getElementById(selectedNAMEid).offsetWidth;
		void document.getElementById(selectedIMGid).offsetWidth;
}


var historySet = false;
localStorage.setItem("HistorySet", historySet);
var maxScore = localStorage.getItem("GamePeople");
function gameEnding(){
	historySet = true;
	var date = new Date().toLocaleString();
	localStorage.setItem("Score",score);
	localStorage.setItem("Maxscore",maxScore);
	localStorage.setItem("Tries",tries);
	localStorage.setItem("Date",date);
	localStorage.setItem("HistorySet", historySet);
	localStorage.setItem("PlayersCorrect", JSON.stringify(usedPlayers));
	localStorage.setItem("TimeLeft", timerTime);
	setTimeout("location.href = 'ending.html';",500);
}


// Removes not used buttons
function removeNotUsed(){
	for (var i = 0; i < players.length; i++) {
		if(document.getElementById("btn-"+i).innerHTML == ""){
			document.getElementById("img-"+i).classList.remove("d-block");
			document.getElementById("btn-"+i).classList.remove("d-block");
			document.getElementById("btn-"+i).classList.remove("d-flex");
			document.getElementById("img-"+i).classList.add("d-none");
			document.getElementById("btn-"+i).classList.add("d-none");
		}
	};
}

//Sends the players used in the game to the history
function registerUsedPlayers(playerIndex){
	usedPlayers.push({
  		name: players[playerIndex].name,
  		correct: false
	});
	// console.log("test "+playerIndex);
	// console.log("test "+players[playerIndex].image);
	// console.log("test "+players[playerIndex].name);
	// players[randomNumber].image
	console.log(usedPlayers);
}

// Updates the array where the information about the matches is in
function addCorrectPlayers(PlayerId){
	var rememberName = document.getElementById(PlayerId).innerHTML;
	// console.log(PlayerId);
	// console.log(rememberName);
	for (var i = 0; i<= usedPlayers.length; i++) {
		if(rememberName == usedPlayers[i].name){
			usedPlayers[i].correct = true;
			console.log(usedPlayers);
			return;
		}
	}

}