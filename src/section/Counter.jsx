import React, { useContext } from 'react';
import { TimerContext } from '../App';
import { motion } from 'motion/react';

const Counter = () => {
  const { time, increaseCount, decreaseCount, resetCount } =
    useContext(TimerContext);
  return (
    <div>
      <p>Counter</p>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex relative md:w-96 md:h-96 w-64 h-64 rounded-full border-8 border-gray-300 bg-white dark:bg-gray-400 shadow-xl "
      >
        <p>{time.count}</p>
      </motion.div>
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
