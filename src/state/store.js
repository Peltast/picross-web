import { configureStore } from "@reduxjs/toolkit";
import { puzzleReducer } from "./reducer";

const PuzzleStore = configureStore({ reducer: puzzleReducer });

export default PuzzleStore;