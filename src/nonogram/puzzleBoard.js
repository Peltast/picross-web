import { useDispatch } from "react-redux";
import { actionModifyTile } from "../state/actions";
import { TileStatus } from "../data/puzzleData";


export const PuzzleBoard = ({puzzle}) => {
    const dispatch = useDispatch();

    const gridSize = 5;
    // console.log(puzzle);

    const puzzleGrid = [];
    for (let y = 0; y < gridSize; y++) {
        const gridRow = [];
        for (let x = 0; x < gridSize; x++) {
            gridRow.push(new PuzzleTile(x, y, puzzle[y][x], false));
        }

        puzzleGrid.push(gridRow);
    }


    const toggleTile = (tile) => {
        dispatch(actionModifyTile(tile.x, tile.y, tile.getStatus() == TileStatus.EMPTY ? TileStatus.FILLED : TileStatus.EMPTY));
    };

    const renderTile = (tile) => {
        const tileKey = tile.getKey();
        const tileClass = (tile.getStatus() == TileStatus.EMPTY) ? "gridTile" : "gridTile filled";

        return (
            <div className={tileClass} key={tileKey} onClick={ () => toggleTile(tile) }>
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

    getStatus() { return this.status; }

}


export default PuzzleBoard;
