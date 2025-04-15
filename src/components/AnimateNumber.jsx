import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedNumber({ countNumber }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 20, stiffness: 500 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, countNumber, {
      duration: 0.2,
      ease: 'easeInOut',
    });
    return controls.stop;
  }, [countNumber]);

  return (
    <motion.p
      className="text-7xl font-abel dark:text-white z-10"
      style={{ textShadow: 'none' }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {rounded}
    </motion.p>
  );
}
