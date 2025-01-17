
// FilterPanel.jsx
import { useState } from 'react';

const FilterPanel = ({ onFilter }) => {
  const [keyword, setKeyword] = useState('');

  const handleFilter = () => {
    if (keyword.trim() !== '') {
      onFilter(keyword); // Call the filter function when the keyword is valid
    }
  };

  return (
    <div className="mb-4 p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <input
        type="text"
        placeholder="ابحث عن حدث..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleFilter}
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        تصفية
      </button>
    </div>
  );
};

export default FilterPanel;
