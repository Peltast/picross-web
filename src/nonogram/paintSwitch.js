import { useDispatch } from "react-redux";
import { actionResetGame, actionTogglePaintMode } from "../state/actions";
import { PuzzleState } from "../data/puzzleData";


export const PaintSwitch = ({ paintMode, gameState }) => {
	const dispatch = useDispatch();

	const togglePaintMode = () => {
		if (gameState === PuzzleState.FINISHED) {
			dispatch(actionResetGame());
		}
		else {
			dispatch(actionTogglePaintMode());
		}
	}

	let buttonCSS = "btn btn-primary paintButton ";
	let buttonTxt = "";

	if (gameState === PuzzleState.FINISHED) {
		buttonCSS += "reset";
		buttonTxt = "Reset";
	}
	else {
		buttonCSS += paintMode ? "fill" : "cross";
		buttonTxt = paintMode ? "Paint" : "X";
	}


	return (
		<div>
			<button type="button" className={buttonCSS} onClick={ () => togglePaintMode() } >
				{ buttonTxt }
			</button>
		</div>
	);
}


export default PaintSwitch;