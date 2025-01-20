


export const STORE_ACTIONS = {
    Modify_Tile: "puzzleGrid/tileModified",

    Update_Targets: "puzzleGrid/targetsUpdated",
};


export const actionModifyTile = (x, y) => ({
    type: STORE_ACTIONS.Modify_Tile,
    payload: { x: x, y: y }
});


export const actionUpdateTargets = (x, y) => ({
    type: STORE_ACTIONS.Update_Targets,
    payload: { x: x, y: y}
});



