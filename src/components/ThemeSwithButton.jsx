import React from 'react';
import { useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeSwithButton = () => {
  const [darkMode, setDarkMode] = useState(false);
  const changeMode = () => {
    const parentDiv = document.querySelector('#parentDiv');
    setDarkMode(!darkMode);
    !darkMode
      ? parentDiv.classList.add('dark')
      : parentDiv.classList.remove('dark');
  };
  return (
    <div
      className={` dark:bg-slate-800 bg-slate-200 rounded-b-xl cursor-pointer text-2xl p-2 select-none ${darkMode && 'dark'} `}
      onClick={changeMode}
    >
      {darkMode ? (
        <MdDarkMode className="dark:text-white p-0.5" />
      ) : (
        <MdLightMode className=" p-0.5" />
      )}
    </div>
  );
};

export default ThemeSwithButton;
