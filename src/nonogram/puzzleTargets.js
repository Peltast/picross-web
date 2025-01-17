import { TileStatus } from "./boardLogic";


export const TargetHeader = ({targets, type}) => {
	
	const layoutCSS = (type == "column") ? "columnTargets" : "rowTargets";
	const cellCSS = (type == "column") ? "columnHeader" : "rowHeader";

	return (
		<div className={ layoutCSS }>
			{ targets.map(targetList =>

                <div className={ cellCSS }>

                    { targetList.map(target => {

                        const targetCSS = target.status > 1 ? "targetSuccess" : (target.status < 0 ? "targetFail" : "targetNeutral");

                        return (
                            <span className={targetCSS}>
                                {target.number}
                            </span>);
                        }
                    )}

                </div>
			)}
		</div>
	);
}


export const calculateBoardTargets = (board) => {
    const rows = [];
    const columns = [];

    board.forEach(row => {
        const rowTargets = calculateRowTargets(row);
        rows.push(rowTargets);        
    });

    const boardLength = board[0].length;
    for (let x = 0; x < boardLength; x++) {
        const columnTargets = calculateColumnTargets(board, x);
        columns.push(columnTargets);
    }

    return {
        rows: rows,
        columns: columns
    };
};

const calculateColumnTargets = (board, x) => {
    const columnTargets = [];
    let currentStreak = 0;

    for (let y = 0; y < board.length; y++) {

        if (y == board.length - 1 && board[y][x] == TileStatus.FILLED) {
            columnTargets.push(createTarget(currentStreak + 1));
            continue;
        }
        else if (board[y][x] == TileStatus.EMPTY && currentStreak > 0) {
            columnTargets.push(createTarget(currentStreak));
            currentStreak = 0;
        }
        else if (board[y][x] == TileStatus.FILLED) {
            currentStreak += 1;
        }
    }

    return columnTargets;
};

const calculateRowTargets = (row) => {
    const rowTargets = [];
    let currentStreak = 0;

    for (let x = 0; x < row.length; x++) {

        if (x == row.length - 1 && row[x] == TileStatus.FILLED) {
            rowTargets.push(createTarget(currentStreak + 1));
            continue;
        }
        else if (row[x] == TileStatus.EMPTY && currentStreak > 0) {
            rowTargets.push(createTarget(currentStreak));
            currentStreak = 0;
        }
        else if (row[x] == TileStatus.FILLED) {
            currentStreak += 1;
        }
        
    }

    return rowTargets;    
};

const createTarget = (number) => {
    return {
        number: number,
        status: 0
    };
}


