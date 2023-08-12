import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const CustomPagination = ({ clientsPerPage, totalClients, paginate, currentPage }) => {
  const pageCount = Math.ceil(totalClients / clientsPerPage);

  return (
    <Pagination
      count={pageCount}
      page={currentPage}
      onChange={(event, value) => paginate(value)}
      renderItem={(item) => (
        <PaginationItem
          component="a"
          onClick={(e) => {
            e.preventDefault();
            paginate(item.page);
          }}
          {...item}
        />
      )}
    />
  );
};
