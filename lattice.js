var LatticeGame = function(){
	self = this;
	self.board_numeric = new Array(36+1).join('0').split('').map(parseFloat);
	self.board_dom = [];
	self.players = ["x","o"];
	self.turn = 0;
}

LatticeGame.prototype.initBoard = function(){
	self = this;
	// Sets up the board in html
	var board_list = $('#board-list');
	for(var i = 0; i <36; i++)
	{	
	    var li = $('<div/>')
	        .addClass('board_place')
	        .attr('id',i)
	        .click(function(e){
	        	self.playMove($(e.toElement))}
	        	)
	        .appendTo(board_list);

    	if(i%2==0 && Math.floor(i/6)%2==0){
    		li.addClass('odd');
    	}
    	if((i+1)%2==0 && Math.floor(i/6+1)%2==0){
    		li.addClass('odd');
    	}
	};
};

LatticeGame.prototype.playMove= function(moveElement){
		move = moveElement.attr("id");

		if(self.board_numeric[move] == 0){
			self.board_numeric[move] = self.players[self.turn];
			moveElement.addClass(self.players[self.turn]);
			self.turn = (self.turn+1)%2;
			console.log(self.board_numeric);

		}

	}


$(document).ready(function() {
	// JavaScript Document
	var l = new LatticeGame();
	l.initBoard();
});

