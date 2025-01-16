import { EmptyBoard, TestPuzzle } from "../data/testPuzzle";
import { calculateBoardTargets } from "../nonogram/puzzleTargets";
import { STORE_ACTIONS } from "./actions";



const initialState = {

    puzzle: TestPuzzle,
    board: EmptyBoard(TestPuzzle.size),
    targets: calculateBoardTargets(TestPuzzle.solution),
    
};

export const puzzleReducer = (state = initialState, action) => {
    switch (action.type) {

        case STORE_ACTIONS.Modify_Tile:
            const updatedBoard = getUpdatedBoard(state.board, action.payload.x, action.payload.y, action.payload.newStatus);
            return {
                ...state,
                board: [...updatedBoard]
            };

        default:
            return state;
    }
};



const getUpdatedBoard = (board, x, y, newStatus) => {
    const newBoard = [...board];
    const newBoardRow = [...newBoard[y]];
    
    newBoardRow[x] = newStatus;
    newBoard[y] = newBoardRow;
    
    return newBoard;
}

