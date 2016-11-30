var LatticeTimerDisplay = function(){
	this.blackTimer_div = document.getElementById("timerDisplayBlack");
	this.whiteTimer_div = document.getElementById("timerDisplayWhite");
}

LatticeTimerDisplay.prototype.updateTimer = function(time1, time2){
	this.blackTimer_div.innerHTML = time1;
	this.whiteTimer_div.innerHTML = time2;
}