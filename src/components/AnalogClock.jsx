import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const AnalogClock = ({ time }) => {
  const [prevTime, setPrevTime] = useState({ sec: 0, min: 0, hour: 0 });
  const [angles, setAngles] = useState({
    secondDeg: 0,
    minuteDeg: 0,
    hourDeg: 0,
  });

  useEffect(() => {
    setAngles((prevAngles) => {
      const secDiff = (time.sec - prevTime.sec + 60) % 60;
      const minDiff = (time.min - prevTime.min + 60) % 60;
      const hourDiff = (time.hour - prevTime.hour + 12) % 12;

      const newSecondDeg = prevAngles.secondDeg + secDiff * 6;
      const newMinuteDeg = prevAngles.minuteDeg + minDiff * 6 + secDiff * 0.1;
      const newHourDeg = prevAngles.hourDeg + hourDiff * 30 + minDiff * 0.5;

      return {
        secondDeg: newSecondDeg,
        minuteDeg: newMinuteDeg,
        hourDeg: newHourDeg,
      };
    });

    setPrevTime(time);
  }, [time]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative md:w-96 md:h-96 w-64 h-64 rounded-full border-8 border-gray-300 bg-white dark:bg-gray-400 shadow-xl">
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full z-50 transform -translate-x-1/2 -translate-y-1/2" />

        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-20 bg-black origin-bottom rounded-lg"
          style={{ translateX: '-50%', translateY: '-100%' }}
          animate={{ rotate: angles.hourDeg }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-1.5 h-28 bg-gray-800 origin-bottom rounded-lg"
          style={{ translateX: '-50%', translateY: '-100%' }}
          animate={{ rotate: angles.minuteDeg }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-32 bg-red-500 origin-bottom rounded-lg"
          style={{ translateX: '-50%', translateY: '-100%' }}
          animate={{ rotate: angles.secondDeg }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;
