
import PropTypes from "prop-types"; // Import PropTypes

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const CustomPagination = ({ totalCount, itemsPerPage, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={(event, value) => onPageChange(value)}
      renderItem={(item) => (
        <PaginationItem
          component="a"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(item.page);
          }}
          {...item}
        />
      )}
    />
  );
};

// Define prop types
CustomPagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
