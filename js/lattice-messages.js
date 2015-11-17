var LatticeMessageController = function(){
	this.message_div = document.getElementById("lattice-game-message");
}

LatticeMessageController.prototype.updateMessage = function(text){
	this.message_div.innerHTML = text;
}

// var test = new LatticeMessageController();
// test.updateMessage("WTFFFFF");