export default {
    message: `
# Othello
You are going to create an AI for the game Othello. Othello is a board game which involves two players.
Two players take turns in adding their own type of discs. The game ends when both players cannot add any more discs onto the board. The player who has the most discs on the board wins the game.

### Rules
The game is played on a 8 x 8 game board.
In our setting, the coordinate of the top left cell is (0, 0).

There will be two players, black player and white player.
Each player has some discs of their colour.

Two player take turns to move. White player move first.
In each move, a player place a disc on the board so that at least one opponent's disc is flipped. He has to give up his turn if there are no valid cell to place his disc.

The game ends when no one can make a move.
The score of a player is the number of his discs of on the board.
The player with the highest score wins the game.

Initially, four discs are placed on the board as follows
\`\`\`
........
........
........
...BW...
...WB...
........
........
........
\`\`\`
where \`B\` means a black disc, \`W\` means a white disc and \`.\` means empty cell.

### Task
You are going to implement an AI program to play this game. In each turn, if you can place a disc, your program will be asked for a move. Your program will receive information about the game board. Then your program should print the coordinate of the cell to place a disc.

### Time limit
1000ms per turn

### Input
For each turn, there will be 9 lines of input.
The first line is either "B W" or "W B".
If it is "B W" then you are the black player and the opponent is the white player.
If it is "W B" then you are the white player and the opponent is the black player.

The next 8 lines describe the game board.
Each line is a string of 8 characters.
Each character is either \`B\` which means a black disc, or \`W\` which means a white disc, or \`.\` which means an empty cell.


### Output
For each turn, output two space serperated integers x, y to specify the coordinate of your next move.

### Sample input
\`\`\`
B W
........
........
........
...BW...
...WWW..
....WB..
........
........
\`\`\`
### Sample output
5 3

### Note
In this example, the player is the black player. The game board is
\`\`\`
........
........
........
...BW...
...WWW..
....WB..
........
........
\`\`\`
He can place a disc in one of the following cells, (3, 5) or (5, 3).
He decides to put a disc in cell (5, 3).
The gameboard will become
\`\`\`
........
........
........
...BW...
...BWW..
...BBB..
........
........
\`\`\`

Happy coding. :D
`
};
