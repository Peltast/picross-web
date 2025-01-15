

export const PuzzleBoard = () => {

    const gridSize = 5;

    const puzzleGrid = [];
    for (let y = 0; y < gridSize; y++) {
        const gridRow = [];
        for (let x = 0; x < gridSize; x++) {
            gridRow.push(new PuzzleTile(x, y, false, false));
        }

        puzzleGrid.push(gridRow);
    }

    const renderTile = (tile) => {
        const tileKey = tile.getKey();
        const tileClass = (tile.getIndex() % 2 == 0) ? "gridTile" : "gridTile filled";

        return (
            <div className={tileClass} key={tileKey}>
                { tile.getIndex() }
            </div>
        );
    }

    const renderTileRow =(row) => {
        return (
            <div className="gridRow">
                { row.map( tile => {
                    return (renderTile(tile));
                })}
            </div>
        );
    }

    return (
        <div className="puzzleGrid">
            { puzzleGrid.map( row => {
                return (
                    renderTileRow(row)
                );
            })}
        </div>
    );

}


class PuzzleTile {

    constructor(x, y, status, target) {
        this.x = x;
        this.y = y;
        this.status = status;
        this.target = target;
    }

    getKey() {
        return this.x + "," + this.y;
    }
    getIndex() { return (this.x + 1) + (5 * this.y); }

}


export default PuzzleBoard;
