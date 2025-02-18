


export const STORE_ACTIONS = {
    Paint_Tile: "puzzleGrid/tilePainted",
    Cross_Tile: "puzzleGrid/tileCrossed",

    Update_Targets: "puzzleGrid/targetsUpdated",
    Update_GameState: "puzzleGrid/stateUpdated",

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


export const actionUpdateTargets = (tile) => ({
    type: STORE_ACTIONS.Update_Targets,
    payload: { tile: tile }
});
export const actionUpdateGameState = (tile) => ({
    type: STORE_ACTIONS.Update_GameState,
    payload: {tile: tile }
});


export const actionTogglePaintMode = () => ({
    type: STORE_ACTIONS.Toggle_Paint_Mode,
    payload: {}
});


