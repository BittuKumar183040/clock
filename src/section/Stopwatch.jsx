import React, { useEffect, useState, useRef, useMemo } from 'react';
import { PiPauseBold, PiPlayBold } from 'react-icons/pi';
import { BiReset } from 'react-icons/bi';
import useDocumentTitle from '../components/useDocumentTitle';
import { motion } from 'motion/react';

const GradientCircle = ({
  radius = 40,
  border = 75,
  strokeWidth = 10,
  color1,
  color2,
}) => {
  const size = 2 * (radius + strokeWidth);
  const center = size / 2;
  const r = radius;
  const circumference = 2 * Math.PI * r;
  const normalizedRadius = Math.min(border, 60) / 60;
  const strokeDashoffset = circumference * (1 - normalizedRadius);

  // Generate a unique ID for the gradient
  const gradientId = useMemo(
    () => `gradient-${Math.random().toString(36).substr(2, 9)}`,
    [],
  );

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="90%" stopColor={color2} />
        </linearGradient>
      </defs>

      <circle
        cx={center}
        cy={center}
        r={r}
        fill="transparent"
        stroke="#ddd"
        strokeWidth={strokeWidth}
        opacity={0.2}
      />

      <circle
        cx={center}
        cy={center}
        r={r}
        fill="transparent"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
};

const Clock = ({ time }) => {
  const clock = useRef(null);

  const createElementAroundRelative = ({
    parent,
    radius,
    angle,
    height = 25,
    width = 2,
    color = 'gray',
  }) => {
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.transformOrigin = 'center center';
    element.style.transform = `rotate(${angle}deg) translateY(-${radius}px)`;
    element.style.width = width + 'px';
    element.style.borderRadius = '50px';
    element.style.height = height + 'px';
    element.style.backgroundColor = color;
    parent.appendChild(element);
  };

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      createElementAroundRelative({
        parent: clock.current,
        radius: 100,
        angle: i * 90,
        color: 'orange',
      });
    }
    for (let i = 0; i < 60; i++) {
      let angle = i * 6;
      if (i % 15 !== 0) {
        if (i % 5 === 0) {
          createElementAroundRelative({
            parent: clock.current,
            radius: 100,
            angle: angle,
            height: 10,
            color: 'red',
          });
          continue;
        }
        createElementAroundRelative({
          parent: clock.current,
          radius: 100,
          angle: angle,
          height: 4,
          color: 'black',
        });
      }
    }
  }, []);

  return (
    <motion.div
      ref={clock}
      initial={{ scale: 0.5, opacity: 0, rotate: -90, y: -100 }}
      animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative flex justify-center items-center border-8 border-gray-200 outline outline-2 outline-gray-600 dark:outline-gray-100 bg-transparent rounded-full"
      style={{
        width: '200px',
        height: '200px',
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full w-full bg-gray-300 dark:bg-gray-900 rounded-full -z-10"
      ></motion.div>
      <div className="absolute w-full h-full left-0 top-0 scale-[132%] ">
        <GradientCircle
          radius={82}
          border={time.min}
          color1="red"
          color2="orange"
        />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <GradientCircle
          radius={84}
          border={time.sec}
          strokeWidth={3}
          color1="lightgreen"
          color2="teal"
        />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <GradientCircle
          radius={70}
          border={time.hour}
          strokeWidth={8}
          color1="pink"
          color2="lightblue"
        />
      </div>
    </motion.div>
  );
};

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
        <Clock time={time} />
        <div className="flex flex-col gap-10 ">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
          >
            {/* <div className="text-right tracking-widest text-gray-500 dark:text-gray-300 text-lg md:text-xl">1000</div> */}
            <div className=" select-none md:text-9xl dark:text-gray-300 text-7xl font-bold">
              {formatTime(time.hour)}:{formatTime(time.min)}:
              {formatTime(time.sec)}
            </div>
            <div className=" select-none text-lg md:text-2xl text-right dark:text-gray-300 text-gray-500">
              HH:MM:SS
            </div>
          </motion.div>
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
