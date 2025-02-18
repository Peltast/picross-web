
import { useSelector } from 'react-redux';
import './css/App.css';

import PuzzleBoard from './nonogram/puzzleBoard';
import { TargetHeader } from './nonogram/puzzleTargets';
import PaintSwitch from './nonogram/paintSwitch';
import { PuzzleState } from './data/puzzleData';


function App() {
	const puzzle = useSelector(state => state.puzzle);
	const board = useSelector(state => state.board);
	const targets = useSelector(state => state.targets);
	const paintMode = useSelector(state => state.paintMode);
	const gameState = useSelector(state => state.gameState);

	return (
		<div className="App">

			<PaintSwitch paintMode={paintMode} />

			<div className="puzzleContainer">

				{ gameState == PuzzleState.FINISHED &&
					"You won!!"
				}

				<TargetHeader targets={targets.rows} type="row" />
				<TargetHeader targets={targets.columns} type="column"  />

				<PuzzleBoard
					board={board}
					paintMode={paintMode}
					gameState={gameState}
				/>
				
			</div>

		</div>
	);
};


export default App;
