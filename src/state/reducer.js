import { TestPuzzle } from "../data/testPuzzle";
import { CreateEmptyBoard, PaintTileStatus, PuzzleTile, TileStatus } from "../nonogram/boardLogic";
import { calculateBoardTargets } from "../nonogram/puzzleTargets";
import { STORE_ACTIONS } from "./actions";



const initialState = {

    puzzle: TestPuzzle,
    board: CreateEmptyBoard(TestPuzzle.size),
    targets: calculateBoardTargets(TestPuzzle.solution),

};

export const puzzleReducer = (state = initialState, action) => {
    // console.log(action.payload);

    switch (action.type) {

        case STORE_ACTIONS.Modify_Tile:
            const updatedBoard = getUpdatedBoard(state.board, action.payload.x, action.payload.y);
            return {
                ...state,
                board: [...updatedBoard]
            };

        default:
            return state;
    }
};



const getUpdatedBoard = (board, x, y) => {
    const newBoard = [...board];
    const updatedTile = { x: x, y: y, status: PaintTileStatus(newBoard[y][x]) };
    
    const newBoardRow = [...board[y]];
    newBoardRow[x] = updatedTile
    newBoard[y] = newBoardRow;
    
    return newBoard;
}

