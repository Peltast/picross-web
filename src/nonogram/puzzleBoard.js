import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { actionCrossTile, actionPaintTile, actionUpdateGameState, actionUpdateTargets } from "../state/actions";
import { TileStatus } from "./boardLogic";
import { PuzzleState } from "../data/puzzleData";


export const PuzzleBoard = ({ board, paintMode, gameState }) => {

    return (
        <div className="puzzleGrid">
            { board.map(row =>

                <div className="gridRow">
                    { row.map(tile =>
                        <PuzzleTile
                            tile={tile}
                            paintMode={paintMode}
                            gameState={gameState}
                        />
                    )}
                </div>

            )}
        </div>
    );

};

const PuzzleTile = ({ tile, paintMode, gameState }) => {
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
        if (gameState === PuzzleState.FINISHED) { return; }
        
        if (paintMode) {
            dispatch(actionPaintTile(tile));
        }
        else {
            dispatch(actionCrossTile(tile));
        }

        dispatch(actionUpdateTargets(tile));
        dispatch(actionUpdateGameState(tile));
    };

    const crossTile = (tile) => {
        if (gameState === PuzzleState.FINISHED) { return; }

        dispatch(actionCrossTile(tile));
        dispatch(actionUpdateTargets(tile));
    };

    const getTileCSS = (status) => {
        if (gameState === PuzzleState.FINISHED) { return "gridTile"; }

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

    const tileStyling = (gameState === PuzzleState.FINISHED) ? { backgroundColor: tile.color } : {};

    return (
        <div
            className={tileClass}
            key={tileKey}
            onClick={ () => paintTile(tile) }
            onContextMenu={ () => crossTile(tile) }
            style={ tileStyling }
        >
            {  }
        </div>
    );
};



export default PuzzleBoard;
