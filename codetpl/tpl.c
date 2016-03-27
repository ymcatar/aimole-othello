#include <stdio.h>

/* write your compute function
 * it takes in the 8 * 8 board, your disc and your opponents' disc
 * return your next move by changing the value of row and col
 */
void compute(char board[8][8] , char me, char opponent, int* row, int* col) {
    // only valid for the first move, give this AI more capability!
    if(me == 'W') {
        *row = 2;
        *col = 3;
    } else {
        *row = 4;
        *col = 5;
    }
    return;
}

int main() {
    char me, opponent;
    int x, y;
    char board[8][8];
    int row, col;

    while (1) {
        // read my disc symbol and opponent's disc symbol
        scanf("%c %c", &me, &opponent);
        // read game board
        for (x = 0; x < 8; x++)
            for (y = 0; y < 8; y++)
                scanf("%c", &board[x][y]);

        // compute my move
        compute(board, me, opponent, &row, &col);
        // output my move
        printf("%d %d\n", row, col);
    }

    return 0;
}
