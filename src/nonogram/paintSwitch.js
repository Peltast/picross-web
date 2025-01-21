import { useDispatch } from "react-redux";
import { actionTogglePaintMode } from "../state/actions";


export const PaintSwitch = ({paintMode}) => {
	const dispatch = useDispatch();

	const togglePaintMode = () => {
		dispatch(actionTogglePaintMode());
	}

	let buttonCSS = "btn btn-primary paintButton ";
	buttonCSS += paintMode ? "fill" : "cross";

	const buttonTxt = paintMode ? "Paint" : "X";

	return (
		<div>
			<button type="button" className={buttonCSS} onClick={ () => togglePaintMode() } >
				{ buttonTxt }
			</button>
		</div>
	);
}


export default PaintSwitch;