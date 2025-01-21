import { useDispatch } from "react-redux";

import { actionCrossTile, actionPaintTile, actionUpdateTargets } from "../state/actions";
import { TileStatus } from "./boardLogic";
import { useEffect } from "react";


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

};

const PuzzleTile = ({ tile }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleContextMenu = e => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextMenu);
        }
    }, []);
    

    const paintTile = (tile) => {
        dispatch(actionPaintTile(tile));
        dispatch(actionUpdateTargets(tile.x, tile.y));
    };

    const crossTile = (tile) => {
        dispatch(actionCrossTile(tile));
        dispatch(actionUpdateTargets(tile.x, tile.y));
    };

    const getTileCSS = (status) => {
        switch (status) {
            case TileStatus.EMPTY:
                return "gridTile";
            case TileStatus.FILLED:
                return "gridTile filled";
            case TileStatus.CROSSED:
                return "gridTile crossedOff";
            default:
                return "gridTile";
        }
    };

    const tileKey = tile.x + "," + tile.y;
    const tileClass = getTileCSS(tile.status);

    return (
        <div
            className={tileClass}
            key={tileKey}
            onClick={ () => paintTile(tile) }
            onContextMenu={ () => crossTile(tile) }
        >
            {  }
        </div>
    );
};



export default PuzzleBoard;
