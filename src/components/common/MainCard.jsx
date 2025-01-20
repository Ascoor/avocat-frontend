import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

// ✅ هوك للرسوم المتحركة الخاصة بالبطاقة
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

// ✅ مكون البطاقة الرئيسية
const MainCard = ({ count, icon, label }) => {
  const { animationStyles, setIsInteracting } = useIconCardAnimation();

  return (
    <animated.div
      style={animationStyles}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
      className="bg-gradient-to-b from-indigo-700 to-pink-500  dark:bg-gradient-to-t dark:from-avocat-blue-dark dark:to-avocat-indigo rounded-full shadow-lg p-6 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      {/* ✅ أيقونة داخل دائرة متدرجة اللون */}
      <div
        className="mb-4 w-24 h-24 flex items-center justify-center 
        bg-gradient-day 
        dark:bg-gradient-to-t dark:from-orange-500 dark:to-orange-600 rounded-full shadow-md"
      >
        <img src={icon} alt={label} className="w-21 h-21 object-contain" />
      </div>

      {/* ✅ العنوان */}
      <div className="text-2xl font-semibold text-white dark:text-gray-100 font-['Cairo'] mb-2">
        {label}
      </div>

      {/* ✅ العداد */}
      <div className="text-lg font-extrabold text-indigo-300 dark:text-orange-400">
        {count}
      </div>
    </animated.div>
  );
};

export default MainCard;
