import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import API_CONFIG from '../../config/config';

const lightGradientStyles = (rowIndex) => {
  const colors = ['#f7e2e2', '#decdea', '#ecf3a5', '#96E9C6', '#e3ebf7'];
  return `linear-gradient(135deg, ${colors[rowIndex % colors.length]} 0%, ${colors[(rowIndex + 1) % colors.length]} 100%)`;
};

const hoverGradientStyle = 'linear-gradient(135deg, #a1c4fd 70%, #86A8E7 40%)';

const AnimatedRow = ({
  row,
  rowIndex,
  onEdit,
  onDelete,
  headers,
  onView,
  customRenderers,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const springProps = useSpring({
    background: isHovered ? hoverGradientStyle : lightGradientStyles(rowIndex),
    config: { duration: 300 },
  });

  return (
    <animated.tr
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-gray-700 dark:text-black "
    >
      {onView && (
        <td className="px-4 py-2 text-center">
          <button
            onClick={() => onView(row.id)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          >
            <MdVisibility />
          </button>
        </td>
      )}
      {headers.map((header) => (
        <td
          key={`${rowIndex}-${header.key}`}
          className="px-4 py-2 text-center text-sm md:text-base lg:text-lg"
        >
          {header.key === 'image' ? (
            row.image ? (
              <img
                src={`${API_CONFIG.baseURL}${row.image}`}
                className="rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto shadow"
                alt="Row image"
              />
            ) : (
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center text-gray-300">
                N/A
              </div>
            )
          ) : customRenderers && customRenderers[header.key] ? (
            customRenderers[header.key](row)
          ) : (
            row[header.key]
          )}
        </td>
      ))}
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => onEdit(row.id)}
          className="text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors duration-300"
        >
          <MdEdit />
        </button>
      </td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => onDelete(row.id)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-300"
        >
          <FaTrashAlt />
        </button>
      </td>
    </animated.tr>
  );
};

const TableComponent = ({
  data,
  headers,
  customRenderers,
  onDelete,
  onEdit,
  onView,
  renderAddButton,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filterData = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = data.filter((item) =>
        headers.some((header) => {
          const value = item[header.key];
          return (
            value && value.toString().toLowerCase().includes(lowercasedQuery)
          );
        }),
      );
      setFilteredData(filtered);
    };
    filterData();
  }, [searchQuery, data, headers]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredData, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        {renderAddButton && <div>{renderAddButton()}</div>}
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2 w-full md:w-64 focus:ring focus:ring-violet-400 dark:bg-gray-700 dark:text-gray-300"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {filteredData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="bg-violet-600 text-white">
              <tr>
                {onView && <th className="px-4 py-2 text-center">View</th>}
                {headers.map((header) => (
                  <th key={header.key} className="px-4 py-2 text-center">
                    {header.text}
                  </th>
                ))}
                <th className="px-4 py-2 text-center">Edit</th>
                <th className="px-4 py-2 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <AnimatedRow
                  key={row.id}
                  row={row}
                  rowIndex={index}
                  headers={headers}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                  customRenderers={customRenderers}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No data available.</p>
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-violet-500 hover:text-white"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-violet-500 hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
