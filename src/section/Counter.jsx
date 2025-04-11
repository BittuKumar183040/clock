import React, { useContext } from 'react';
import { TimerContext } from '../App';

const Counter = () => {
  const { time, increaseCount, decreaseCount, resetCount } = useContext(TimerContext);
  return (
    <div>
      <p>Counter</p>
      {time.count}
      <div className="flex gap-2">
        <button
          onClick={increaseCount}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          +
        </button>
        <button
          onClick={decreaseCount}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          -
        </button>
        <button
          onClick={resetCount}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
