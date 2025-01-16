

export const DifficultyLevel = {
    "EASY": "Easy",
    "NORMAL": "Normal",
    "HARD": "Hard",
    "EXPERT": "Expert"
};


export const EmptyBoard = (boardSize) => {
    const newBoard = Array(boardSize).fill(Array(boardSize).fill(0));
    return newBoard;
}

export const TestPuzzle = {

    size: 5,
    difficulty: DifficultyLevel.EASY,

    // board: [
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0]
    // ],
    
    solution: [
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0]
    ],

};



