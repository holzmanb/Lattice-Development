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
        letter = raw_input().upper()

    # the first element in the list is the player's letter, the second is the computer's letter.
    if letter == 'X':
        return ['X', 'O']
    else:
        return ['O', 'X']

def whoGoesFirst():
    # Player can choose if they go first
    print('Do you want to go first?')
    if raw_input() == 'y':
        return 'player'
    else:
        return 'computer'

def playAgain():
    # This function returns True if the player wants to play again, otherwise it returns False.
    print('Do you want to play again? (yes or no)')
    return raw_input().lower().startswith('y')

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
    move = raw_input()
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


def boardHeuristic(currentBoxes, otherBoxes, isMaximizing):
    # This is a heuristic for how good/bad the board state is, where positive
    # infinity is a winning board for maxLetter, and negative infinity is a
    # winning board for the otherletter.

    # How many squares with 1,2,3 or 4 pieces of only one colour does each
    # player control?
    # Here's a guestimate of what a board position is worth... this could be changed!

    return isMaximizing * (
      (10 * len(currentBoxes[3]) * len(currentBoxes[3]) + 5 * len(currentBoxes[2]) + len(currentBoxes[1])) -
      (10 * len(otherBoxes[3]) * len(otherBoxes[3]) + 5 * len(otherBoxes[2]) + len(otherBoxes[1]))
    )

    return isMax * (XCumulative - OCumulative)

def getAllMoves(board):
    allMoves = []
    for i,space in enumerate(board):
        if space == ' ':
            allMoves.append(i)
    allMoves = set(allMoves)
    allMoves.remove(0)
    return allMoves


def getScoreForMove(board, computerLetter, move):
    tempBoard = list(board)
    return minimaxRecursion(tempBoard, playerLetter, computerLetter, 4, -maxsize, maxsize)


def getMinimaxedMove(board,computerLetter):
    # Uses the minimax function to determine computer's best move

    playerLetter = 'O' if computerLetter == 'X' else 'X'

    # start minimax recursion
    allMoves = getAllMoves(board)

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
        score = minimaxRecursion(tempBoard, playerLetter, computerLetter, 4, alpha, beta)
        if score > bestScore:
            bestScore = score
            alpha = bestScore
            bestMove = move
        print(move,score)
    if bestMove == None:
        print( "Oh no!")
        bestMove = allMoves.pop()
    return bestMove

def minimaxRecursion(board, currentLetter, maxLetter, depth, alpha, beta):
    # This is the recursive element of the minimax function - with alpha beta pruning!

    # Bookkeeping as to what the minLetter, and the oppositeLetter are
    minLetter = 'O' if maxLetter == 'X' else 'X'
    otherLetter = 'O' if currentLetter == 'X' else 'X'

    # Is the current player maximising or minimising?
    maximising = currentLetter == maxLetter
    sign = 1 if maximising else -1

    currentBoxes = {1: [], 2:[], 3: [], 4: []}
    otherBoxes = {1: [], 2:[], 3: [], 4: []}


    for box in listBoxes():
        # Check for squares with only one kind of player in it

        currentLetterCount = sum([1 if board[i] == currentLetter else 0 for i in box])
        otherLetterCount = sum([1 if board[i] == otherLetter else 0 for i in box])

        if currentLetterCount != 0 and otherLetterCount == 0:
            currentBoxes[currentLetterCount].append(list(box))
        elif otherLetterCount != 0 and currentLetterCount == 0:
            otherBoxes[otherLetterCount].append(list(box))

    # Check if current won
    if len(currentBoxes[4]):
        return sign * maxsize

    # Check if other won
    if len(otherBoxes[4]):
        return -1 * sign * maxsize

    if len(currentBoxes[3]):
        return sign * maxsize

    if (len(otherBoxes[3])):
        moves = []
        for box in otherBoxes[3]:
            for point in box:
                if board[point] == ' ':
                    moves.append(point)
        return getBestScore(moves, board, currentLetter, maxLetter, depth, alpha, beta)


    allMoves = getAllMoves(board)
    possible_scores = []
    if (len(currentBoxes[2])):
        moves = []
        for box in currentBoxes[2]:
            for point in box:
                if board[point] == ' ':
                    moves.append(point)
                    if point in allMoves:
                        allMoves.remove(point)

        possible_scores.append(getBestScore(moves, board, currentLetter, maxLetter, depth - 1, alpha, beta))


    if depth <= 0:
        possible_scores.append(boardHeuristic(currentBoxes, otherBoxes, sign))
    else:
        possible_scores.append(getBestScore(allMoves, board, currentLetter, maxLetter, depth - 2, alpha, beta))


    if maximising:
        return max(possible_scores)
    else:
        return min(possible_scores)


def getBestScore(moves, board, nextLetter, maxLetter, recursionDepth, alpha, beta):
    otherLetter = 'O' if nextLetter == 'X' else 'X'
    maximising = nextLetter == maxLetter
    bestScore = -maxsize if maximising else maxsize
    for move in moves:
        tempBoard = list(board)
        tempBoard[move] = nextLetter
        score = minimaxRecursion(tempBoard, otherLetter, maxLetter, recursionDepth, alpha, beta)

        if maximising:
            if score >= beta:
                # minimising player will go down the worse branch for maxer
                return beta
            if score > alpha:
                # update the new
                alpha = score
        else:
            if score <= alpha:
                # maximising player will go down better branch
                return alpha
            if score < beta:
                beta = score

        if (maximising and bestScore < score) or (not maximising and bestScore > score):
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
                print('Undo?')
                response = raw_input()
                if response.lower().startswith('y') or response.lower().startswith('u'):
                    oldBoards.pop()
                    theBoard = oldBoards.pop()
                else:
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

