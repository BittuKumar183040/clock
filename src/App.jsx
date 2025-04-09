import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Stopwatch from './section/Stopwatch';
import DateTime from './section/DateTime';
import Counter from './section/Counter';

function App() {
  return (
    <div id="parentDiv">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<DateTime />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/date-time" element={<DateTime />} />
          <Route path="*" element={<Navigate to={'/date-time'} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
