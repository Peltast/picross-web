import { TileStatus } from "../nonogram/boardLogic";
import { DifficultyLevel } from "./puzzleData";


export const TestPuzzle = {

    size: 5,
    difficulty: DifficultyLevel.EASY,
    
    tiles: {
        1: { color: "#ff0000", status: TileStatus.FILLED },
        0: { color: "#ffffff", status: TileStatus.EMPTY }
    },

    solution: [
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0]
    ],

};

export const LargeTestPuzzle = {

    size: 10,
    difficulty: DifficultyLevel.EASY,
    
    tiles: {
        1: { color: "#ff0000", status: TileStatus.FILLED },
        0: { color: "#ffffff", status: TileStatus.EMPTY }
    },

    solution: [
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 1, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],

};



