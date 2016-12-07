
var LatticeGame = function(){
    var self = this;

    // default options
    self.show_hints = true;

    self.state = new LatticeGame.BoardState();
    self.state_history = [];
    self.state_history.push(self.state.clone());

    self.pieces_dom = [];

    self.players = [ { name:"Player 1", id:"x", player_type:"AI", aiLevel:2},
                     { name:"Player 2", id:"o", player_type:"human"} ];

    self.starting_player = 0;
    self.turn = self.starting_player;

    self.wins = [];

    self.message_controller = new LatticeMessageController();

    // Initialize a game options object once with scope to allow
    // resetting options when navigating in and out of game.
    self.game_options = {};
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
        });
    });
};

LatticeGame.prototype.stopGame = function(){
    var self = this;
    if( self.game_is_timed ){
        self.gameTimer.stop();
    }
};

LatticeGame.prototype.newGame = function(game_options){
    var self = this;
    self.game_is_timed = false;

    self.message_controller.updateMessage("");
    if(game_options.game_type == "single_player"){
        // initialise
        self.players = [ { name:"You", id:"x", player_type:"human"},
                         { name:"Computer", id:"o", player_type:"AI", aiLevel:game_options.ai_level }];

        $("#timer").addClass("hidden");
        $("#timerDisplay").addClass("hidden");
        // select color and who goes first
        if(game_options.player_colour == "white"){
            self.players[0].id = "o";
            self.players[1].id = "x";
            self.starting_player = 1;
        }else{
            self.starting_player = 0;
        }
        self.turn = self.starting_player;
        if (game_options["timed"] == "Yes"){
            self.gameTimer = self.gameTimer || new GameTimer();
            $("#timer").removeClass ("hidden");
            $("#timerDisplay").removeClass("hidden");
            self.gameTimer.init(game_options["time-for-game"],
                function(currentTime){
                    console.log(currentTime);
                    var minutes = Math.floor(currentTime[0]/60);
                    var seconds = currentTime[0] - minutes*60;
                    if (seconds < 10){
                        seconds = "0"+ seconds;
                    }
                    var black_time = minutes+":"+seconds;
                    // Why are minutes and seconds redefined here?
                    var minutes = Math.floor(currentTime[1]/60);
                    var seconds = currentTime[1] - minutes*60;
                    if (seconds < 10){
                        seconds = "0"+ seconds;
                    }
                    self.timer_display.updateTimer(black_time, minutes+":"+seconds);
                    if (currentTime[0] === 0){
                        self.message_controller.updateMessage("Black is out of time!");
                    }
                    if (currentTime[1] === 0){
                        self.message_controller.updateMessage("White is out of time!");
                    }
                });
                self.game_is_timed = true;
                self.timer_display = new LatticeTimerDisplay();
            }
        self.resetGame();
    }

    if(game_options.game_type == "multi-player"){
        // initialise
        self.players = [ { name:"Player 1", id:"x", player_type:"human"},
                         { name:"Player 2", id:"o", player_type:"human"}];
        $("#timer").addClass("hidden");
        $("#timerDisplay").addClass("hidden");
        self.starting_player = 0;
        self.turn = self.starting_player;
        if (game_options["timed"] == "Yes"){
            self.gameTimer = self.gameTimer || new GameTimer();
            $("#timer").removeClass ("hidden");
            $("#timerDisplay").removeClass("hidden");
            self.gameTimer.init(game_options["time-for-game"],
                function(currentTime){
                    console.log(currentTime);
                    var minutes = Math.floor(currentTime[0]/60);
                    var seconds = currentTime[0] - minutes*60;
                    if (seconds < 10){
                        seconds = "0"+ seconds;
                    }
                    var black_time = minutes+":"+seconds;
                    // why are minutes and seconds redefined here?
                    var minutes = Math.floor(currentTime[1]/60);
                    var seconds = currentTime[1] - minutes*60;
                    if (seconds < 10){
                        seconds = "0"+ seconds;
                    }
                    self.timer_display.updateTimer(black_time, minutes+":"+seconds);
                    if (currentTime[0] === 0){
                        self.message_controller.updateMessage("Black is out of time!");
                    }
                    if (currentTime[1] === 0){
                        self.message_controller.updateMessage("White is out of time!");
                    }
            });
            self.game_is_timed = true;
            self.timer_display = new LatticeTimerDisplay();
        }
        self.resetGame();
    }

    console.log("new game", game_options);
    if (game_options.game_type == "sample-game"){
        // initialise
        self.players = [ { name:"Computer", id:"x", player_type:"AI", aiLevel:3 },
                         { name:"Computer", id:"o", player_type:"AI", aiLevel:3 }];
        $("#timer").addClass("hidden");
        self.starting_player = 0;
        self.turn = self.starting_player;

        self.resetGame();
    }
};

function GameTimer() {
    this.stop = this.stop.bind(this);
}

GameTimer.prototype.init = function(time, callbackfunction){
    this.startTime = time;
    this.timeRemaining = [time, time];
    this.currentPlayer = 0;
    this.callbackfunction = callbackfunction;
};

GameTimer.prototype.reset = function(){
    var time = this.startTime;
    this.timeRemaining = [time, time];
    this.currentPlayer = 0;
};

GameTimer.prototype.start = function(){
    var self = this;
    this.intervalID = setInterval(
        function(){
            if(self.timeRemaining[self.currentPlayer]>0){
                self.timeRemaining[self.currentPlayer] -= 1;

            }
            else{
                self.stop();
            }
            self.callbackfunction(self.timeRemaining);
        }, 1000);
};

GameTimer.prototype.stop = function(){

    clearInterval(this.intervalID);

};

GameTimer.prototype.changePlayer = function(playerIndex){
    this.currentPlayer = playerIndex;
};

LatticeGame.BoardState.prototype.clone = function(){
    var self = this;
    var new_board_start = new LatticeGame.BoardState();
    new_board_start.board_numeric = self.board_numeric.slice();
    new_board_start.square_stats = [];
    _.each(self.square_stats, function(square_stat, stats_index){
        if(square_stat !== undefined){
            new_board_start.square_stats[stats_index] = {
                control: square_stat.control,
                amount: square_stat.amount
            };
        }
    });

    return new_board_start;
};

LatticeGame.BoardState.prototype.playPiece = function(piece_index, player_id){
    var self = this;
    self.board_numeric[piece_index] = player_id;
    // Update board stats;
    _.each(self.piece_index_to_squares[piece_index], function(square_index){
        if (self.square_stats[square_index] === undefined){
            self.square_stats[square_index] = {control:player_id, amount:0};
        }

        if (self.square_stats[square_index].control == player_id){
            self.square_stats[square_index].amount += 1;
        }else{
            self.square_stats[square_index].control = "None";
        }
    });
};

LatticeGame.BoardState.prototype.moveValues = function(){
    var self = this;

    var moveValues = {"x": { 4:[],3:[],2:[], "double_check":[]}, "o":{4:[],3:[],2:[],"double_check":[]}};

    _.each( self.getEmptySpaces(), function(piece_index){

        _.each(self.piece_index_to_squares[piece_index], function(square_index){
            var stats = self.square_stats[square_index];
            if(stats !== undefined && stats.control != "None"){
                if(stats.amount !=2){
                    moveValues[stats.control][stats.amount+1].push(piece_index);
                }else{
                    if(moveValues[stats.control][stats.amount+1].length === 0 || moveValues[stats.control][stats.amount+1].indexOf(piece_index) == -1){
                        moveValues[stats.control][stats.amount+1].push(piece_index);
                    }else{
                        moveValues[stats.control]["double_check"].push(piece_index);
                    }
                }
            }
        });
    });

    return moveValues;
};

LatticeGame.BoardState.prototype.winningMoves = function(player_id){
    // return all piece_ids which can win
    var self = this;
    var winning_moves = [];
    _.each(self.square_stats, function(square_stat, square_index){
        if(square_stat !== undefined && square_stat.control == player_id && square_stat.amount == 3){
            _.each(self.squares[square_index], function(piece_index){
                if(self.board_numeric[piece_index] === 0){
                    winning_moves.push(piece_index);
                }
            });
        }
    });
    return winning_moves;
};

LatticeGame.BoardState.prototype.findWin = function(){
    var self = this;
    var wins = [];
    _.each(self.squares, function(square, square_index){
        var stats = self.square_stats[square_index];
        if( stats !== undefined && stats.amount == 4){
            wins.push(square);
        }
    });
    return wins;
};

LatticeGame.BoardState.prototype.getEmptySpaces = function(){
    var self = this;

    var empty_spaces = self.board_numeric.reduce(function(a, e, i) {
        if (e === 0)
            a.push(i);
        return a;
    }, []);

    // NOTES: fm is used out of scope here
    if (empty_spaces.length == 34 && fm !== 0 && fm != 5 && fm != 30 && fm != 35){
        var fm = self.firstMove.move;
        empty_spaces = self.board_numeric.reduce(function(a,e,i){
            if ( fm === 0 || fm ==5 || fm == 30 || fm == 35 ){
                if (e === 0)
                    a.push(i);
                return a;
            }

            else{
                if (e === 0 && (Math.abs(Math.floor(i/6) - Math.floor(fm/6)) >= 3 || Math.abs(i%6 - fm%6) >= 3))
                    a.push(i);
                return a;
            }
        }, []);
    }
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
            corners = [i+j*6, i+dist+6*j, i+dist+(j+dist)*6, i+(j+dist)*6];
            boxes.push(corners);
        });
      });
    });
    return boxes;
})();

LatticeGame.prototype.playAiTurn = function(){
    //Tries to play an AI turn

    var self = this;

    //Some helper functions
    var randomOption = function(some_array){
        return some_array[Math.floor(Math.random()*some_array.length)];
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
        };

    var moves = self.state.getEmptySpaces();
    var moveValues = self.state.moveValues();
    var delay = 700; //sets computer delay at .75 seconds

    // Check that there's an AI that should play
    if (self.players[self.turn].player_type == "AI"){

        ai_player = self.players[self.turn];
        other_player = self.players[(self.turn+1)%2];
        console.log("playing an ai move", ai_player);
        if(ai_player.aiLevel == "random"){
            /*console.log("random move");*/
        }else if(moves.length == 36){
             self.playMove(randomOption(moves));
             /*Tried to define and log firstMove, but alas I am inept */
        }else if(ai_player.aiLevel == 1){
            // Level 1

            setTimeout(function(){
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
                    if ( centre_moves[0] !== undefined){
                        self.playMove(randomOption(centre_moves));
                    }else{
                        var layer2_moves = pieces_in_both(piece_rank["layer2"], moves);
                        if ( layer2_moves[0] !== undefined){
                            self.playMove(randomOption(layer2_moves));
                        }else{
                            self.playMove(randomOption(moves));
                        }
                    }
                }
            }, delay);
        }else if(ai_player.aiLevel == 2){
            // Level 2
            console.log("playing a level 2 move");
            // already defined moveValues (line 356)
            //var moveValues = self.state.moveValues();

            setTimeout(function(){
                if ( moveValues[ai_player.id][4].length > 0){
                    // Winning move
                    self.playMove(randomOption(moveValues[ai_player.id][4]));

                }else if( moveValues[other_player.id][4].length > 0){
                    // block winning move for opponent
                    self.playMove(randomOption(moveValues[other_player.id][4]));

                }else if( moveValues[ai_player.id]["double_check"].length > 0){
                    // Try to find random double
                    self.playMove(randomOption(moveValues[ai_player.id]["double_check"]));

                }else if( moveValues[ai_player.id][3].length > 0 ){
                    //take check move to double check move
                    var no_played_move = true;
                    var checkMoves = ( moveValues[ai_player.id][3] );
                    console.log("check list 1", checkMoves);
                    _.each(checkMoves, function(move){
                        var checkMove = move;
                        console.log("ai test move 1", checkMove);
                        var check_board = self.state.clone();
                        check_board.playPiece(checkMove, ai_player.id);
                        var newMoveValues = check_board.moveValues([check_board]);
                        if( newMoveValues[ai_player.id]["double_check"].length > 0 && no_played_move){
                            no_played_move = false;
                            console.log("play move for mate in 2");
                            self.playMove(checkMove, ai_player.id);
                            }
                        });
                    // take random check move for self
                    if (no_played_move){
                        self.playMove(randomOption(moveValues[ai_player.id][3]));
                    }
                }else if( moveValues[other_player.id][3].length > 0){
                    // block random check move for opponent
                    self.playMove(randomOption(moveValues[other_player.id][3]));

                }else {
                    // play random move "best visible"
                    var moves = self.state.getEmptySpaces();
                    var centre_moves = pieces_in_both(piece_rank["centre"], moves);
                    if ( centre_moves[0] !== undefined){
                        self.playMove(randomOption(centre_moves));
                    }else{
                        var layer2_moves = pieces_in_both(piece_rank["layer2"], moves);
                        if ( layer2_moves[0] !== undefined){
                            self.playMove(randomOption(layer2_moves));
                        }else{
                            self.playMove(randomOption(moves));
                        }
                    }
                }
            }, delay);
        }else if(ai_player.aiLevel == 3){
            // Level 3
            // already defined moveValues (line 356)
            // var moveValues = self.state.moveValues();
            setTimeout(function(){
                if ( moveValues[ai_player.id][4].length > 0){
                    // Winning move
                    self.playMove(randomOption(moveValues[ai_player.id][4]));

                }else if( moveValues[other_player.id][4].length > 0){
                    // block winning move for opponent
                    self.playMove(randomOption(moveValues[other_player.id][4]));

                }else if( moveValues[ai_player.id]["double_check"].length > 0){
                    // Try to find random double
                    self.playMove(randomOption(moveValues[ai_player.id]["double_check"]));

                }else {

                    // are there any moves that gives check, which produce double check opportunity
                    var no_played_move = true;
                    var checkMoves = ( moveValues[ai_player.id][3] );
                    console.log("check list 1", checkMoves);
                    _.each(checkMoves, function(move){
                        var checkMove = move;
                        console.log("ai test move 1", checkMove);
                        var check_board = self.state.clone();
                        check_board.playPiece(checkMove, ai_player.id);
                        var newMoveValues = check_board.moveValues([check_board]);
                        if( newMoveValues[ai_player.id]["double_check"].length > 0 && no_played_move){
                            no_played_move = false;
                            console.log("play move for mate in 2");
                            self.playMove(checkMove, ai_player.id);
                            }
                        });

                    if (no_played_move){
                        _.each(checkMoves, function(move){
                            //Play 1st ai move
                            var aiMove = move;
                            var check_board = self.state.clone();
                            check_board.playPiece(aiMove, ai_player.id);
                            console.log("ai move 1", aiMove);

                            //play 1st block move
                            var blockMoveValues = check_board.moveValues();
                            var blockMove = ( blockMoveValues[ai_player.id][4] );
                            console.log("block move 1", blockMove);
                            check_board.playPiece(blockMove, other_player.id);

                            //list 2nd check moves
                            var move2Values = check_board.moveValues();
                            var check2Moves = ( move2Values[ai_player.id][3] );
                            console.log("2nd check list", check2Moves);

                            _.each(check2Moves, function(move2){
                                //play 2nd check move
                                var aiMove2 = move2;
                                console.log("play move 2", aiMove2);
                                var check2_board = self.state.clone();
                                check2_board.playPiece(aiMove2, ai_player.id);

                                //check if 2nd check move leads to winner
                                var new2MoveValues = check2_board.moveValues([check2_board]);
                                if( new2MoveValues[ai_player.id]["double_check"].length > 0 && no_played_move){
                                    no_played_move = false;
                                    console.log("play move 1 for 3 move win", aiMove);
                                    self.playMove(aiMove, ai_player.id);
                                }
                            });
                        });

                        if (moveValues[other_player.id]["double_check"].length > 0 && no_played_move){
                            //Block a double check if present
                            self.playMove(randomOption(moveValues[other_player.id]["double_check"]));

                        }else if( moveValues[other_player.id][3].length > 0 && no_played_move){
                            // clever check blocking..!
                            var best_moves = [moveValues[other_player.id][3][0]];
                            var best = 0;

                            _.each(moveValues[other_player.id][3], function(check_blocking_move){
                                var board_clone = self.state.clone();
                                // have opponent play check move
                                board_clone.playPiece(check_blocking_move, other_player.id);
                                var moveValues = board_clone.moveValues();
                                // block this check
                                board_clone.playPiece(randomOption(moveValues[other_player.id][4]), ai_player.id);

                                moveValues = board_clone.moveValues();
                                //count how many checks are now available to opponent.
                                if (moveValues[other_player.id][3].length > best){
                                    best_moves = [check_blocking_move];
                                    best = moveValues[other_player.id][3].length;
                                }else if(moveValues[other_player.id][3].length == best){
                                    best_moves.push(check_blocking_move);
                                }

                            });

                            if( best > 7  || moveValues[ai_player.id][3].length === 0 ){
                                console.log("fancy blocky");
                                self.playMove(randomOption(best_moves));
                            }else{
                                // take random check move for self
                                self.playMove(randomOption(moveValues[ai_player.id][3]));
                            }

                        }else if (no_played_move) {
                            // play random move "best visible"
                            var moves = self.state.getEmptySpaces();
                            var centre_moves = pieces_in_both(piece_rank["centre"], moves);
                            if ( centre_moves[0] !== undefined){
                                self.playMove(randomOption(centre_moves));
                            }else{
                                var layer2_moves = pieces_in_both(piece_rank["layer2"], moves);
                                if ( layer2_moves[0] !== undefined){
                                    self.playMove(randomOption(layer2_moves));
                                }else{
                                    self.playMove(randomOption(moves));
                                }
                            }
                        }
                    }

                }
            }, delay);
        }else if(ai_player.aiLevel == 4){
            // Level 4
            // NOTES: why redefining moveValues and moves?
            var moveValues = self.state.moveValues();
            var moves = self.state.getEmptySpaces();
            setTimeout(function(){
                var no_played_move = true;
                if ( moveValues[ai_player.id][4].length > 0){
                    // Winning move
                    no_played_move = false;
                    self.playMove(randomOption(moveValues[ai_player.id][4]));

                }else if( moveValues[other_player.id][4].length > 0 && no_played_move){
                    // block winning move for opponent
                    no_played_move = false;
                    self.playMove(randomOption(moveValues[other_player.id][4]));

                }else if( moveValues[ai_player.id]["double_check"].length > 0 && no_played_move){
                    // Try to find random double
                    no_played_move = false;
                    self.playMove(randomOption(moveValues[ai_player.id]["double_check"]));

                }else if (moves.length == 35) {
                    // play random move "best visible"
                    var centre_moves = pieces_in_both(piece_rank["centre"], moves);
                    self.playMove(randomOption(centre_moves));
                }
                var checkMoves = ( moveValues[ai_player.id][3] );
                console.log("check list 1", checkMoves);
                _.each(checkMoves, function(move){
                    var checkMove = move;
                    console.log("ai test move 1", checkMove);
                    var check_board = self.state.clone();
                    check_board.playPiece(checkMove, ai_player.id);
                    var newMoveValues = check_board.moveValues([check_board]);
                    if( newMoveValues[ai_player.id]["double_check"].length > 0 && no_played_move){
                        no_played_move = false;
                        console.log("play move for mate in 2");
                        self.playMove(checkMove, ai_player.id);
                        }
                    });

                if (no_played_move){
                    _.each(checkMoves, function(move){
                        //Play 1st ai move
                        var aiMove = move;
                        var check_board = self.state.clone();
                        check_board.playPiece(aiMove, ai_player.id);
                        console.log("ai move 1", aiMove);

                        //play 1st block move
                        var blockMoveValues = check_board.moveValues();
                        var blockMove = ( blockMoveValues[ai_player.id][4] );
                        console.log("block move 1", blockMove);
                        check_board.playPiece(blockMove, other_player.id);

                        //list 2nd check moves
                        var move2Values = check_board.moveValues();
                        var check2Moves = ( move2Values[ai_player.id][3] );
                        console.log("2nd check list", check2Moves);

                        _.each(check2Moves, function(move2){
                            //play 2nd check move
                            var aiMove2 = move2;
                            console.log("play move 2", aiMove2);
                            var check2_board = self.state.clone();
                            check2_board.playPiece(aiMove2, ai_player.id);

                            //check if 2nd check move leads to winner
                            var new2MoveValues = check2_board.moveValues([check2_board]);
                            if( new2MoveValues[ai_player.id]["double_check"].length > 0 && no_played_move){
                                no_played_move = false;
                                console.log("play move 1 for 3 move win", aiMove);
                                self.playMove(aiMove, ai_player.id);
                            }
                        });
                    });
                }if (no_played_move){

                    // self.playMove(randomOption(minimaxedMove[ai_player.id]));
                    var bestRank = -100000;
                    // redundant?  we've made it here because no_played_move
                    // passed the 'if' statement above
                    var no_played_move = true;
                    var bestMove = [];
                    console.log(moves);
                    _.each( moves, function(move){
                        var passed_board = self.state.clone();
                        passed_board.playPiece(move, ai_player.id);
                        var newMoveValues = passed_board.moveValues([passed_board]);
                        var moveRank = ((10*newMoveValues[ai_player.id][3].length*newMoveValues[ai_player.id][3].length+5*newMoveValues[ai_player.id][2].length)-
                            (10*newMoveValues[other_player.id][3].length*newMoveValues[other_player.id][3].length+5*newMoveValues[other_player.id][2].length));
                        console.log(move, moveRank);
                        if (moveRank > bestRank) {
                            bestRank = moveRank;
                            bestMove = move;
                        }
                        /*else if (moveRank = bestRank){
                            bestMove.push(move);
                        }*/
                    });
                self.playMove(bestMove);
                }
            });
        }
    }
};

/*LatticeGame.BoardState.minimaxedMove = function(){

}
LatticeGame.prototype.bestScore = function(){
    var allMoves = getEmptySpaces();
    var bestRank = -100000;
    _.each( allMoves, function(move){
        var passed_board = self.state.clone();
        var newMoveValues = passed_board.moveValues([passed_board]);
        var moveRank = (10*newMoveValues[ai_player.id][3].length*newMoveValues[ai_player.id][3].length+5*newMoveValues[ai_player.id][2]+newMoveValues[ai_player.id][1])-
        (10*newMoveValues[other_player.id][3].length*newMoveValues[other_player.id][3].length+5*newMoveValues[other_player.id][2]+newMoveValues[other_player.id][1]);
        if (moveRank > bestRank) {
            bestRank = moveRank;
        }
    });
    return[bestRank,move]
}*/
LatticeGame.prototype.resetGame = function(){
    var self = this;

    var new_state = new LatticeGame.BoardState();
    self.message_controller.updateMessage("");

    self.state_history = [];
    self.state = new_state;
    self.state_history.push(new_state.clone());

    self.loadState(new_state);
    self.wins = [];
    self.turn = self.starting_player;

    if(self.previous_move){
        // kill last move highlight
        $("#"+self.previous_move).removeClass("last_played");
    }
    if( self.game_is_timed ){
        self.gameTimer.stop();
        self.gameTimer.reset();
        self.gameTimer.start();
    }
    // I hate calling this all over the place... but such is life.
    self.playAiTurn();

};

LatticeGame.prototype.playMove= function(move){
    // Handles a board update / move being made

    console.log("playMove", move);
    var self = this;
    var allMoves = self.state.getEmptySpaces();
    var audio = document.getElementsByTagName("audio")[0];
    /*var sound = new Audio:url(js/playerMove.wav)*/
    if(self.state.board_numeric[move] === 0 && ! self.wins[0]){
        if(allMoves.length == 36){
            self.state.firstMove = {"move":move, "id":self.turn};
            self.previous_move = false;
        }

        if (self.players[self.turn].player_type == "human" && !(_.contains(allMoves, parseInt(move)) ) ){
            // invalid move
            self.message_controller.updateMessage("Place at least 3 rows or columns away from your first move");
            // stop what we're doing, wait for another input.
            return;
        }

        self.addPiece(move, self.turn);
        audio.play();
        var opponent = self.turn;
        self.turn = (self.turn+1)%2;
        self.wins = self.state.findWin();

        self.state_history.push(self.state.clone());

        if (!self.wins[0]){
            // No one has won yet.
            //1) show last move.
            if(self.previous_move){
                $("#"+self.previous_move).removeClass("last_played");
            }
            self.previous_move = move;
            $("#"+move).addClass("last_played");
            //2) alert if there's a check move.
            var moveValues = self.state.moveValues();
            console.log("move values...", moveValues[self.players[opponent].id][4]);
            if(moveValues[self.players[opponent].id][4].length > 0){
                self.message_controller.updateMessage("Check!");
            }else{
                self.message_controller.updateMessage("");
            }

            if(self.game_is_timed){
                //self.GameTimer.toggleTimer();
                self.gameTimer.changePlayer(self.turn);
            }
            // would love to eventually not call this all over the place somehow...
            self.playAiTurn();
        }else {
            _.each(self.wins[0],function(piece){
                $("#"+piece).addClass("winning");
            });
            if(self.game_is_timed){
                self.gameTimer.stop();
            }
            if (self.players[opponent].id == "x"){
                self.message_controller.updateMessage("Black wins!");
            }else{
                self.message_controller.updateMessage("White wins!");
            }

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
        if(self.previous_move){
            // kill last move highlight
            $("#"+self.previous_move).removeClass("last_played");
        }
        self.playAiTurn();
    }else if(self.state_history.length == 2){
        var new_state = self.state_history[self.state_history.length - 2].clone();
        self.state_history.pop();
        self.loadState(new_state);
        self.turn = (self.turn+1)%2;
        if(self.previous_move){
            // kill last move highlight
            $("#"+self.previous_move).removeClass("last_played");
        }
        self.playAiTurn();
    }else {
    }
};

LatticeGame.prototype.loadState = function(state){
    var self = this;

    //set the state
    self.state = state.clone();

    // set all the pieces to be correct on the board
    _.each(_.range(0,36),function(piece_index){
        self.pieces_dom[piece_index].removeClass("x o winning");

        if(self.state.board_numeric[piece_index] !== 0){
            self.pieces_dom[piece_index].addClass(state.board_numeric[piece_index]);
        }

    });

    // make sure wins is still correct.
    self.wins = self.state.findWin();
};

LatticeGame.prototype.addPiece = function(piece_index, player_index){
    var self = this;
    self.state.playPiece(piece_index, self.players[player_index].id);

    self.pieces_dom[piece_index].addClass(self.players[player_index].id);
};

LatticeGame.prototype.removePiece = function(piece_index){
    self.board_numeric[piece_index] = 0;
    self.pieces_dom[piece_index].removeClass("x o winning");
};

LatticeGame.prototype.initBoard = function(){

    // Draw the playing board
    var b = Snap("#board");
    var width = $( document ).width() * 0.95;
    console.log('width: ', width);
    var single_sq = width / 6; // dimension of a single playing square
    var sq_c = single_sq / 2; // dimension to the middle of the square
    console.log('single_sq', single_sq);
    // Starting point
    var start_pos = sq_c;
    var edge_len = single_sq / 8;

    // Start Move-to command
    var pattern_str = "M" + Math.round(start_pos).toString() + ',';
    pattern_str += Math.round(start_pos).toString();
    // Start Line-to command - horizontal line to right
    pattern_str += 'h' + Math.round(edge_len).toString() + ',';
    pattern_str += Math.round(0).toString();
    // move back to origin
    pattern_str += "M" + Math.round(start_pos).toString() + ',';
    pattern_str += Math.round(start_pos).toString();
    // Start vertical line downward
    pattern_str += 'v' + Math.round(0).toString() + ',';
    pattern_str += Math.round(edge_len).toString();
    // move back to origin
    pattern_str += "M" + Math.round(start_pos).toString() + ',';
    pattern_str += Math.round(start_pos).toString();
    // Move horizontal line to the left
    pattern_str += 'h' + Math.round(0).toString() + ',-';
    pattern_str += Math.round(edge_len).toString();
    // move back to origin
    pattern_str += "M" + Math.round(start_pos).toString() + ',';
    pattern_str += Math.round(start_pos).toString();
    // Start vertical line downward
    pattern_str += 'v' + Math.round(0).toString() + ',-';
    pattern_str += Math.round(edge_len).toString();
    pattern_str += 'Z';
    console.log('fill pattern string: ', pattern_str);
    //create pattern for board

    var boardPattern = b.path(pattern_str).attr({
        fill: "none",
        stroke: "rgba(10, 10, 10, 0.9)",
        opacity: '0.8',
        strokeWidth: 2
    });

    boardPat = boardPattern.pattern(0, 0, single_sq, single_sq);
    var gameboard = b.rect(0, 0, width, 608).attr({
         fill: boardPat
    });


    var self = this;
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
            .appendTo(li)
            .click( function (e){
                        self.playMove($(e.currentTarget).attr("id"));
                    }
                );
        self.pieces_dom.push(piece_centred);

    }
};

