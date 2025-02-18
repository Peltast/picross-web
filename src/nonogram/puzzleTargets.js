import { TileStatus } from "./boardLogic";


export const TargetHeader = ({targets, type}) => {
	
	const layoutCSS = (type === "column") ? "columnTargets" : "rowTargets";
	const cellCSS = (type === "column") ? "columnHeader" : "rowHeader";

	return (
		<div className={ layoutCSS }>
			{ targets.map(targetList =>

                <div className={ cellCSS }>

                    { targetList.map(target => {

                        const targetCSS = target.status > 0 ? "targetSuccess" : (target.status < 0 ? "targetFail" : "targetNeutral");

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
};


export const CompareBoardToTarget = (board, x, y, targets) => {
    const targetColumn = targets.columns[x];
    const targetRow = targets.rows[y];
    const boardColumn = CalculateColumnTargets(board, x);
    const boardRow = CalculateRowTargets(board[y]);

    const columnResult = CompareTargetSeries(boardColumn, targetColumn);
    const rowResult = CompareTargetSeries(boardRow, targetRow);

    return {
        column: columnResult,
        row: rowResult
    };
};
const CompareTargetSeries = (boardSeries, targetSeries) => {
    const seriesResult = [...targetSeries];
    const seriesOverload = (boardSeries.length > targetSeries.length);

    for (let i = 0; i < targetSeries.length; i++) {
        const seriesVal = targetSeries[i].number;

        if (seriesOverload) {
            seriesResult[i] = { number: seriesVal, status: -1 };
        }

        else if (i >= boardSeries.length) {
            seriesResult[i] = { number: seriesVal, status: 0 };
            continue;
        }

        else if (targetSeries[i].number === boardSeries[i].number) {
            seriesResult[i] = { number: seriesVal, status: 1 };
        }
        else if (boardSeries[i].number > 0) {
            seriesResult[i] = { number: seriesVal, status: -1 };
        }
        else {
            seriesResult[i] = { number: seriesVal, status: 0 };
        }
    }

    return seriesResult;
};

export const IsCoordinateCorrect = (board, x, y, targets) => {
    const boardColumn = CalculateColumnTargets(board, x);
    const boardRow = CalculateRowTargets(board[y]);
    const colResult = isSeriesEqual(boardColumn, targets.columns[x]);
    const rowResult = isSeriesEqual(boardRow, targets.rows[y]);
    
    return (colResult && rowResult);
}
const isSeriesEqual = (boardSeries, targetSeries) => {
    if (boardSeries.length !== targetSeries.length) { return false; }
    for (let i = 0; i < boardSeries.length; i++) {
        if (boardSeries[i].number !== targetSeries[i].number) { return false; }
    }
    return true;
}

export const CalculateBoardTargets = (board) => {
    const rows = [];
    const columns = [];

    board.forEach(row => {
        const rowTargets = CalculateRowTargets(row);
        rows.push(rowTargets);        
    });

    const boardLength = board[0].length;
    for (let x = 0; x < boardLength; x++) {
        const columnTargets = CalculateColumnTargets(board, x);
        columns.push(columnTargets);
    }

    return {
        rows: rows,
        columns: columns
    };
};

const CalculateColumnTargets = (board, x) => {
    const columnTargets = [];
    let currentStreak = 0;

    for (let y = 0; y < board.length; y++) {
        if (y === board.length - 1 && board[y][x].status === TileStatus.FILLED) {
            columnTargets.push(createTarget(currentStreak + 1));
            continue;
        }
        else if (board[y][x].status !== TileStatus.FILLED && currentStreak > 0) {
            columnTargets.push(createTarget(currentStreak));
            currentStreak = 0;
        }
        else if (board[y][x].status === TileStatus.FILLED) {
            currentStreak += 1;
        }
    }

    return columnTargets;
};

export const CalculateRowTargets = (row) => {
    const rowTargets = [];
    let currentStreak = 0;

    for (let x = 0; x < row.length; x++) {
        if (x === row.length - 1 && row[x].status === TileStatus.FILLED) {
            rowTargets.push(createTarget(currentStreak + 1));
            continue;
        }
        else if (row[x].status !== TileStatus.FILLED && currentStreak > 0) {
            rowTargets.push(createTarget(currentStreak));
            currentStreak = 0;
        }
        else if (row[x].status === TileStatus.FILLED) {
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
};


