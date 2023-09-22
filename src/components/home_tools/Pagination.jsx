import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({
  totalCount,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const maxPagesToShow = 6;

  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

  const handleNext = () => {
    if (currentPage < pageCount) {
      onPageChange(Math.min(currentPage + 1, pageCount));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(Math.max(currentPage - 1, 1));
    }
  };

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <Pagination>
      <Pagination.Prev onClick={handlePrevious} />
      {pages.map(page => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={handleNext} />
    </Pagination>
  );
};

CustomPagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
