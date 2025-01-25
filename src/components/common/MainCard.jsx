import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const useIconCardAnimation = () => {
  const [isInteracting, setIsInteracting] = useState(false);

  const animationStyles = useSpring({
    transform: isInteracting
      ? 'scale(1.1) translateY(-8px)'
      : 'scale(1) translateY(0)',
    boxShadow: isInteracting
      ? '0 20px 40px rgba(0, 0, 0, 0.3)'
      : '0 10px 30px rgba(0, 0, 0, 0.1)',
    config: { mass: 1, tension: 280, friction: 20 },
  });

  return { animationStyles, setIsInteracting };
};

const MainCard = ({ count, icon, label }) => {
  const { animationStyles, setIsInteracting } = useIconCardAnimation();

  return (
    <animated.div
      style={animationStyles}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
      className="bg-gray-100 dark:bg-gradient-to-b dark:from-avocat-blue-dark dark:via-avocat-indigo-dark dark:to-avocat-orange-dark rounded-lg shadow-lg p-5 flex items-center justify-between w-full max-w-xs"
    >



      <div className="flex flex-col items-start ml-4">

        <div className="text-lg font-semibold text-avocat-blue-dark dark:text-avocat-orange  font-['Cairo']">
          {label}
        </div>

        <div className="text-xl font-extrabold text-avocat-indigo dark:text-white">
          {count}
        </div>

      </div>
      <div className="w-16 h-16 flex items-center justify-center bg-avocat-orange-dark dark:bg-gradient-to-t dark:from-avocat-blue dark:to-avocat-orange-darker rounded-full shadow-md">
        <img src={icon} alt={label} className="w-10 h-10 object-contain" />
      </div>
    </animated.div>
  );
};

export default MainCard;