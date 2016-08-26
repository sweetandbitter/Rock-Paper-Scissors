var btnStart = document.getElementById("start");
var btnRestart = document.getElementById("restart");
var choice = document.getElementsByClassName("choice");
var result = document.getElementsByClassName("result");

btnStart.addEventListener("click", gameStart);
btnRestart.addEventListener("click", gameRestart);
for (var i = 0; i < choice.length; i++){
	choice[i].addEventListener("click",chooseOne);
}

var wins;
var losses;
var draws; 
var timer;

function gameStart(){
	var timeRemain = document.getElementById("timeRemain");
	var finalResult = document.getElementById("final");
	var hurryUp = document.getElementById("hurryUp");
	var minute = document.getElementById("minutes").value;
	var second = document.getElementById("seconds").value;
	var min = Number(minute);
	var sec = Number(second);
	if (isNotValidate(minute, min) || isNotValidate(second, sec)){
		return;
	}
	var count = min * 60 + sec - 1;
	
	finalResult.innerHTML = "";
	botChoice.innerHTML = "";
	hurryUp.innerHTML = "";

	for (var i = 0; i < result.length; i++){
		result[i].innerHTML = 0;
	}
	timer = setInterval(stateChange, 1000);
	timeRemain.style.color = "black";
	for (var i = 0; i < choice.length; i++){
		choice[i].disabled = false;
	}

	btnStart.disabled = true;
	timeRemain.innerHTML = formatTime(min, sec); 
	function formatTime(min, sec){
        var minFormat = (min < 10) ? "0" + min : min;
	    var secFormat = (sec < 10) ? "0" + sec : sec;
	    return minFormat + ":" + secFormat;
	}
	function stateChange(min,sec){
		var min = Math.floor(count / 60);
		var sec = count % 60;
		if (count <= 0){
			clearInterval(timer);
			hurryUp.innerHTML = "Game over!";
			timeRemain.innerHTML = "00:00";
			timeRemain.style.color = "black";
			btnStart.disabled = false;
			if (wins > losses){
				finalResult.innerHTML = "congratulation, you win!";
			} else if (wins < losses){
				finalResult.innerHTML = "Sorry, you lose";
			} else {
				finalResult.innerHTML = "draw";
			}
			for (var i = 0; i < choice.length; i++)
			{
				choice[i].disabled = true;
			}
			wins = 0; losses = 0; draws = 0;
			return;
		}
		timeRemain.innerHTML = formatTime(min, sec);
		if (count <= 10){
			timeRemain.style.color = "red";
			hurryUp.innerHTML = "Hurry up!";
			hurryUp.style.color = "red";
		} else {
			timeRemain.style.color = "black";
		}
		count--;
	}
}
function isNotValidate(stringInput, numberInput){
	if (stringInput === ""){
		alert("input can not be empty")
		return true;
	}
	if (!Number.isInteger(numberInput)){
		alert("Input is not a Integer");
		return true;
	}
	if (numberInput < 0 || numberInput > 59){
		alert("Input must be between 0 and 59");
		return true;
	}
	return false;
}
function gameRestart(){
	clearInterval(timer);
	gameStart();
}

function chooseOne(e){
	var player = e.target.value;
	var bot = getRandom();
	wins = result[0].innerHTML;
	losses = result[1].innerHTML;
	draws = result[2].innerHTML;
	botChoice.innerHTML = bot;
	if ((player === "rock" && bot === "scissors") || (player === "scissors" && bot === "paper") || (player === "paper" && bot === "rock")){
		wins++;
	}
	if ((player === "rock" && bot === "paper") || (player === "scissors" && bot === "rock") || (player === "paper" && bot === "scissors")){
		losses++;
	}
	if ((player === "rock" && bot === "rock") || (player === "scissors" && bot === "scissors") || (player === "paper" && bot === "paper")){
		draws++;
	}
	result[0].innerHTML = wins;
	result[1].innerHTML = losses;
	result[2].innerHTML = draws;
}

function getRandom(){
	var i = Math.floor(Math.random() * 3);
	if (i === 0){
		return "rock";
	} else if(i === 1){
		return "paper";
	} else{
		return "scissors";
	}
}