import React, { useContext } from 'react';
import { TimerContext } from '../App';
import { motion } from 'motion/react';
import { BiMinus, BiPlus, BiReset } from 'react-icons/bi';
import AnimatedNumber from '../components/AnimateNumber';

const Counter = () => {
  const { time, increaseCount, decreaseCount, resetCount } =
    useContext(TimerContext);
  return (
    <div className=" flex px-10 flex-row gap-20 flex-wrap justify-center items-center h-dvh w-full dark:bg-gray-700 select-none">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex items-center relative justify-center w-[244px] h-[244px] overflow-hidden border-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-xl "
      >
        <AnimatedNumber countNumber={time.count} />
        <div className="absolute -z-0 top-0 left-0 w-full flex flex-wrap flex-row-reverse items-center">
          {Array.from({ length: time.count }).map((_, i) => (
            <motion.div
              key={i}
              className="w-6 rounded-md"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.4,
                height: time.count > 299 ? '4px' : '8px',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                backgroundColor: `hsl(${(i * 360) / time.count}, 100%, 50%)`,
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex flex-col w-full max-w-96 gap-10 mb-20 bg-slate-100 shadow-md dark:bg-slate-800 p-2 rounded-lg z-50"
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={resetCount}
          className={`${time.count === 0 ? 'bg-gray-500' : 'bg-red-500 cursor-not-allowed'} flex items-center justify-center gap-7 text-white p-2 pl-0 rounded`}
        >
          <BiReset />
          <p>Reset</p>
        </motion.button>
        <div className=" flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={decreaseCount}
            className="bg-orange-500 w-1/4 flex items-center justify-center text-white p-4 rounded"
          >
            <BiMinus />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={increaseCount}
            className="bg-green-500 flex items-center gap-5 justify-center flex-1 text-white p-4 rounded"
          >
            <BiPlus />
            <p>Add</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Counter;
