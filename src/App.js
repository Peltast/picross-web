
import { useSelector } from 'react-redux';
import './css/App.css';

import PuzzleBoard from './nonogram/puzzleBoard';
import { TargetHeader } from './nonogram/puzzleTargets';


function App() {
	const puzzle = useSelector(state => state.puzzle);
	const board = useSelector(state => state.board);
	const targets = useSelector(state => state.targets);

	// console.log(targets);

	return (
		<div className="App">

			<div className="puzzleContainer">

				<TargetHeader targets={targets.rows} type="row" />
				<TargetHeader targets={targets.columns} type="column"  />

				<PuzzleBoard board={board}/>
				
			</div>

		</div>
	);
}



export default App;
