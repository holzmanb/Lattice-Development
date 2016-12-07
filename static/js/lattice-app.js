// Make sure document is loaded...
$(document).ready(function() {
    /* Allow lattice game to set itself up
       Global Variable right now just for debug purposes */
    global_game = new LatticeGame();
    global_game.initBoard();

    // variable for avoiding starting game before all inputs are valid
    var start_ok = false;

    /* Set up single page navigation */
    var setup = function() {
        console.log('running setup?');
        $('[data-navigate]').click(function() {
            // hide all content
            $('.content').addClass("hidden");

            //Scroll to top of page
            $(window).scrollTop();

            // show this specific div
            $("#" + $(this).data("navigate")).removeClass("hidden");

            if ($(this).data("navigate") == "main-menu"){
                    // reset global game options
                    global_game.game_options = {};
                    // reset the timer input forms
                    var time_entries = document.getElementsByName("time-for-game");
                    time_entries.forEach(function(entry) {
                        entry.value = "";
                    });
                    //stop game
                    global_game.stopGame();
            }
        });
    };

    setup();

    /* start game button */
    $('[data-startgame]').click(function(){
        var check_inputs = function(game_time) {
            // check if valid time limit has been entered
            //var time_limit = document.getElementsByName('time-for-game')[0].value;
            if (global_game.game_options['timed'] == "Yes") {
                console.log('time limit: ', game_time);
                if (Number.isInteger(parseInt(game_time)) === false) {
                    console.log('not an integer');
                    return false;
                } else if (game_time <= 0) {
                    console.log('negative or zero');
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        };

        // single player game options
        if($(this).data("startgame")=="single-player") {
            $("#single-player-starting-options :input").each(function(){
                    if(this.checked === true){
                        global_game.game_options[$(this).attr("name")] = $(this).val();
                    }

                    //timer converts minutes to milliseconds
                    if (this.name == "time-for-game" ){
                        global_game.game_options[$(this).attr("name")] = $(this).val()*60;
                        // check if game options are valid
                        // if not, re-initialize
                        if (check_inputs(this.value) === false) {
                            this.value = "Invalid time limit.";
                            $(this).addClass("error");
                        } else {
                            start_ok = true;
                        }
                    }
                    // this is only checking for radio buttons right now, cause we're not worried about anything else...
                    // will have to do something for the timer & player info down the line
                });
            global_game.game_options["game_type"] = "single_player";
        }


        // multi player game options
        if($(this).data("startgame") == "multi-player"){
            $("#multi-player-starting-options :input").each(function(){
                    if(this.checked === true){
                        global_game.game_options[$(this).attr("name")] = $(this).val();
                    }
                    //timer converts minutes to milliseconds
                    if (this.name == "time-for-game" ){
                        global_game.game_options[$(this).attr("name")] = $(this).val()*60;
                        // check if game options are valid
                        // if not, re-initialize
                        if (check_inputs(this.value) === false) {
                            this.value = "Invalid time limit.";
                            $(this).addClass("error");
                        } else {
                            start_ok = true;
                        }
                    }
                    // this is only checking for radio buttons right now, cause we're not worried about anything else...
                    // will have to do something for the timer & player info down the line
            });
            global_game.game_options["game_type"] = "multi-player";
        }

        // sample game options
        if($(this).data("startgame")=="sample-game"){
            global_game.game_options["game_type"] = "sample-game";
        }

        // start the game
        if (start_ok === true) {
            global_game.newGame(global_game.game_options);

            // hide all divs
            $('.content').addClass("hidden");

            // show this game div
            $("#game").removeClass("hidden");
        } else {
            setup();
        }
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

    $("#timer").click(function(e) {
        $("#time-limit").toggleClass("hidden");

        // Reset game timer values for game_options object
        var game_timer = $(this).parent().siblings()[0];
        if (game_timer.value == "Yes") {
            $(game_timer).value = "No";
        } else if (game_timer.value == "No") {
            $(game_timer).value = "Yes";
        }
        global_game.game_options['timed'] = $(game_timer).value;
    });

});
