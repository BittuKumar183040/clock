import React, { useContext, useState } from 'react';
import { TimerContext } from '../App';
import { BiMinus, BiPlus, BiReset } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { motion, useDragControls } from 'motion/react';

const TimerMini = () => {
  const { time, increaseCount, decreaseCount, resetCount } =
    useContext(TimerContext);
  const controls = useDragControls();
  const [showMini, setShowMini] = useState(time !== 0 ? true : false);

  if (time.count === 0) {
    return null;
  }

  const handleReset = () => {
    resetCount();
  };

  const handleCloseBtn = () => {
    setShowMini(false);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragControls={controls}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ display: showMini ? 'flex' : ' none' }}
      className={`relative z-50 items-center gap-4 dark:bg-gray-800 dark:text-white bg-gray-200 w-fit p-2 rounded-md`}
    >
      <p className=" tracking-widest">
        {' '}
        {time.count < 10 ? `0${time.count}` : time.count}{' '}
      </p>
      <div className=" flex gap-1">
        <button
          onClick={decreaseCount}
          className={` flex items-center justify-center bg-slate-600 rounded-md`}
        >
          <BiMinus size={30} className="text-white p-1.5 opacity-70" />
        </button>
        <button
          onClick={increaseCount}
          className={` flex items-center w-20 justify-center bg-green-500 rounded-md`}
        >
          <BiPlus size={30} className=" text-white p-1.5 opacity-70" />
        </button>

        {!time > 0 && (
          <button
            title="Reset and Close"
            onClick={handleReset}
            className=" w-8 h-8 flex items-center justify-center bg-red-500 rounded-md text-white"
          >
            {' '}
            <BiReset size={20} className=" opacity-70" />
          </button>
        )}

        <button
          onClick={handleCloseBtn}
          className=" z-10 absolute -top-1 -right-1 border-2 flex items-center justify-center bg-gray-500 rounded-full text-white"
        >
          {' '}
          <IoClose size={15} className=" opacity-70" />
        </button>
      </div>
    </motion.div>
  );
};

export default TimerMini;
