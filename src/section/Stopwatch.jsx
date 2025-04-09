import React, { useEffect, useState } from 'react';
import { PiPauseBold, PiPlayBold } from 'react-icons/pi';
import { motion } from 'motion/react';

const Stopwatch = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState({ sec: 0, min: 0, hour: 0 });

  const handleClick = () => {
    setIsStarted(!isStarted);
  }

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
  return <section>
    <div className='flex flex-col justify-center items-center h-dvh w-full dark:bg-gray-700 flex-wrap gap-24'>

      <div className=' h-56 w-56 flex justify-center items-center border-8 border-gray-800 dark:border-gray-200 bg-tranparent rounded-full'>
        <p className=' h-full w-full bg-gray-700 rounded-full scale-125 -z-10'></p>
      </div>

      <div className='flex flex-col gap-10'>
        <div>
          <div className='md:text-9xl dark:text-gray-300 text-7xl font-bold'>{formatTime(time.hour)}:{formatTime(time.min)}:{formatTime(time.sec)}</div>
          <div className='text-lg md:text-2xl text-right dark:text-gray-300 text-gray-500'>HH:MM:SS</div>
        </div>
        <div className=' flex justify-center'>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileHover={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleClick}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={` flex items-center justify-center cursor-pointer gap-4 ${isStarted ? "bg-gray-400" : "bg-red-300"} w-fit p-2 px-5 rounded-full shadow-lg`}
          >
            {isStarted
              ? <>
                <PiPauseBold size={20} className=' opacity-70' />
                <span className='text-xl opacity-70 '>Pause</span>
              </>
              : <>
                <PiPlayBold size={20} className=' opacity-70' />
                <span className='text-xl opacity-70 '>Start</span>
              </>
            }

          </motion.div>
        </div>
      </div>
    </div>
  </section>;
};

export default Stopwatch;
