import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ totalCount, itemsPerPage, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  return (
    <Pagination>
      {Array.from({ length: pageCount }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

CustomPagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
