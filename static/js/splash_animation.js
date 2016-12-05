init();

function init() {
    'use strict';

    var s = Snap("#loader-svg");

    var piece;
    var shadow;
    var x = 15;
    var y = 15;
    var colour;
    var allPieces = [];
    var grp;
    var i;
    var j;

    // create the pieces
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            // create circle
            piece = s.circle(x, y - 400, 15);
            // create fill gradient for lighting effect
            // and select color at random btwn black & white
            colour = select_random_color();
            // set piece colours
            piece.attr({
                fill: colour
            });

            // create shadow effect
            shadow = s.ellipse(x + 3 + 400, y + 3 + 50, 3, 3);
            shadow.attr({
                stroke: "rgba(0,0,0,0)",
                fill: "rgba(0,0,0,0.4)"
            });
            shadow.transform("r45");
            piece.before(shadow);

            // animate the piece and its shadow into their place
            // piece.animate({cy: y}, 1000, mina.bounce);
            // myFrames.push({animation: {transform:''}, dur: 1000});
            piece.animate({transform: 't0 400'}, 1000, mina.bounce );
            shadow.animate({transform: 't-400 -50 s5 5'}, 1000, mina.bounce );

            // create a group for the piece and its shadow
            // and push this to a set of all pieces
            grp = s.group(shadow, piece);
            allPieces.push(grp);

            // increment the x and y position so the pieces have
            // unique end positions in a grid pattern
            x += 80;
            if (x > 190) {
                x = 15;
            }
        }
        y += 80;
        if (y > 190) {
            y = 15;
        }
    }
    // Load the "Play" button once the 'progress bar' is complete
    var play_button = function() {
        Snap.load("static/img/play_button.svg", function(play_button) {
            var play = play_button.select("g#play_button").attr({
                transform: 's0.7 t-230, -90'
            });
            s.append(play);
            play.animate({transform: "s0.75 t-220, -90"}, 2000, mina.elastic);
        });
    };

    // create a 'progress bar' to imitate loading of resources
    var p_bar = s.line(0, 200, 0, 200).attr({
        stroke: "rgba(50,50,50, 0.75)",
        strokeWidth: 2,
        opacity: '0.9'
    });
    p_bar.animate({x2: '200'}, 3200, mina.easeinout);
    var change_color = function() {
        p_bar.attr({
        stroke: "rgb(103, 173, 100)",
        strokeWidth: 5
        });
    };

    setTimeout( function() {
        play_button();
        change_color(p_bar);
    }, 3200);


    var dx;
    var dy;
    setTimeout(function() {
        // animation for wiping all the pieces off the page
        allPieces.forEach(function(el) {
            dx = (Math.random() - 0.49) * 700;
            dy = 300;
            var transform_string = 't ';
            transform_string = 't ' + dx + ' ' + dy;
            el.animate({transform: transform_string}, 6000, mina.elastic);
        });
    }, 1500);

    // drop the LATTICEGAME logo into frame
    setTimeout(function() {
        Snap.load("static/img/gametitle.svg", function(title_image) {
            var title = title_image.select("g#game_title").attr({
                transform: 's0.5 t-500, -600'
            });
            s.append(title);
            title.animate({transform: 's0.67 t-355, -250'}, 1000, mina.elastic);
        });
    }, 1500);

    function select_random_color() {
        var r = Math.random();
        if (r >= 0.5) {
            return s.gradient("r(0.25, 0.25, 0.35)rgba(100,100, 100 , 0.75)-rgb(0,0,0)");
        } else {
            return s.gradient("r(0.25, 0.25, 0.3)rgba(255, 255, 255 , 0.95)-rgb(205, 205, 205)");
        }
    }
}

$("svg#loader-svg").click(function(e){
    console.log('here?');
    e.preventDefault();
    $(".loader").delay( 200 ).slideUp( "slow", function() {
    //let the information preload and then draw up
    //the curtains for show time!
    });
});


// information on Snap transforms:
// http://stackoverflow.com/questions/20302801/how-do-i-understand-transform-properties-in-snap-svg



