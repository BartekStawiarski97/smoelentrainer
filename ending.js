var score = localStorage.getItem("Score");
var tries = localStorage.getItem("Tries");
var date = localStorage.getItem("Date");
var maxScore = localStorage.getItem("Maxscore");
var timeleft = localStorage.getItem("TimeLeft");
var gametime = localStorage.getItem("GameTime")
var correctPlayers = JSON.parse(localStorage.getItem("PlayersCorrect"));
var timeused = gametime-timeleft;

document.getElementById("scoreText").innerHTML = score;
document.getElementById("triesText").innerHTML = tries;
console.log(correctPlayers);
// Puts in the saved history (from games played before) in the history array
var history = [];
for (var i = 0 ; i <= 9; i++) {
		history[i] = localStorage.getItem("History"+(i+1));
	}

// Places the history in the html
for (var i = 1 ; i <= 10; i++) {
		document.getElementById("history-"+i).innerHTML = history[(i-1)];
	}

console.log(history);

function checkHistory(){
	console.log(localStorage.getItem("HistorySet"));
	if(localStorage.getItem("HistorySet") == "true"){
		setHistory();
		localStorage.setItem("HistorySet", false);
	}
}
var historyList = 0;
// Fills in the last 10 history
function setHistory(){
	var test = "";
	correctPlayers.forEach(function(player){
  		test += player.name+"= "+player.correct+"<br>"

  	});
 //  	console.log(test);
	var saveHistory = "Score= "+score+"/"+maxScore+", Tries= "+tries+", Date= "+date+", Time= "+timeused+"<br> Correct Players: <br>"+test;
	for (var i = 0 ; i <= 9; i++) {
		if(document.getElementById("history-"+(i+1)).innerHTML == ""){
			localStorage.setItem("History"+(i+1),saveHistory);
			history[i] = localStorage.getItem("History"+(i+1));
			document.getElementById("history-"+(i+1)).innerHTML = history[i];
			return;
		}else{
			historyList++;
		}
	}
	console.log(correctPlayers);
	// if history is full
	if(historyList==10){
		// moves history one place down
			for(var i = 9 ; i >= 0; i--){
				var temp = localStorage.getItem("History"+i);
				localStorage.setItem("History"+(i+1),temp);
				history[i] = temp;
				document.getElementById("history-"+(i+1)).innerHTML = history[i];
				console.log(temp);
			}
			localStorage.setItem("History"+1,saveHistory);
			history[0] = localStorage.getItem("History"+1);
			document.getElementById("history-"+1).innerHTML = history[0];
	}
}

function resetHistory(){
	for (var i = 1 ; i <= 10; i++) {
		localStorage.setItem("History"+i, "");
		history[(i-1)] = "";
		console.log(localStorage.setItem("History"+i, ""));
		
		console.log(i);
	}
}

document.getElementById("endingBtn").onclick = function(){
	window.location.href="index.html";
}