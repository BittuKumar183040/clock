import React, { useEffect, useState } from 'react';
import useDocumentTitle from '../components/useDocumentTitle';
import AnalogClock from '../components/AnalogClock';

const timeZones = [
  'local',
  'UTC',
  'America/New_York',
  'Europe/London',
  'Asia/Kolkata',
  'Asia/Tokyo',
  'Australia/Sydney',
];

const DateTime = () => {
  useDocumentTitle('Date Time');

  const userLocalZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [selectedZone, setSelectedZone] = useState('local');
  const [displayTime, setDisplayTime] = useState({
    date: ['', ''],
    month: ['', ''],
    year: '',
    hour: '',
    min: '',
    sec: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const actualZone =
        selectedZone === 'local' ? userLocalZone : selectedZone;
      const now = new Date().toLocaleString('en-US', { timeZone: actualZone });
      const dateObj = new Date(now);
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      const monthString = monthNames[dateObj.getMonth()];
      const dayString = dayNames[dateObj.getDay()];

      setDisplayTime({
        date: [dateObj.getDate().toString().padStart(2, '0'), dayString],
        month: [
          (dateObj.getMonth() + 1).toString().padStart(2, '0'),
          monthString,
        ],
        year: dateObj.getFullYear(),
        hour: dateObj.getHours().toString().padStart(2, '0'),
        min: dateObj.getMinutes().toString().padStart(2, '0'),
        sec: dateObj.getSeconds().toString().padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedZone, userLocalZone]);

  const handleTimeZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  return (
    <div className=" flex flex-row gap-20 flex-wrap justify-center items-center h-dvh w-full dark:bg-gray-700">
      <AnalogClock time={displayTime} />
      <div>
        <div className="text-xl text-gray-600 dark:text-gray-400 flex gap-2 ">
          <p>Current Time Zone :</p>
          <p className="font-medium text-gray-800 dark:text-gray-300">
            {selectedZone === 'local'
              ? `${userLocalZone} (Local)`
              : selectedZone}
          </p>
        </div>
        <div className="font-abel flex relative justify-between items-center flex-col">
          <div className="font-mono text-3xl md:text-4xl text-gray-900 dark:text-gray-400 my-4">
            <p>
              {displayTime.date[0]}{' '}
              <span className="text-red-500">{displayTime.month[1]}</span>{' '}
              {displayTime.year}
            </p>
          </div>
          <div className=" select-none md:text-9xl dark:text-gray-300 text-7xl font-bold">
            {displayTime.hour}:{displayTime.min}:
            <span
              className="text-red-500"
              style={{ textShadow: '2px 2px 3px rgba(0,0,0,0.2)' }}
            >
              {displayTime.sec}
            </span>
            <p className=" select-none text-lg md:text-2xl text-right dark:text-gray-300 text-gray-500">
              HH:MM:SS
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor="timezone"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Change Time Zone:
          </label>
          <select
            id="timezone"
            value={selectedZone}
            onChange={handleTimeZoneChange}
            className="w-full border mb-24 border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeZones.map((zone) => (
              <option key={zone} value={zone}>
                {zone === 'local' ? `Local (${userLocalZone})` : zone}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DateTime;
