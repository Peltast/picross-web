


export const STORE_ACTIONS = {
    Paint_Tile: "puzzleGrid/tilePainted",
    Cross_Tile: "puzzleGrid/tileCrossed",

    Update_Targets: "puzzleGrid/targetsUpdated",

    Toggle_Paint_Mode: "puzzle/paintModeToggled"
};


export const actionPaintTile = (tile) => ({
    type: STORE_ACTIONS.Paint_Tile,
    payload: { tile: tile }
});
export const actionCrossTile = (tile) => ({
    type: STORE_ACTIONS.Cross_Tile,
    payload: { tile: tile}
});


export const actionUpdateTargets = (x, y) => ({
    type: STORE_ACTIONS.Update_Targets,
    payload: { x: x, y: y}
});


export const actionTogglePaintMode = () => ({
    type: STORE_ACTIONS.Toggle_Paint_Mode,
    payload: {}
});


