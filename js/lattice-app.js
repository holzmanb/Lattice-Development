$(document).ready(function() {
    /* Allow lattice game to set up */
    global_game = new LatticeGame();
    console.log(global_game);
    global_game.initBoard();

    /* Set up single page navigation */
    $('[data-navigate]').click(function(){
        // hide all content
        $('.content').addClass("hidden");

        // show this specific div
        $("#" + $(this).data("navigate")).removeClass("hidden");
    })

    /* Start a game */
    $('[data-startgame]').click(function(){
        if($(this).data("startgame")=="single-player"){
            console.log("start single player game");
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

        

        if($(this).data("startgame") == "multi-player"){
            var game_options = {};
            game_options["game_type"] = "multi_player";
        }

        // start the game
        global_game.newGame(game_options);

        // hide all
        $('.content').addClass("hidden");

        // show this game div
        $("#game").removeClass("hidden");

    })


    $( '[data-gameaction]' ).click(function(){
        console.log($(this).data())
        console.log($(this).data("gameaction"));
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