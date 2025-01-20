import { FaArrowLeft } from 'react-icons/fa';

const SectionHeader = ({ listName, icon, showBackButton }) => {
  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-center bg-gradient-orange-dark dark:bg-gradient-blue-dark text-gray-800 dark:text-avocat-orange rounded-xl p-6 shadow-lg transition-all duration-300">
      {/* ✅ أيقونة كبيرة ومميزة في الجانب */}
      {icon && (
        <div className="absolute right-4 sm:left-6 top-1/2 transform -translate-y-1/2">
          <img
            src={icon}
            alt="Icon"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg"
          />
        </div>
      )}

      {/* ✅ العنوان في المنتصف */}
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide">
        {listName}
      </h2>

      {/* ✅ زر الرجوع في الجانب الأيمن */}
      {showBackButton && (
        <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            <FaArrowLeft className="text-lg" />
            <span className="font-medium">رجوع</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
