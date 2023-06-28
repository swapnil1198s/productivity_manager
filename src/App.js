import { useState } from 'react';
import './App.css';
import Tracker from './Javascript/Tracker';
import Foot from './Javascript/Foot';

function App() {
  const [page, setPage] = useState('tracker')
  return (
    <div className="App">
      {page==='tracker' && <Tracker setPage = {setPage}/>}
      <Foot/>
    </div>
  );
}

export default App;
