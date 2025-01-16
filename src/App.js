
import { useSelector } from 'react-redux';
import './css/App.css';
import PuzzleBoard from './nonogram/puzzleBoard';


function App() {
  const puzzle = useSelector(state => state.puzzle);
  const board = useSelector(state => state.board);
  const targets = useSelector(state => state.targets);

  console.log(targets);

  return (
    <div className="App">

      <PuzzleBoard puzzle={ board } />
      
    </div>
  );
}

export default App;
