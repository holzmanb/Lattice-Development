// Make sure document is loaded...
$(document).ready(function() {
    /* Allow lattice game to set itself up
       Global Variable right now just for debug purposes */
    global_game = new LatticeGame();
    global_game.initBoard();

    /* Set up single page navigation */
    var setup = function() {
        console.log('redo setup');
        $('[data-navigate]').click(function() {
            // hide all content
            $('.content').addClass("hidden");

            //Scroll to top of page
            $(window).scrollTop();

            // show this specific div
            $("#" + $(this).data("navigate")).removeClass("hidden");

            if ($(this).data("navigate") == "main-menu"){
                console.log('reset');
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

        // single player game options
        if($(this).data("startgame")=="single-player") {
            $("#single-player-starting-options :input").each(function(){
                if(this.checked === true){
                    global_game.game_options[$(this).attr("name")] = $(this).val();
                }
                //timer converts minutes to milliseconds
                if (this.name == "time-for-game" ){
                    // timer is the range slider value
                    var timer = $(this).siblings("#timer")[0];
                    console.log('game option updated: ', $(this).attr("name"), ': ', $(this).val());
                    // game is timed if id=timer element also has class box_checked
                    if ( $(timer).attr("value") == "Yes" ) {
                        global_game.game_options['timed'] = "Yes";
                        global_game.game_options[this.name] = $(this).val()*60;
                    } else {
                        global_game.game_options['timed'] = "No";
                        global_game.game_options[this.name] = "-";
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
                        //timer converts minutes to milliseconds
                    }
                    if (this.name == "time-for-game" ){
                        global_game.game_options[$(this).attr("name")] = $(this).val() * 60;
                    }
                    // this is only checking for radio buttons right now, cause we're not worried about anything else...
                    // will have to do something for the timer & player info down the line
            });
            global_game.game_options["game_type"] = "multi-player";
        }

        // sample game options
        if($(this).data("startgame")=="sample-game"){
            global_game.game_options["game_type"] = "sample-game";
            start_ok = true;
        }

        // start the game

        global_game.newGame(global_game.game_options);

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

    $("[id='timer']").click(function() {
        $( this ).siblings("#time-limit").toggleClass("hidden");
        $( this ).siblings("#time").toggleClass("hidden");
        $( this ).toggleClass("box_checked");
        // timer value yes or no indicates whether game is timed
        if ( $( this ).attr("value") == "Yes" ) {
            $( this ).attr("value", "No");
            // reset the time in game options to avoid
            // legacy time being entered when user
            // navigates in and out of settings menu
            global_game.game_options['time-for-game'] = "-";
        } else if ( $( this ).attr("value") == "No" ) {
            $( this ).attr("value", "Yes");
        }
    });

    // game time limit selector
    $( "[type=range]" ).change(function() {
        console.log(this.value);
        $( "#time" ).text( this.value  + " minutes");
    });



});
