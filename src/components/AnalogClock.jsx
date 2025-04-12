import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const AnalogClock = ({ time }) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const seconds = time.sec;
  const minutes = time.min;
  const hours = time.hour;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="flex items-center justify-center">
      <div className="relative md:w-96 md:h-96 w-64 h-64 rounded-full border-8 border-gray-300 bg-white dark:bg-gray-400 shadow-xl">
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full z-50 transform -translate-x-1/2 -translate-y-1/2" />
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-20 bg-black origin-bottom"
          style={{ translateX: '-50%', translateY: '-100%' }}
          animate={{ rotate: hourDeg }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-1.5 h-28 bg-gray-800 origin-bottom"
          style={{ translateX: '-50%', translateY: '-100%' }}
          animate={{ rotate: minuteDeg }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-32 bg-red-500 origin-bottom"
          style={{ translateX: '-50%', translateY: '-100%' }}
          animate={{ rotate: secondDeg }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;
