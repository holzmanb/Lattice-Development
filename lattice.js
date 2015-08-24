var LatticeGame = function(){
    self = this;
    self.board_numeric = new Array(36+1).join('0').split('').map(parseFloat);
    self.pieces = [];
    self.players = ["x","o"];
    self.turn = 0;
    self.squares = self.getSquares();
    console.log(self.squares);
}

LatticeGame.prototype.getSquares = function(){
    //generate a list of all the squares on the game board
    boxes = []
    // for squares with side lengths 1 - 6
    _.each(_.range(1,6),function(dist){
      _.each(_.range(6-dist),function(i){
        _.each(_.range(6-dist),function(j){
            corners = [i+j*6,i+dist+6*j,i+dist+(j+dist)*6,i+(j+dist)*6]
            boxes.push(corners);
        })
      })
    })
    return boxes;
}

LatticeGame.prototype.resetGame = function(){
    self.board_numeric = new Array(36+1).join('0').split('').map(parseFloat);
    $('#board-list').find(".board_place div").removeClass("o x winning");
}

LatticeGame.prototype.findWin = function(){
    self = this;
    var winning_boxes = [];
    _.each(self.squares, function(box){
        var hmm = _.reduce(box, function(memo, index){ return memo === self.board_numeric[index]?memo:false }, self.board_numeric[box[0]]);
        if (hmm){
            winning_boxes.push([box, hmm]);
        }
    })
    if(winning_boxes[0]){
        _.each(winning_boxes[0][0],function(piece){
            $("#"+piece).addClass("winning");
        })
    }
    return winning_boxes;
    };

LatticeGame.prototype.playMove= function(moveElement){
        move = moveElement.attr("id");

        if(self.board_numeric[move] == 0){
            self.board_numeric[move] = self.players[self.turn];
            moveElement.addClass(self.players[self.turn])
            self.turn = (self.turn+1)%2;
            self.findWin();
        }
};

LatticeGame.prototype.addPiece = function(pieceIndex, player){
    $("#"+pieceIndex).addClass(player);
};

LatticeGame.prototype.removePiece = function(pieceIndex){
    $("#"+pieceIndex).removeClass("x o");
};

LatticeGame.prototype.initBoard = function(){
    self = this;
    // Sets up the board in html
    var board_list = $('#board-list');
    for(var i = 0; i <36; i++)
    {   
        var li = $('<div/>')
            .addClass('board_place')
            .appendTo(board_list);
        var piece_centred = $('<div/>')
            .addClass("piece")
            .attr('id',i)
            .click(function(e){
                self.playMove($(e.toElement))}
                )
            .appendTo(li);
        self.pieces.push[piece_centred];
        // if ( 0 < i && i < 5){
        //     li.addClass("horizontal-and-vertical-bottom");
        // }else if ( 30 < i && i < 35 ){
        //     li.addClass("horizontal-and-vertical-top");
        // }else if ( i%6 == 0 && 0 < i && i < 30){
        //     li.addClass("vertical-and-horizontal-right");
        // }else if ( i%6 == 5 && 5 < i && i < 35){
        //     li.addClass("vertical-and-horizontal-left");
        // }else if(i==0){
        //     li.addClass("vertical-down-horizontal-right");
        // }else  if(i==5){
        //     li.addClass("vertical-down-horizontal-left");
        // }else if(i==30){
        //     li.addClass("vertical-up-horizontal-right");
        // }else if(i==35){
        //     li.addClass("vertical-up-horizontal-left");
        // }else{
        //     li.addClass("vertical-and-horizontal");
        // }
    };
};

var Latttttttt;
$(document).ready(function() {
    // JavaScript Document
    Latttttttt= new LatticeGame();
    Latttttttt.initBoard();
});

