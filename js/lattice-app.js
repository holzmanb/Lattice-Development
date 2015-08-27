// Make sure document is loaded...
$(document).ready(function() {

    /* Allow lattice game to set itself up 
       Global Variable right now just for debug purposes */
    global_game = new LatticeGame();
    global_game.initBoard();

    /* Set up single page navigation */
    $('[data-navigate]').click(function(){
        // hide all content
        $('.content').addClass("hidden");

        // show this specific div
        $("#" + $(this).data("navigate")).removeClass("hidden");
    })

    /* start game button */
    $('[data-startgame]').click(function(){

        // single player game options
        if($(this).data("startgame")=="single-player"){
            var game_options = {};
            $("#single-player-starting-options :input").each(function(){
                    if(this.checked == true){
                        game_options[$(this).attr("name")] = $(this).val();
                    }

                    // this is only checking for radio buttons right now, cause we're not worried about anything else...
                    // will have to do something for the timer & player info down the line
                })
            game_options["game_type"] = "single_player";
        }

        
        // multi player game options
        if($(this).data("startgame") == "multi-player"){
            var game_options = {};
            game_options["game_type"] = "multi_player";
        }

        // start the game
        global_game.newGame(game_options);

        // hide all divs
        $('.content').addClass("hidden");

        // show this game div
        $("#game").removeClass("hidden");
    })

    // Ties buttons to the global_game
    $( '[data-gameaction]' ).click(function(){
        switch ($(this).data("gameaction")){
            case "undo":
                global_game.undoMove();
                break;
            case "reset":
                global_game.resetGame();
                break;
        }
    })

});