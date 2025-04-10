import React, { useContext, useState } from 'react';
import { TimerContext } from '../App';
import { formatTime } from './function';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa6';
import { BiReset } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

const StopwatchMini = () => {
  const { time, isStopwatchStarted, startStopwatch, resetStopwatch } =
    useContext(TimerContext);

  const [showMini, setShowMini] = useState(isStopwatchStarted);

  if (time.sec === 0 && time.min === 0 && time.hour === 0) {
    return 0;
  }

  const handleReset = () => {
    resetStopwatch();
  };

  const handleCloseBtn = () => {
    setShowMini(false);
  };

  return (
    <div
      style={{ display: showMini ? 'flex' : ' none' }}
      className={`absolute left-1/2 top-2 -translate-x-1/2 items-center gap-4 dark:bg-gray-800 dark:text-white bg-gray-200 w-fit p-2 rounded-md`}
    >
      <p className=" tracking-widest">
        {formatTime(time.hour)}:{formatTime(time.min)}:{formatTime(time.sec)}
      </p>
      <div className=" flex gap-1">
        <button
          onClick={startStopwatch}
          className={` ${isStopwatchStarted ? ' w-[4.25rem] h-8' : ' w-8 h-8 '} flex items-center justify-center ${isStopwatchStarted ? 'bg-slate-600' : 'bg-green-500'} rounded-md`}
        >
          {isStopwatchStarted ? (
            <FaPause size={20} className=" text-white p-1 opacity-70" />
          ) : (
            <FaPlay size={20} className="text-white p-1 opacity-70" />
          )}
        </button>
        {!isStopwatchStarted && (
          <button
            title="Reset and Close"
            onClick={handleReset}
            className=" w-8 h-8 flex items-center justify-center bg-red-500 rounded-md text-white"
          >
            <BiReset size={20} className=" opacity-70" />
          </button>
        )}
        <button
          onClick={handleCloseBtn}
          className=" z-10 absolute -top-1 -right-1 border-2 flex items-center justify-center bg-gray-500 rounded-full text-white"
        >
          <IoClose size={15} className=" opacity-70" />
        </button>
      </div>
    </div>
  );
};

export default StopwatchMini;
