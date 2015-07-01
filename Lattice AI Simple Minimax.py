#Lattice

import random
from sys import maxsize

from itertools import product

def drawBoard(board):
    # This function prints out the board that it was passed.
    # "board" is a list of 36 strings representing the board (ignore index 0)

    print('     1   2   3   4   5   6 ')
    print('   -------------------------')
    print('1  | ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + ' | ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + ' |  6' )
    print('   -------------------------')
    print('7  | ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + ' | ' + board[10] + ' | ' + board[11] + ' | ' + board[12] + ' |  12' )
    print('   -------------------------')
    print('13 | ' + board[13] + ' | ' + board[14] + ' | ' + board[15] + ' | ' + board[16] + ' | ' + board[17] + ' | ' + board[18] + ' |  18' )
    print('   -------------------------')
    print('19 | ' + board[19] + ' | ' + board[20] + ' | ' + board[21] + ' | ' + board[22] + ' | ' + board[23] + ' | ' + board[24] + ' |  24' )
    print('   -------------------------')
    print('25 | ' + board[25] + ' | ' + board[26] + ' | ' + board[27] + ' | ' + board[28] + ' | ' + board[29] + ' | ' + board[30] + ' |  30' )
    print('   -------------------------')
    print('31 | ' + board[31] + ' | ' + board[32] + ' | ' + board[33] + ' | ' + board[34] + ' | ' + board[35] + ' | ' + board[36] + ' |  36' )
    print('   -------------------------')

def inputPlayerLetter():
    # Lets the player type which letter they want to be.
    # Returns a list with the player's letter as the first item, and the computer's letter as the second.
    letter = ''
    while not (letter == 'X' or letter == 'O'):
        print('Do you want to be X or O?')
        letter = input().upper()

    # the first element in the list is the player's letter, the second is the computer's letter.
    if letter == 'X':
        return ['X', 'O']
    else:
        return ['O', 'X']

def whoGoesFirst():
    # Player can choose if they go first
    print('Do you want to go first?')
    if input() == 'y':
        return 'player'
    else:
        return 'computer'

def playAgain():
    # This function returns True if the player wants to play again, otherwise it returns False.
    print('Do you want to play again? (yes or no)')
    return input().lower().startswith('y')

def makeMove(board, letter, move):
    board[move] = letter

def isWinner(bo, le):
    # Given a board and a player's letter, this function returns True if that player has won.
    # Bo and le are abbreviations for board and letter.
    return ((bo[1] == le and bo[2] == le and bo[7] == le and bo[8] == le) or # across the top 1x1
    (bo[2] == le and bo[3] == le and bo[8] == le and bo[9] == le) or
    (bo[3] == le and bo[4] == le and bo[9] == le and bo[10] == le) or
    (bo[4] == le and bo[5] == le and bo[10] == le and bo[11] == le) or
    (bo[5] == le and bo[6] == le and bo[11] == le and bo[12] == le) or
    (bo[7] == le and bo[8] == le and bo[13] == le and bo[14] == le) or # across 2nd row 1x1
    (bo[8] == le and bo[9] == le and bo[14] == le and bo[15] == le) or
    (bo[9] == le and bo[10] == le and bo[15] == le and bo[16] == le) or
    (bo[10] == le and bo[11] == le and bo[16] == le and bo[17] == le) or
    (bo[11] == le and bo[12] == le and bo[17] == le and bo[18] == le) or
    (bo[13] == le and bo[14] == le and bo[19] == le and bo[20] == le) or # across 3rd row 1x1
    (bo[14] == le and bo[15] == le and bo[20] == le and bo[21] == le) or
    (bo[15] == le and bo[16] == le and bo[21] == le and bo[22] == le) or
    (bo[16] == le and bo[17] == le and bo[22] == le and bo[23] == le) or
    (bo[17] == le and bo[18] == le and bo[23] == le and bo[24] == le) or
    (bo[19] == le and bo[20] == le and bo[25] == le and bo[26] == le) or # across 4th row 1x1
    (bo[20] == le and bo[21] == le and bo[26] == le and bo[27] == le) or
    (bo[21] == le and bo[22] == le and bo[27] == le and bo[28] == le) or
    (bo[22] == le and bo[23] == le and bo[28] == le and bo[29] == le) or
    (bo[23] == le and bo[24] == le and bo[29] == le and bo[30] == le) or
    (bo[25] == le and bo[26] == le and bo[31] == le and bo[32] == le) or # across 5th row 1x1
    (bo[26] == le and bo[27] == le and bo[32] == le and bo[33] == le) or
    (bo[27] == le and bo[28] == le and bo[33] == le and bo[34] == le) or
    (bo[28] == le and bo[29] == le and bo[34] == le and bo[35] == le) or
    (bo[29] == le and bo[30] == le and bo[35] == le and bo[36] == le) or
    (bo[1] == le and bo[3] == le and bo[13] == le and bo[15] == le) or # across 1st row 2x2
    (bo[2] == le and bo[4] == le and bo[14] == le and bo[16] == le) or
    (bo[3] == le and bo[5] == le and bo[15] == le and bo[17] == le) or
    (bo[4] == le and bo[6] == le and bo[16] == le and bo[18] == le) or
    (bo[7] == le and bo[9] == le and bo[19] == le and bo[21] == le) or # across 2nd row 2x2
    (bo[8] == le and bo[10] == le and bo[20] == le and bo[22] == le) or
    (bo[9] == le and bo[11] == le and bo[21] == le and bo[23] == le) or
    (bo[10] == le and bo[12] == le and bo[22] == le and bo[24] == le) or
    (bo[13] == le and bo[15] == le and bo[25] == le and bo[27] == le) or # across 3rd row 2x2
    (bo[14] == le and bo[16] == le and bo[26] == le and bo[28] == le) or
    (bo[15] == le and bo[17] == le and bo[27] == le and bo[29] == le) or
    (bo[16] == le and bo[18] == le and bo[28] == le and bo[30] == le) or
    (bo[19] == le and bo[21] == le and bo[31] == le and bo[33] == le) or # across 4th row 2x2
    (bo[20] == le and bo[22] == le and bo[32] == le and bo[34] == le) or
    (bo[21] == le and bo[23] == le and bo[33] == le and bo[35] == le) or
    (bo[22] == le and bo[24] == le and bo[34] == le and bo[36] == le) or
    (bo[1] == le and bo[4] == le and bo[19] == le and bo[22] == le) or # across 1st row 3x3
    (bo[2] == le and bo[5] == le and bo[20] == le and bo[23] == le) or
    (bo[3] == le and bo[6] == le and bo[21] == le and bo[24] == le) or
    (bo[7] == le and bo[10] == le and bo[25] == le and bo[28] == le) or # across 2nd row 3x3
    (bo[8] == le and bo[11] == le and bo[26] == le and bo[29] == le) or
    (bo[9] == le and bo[12] == le and bo[27] == le and bo[30] == le) or
    (bo[13] == le and bo[16] == le and bo[31] == le and bo[34] == le) or # across 3rd row 3x3
    (bo[14] == le and bo[17] == le and bo[32] == le and bo[35] == le) or
    (bo[15] == le and bo[18] == le and bo[33] == le and bo[36] == le) or
    (bo[1] == le and bo[5] == le and bo[25] == le and bo[29] == le) or # across 1st row 4x4
    (bo[2] == le and bo[6] == le and bo[26] == le and bo[30] == le) or
    (bo[7] == le and bo[11] == le and bo[31] == le and bo[35] == le) or # across 2nd row 4x4
    (bo[8] == le and bo[12] == le and bo[32] == le and bo[36] == le) or
    (bo[1] == le and bo[6] == le and bo[31] == le and bo[36] == le)) # 5x5

def getCheckMoves(board, letter):
    #Returns a list of moves that give check
    checkMoves = []

    for i in range(1, 37):
        for y in range(1, 37):
            copy = getBoardCopy(board)
            if isSpaceFree(copy, i) and isSpaceFree(copy, y):
                makeMove(copy, letter, i)
                makeMove(copy, letter, y)
                if isWinner(copy, letter):
                    checkMoves.append(i)
    return checkMoves

def getBoardCopy(board):
    # Make a duplicate of the board list and returns the duplicate.
    dupeBoard = []

    for i in board:
        dupeBoard.append(i)
    return dupeBoard

def isSpaceFree(board, move):
    # Return true if the passed move is free on the passed board.
    return board[move] == ' '

def getMove():
    move = input()
    try:
        move = int(move)
    except ValueError:
        pass
    return move

def getPlayerMove(board):
    # Let the player type in their move.
    print('What is your next move? (1-36)')
    move = getMove()
    while not isValidMove(board, move):
        print('What is your next move? (1-36)')
        move = getMove()

    return move

def isValidMove(board, move):
    if move in range(1, 37):
        return isSpaceFree(board, int(move))

    if move == 'undo':
        return True

    return False

def listBoxes():
    #generate a list of all the squares on the game board
    boxes = []
    # for squares with side lengths 1 - 6
    for dist in range(1,6):
        # start in the top left, moving right and downwards and enumerate them all
        for i,j in product(range(0,6-dist),range(0,6-dist)):
            corners = [1+i+j*6,1+i+dist+6*j,1+i+dist+(j+dist)*6,1+i+(j+dist)*6]
            boxes.append(corners)
    return boxes

def boardHeuristic(board, maxLetter, currentLetter):
    # This is a heuristic for how good/bad the board state is, where positive
    # infinity is a winning board for maxLetter, and negative infinity is a
    # winning board for the otherletter.

    # How many squares with 1,2,3 or 4 pieces of only one colour does each
    # player control?
    potentialSquares = [[0,0,0,0],[0,0,0,0]]

    for box in listBoxes():
        # Check for squares with only one kind of player in it

        Xs = sum([1 if board[i] == "X" else 0 for i in box])
        Os = sum([1 if board[i] == "O" else 0 for i in box])

        if Os!= 0 and Xs == 0:
            potentialSquares[1][Os-1] += 1
        elif Os== 0 and Xs != 0:
            potentialSquares[0][Xs-1] += 1

    # Here's a guestimate of what a board position is worth... this could be changed!
    XCumulative = 10*potentialSquares[0][2]*potentialSquares[0][2]+5*potentialSquares[0][1]+potentialSquares[0][0]
    OCumulative = 10*potentialSquares[1][2]*potentialSquares[0][2]+5*potentialSquares[1][1]+potentialSquares[1][0]

    # Just making sure that if there's a potential for the current player to win
    # that the heuristic says so...
    if maxLetter == 'X':
        if currentLetter == 'X':
            if potentialSquares[0][2] >= 1:
                return maxsize-1
        else:
            if potentialSquares[1][2] >=1:
                return -maxsize+1
        return XCumulative - OCumulative
    else:
        if currentLetter == 'X':
            if potentialSquares[0][2] >= 1:
                return -maxsize+1
        else:
            if potentialSquares[1][2] >=1:
                return maxsize-1
        return OCumulative - XCumulative

def getMinimaxedMove(board,computerLetter):
    # Uses the minimax function to determine computer's best move

    playerLetter = 'O' if computerLetter == 'X' else 'X'

    # start minimax recursion
    allMoves = []
    for i,space in enumerate(board):
        if space == ' ':
            allMoves.append(i)
    allMoves = set(allMoves)
    allMoves.remove(0)

    if len(allMoves) == 36:
        # If it's the first move, must use an edge piece
        allMoves = (1,2,3,4,5,6,7,12,13,18,19,24,25,30,31,32,33,34,35,36)

    bestScore = -maxsize
    bestMove = None

    # Alpha is the lower bound for maximising player (computerLetter)
    alpha = -maxsize
    # Beta is the upper bound for minimising player
    beta = maxsize

    for move in allMoves:
        tempMoves = set(allMoves)
        tempMoves.remove(move)
        tempBoard = list(board)
        tempBoard[move] = computerLetter
        if isWinner(tempBoard,computerLetter):
            return move
        # You can change the recursion depth here, makes it significantly slower though if you go
        # up... I think there's a bunch of optimization to be done here.
        score = minimaxRecursion(tempBoard, playerLetter, computerLetter, tempMoves, 3, alpha, beta)
        if score > bestScore:
            bestScore = score
            alpha = bestScore
            bestMove = move
        print(move,score)
    if bestMove == None:
        print( "Oh no!")
        bestMove = allMoves.pop()
    return bestMove

def minimaxRecursion(board, currentLetter, maxLetter, moves, depth, alpha, beta):
    # This is the recursive element of the minimax function - with alpha beta pruning!

    # Bookkeeping as to what the minLetter, and the oppositeLetter are
    minLetter = 'O' if maxLetter == 'X' else 'X'
    otherLetter = 'O' if currentLetter == 'X' else 'X'

    # Is the current player maximising or minimising?
    maximising = currentLetter == maxLetter

    if isWinner(board, maxLetter):
        return maxsize
    elif isWinner(board, minLetter):
        return -maxsize
    elif depth == 0:
        return boardHeuristic(board,maxLetter,currentLetter)
    else:
        bestScore = -maxsize if maximising else maxsize
        for move in moves:
            tempBoard = list(board)
            tempBoard[move] = currentLetter
            tempMoves = set(moves)
            tempMoves.remove(move)
            score = minimaxRecursion(tempBoard,otherLetter,maxLetter,tempMoves,depth-1,alpha,beta)

            # This was to simply put people out of their misery sooner rather than later
            # Otherwise it'll randomly play moves where it know it will win in the future
            # even if there's a good winning move on the board.
            if maximising:
                score -=1
                if score >= beta:
                    # minimising player will go down the worse branch for maxer
                    return beta
                if score > alpha:
                    # update the new
                    alpha = score
            else:
                score+=1
                if score <= alpha:
                    # maximising player will go down better branch
                    return alpha
                if score < beta:
                    beta = score

            if (maximising and bestScore < score )or (not maximising and bestScore > score):
                bestScore = score



        return bestScore



#game play code
print('Welcome to Lattice!')
while True:
    # Reset the board
    oldBoards = []
    theBoard = [' '] * 37
    playerLetter, computerLetter = inputPlayerLetter()
    turn = whoGoesFirst()
    print('The ' + turn + ' will go first.')
    gameIsPlaying = True

    i = 0
    while True:
        if turn == 'player':
            # Player's turn.
            drawBoard(theBoard)
            move = getPlayerMove(theBoard)

            if move == 'undo':
                theBoard = oldBoards.pop()
            else:
                if i == 0 and (move == 15 or move == 16 or move == 21 or move == 22 or move == 8 or move == 9 or move == 10 or move == 11
                               or move == 17 or move == 23 or move == 29 or move == 28 or move == 27 or move == 26 or move == 20 or move == 14):
                    turn = 'player'
                else:
                    oldBoards.append(list(theBoard))
                    makeMove(theBoard, playerLetter, move)
                    i = i+1
                    if isWinner(theBoard, playerLetter):
                        drawBoard(theBoard)
                        print('Hooray! You have won the game!')
                        break
                    elif i == 36:
                        print('The game is a tie')
                    else:
                        turn = 'computer'

        else:
            # Computer's turn.
            drawBoard(theBoard)
            #move = getComputerMove(theBoard, computerLetter)
            move = getMinimaxedMove(theBoard, computerLetter)
            print('The computer move is', move)
            options = getCheckMoves(theBoard, computerLetter)
            makeMove(theBoard, computerLetter, move)
            print(options)
            i = i+1
            if isWinner(theBoard, computerLetter):
                drawBoard(theBoard)
                print('The computer has beaten you! You lose.')
                break
            elif i == 36:
                print('The game is a tie')
            else:
                turn = 'player'

    drawBoard(theBoard)

    if playAgain():
        continue;
    else:
        break;

