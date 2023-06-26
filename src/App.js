import { useState } from 'react';
import './App.css';
import Tracker from './Javascript/Tracker';

function App() {
  const [page, setPage] = useState('tracker')
  return (
    <div className="App">
      {page==='tracker' && <Tracker setPage = {setPage}/>}
    </div>
  );
}

export default App;
