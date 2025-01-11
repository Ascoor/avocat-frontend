const ClientSearch = ({ searchResults }) => {
  if (!searchResults) {
    searchResults = []; // Assign an empty array if searchResults is undefined
  }
  const clients = searchResults || [];
  return (
    <table className="table table-striped table-bordered table-hover table-responsive">
      {' '}
      <thead>
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
    </table>
  );
};
export default ClientSearch;
