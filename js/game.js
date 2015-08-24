var latticeGame = new (function() {
	var self = this,
    	debug = document.location.hash == '#debug',
    	tweet = window.isWebApp,
    	facebook = window.isWebApp && !$.browser.chromeWebStore,
    	showAppsIcon = window.isWebApp,
    	showTime = false,

    	startedTutorial = false,
     	grid,
     	sizes = [4,6,8,10],
    	lastSize = 0,
      	currentPuzzle = null,
      	checkTOH = 0,
      	ojoos = ['Wonderful','Spectacular','Marvelous','Outstanding','Remarkable','Shazam','Impressive','Great','Well done','Fabulous','Clever','Dazzling','Fantastic','Excellent','Nice','Super','Awesome','Ojoo','Brilliant','Splendid','Exceptional','Magnificent','Yay'],
      	remainingOjoos = [],
      	endGameTOH1,
      	endGameTOH2,
      	endGameTOH3,
      	endSubtleHintTOH,
      	onHomeScreen = true,
      	inGame = false,
      	inText = false,
      	undoStack = [],
      	undone = false,
      	gameEnded = false,
      	continueLastGame = false,
      	systemTilesLockShown = false,
      	systemTilesLockToggleable = true,
      	time = 0,
      	timeStr = '',
      	timerTOH = 0,
      	timeInSeconds = 0,
      	hintsUsed = 0,
      	undosUsed = 0,
      	locksToggled = 0,
      	shareMsg = '#0hh1 I\'m playing 0h h1 and I think you should too! http://0hh1.com (or get the App!)';

	function init() {
    	getScore(function(value) {
    	$('#scorenr').html(value);
    	});
    	$('#tweeturl, #facebook').hide();

    	showTime = Storage.getDataValue('showTimeTrial', false);

    	if (!window.isWebApp)
      		$('#app').hide();
    
    	if (Utils.isTouch())
      		$('html').addClass('touch');
    
    	$('[data-size]').each(function(i,el){
      	var $el = $(el),
          size = $el.attr('data-size') * 1,
          label = sizes[size - 1];
      	$el.html(label)
      	$el.on('touchstart mousedown', function(evt){
        if (Utils.isDoubleTapBug(evt)) return false;
        var size = sizes[$(evt.target).closest('[data-size]').attr('data-size') * 1 - 1];
        loadGame(size);
     	})
    })
  	function showTitleScreen() {
    	onHomeScreen = true;
    	inGame = false;
    	inText = false;
    	$('.screen').hide().removeClass('show');
    	$('#title').show();
    	setTimeout(function() { $('#title').addClass('show'); },0);
  	}

  	function showGame() {
    	onHomeScreen = false;
    	inGame = true;
    	inText = false;
    	$('.screen').hide().removeClass('show');
    	$('#game').show();
    	setTimeout(function() { $('#game').addClass('show'); },0);
    	resize();
  	}

  	function showMenu() {
    	onHomeScreen = true;
    	inGame = false;
    	inText = false;
    	clearTimeouts();
    	$('.screen').hide().removeClass('show');
    	$('#menu').show();
    	getScore(function(value){
      	$('#scorenr').html(value);
    	});
    	setTimeout(function() { $('#menu').addClass('show'); },0);
    	resize();
  	}

	function showAbout() {
    	onHomeScreen = false;
    	inText = true;
    	$('.screen').hide().removeClass('show');
    	$('#about').show();
    	setTimeout(function() { $('#about').addClass('show'); },0);
    	resize();
  	}

  	function showRules() {
    	inText = true;
    	onHomeScreen = false;
    	$('.screen').hide().removeClass('show');
    	$('#rules').show();
    	setTimeout(function() { $('#rules').addClass('show'); },0);
    	resize();
  	}

    function showApps() {
    	inText = true;
    	onHomeScreen = false;
    	$('.screen').hide().removeClass('show');
    	$('#apps').show();
    	setTimeout(function() { $('#apps').addClass('show'); },0);
    	resize();
  	}

  	function showSizes() {
    	//$('#promo').hide();
    	showGame();
    	inGame = false;
    	inText = false;
    	onHomeScreen = false;
    	$('#boardsize').html('<span>Select a size</span>');
    	$('#menugrid').removeClass('hidden');
    	$('#board').addClass('hidden');
    	$('#bar [data-action]').not('[data-action="back"]').hide();
    	if (continueLastGame && !currentPuzzle.isTutorial) {
      	$('[data-action="continue"]').show().addClass('subtleHintOnce');
    	}
    	$('#board').addClass('hidden');
    	$('#score').show();
    	setTimeout(function() {
      	if (grid) grid.clear();
      	$('#score').addClass('show');
    	},0);
  	}
