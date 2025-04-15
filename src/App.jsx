import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Stopwatch from './section/Stopwatch';
import DateTime from './section/DateTime';
import Counter from './section/Counter';
import { vibrate } from './components/function';

export const TimerContext = createContext();

const initialTime = { sec: 0, min: 0, hour: 0, count: 0 };

function App() {
  const [isStopwatchStarted, setIsStopwatchStarted] = useState(false);
  const [time, setTime] = useState(initialTime);

  const startStopwatch = () => {
    setIsStopwatchStarted(!isStopwatchStarted);
    vibrate([30]);
  };
  const resetStopwatch = () => {
    setTime(({ count }) => {
      return { sec: 0, min: 0, hour: 0, count: count };
    });
    setIsStopwatchStarted(false);
    vibrate([50]);
  };

  const increaseCount = () => {
    setTime(({ sec, min, hour, count }) => {
      return { sec, min, hour, count: count + 1 };
    });
    vibrate([30]);
  };
  const decreaseCount = () => {
    setTime(({ sec, min, hour, count }) => {
      if (count === 0) return { sec, min, hour, count };
      return { sec, min, hour, count: count - 1 };
    });
    vibrate([20]);
  };
  const resetCount = () => {
    setTime(({ sec, min, hour }) => {
      return { sec, min, hour, count: 0 };
    });
    vibrate([50]);
  };

  useEffect(() => {
    let interval;
    if (isStopwatchStarted) {
      interval = setInterval(() => {
        setTime(({ sec, min, hour, count }) => {
          if (sec === 59) {
            vibrate([20]);
            return { sec: 0, min: min + 1, hour, count };
          }
          if (min === 59) {
            vibrate([30]);
            return { sec: 0, min: 0, hour: hour + 1, count };
          }
          vibrate([10]);
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
            <Route path="/" element={<Stopwatch />} />
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
