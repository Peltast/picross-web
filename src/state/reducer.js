import { PuzzleState } from "../data/puzzleData";
import { LargeTestPuzzle, TestPuzzle } from "../data/testPuzzle";
import { CheckBoardVictory, CreateSolvedBoard, CreateEmptyBoard, CrossTileResultStatus, PaintTileResultStatus } from "../nonogram/boardLogic";
import { CalculateBoardTargets, CompareBoardToTarget, IsCoordinateCorrect } from "../nonogram/puzzleTargets";
import { STORE_ACTIONS } from "./actions";


const startPuzzle = TestPuzzle;

const initialState = {

    puzzle: startPuzzle,

    board: CreateEmptyBoard(startPuzzle),
    solution: CreateSolvedBoard(startPuzzle),
    targets: CalculateBoardTargets(CreateSolvedBoard(startPuzzle)),

    gameState: PuzzleState.IN_PROGRESS,
    paintMode: true
};

export const puzzleReducer = (state = initialState, action) => {
    // console.log(action.payload);
    let tile, updatedBoard;

    switch (action.type) {

        case STORE_ACTIONS.Paint_Tile:
            
            tile = action.payload.tile;
            const paintStatus = PaintTileResultStatus(tile);
            updatedBoard = getUpdatedBoard(state.board, tile.x, tile.y, paintStatus);

            return {
                ...state,
                board: updatedBoard
            };
        case STORE_ACTIONS.Cross_Tile:

            tile = action.payload.tile;
            const crossStatus = CrossTileResultStatus(tile);
            updatedBoard = getUpdatedBoard(state.board, tile.x, tile.y, crossStatus);

            return {
                ...state,
                board: updatedBoard
            };
        
        case STORE_ACTIONS.Update_Targets:
            tile = action.payload.tile;
            const calcTargets = getUpdatedTargets(state.targets, state.board, tile.x, tile.y);
            return {
                ...state,
                targets: calcTargets
            };

        case STORE_ACTIONS.Update_GameState:
            let updatedGameState = state.gameState;

            if (updatedGameState !== PuzzleState.FINISHED) {
                tile = action.payload.tile;
                const isTileCorrect = IsCoordinateCorrect(state.board, tile.x, tile.y, state.targets);
                if (isTileCorrect) {
                    const victoryResult = CheckBoardVictory(state.board, state.solution);
                    updatedGameState = victoryResult ? PuzzleState.FINISHED : PuzzleState.IN_PROGRESS;
                }
            }

            return {
                ...state,
                gameState: updatedGameState
            };

        case STORE_ACTIONS.Reset_Game:
            return {
                ...state,
                board: CreateEmptyBoard(state.puzzle),
                targets: CalculateBoardTargets(CreateSolvedBoard(state.puzzle)),
                gameState: PuzzleState.IN_PROGRESS
            };

        case STORE_ACTIONS.Toggle_Paint_Mode:
            return {
                ...state,
                paintMode: !state.paintMode
            }

        default:
            return state;
    }
};


const getUpdatedBoard = (board, x, y, newStatus) => {
    const newBoard = [...board];
    const updatedTile = { x: x, y: y, status: newStatus, color: board[y][x].color };
    
    const newBoardRow = [...board[y]];
    newBoardRow[x] = updatedTile
    newBoard[y] = newBoardRow;
    
    return newBoard;
};

const getUpdatedTargets = (oldTargets, board, x, y) => {
    const newRows = [...oldTargets.rows];
    const newColumns = [...oldTargets.columns];
    
    const newTargets = CompareBoardToTarget(board, x, y, oldTargets);
    newRows[y] = newTargets.row;
    newColumns[x] = newTargets.column;
    
    return {
        rows: newRows,
        columns: newColumns
    };
};