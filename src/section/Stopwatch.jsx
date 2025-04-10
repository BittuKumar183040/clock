import React, { useEffect, useState } from 'react';
import { PiPauseBold, PiPlayBold } from 'react-icons/pi';
import { motion } from 'motion/react';
import { BiReset } from 'react-icons/bi';
import useDocumentTitle from '../components/useDocumentTitle';

const initialTime = { sec: 0, min: 0, hour: 0 };
const Stopwatch = () => {
  useDocumentTitle('Stopwatch');
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [isReset, setIsReset] = useState(false);

  const handleClick = () => {
    setIsStarted(!isStarted);
  };

  useEffect(() => {
    let interval;
    if (isStarted) {
      interval = setInterval(() => {
        setTime(({ sec, min, hour }) => {
          if (sec === 59) {
            return { sec: 0, min: min + 1, hour };
          }
          if (min === 59) {
            return { sec: 0, min: 0, hour: hour + 1 };
          }
          return { sec: sec + 1, min, hour };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStarted]);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };
  return (
    <section>
      <div className="flex flex-col justify-center items-center h-dvh w-full dark:bg-gray-700 flex-wrap gap-24">
        <div
          className={`flex justify-center items-center border-8 border-gray-800 dark:border-gray-200 bg-transparent rounded-full`}
          style={{
            width: '200px',
            height: '200px',
          }}
        >
          <p className=" h-full w-full bg-gray-700 rounded-full scale-125 -z-10"></p>
          <img
            src="./logo.svg"
            alt="logo"
            className="h-full opacity-20 scale-125 bg-transparent"
          />
        </div>

        <div className="flex flex-col gap-10 ">
          <div>
            <div className="md:text-9xl dark:text-gray-300 text-7xl font-bold">
              {formatTime(time.hour)}:{formatTime(time.min)}:
              {formatTime(time.sec)}
            </div>
            <div className="text-lg md:text-2xl text-right dark:text-gray-300 text-gray-500">
              HH:MM:SS
            </div>
          </div>
          <div className=" flex justify-center items-center gap-4 relative mb-20">
            {!isStarted && (
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                whileHover={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}
                animate={{ opacity: 1, x: -110 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="bg-red-700 select-none text-white cursor-pointer absolute z-10 flex items-center justify-center gap-4 w-fit p-3 px-7 rounded-full shadow-lg"
                onClick={() => {
                  setIsReset(!isReset);
                  setTime(initialTime);
                }}
              >
                <BiReset size={20} />
                {/* <p className='text-xl opacity-70'>Reset</p> */}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileHover={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleClick}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className={` flex items-center select-none justify-center cursor-pointer gap-4 ${isStarted ? 'bg-gray-600 text-green-200' : 'bg-green-600 text-white'} w-fit p-2 px-5 rounded-full shadow-lg`}
            >
              {isStarted ? (
                <>
                  <PiPauseBold size={20} className=" opacity-70" />
                  <span className="text-xl opacity-70 ">Pause</span>
                </>
              ) : (
                <>
                  <PiPlayBold size={20} className=" opacity-70" />
                  <span className="text-xl opacity-70 ">Start</span>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stopwatch;
