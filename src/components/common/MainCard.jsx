import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

const useIconCardAnimation = () => {
  const [isInteracting, setIsInteracting] = useState(false);

  const animationStyles = useSpring({
    transform: isInteracting
      ? "scale(1.1) translateY(-10px)"
      : "scale(1) translateY(0)",
    boxShadow: isInteracting
      ? "0 20px 40px rgba(0, 0, 0, 0.3)"
      : "0 10px 30px rgba(0, 0, 0, 0.15)",
    backdropFilter: isInteracting ? "blur(15px)" : "blur(5px)",
    config: { mass: 1, tension: 350, friction: 25 },
  });

  return { animationStyles, setIsInteracting };
};

const MainCard = ({ count, icon, label, route }) => {
  const { animationStyles, setIsInteracting } = useIconCardAnimation();
  const navigate = useNavigate();

  return (
    <animated.div
      style={animationStyles}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
      onClick={() => navigate(route)} // ✅ الآن التنقل سيحدث عند النقر في أي مكان على البطاقة
      className="bg-white/30 cursor-pointer dark:bg-gray-800/40 backdrop-blur-lg rounded-full shadow-lg p-6 flex items-center justify-between w-full max-w-sm transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      {/* المعلومات النصية */}
      <div className="flex flex-col items-start ml-4">
        <div className="text-lg font-semibold text-gray-800 dark:text-yellow-400 tracking-wide mb-2">
          {label}
        </div>

        <div className="text-3xl font-extrabold text-indigo-600 dark:text-white tracking-tight">
          {count}
        </div>
      </div>

      {/* الأيقونة داخل دائرة مميزة */}
      <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 dark:bg-gradient-to-br dark:from-yellow-400 dark:via-orange-500 dark:to-red-500 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl">
        <img src={icon} alt={label} className="w-12 h-12 object-contain" />
      </div>
    </animated.div>
  );
};

export default MainCard;
