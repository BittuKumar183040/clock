import { motion } from 'motion/react';

export default function AnimatedNumber({ countNumber }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className=" md:text-9xl text-7xl font-abel dark:text-white z-10"
      style={{ textShadow: 'none' }}
    >
      {countNumber}
    </motion.p>
  );
}
