import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Stopwatch from './section/Stopwatch';
import DateTime from './section/DateTime';
import Counter from './section/Counter';

export const TimerContext = createContext();

const initialTime = { sec: 0, min: 0, hour: 0, count: 0 };

function App() {
  const [isStopwatchStarted, setIsStopwatchStarted] = useState(false);
  const [time, setTime] = useState(initialTime);

  const startStopwatch = () => {
    setIsStopwatchStarted(!isStopwatchStarted);
  };
  const resetStopwatch = () => {
    setTime(initialTime);
    setIsStopwatchStarted(false);
  };

  const increaseCount = () => {
    setTime(({ sec, min, hour, count }) => {
      return { sec, min, hour, count: count + 1 };
    });
  };
  const decreaseCount = () => {
    setTime(({ sec, min, hour, count }) => {
      if (count === 0) return { sec, min, hour, count };
      return { sec, min, hour, count: count - 1 };
    });
  };
  const resetCount = () => {
    setTime(({ sec, min, hour, count }) => {
      return { sec, min, hour, count: count * 0 };
    });
  };

  useEffect(() => {
    let interval;
    if (isStopwatchStarted) {
      interval = setInterval(() => {
        setTime(({ sec, min, hour, count }) => {
          if (sec === 59) {
            return { sec: 0, min: min + 1, hour, count };
          }
          if (min === 59) {
            return { sec: 0, min: 0, hour: hour + 1, count };
          }
          return { sec: sec + 1, min, hour, count };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStopwatchStarted]);

  return (
    <div id="parentDiv">
      <TimerContext.Provider
        value={{
          time,
          isStopwatchStarted,
          startStopwatch,
          resetStopwatch,
          increaseCount,
          decreaseCount,
          resetCount,
        }}
      >
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
      </TimerContext.Provider>
    </div>
  );
}

export default App;
