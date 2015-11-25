var LatticeTimerDisplay = function(){
	this.timer_div = document.getElementById("timerDisplay");
}

LatticeTimerDisplay.prototype.updateTimer = function(text){
	this.timer_div.innerHTML = text;
}