import { useState } from 'react';
import ThemeSwithButton from './ThemeSwithButton';
import { BiStopwatch } from 'react-icons/bi';
import { GoNumber } from 'react-icons/go';
import { MdOutlineAccessTime } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const menuItems = [
  {
    lable: 'Stop Watch',
    route: '/stopwatch',
    icon: <BiStopwatch size={25} />,
  },
  {
    lable: 'Date & Time',
    route: '/date-time',
    icon: <MdOutlineAccessTime size={25} />,
  },
  {
    lable: 'Counter',
    route: '/counter',
    icon: <GoNumber size={25} />,
  },
];

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname === '/' ? '/date-time' : location.pathname;
  const isValidPath = menuItems.some((item) => item.route === path);
  const [menu, setMenu] = useState(isValidPath ? path : '/date-time');
  const handleMenuClick = (path) => {
    navigate(path);
    setMenu(path);
  };

  return (
    <div className=" dark:text-white flex w-full bottom-0 items-center">
      <li className="flex justify-center w-96 flex-1 absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className=" grid grid-cols-3 gap-10 bg-slate-200 p-1 px-4 rounded-t-lg dark:bg-slate-800">
          {menuItems.map((item) => (
            <motion.div
              key={item.route}
              onTap={() => handleMenuClick(item.route)}
              initial={{ opacity: 0, translateY: -100, scale: 0 }}
              whileHover={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                skewX: menu == item.route ? 3 : 0,
                translateY: menu == item.route ? -10 : 0,
                boxShadow:
                  menu === item.route
                    ? '0px 10px 30px rgba(0, 0, 0, 0.1)'
                    : '0px 0px 0px rgba(0, 0, 0, 0)',
              }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={` select-none cursor-pointer p-2 flex gap-1 flex-col bg-slate-200 dark:bg-slate-800 items-center transition-all rounded-lg overflow-hidden`}
            >
              <span className="">{item.icon}</span>
              <p className=" text-xs">{item.lable}</p>
            </motion.div>
          ))}
        </div>
      </li>
      <div className=" absolute top-0 right-2">
        <ThemeSwithButton />
      </div>
    </div>
  );
};

export default NavBar;
