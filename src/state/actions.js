
export const STORE_ACTIONS = {
    Modify_Tile: "puzzleGrid/tileModified"
};


export const actionModifyTile = (x, y, newStatus) => ({
    type: STORE_ACTIONS.Modify_Tile,
    payload: { x: x, y: y, newStatus: newStatus }
});

