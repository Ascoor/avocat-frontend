import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const ClientSearch = ({ searchResults }) => {
  if (!searchResults) {
    searchResults = []; // Assign an empty array if searchResults is undefined
  }
  const clients = searchResults || [];
  return (
    <Table striped bordered hover responsive>
      <thead className="table-success text-center">
        <tr>
          <th>#</th>
          <th>الاسم</th>
          <th>البريد الإلكتروني</th>
          <th>رقم الهاتف</th>
        </tr>
      </thead>

      {/* Table body */}
      <tbody>
        {clients.map((client, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
ClientSearch.propTypes = {
  searchResults: PropTypes.array.isRequired,
};
export default ClientSearch;
