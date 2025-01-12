import { FaArrowLeft, FaPlus } from 'react-icons/fa';

const SectionHeader = ({
  buttonName,
  listName,
  setShowAddModal,
  icon,
  showBackButton,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-orange-400 to-orange-600 dark:from-blue-800 dark:to-blue-900 rounded-lg p-4 shadow-md transition-all duration-300">
      
      {/* ✅ أيقونة العنوان */}
      <div className="flex items-center space-x-3 space-x-reverse">
        {icon && (
          <img
            src={icon}
            alt="Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        )}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
     {listName}
        </h2>
      </div>

      {/* ✅ الأزرار */}
      <div className="flex items-center space-x-2 space-x-reverse mt-4 sm:mt-0">
        {showBackButton && (
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg shadow transition duration-300"
          >
            <FaArrowLeft />
            <span>رجوع</span>
          </button>
        )}

        {buttonName && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition duration-300"
          >
            <FaPlus />
            <span>إضافة {buttonName}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
