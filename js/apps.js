function createCountDown(timeRemaining) {
    var startTime = Date.now();
    return function() {
       return timeRemaining - ( Date.now() - startTime );
}

function tutorial(){
	var latticegame = /*run a game against itself with 0.5second pause as a tutorial under "rules"

}
