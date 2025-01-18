import React, { useState, useEffect, useMemo } from 'react';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { useSpring, animated } from '@react-spring/web';
import API_CONFIG from '../../config/config';

const lightGradientStyles = rowIndex => {
  const colors = ['#f7e2e2', '#decdea', '#ecf3a5', '#96E9C6', '#e3ebf7'];
  const start = colors[rowIndex % colors.length];
  const end = colors[(rowIndex + 1) % colors.length];
  return `linear-gradient(135deg, ${start} 0%, ${end} 100%)`;
};

const hoverGradientStyle = 'linear-gradient(135deg, #a1c4fd 70%, ##86A8E7 40%)';

const AnimatedRow = ({
  row,
  rowIndex,
  onEdit,
  onDelete,
  headers,
  onView,
  customRenderers,
  hasEditPermission,
  hasDeletePermission,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const springProps = useSpring({
    background: isHovered ? hoverGradientStyle : lightGradientStyles(rowIndex),
    config: { duration: 300 },
  });

  return (
    <CSSTransition key={row.id} classNames='fade' timeout={300}>
      <animated.tr
        style={springProps}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='text-gray-700 dark:text-gray-900'
      >
        {onView && (
          <td className='px-4 py-2 text-center flex justify-center space-x-2'>
            <button
              onClick={() => onView(row.id)}
              className='text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none transition-colors duration-300'
            >
              <MdVisibility />
            </button>
          </td>
        )}
        {headers.map(header => (
          <td
            className='px-4 py-2 text-center text-sm md:text-base lg:text-lg'
            key={`${rowIndex}-${header.key}`}
          >
            {header.key === 'image' ? (
              row.image ? (
                <img
                  src={`${API_CONFIG.baseURL}${row.image}`}
                  className='rounded-full w-16 h-16 md:w-20 md:h-20 mx-auto border border-gray-300'
                  alt='Row image'
                />
              ) : (
                <div className='w-16 h-16 md:w-20 md:h-20 mx-auto bg-gray-600 rounded-full border border-gray-300 shadow-lg flex items-center justify-center relative z-10'>
                  <span className='text-sm md:text-lg text-gray-300'>N/A</span>
                </div>
              )
            ) : customRenderers && customRenderers[header.key] ? (
              customRenderers[header.key](row)
            ) : (
              row[header.key]
            )}
          </td>
        ))} 
          <td className='px-4 py-2 text-center'>
            <button
              onClick={() => onEdit(row.id)}
              className='text-violet-900 hover:text-violet-900 dark:text-violet-400 dark:hover:text-violet-300 focus:outline-none transition-colors duration-300'
            >
              <MdEdit className='text-violet-900 hover:text-violet-900 dark:text-violet-400 dark:hover:text-violet-300 ' />
            </button>
          </td>  
          <td className='px-4 py-2 text-center'>
            <button
              onClick={() => onDelete(row.id)}
              className='text-red-600 hover:text-red-800 focus:outline-none transition-colors duration-300'
            >
              <FaTrashAlt />
            </button>
          </td>
     
      </animated.tr>
    </CSSTransition>
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
  sectionName,
}) => { 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const filterData = () => {
      const lowercasedQuery = searchQuery.toLowerCase();

      const filtered = data.filter(item => {
        return headers.some(header => {
          const key = header.key;
          const value = item[key];

          if (header.render) {
            const renderedValue = header.render(item);
            return (
              renderedValue != null &&
              renderedValue.toString().toLowerCase().includes(lowercasedQuery)
            );
          }

          return (
            value != null &&
            value.toString().toLowerCase().includes(lowercasedQuery)
          );
        });
      });

      setFilteredData(filtered);
    };

    filterData();
  }, [searchQuery, data]);

  const isImageUrl = data => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(data);
  };
  const paginatedData = useMemo(() => {
    const firstIndex = (currentPage - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;
    return filteredData.slice(firstIndex, lastIndex);
  }, [currentPage, filteredData, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = newPage => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
 
 
 

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col md:flex-row items-center justify-between mb-4'>
 
          <div className='w-full md:w-auto'>{renderAddButton()}</div>
    
        <div className='w-full md:w-auto mt-4 md:mt-0'>
          <input
            type='text'
            placeholder='بحث...'
            className='w-full md:w-auto text-gray-700 border border-gray-300 focus:outline-none focus:ring focus:ring-violet-500 focus:border-violet-500 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-violet-500 dark:focus:border-violet-500 transition-all duration-300'
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='bg-indigo-500 text-gray-50 border-1 border-lg border-violet-600 font-medium'>
            <tr>
              {onView && (
                <th scope='col' className='px-4 py-2 text-center'>
                  View
                </th>
              )}
              {headers.map(header => (
                <th
                  scope='col'
                  className='px-4 py-2 text-center'
                  key={header.key}
                >
                  {header.text}
                </th>
              ))}
          
                <th scope='col' className='px-4 py-2 text-center'>
                  Edit
 
            </th>
                <th scope='col' className='px-4 py-2 text-center'>
                  Delete
                </th>
          
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-800 divide-y dark:divide-gray-700'>
            {paginatedData.map((row, rowIndex) => (
              <AnimatedRow
                key={row.id}
                row={row}
                rowIndex={rowIndex}
                headers={headers}
                onEdit={onEdit}
                onView={onView}
                customRenderers={customRenderers}
                onDelete={onDelete}  
                isImageUrl={isImageUrl}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center items-center mt-4'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-4 py-2 mx-2 border rounded text-violet-600 border-violet-600 hover:bg-violet-600 hover:text-white disabled:opacity-50'
        >
          Previous
        </button>
        <span className='text-sm text-gray-700 m-2'>
          {currentPage} to {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-4 py-2 mx-2 border rounded text-violet-500 border-violet-600 hover:bg-violet-600 hover:text-white disabled:opacity-70'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
