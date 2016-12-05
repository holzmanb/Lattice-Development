// Make sure document is loaded...
$(document).ready(function() {
    //create Snap object for loader icon animation
    // var s = Snap("#loader-svg");

    // var block = s.circle(100, 100, 100, 100, 20, 20);
    // block.attr({
    //     fill: "rgb(236, 240, 241)",
    //     stroke: "#1f2c39",
    //     strokeWidth: 3
    // });

    /* Allow lattice game to set itself up
       Global Variable right now just for debug purposes */
    global_game = new LatticeGame();
    global_game.initBoard();

    /* Set up single page navigation */
    $('[data-navigate]').click(function(){
        // hide all content
        $('.content').addClass("hidden");

        //Scroll to top of page
        $(window).scrollTop();

        // show this specific div
        $("#" + $(this).data("navigate")).removeClass("hidden");

         if ($(this).data("navigate") == "main-menu"){
                console.log("STOOOOP");
                global_game.stopGame();
        }
    });

    /* start game button */
    $('[data-startgame]').click(function(){

        // single player game options
        if($(this).data("startgame")=="single-player"){
            var game_options = {};
            $("#single-player-starting-options :input").each(function(){
                    if(this.checked === true){
                        game_options[$(this).attr("name")] = $(this).val();
                    }

                    //timer converts minutes to milliseconds
                    if (this.name == "time-for-game" ){
                        game_options[$(this).attr("name")] = $(this).val()*60;
                    }
                    // this is only checking for radio buttons right now, cause we're not worried about anything else...
                    // will have to do something for the timer & player info down the line
                });
            game_options["game_type"] = "single_player";
        }


        // multi player game options
        if($(this).data("startgame") == "multi-player"){
            var game_options = {};
            $("#multi-player-starting-options :input").each(function(){
                    if(this.checked === true){
                        game_options[$(this).attr("name")] = $(this).val();
                    }
                    //timer converts minutes to milliseconds
                    if (this.name == "time-for-game" ){
                        game_options[$(this).attr("name")] = $(this).val()*60;
                    }
                    // this is only checking for radio buttons right now, cause we're not worried about anything else...
                    // will have to do something for the timer & player info down the line
                });
            game_options["game_type"] = "multi-player";
        }

        // sample game options
        if($(this).data("startgame")=="sample-game"){

            var game_options = {};

            game_options["game_type"] = "sample-game";
        }

        //  game options is out of scope?
        // start the game
        global_game.newGame(game_options);

        // hide all divs
        $('.content').addClass("hidden");

        // show this game div
        $("#game").removeClass("hidden");
    });

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

    });

});
