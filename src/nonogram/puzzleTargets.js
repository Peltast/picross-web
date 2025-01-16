import { TileStatus } from "../data/puzzleData";



export const calculateBoardTargets = (board) => {
    const rows = [];
    const columns = [];

    board.forEach(row => {
        const rowTargets = calculateRowTargets(row);
        rows.push(rowTargets);        
    });

    const boardLength = board[0].length;
    for (let x = 0; x < boardLength; x++) {
        const columnTargets = calculateColumnTargets(board, x);
        columns.push(columnTargets);
    }

    return {
        rows: rows,
        columns: columns
    };
};

const calculateColumnTargets = (board, x) => {
    const columnTargets = [];
    let currentStreak = 0;

    for (let y = 0; y < board.length; y++) {
        if (y == board.length - 1 && board[y][x] == TileStatus.FILLED) {
            columnTargets.push(currentStreak + 1);
            continue;
        }

        else if (board[y][x] == TileStatus.EMPTY && currentStreak > 0) {
            columnTargets.push(currentStreak);
            currentStreak = 0;
        }
        else if (board[y][x] == TileStatus.FILLED) {
            currentStreak += 1;
        }
    }

    return columnTargets;
};

const calculateRowTargets = (row) => {
    const rowTargets = [];
    let currentStreak = 0;

    for (let x = 0; x < row.length; x++) {
        if (x == row.length - 1 && row[x] == TileStatus.FILLED) {
            rowTargets.push(currentStreak + 1);
            continue;
        }

        else if (row[x] == TileStatus.EMPTY && currentStreak > 0) {
            rowTargets.push(currentStreak);
            currentStreak = 0;
        }
        else if (row[x] == TileStatus.FILLED) {
            currentStreak += 1;
        }
        
    }

    return rowTargets;    
};

const calculateTargetForSeries = (array) => {
    const targets = [];
    const currentStreak = 0;

    for (let i = 0; i < array.length; i++) {

        if ((array[i] == TileStatus.EMPTY || i == array.length - 1) && currentStreak > 0) {
            targets.push(currentStreak);
            currentStreak = 0;
        }
        else if (array[i] == TileStatus.FILLED) {
            currentStreak += 1;

            if (i == array.length - 1) {
                targets.push(currentStreak);
            }
        }
    }

    return targets;
};


