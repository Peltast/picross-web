
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

export const CreateBoardFromData = (data) => {
    const newBoard = [];
    
    for (let y = 0; y < data.length; y++) {
        const gridRow = [];
        for (let x = 0; x < data[y].length; x++) {
            gridRow.push({
                x: x,
                y: y,
                status: data[y][x]
            });
        }

        newBoard.push(gridRow);
    }

    return newBoard;
};


export const PaintTileResultStatus = (tile) => {
    if (tile.status == TileStatus.EMPTY) {
        return TileStatus.FILLED;
    }
    else if (tile.status == TileStatus.FILLED) {
        return TileStatus.EMPTY;
    }
    else if (tile.status == TileStatus.CROSSED) {
        return TileStatus.EMPTY;
    }
};
export const CrossTileResultStatus = (tile) => {
    if (tile.status == TileStatus.EMPTY) {
        return TileStatus.CROSSED;
    }
    else if (tile.status == TileStatus.CROSSED) {
        return TileStatus.EMPTY;
    }
}

