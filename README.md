# Lattice Game

## About
Lattice is an abstract strategy game created in the back row of a geophysics class at the University of British Columbia.

The branch 'dk_ui' corresponds to UI/UX changes made by Dan Kovacek.

## Run the Game
The development environment uses gulp's browser-refresh tool to improve workflow.

If you want to run the local development environment, install gulp

`sudo apt-get install gulp`

and simply running the `gulp` command will launch the server (on port 3000) and open
the browser.  The gulpfile is set up to watch css, html, and js files for changes,
and then automatically refresh the browser.

Otherwise, use python's 'SimpleHTTPServer':

`>python -m SimpleHTTPServer

b.  navigate to `localhost:8000`

c.  Play away.

If you don't want to bother with either, you can see how it (sort of) looks
by simply double-clicking on the `index.html` file.

## Status

Current version can simply be played as single player vs. four
computer opponents of increasing difficulty levels.

## TODO

- change styling:
    - --landing page--
        - --add 'loader' animation--
        - --create logo variations--
        - --change settings and menu styles and flow--
    - --revamp the way the board is visualized--
    - change the way the pieces are drawn and moved around the board
       (i.e. use svg animations)
    -change sample game to styled button under "game rules" menu option

- add login for score keeping (Google, Facebook)
    - determine what score keeping will entail
    - determine methodology for unlocking levels

- add message board?

- AI levels 4-5
- Declare check/hint option

