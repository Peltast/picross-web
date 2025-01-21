import { TestPuzzle } from "../data/testPuzzle";
import { CreateBoardFromData, CreateEmptyBoard, CrossTileResultStatus, PaintTileResultStatus } from "../nonogram/boardLogic";
import { CalculateBoardTargets, CompareBoardToTarget } from "../nonogram/puzzleTargets";
import { STORE_ACTIONS } from "./actions";



const initialState = {

    puzzle: TestPuzzle,

    board: CreateEmptyBoard(TestPuzzle.size),
    solution: CreateBoardFromData(TestPuzzle.solution),
    targets: CalculateBoardTargets(CreateBoardFromData(TestPuzzle.solution)),

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
            console.log(crossStatus);
            updatedBoard = getUpdatedBoard(state.board, tile.x, tile.y, crossStatus);

            return {
                ...state,
                board: updatedBoard
            };
        
        case STORE_ACTIONS.Update_Targets:
            const calcTargets = getUpdatedTargets(state.targets, state.board, action.payload.x, action.payload.y);
            return {
                ...state,
                targets: calcTargets
            };

        default:
            return state;
    }
};


const getUpdatedBoard = (board, x, y, newStatus) => {
    const newBoard = [...board];
    const updatedTile = { x: x, y: y, status: newStatus };
    
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