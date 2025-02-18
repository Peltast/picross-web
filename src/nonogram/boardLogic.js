
export const TileStatus = {
    "EMPTY": 0,
    "FILLED": 1,
    "CROSSED": 2
};


export const CreateEmptyBoard = (boardSize) => {
    const newBoard = [];

    for (let y = 0; y < boardSize; y++) {
        const gridRow = [];
        for (let x = 0; x < boardSize; x++) {
            gridRow.push({
                x: x,
                y: y,
                status: TileStatus.EMPTY
            });
        }

        newBoard.push(gridRow);
    }

    return newBoard;
};

export const CreateBoardFromData = (puzzleData) => {
    const newBoard = [];
    console.log(puzzleData);
    const puzzleTiles = puzzleData.tiles;
    const puzzleBoard = puzzleData.solution;

    for (let y = 0; y < puzzleBoard.length; y++) {
        const gridRow = [];
        for (let x = 0; x < puzzleBoard[y].length; x++) {
            gridRow.push({
                x: x,
                y: y,
                status: puzzleBoard[y][x]
            });
        }

        newBoard.push(gridRow);
    }

    return newBoard;
};
const LookUpTileData = (tileIndex, tileData) => {
    
}


export const CheckBoardVictory = (board, solutionBoard) => {

    for (let y = 0; y < solutionBoard.length; y++) {
        let solutionRow = solutionBoard[y];
        for (let x = 0; x < solutionRow.length; x++) {
            if (
                solutionRow[x].status === TileStatus.FILLED && board[y][x].status !== TileStatus.FILLED ||
                solutionRow[x].status === TileStatus.EMPTY && board[y][x].status === TileStatus.FILLED
            ) {
                return false;
            }
        }
    }

    return true;
}


export const PaintTileResultStatus = (tile) => {
    if (tile.status === TileStatus.EMPTY) {
        return TileStatus.FILLED;
    }
    else if (tile.status === TileStatus.FILLED) {
        return TileStatus.EMPTY;
    }
    else if (tile.status === TileStatus.CROSSED) {
        return TileStatus.EMPTY;
    }

    return TileStatus.EMPTY;
};
export const CrossTileResultStatus = (tile) => {
    if (tile.status === TileStatus.EMPTY) {
        return TileStatus.CROSSED;
    }
    else if (tile.status === TileStatus.CROSSED) {
        return TileStatus.EMPTY;
    }
    else if (tile.status === TileStatus.FILLED) {
        return TileStatus.FILLED;
    }

    return TileStatus.EMPTY;
}

