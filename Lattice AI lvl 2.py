#Lattice

import random

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
    # Returns a list with the player’s letter as the first item, and the computer's letter as the second.
    letter = ''
    while not (letter == 'X' or letter == 'O'):
        print('Do you want to be X or O?')
        letter = input().upper()

    # the first element in the list is the player’s letter, the second is the computer's letter.
    if letter == 'X':
        return ['X', 'O']
    else:
        return ['O', 'X']

def whoGoesFirst():
# Randomly choose the player who goes first.
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
    # Given a board and a player’s letter, this function returns True if that player has won.
    # We use bo instead of board and le instead of letter so we don’t have to type as much.
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

def getWinMoves(board, letter):
    winMoves = []
    for i in range(1, 37):
        copy = getBoardCopy(board)
        if isSpaceFree(copy, i):
            makeMove(copy, letter, i)
            if isWinner(copy, letter):
                winMoves.append(i)
    return winMoves
                
def getCheckMoves(board, letter):
    #Returns a list of moves that give check
    checkMoves = []
    winMoves = getWinMoves(board, letter)
    options = [x for x in range(1, 37) if x not in winMoves]
    for i in options:
        for y in range(1, 37):
            copy = getBoardCopy(board)
            if isSpaceFree(copy, i) and isSpaceFree(copy, y):
                makeMove(copy, letter, i)
                makeMove(copy, letter, y)
                if isWinner(copy, letter):
                    checkMoves.append(i)
    return checkMoves
    
def getBoardCopy(board):
    # Make a duplicate of the board list and return it the duplicate.
    dupeBoard = []

    for i in board:
        dupeBoard.append(i)
    return dupeBoard

def isSpaceFree(board, move):
    # Return true if the passed move is free on the passed board.
    return board[move] == ' '

def getPlayerMove(board):
    # Let the player type in their move.
    move = ' '
    while move not in '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36'.split() or not isSpaceFree(board, int(move)):
        print('What is your next move? (1-36)')
        move = input()
    return int(move)

def getComputerMove(board, computerLetter):
    # Given a board and the computer's letter, determine where to move and return that move.
    if computerLetter == 'X':
        playerLetter = 'O'
    else:
        playerLetter = 'X'

    # Here is our algorithm for the Lattice AI:
    # First, check if we can win in the next move
    for i in range(1, 37):  # It was not catching 36 as a winning move..
        copy = getBoardCopy(board)
        if isSpaceFree(copy, i):
            makeMove(copy, computerLetter, i)
            if isWinner(copy, computerLetter):
                return i

    # Check if the player could win on their next move, and block them
    for i in range(1, 37): # It was not catching 36 as a winning move..
        copy = getBoardCopy(board)
        if isSpaceFree(copy, i):
            makeMove(copy, playerLetter, i)
            if isWinner(copy, playerLetter):
                return i

    #Try to give check
    checkMoves = getCheckMoves(board, computerLetter)
    for x in checkMoves:
        if checkMoves.count(x) > 1:
            move = x
            print('Check moves:', checkMoves)
            return move
    
    for x in checkMoves:
        copy = getBoardCopy(board)
        makeMove(copy, computerLetter, x) 
        setupMoves = getCheckMoves(copy, computerLetter)       
        for y in setupMoves:
            if setupMoves.count(y) > 2:
                move = x
                print('check moves:', checkMoves)
                print('Setup moves:', setupMoves)               
                return move
    
    if checkMoves != ([]):
        move = random.choice(checkMoves)
        print('check moves:', checkMoves)
        return move
                    
    #Try to block check
    checkMoves = getCheckMoves(theBoard, playerLetter)
    print('Block moves:', checkMoves)
    threat = []
    for x in checkMoves:
        copy = getBoardCopy(board)
        makeMove(copy, playerLetter, x)
        blockMoves = getCheckMoves(copy, playerLetter)
        risk = len(blockMoves)
        threat.append(risk)
        maxThreat = max(threat)
        print('Threat:', threat)
    for x in checkMoves:
        copy = getBoardCopy(board)
        makeMove(copy, playerLetter, x)
        blockMoves = getCheckMoves(copy, playerLetter)
        risk = len(blockMoves)        
        if risk == maxThreat:
            return x

    if checkMoves != ([]):
        move = random.choice(checkMoves)
        return move
          
    # Try to take one of the center spots if they are free and it is not turn 1. Program will retest given moves, therefore given double iterations of possible moves.
    copy = getBoardCopy(board)
    if copy != [' '] * 37:
        t = 0
        while t < 8:
            move = random.choice ([15, 16, 21, 22])
            if isSpaceFree(copy, move):
                return move
            else:
                t = t + 1
    
    # Try to take the 2nd tier, if it is free. Program will retest given moves, therefore given double iterations of possible moves.
    if copy != [' '] * 37:
        i = 0
        while i < 24:
            copy = getBoardCopy(board)
            move = random.choice ([8, 9, 10, 11, 17, 23, 29, 28, 27, 26, 20, 14])
            if isSpaceFree(copy, move):
                return move
            else:
                i = i + 1
            
    # Move on the side. Program will retest given moves, therefore given double iterations of possible moves.
    i = 0
    while i < 40:
        copy = getBoardCopy(board)
        move = random.choice ([1, 2, 3, 4, 5, 6, 12, 18, 24, 30, 36, 35, 34, 33, 32, 31, 25, 19, 13, 7])
        if isSpaceFree(copy, move):
            return move
        else:
            i = i + 1
            
print('Welcome to Lattice!')

while True:
    # Reset the board
    theBoard = [' '] * 37
    playerLetter, computerLetter = inputPlayerLetter()
    turn = whoGoesFirst()
    print('The ' + turn + ' will go first.')
    gameIsPlaying = True

    i = 0
    while i<36:
        if turn == 'player':
            # Player’s turn.
            drawBoard(theBoard)
            move = getPlayerMove(theBoard)
            if i == 0 and (move == 15 or move == 16 or move == 21 or move == 22):
                turn = 'player'
            else:
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
            # Computer’s turn.
            drawBoard(theBoard)
            move = getComputerMove(theBoard, computerLetter)
            print('The computer move is', move)
            makeMove(theBoard, computerLetter, move)
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
    playAgain()
 
