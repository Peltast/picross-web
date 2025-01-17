import { useDispatch } from "react-redux";
import { actionModifyTile } from "../state/actions";
import { TileStatus } from "./boardLogic";


export const PuzzleBoard = ({board}) => {

    return (
        <div className="puzzleGrid">
            { board.map(row =>

                <div className="gridRow">
                    { row.map(tile =>
                        <PuzzleTile tile={tile} />
                    )}
                </div>
            )}
        </div>
    );

}

const PuzzleTile = ({tile }) => {
    const dispatch = useDispatch();

    const paintTile = (tile) => {
        dispatch(actionModifyTile(tile.x, tile.y));
    };

    const tileKey = tile.x + "," + tile.y;
    const tileClass = (tile.status == TileStatus.EMPTY) ? "gridTile" : "gridTile filled";

    return (
        <div className={tileClass} key={tileKey} onClick={ () => paintTile(tile) }>
            { tileKey }
        </div>
    );
}



export default PuzzleBoard;
