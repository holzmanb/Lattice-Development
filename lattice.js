var LatticeGame = function(){
    var self = this;

    // default options
    self.show_hints = true;

    self.state = new LatticeGame.BoardState();
    self.state_history = [];
    self.state_history.push(self.state.clone());

    self.pieces_dom = [];

    self.players = [ { name:"Player 1", id:"x", player_type:"AI", aiLevel:2},
                     { name:"Player 2", id:"o", player_type:"human"}];

    self.starting_player = 0;
    self.turn = self.starting_player;

    self.wins = [];
};

LatticeGame.BoardState = function(){
    var self = this;
    self.board_numeric = new Array(36+1).join('0').split('').map(parseFloat);

    self.stats = [[0,0,0,0],[0,0,0,0]];

    self.square_stats = [];

    self.piece_index_to_squares = [];

    _.each(_.range(0,36), function(piece_index){
        self.piece_index_to_squares.push([]);
        _.each(self.squares, function(square,square_index){
            if(square.indexOf(piece_index)!=-1){
                self.piece_index_to_squares[piece_index].push(square_index);                
            }
        })
    });
};

LatticeGame.BoardState.prototype.clone = function(){
    var self = this;
    var new_board_start = new LatticeGame.BoardState();
    new_board_start.board_numeric = self.board_numeric.slice();
    new_board_start.square_stats = [];
    _.each(self.square_stats, function(square_stat, stats_index){
        if(square_stat != undefined){
            new_board_start.square_stats[stats_index] = {
                control: square_stat.control,
                amount: square_stat.amount
            }
        }
    });

    return new_board_start;
}

LatticeGame.BoardState.prototype.playPiece = function(piece_index, player_id){
    var self = this;
    self.board_numeric[piece_index] = player_id;
    // Update board stats;
    _.each(self.piece_index_to_squares[piece_index], function(square_index){
        if (self.square_stats[square_index] == undefined){
            self.square_stats[square_index] = {control:player_id, amount:0};
        }

        if (self.square_stats[square_index].control == player_id){
            self.square_stats[square_index].amount += 1;
        }else{
            self.square_stats[square_index].control = "None";
        }
    })
};

LatticeGame.BoardState.prototype.moveValues = function(){
    var self = this;

    var moveValues = {"x": { 4:[],3:[],2:[], "double_check":[]}, "o":{4:[],3:[],2:[],"double_check":[]}};

    _.each( self.getEmptySpaces(), function(piece_index){

        _.each(self.piece_index_to_squares[piece_index], function(square_index){
            var stats = self.square_stats[square_index];
            if(stats != undefined && stats.control != "None"){
                if(stats.amount !=2){
                    moveValues[stats.control][stats.amount+1].push(piece_index);
                }else{
                    if(moveValues[stats.control][stats.amount+1].length == 0 || moveValues[stats.control][stats.amount+1].indexOf(piece_index) == -1){
                        moveValues[stats.control][stats.amount+1].push(piece_index);
                    }else{
                        moveValues[stats.control]["double_check"].push(piece_index);
                    }
                }
            }
        })
    })

    return moveValues;
}

LatticeGame.BoardState.prototype.winningMoves = function(player_id){
    // return all piece_ids which can win
    var self = this;
    var winning_moves = [];
    _.each(self.square_stats, function(square_stat, square_index){
        if(square_stat != undefined && square_stat.control == player_id && square_stat.amount == 3){
            _.each(self.squares[square_index], function(piece_index){
                if(self.board_numeric[piece_index] == 0){
                    winning_moves.push(piece_index);
                }
            })
        }
    });
    return winning_moves;
};

LatticeGame.BoardState.prototype.findWin = function(){
    var self = this;
    var wins = [];
    _.each(self.squares, function(square, square_index){
        var stats = self.square_stats[square_index];
        if( stats != undefined && stats.amount == 4){
            wins.push(square);
        }
    })
    return wins;
};

LatticeGame.BoardState.prototype.getEmptySpaces = function(){
    var self = this;

    var empty_spaces = self.board_numeric.reduce(function(a, e, i) {
                                if (e === 0)
                                    a.push(i);
                                return a;
                            }, []);
    return empty_spaces;
};

LatticeGame.BoardState.prototype.squares = (function(){
    var self = this;
    //generate a list of all the squares on the game board
    boxes = [];
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
})();

LatticeGame.prototype.playAiTurn = function(){
    //Tries to play an AI turn

    var self = this;

    //Some helper functions
    var randomOption = function(some_array){
        return some_array[Math.floor(Math.random()*some_array.length)]
    };

    var piece_rank = {"centre":[14,15,20,21], "layer2":[7,8,9,10,13,16,19,22,25,26,27,28], "outside":[0,1,2,3,4,5,6,11,12,17,18,23,24,29,30,31,32,33,34,35]};
    
    var pieces_in_both = function(to_check, in_this){
        var these_ones = [];
        _.each(in_this, function(id){
                if(to_check.indexOf(id) != -1){
                    these_ones.push(id);
                }
            });
        return these_ones;
        }
    
    
    // Check that there's an AI that should play
    if (self.players[self.turn].player_type == "AI"){
        ai_player = self.players[self.turn];
        other_player = self.players[(self.turn+1)%2];

        if(ai_player.aiLevel == "random"){
            console.log("random move");
            var moves = self.state.getEmptySpaces();
            self.playMove(randomOption(moves));
        }else if(ai_player.aiLevel == 1){
            // Level 1

            var moveValues = self.state.moveValues();

            if ( moveValues[ai_player.id][4].length > 0){
                // Winning move
                self.playMove(randomOption(moveValues[ai_player.id][4]));

            }else if( moveValues[other_player.id][4].length > 0){
                // block winning move for opponent
                self.playMove(randomOption(moveValues[other_player.id][4]));

            }else if( moveValues[other_player.id][3].length > 0){
                // block random check move for opponent
                self.playMove(randomOption(moveValues[other_player.id][3]));

            }else if( moveValues[ai_player.id][3].length > 0 ){
                // take random check move for self
                self.playMove(randomOption(moveValues[ai_player.id][3]));

            }else {
                // play random move "best visible"
                var moves = self.state.getEmptySpaces();
                var centre_moves = pieces_in_both(piece_rank["centre"], moves);
                if ( centre_moves[0] != undefined){
                    self.playMove(randomOption(centre_moves));
                }else{
                    var layer2_moves = pieces_in_both(piece_rank["layer2"], moves);
                    if ( layer2_moves[0] != undefined){
                        self.playMove(randomOption(layer2_moves));
                    }else{
                        self.playMove(randomOption(moves));
                    }
                }
                
            }
        }else if(ai_player.aiLevel == 2){
            // Level 1
            
            var moveValues = self.state.moveValues();

            if ( moveValues[ai_player.id][4].length > 0){
                // Winning move
                self.playMove(randomOption(moveValues[ai_player.id][4]));

            }else if( moveValues[other_player.id][4].length > 0){
                // block winning move for opponent
                self.playMove(randomOption(moveValues[other_player.id][4]));
            
            }else if( moveValues[ai_player.id]["double_check"].length > 0){
                // Try to find random double
                self.playMove(randomOption(moveValues[ai_player.id]["double_check"]));

            }else if( moveValues[other_player.id][3].length > 0){
                // block random check move for opponent
                self.playMove(randomOption(moveValues[other_player.id][3]));

            }else if( moveValues[ai_player.id][3].length > 0 ){
                // take random check move for self
                self.playMove(randomOption(moveValues[ai_player.id][3]));

            }else {
                // play random move "best visible"
                var moves = self.state.getEmptySpaces();
                var centre_moves = pieces_in_both(piece_rank["centre"], moves);
                if ( centre_moves[0] != undefined){
                    self.playMove(randomOption(centre_moves));
                }else{
                    var layer2_moves = pieces_in_both(piece_rank["layer2"], moves);
                    if ( layer2_moves[0] != undefined){
                        self.playMove(randomOption(layer2_moves));
                    }else{
                        self.playMove(randomOption(moves));
                    }
                }
                
            }
        }

    }
};

LatticeGame.prototype.resetGame = function(){
    var self = this;

    var new_state = new LatticeGame.BoardState();
    var state_history = [];
    self.state = new_state;
    self.state_history.push(new_state.clone());

    self.loadState(new_state);
    self.wins = [];
};

LatticeGame.prototype.playMove= function(move){
    // Handles a board update / move being made

    var self = this;
    if(self.state.board_numeric[move] == 0 && ! self.wins[0]){
        self.addPiece(move, self.turn);
        self.turn = (self.turn+1)%2;
        self.wins = self.state.findWin();
        if (!self.wins[0]){
            self.playAiTurn();
            self.state_history.push(self.state.clone());
        }else {           
            _.each(self.wins[0],function(piece){
                $("#"+piece).addClass("winning");
            })
        }
        
    }
};

LatticeGame.prototype.undoMove = function(){
    var self = this;
    if(self.state_history.length >= 3){
        var new_state = self.state_history[self.state_history.length - 3].clone();
        self.state_history.pop();
        self.state_history.pop();
        self.loadState(new_state);
        self.playAiTurn();
    }else{
        console.log("can't go back any further");
    }
};

LatticeGame.prototype.loadState = function(state){
    var self = this;

    //set the state
    self.state = state.clone();

    // set all the pieces to be correct on the board
    _.each(_.range(0,36),function(piece_index){
        self.pieces_dom[piece_index].removeClass("x o winning");

        if(self.state.board_numeric[piece_index] != 0){
            self.pieces_dom[piece_index].addClass(state.board_numeric[piece_index])
        }
        
    })

    // make sure wins is still correct.
    self.wins = self.state.findWin();
};

LatticeGame.prototype.addPiece = function(piece_index, player_index){
    self.state.playPiece(piece_index, self.players[player_index].id);

    self.pieces_dom[piece_index].addClass(self.players[player_index].id);
};

LatticeGame.prototype.removePiece = function(piece_index){
    self.board_numeric[piece_index] = 0;
    self.pieces_dom[piece_index].removeClass("x o winning");
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
                        self.playMove($(e.toElement).attr("id"))
                    }
                )
            .appendTo(li);

        self.pieces_dom.push(piece_centred);
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
    console.log(Latttttttt);
    Latttttttt.initBoard();
    Latttttttt.playAiTurn();

    $("#undo_button").click(function(){Latttttttt.undoMove()});
});

