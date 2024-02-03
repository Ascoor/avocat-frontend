import { useState } from 'react';

const ClientAccounttIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submission for searching
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform the search using the 'searchQuery' state
    // You can add your search logic here
  };

  // Handle "Add Invoice" button click
  const handleAddInvoiceClick = () => {
    // Implement logic to add a new invoice
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search Invoices or Clients..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <button className="add-invoice-button" onClick={handleAddInvoiceClick}>
        Add Invoice
      </button>
    </div>
  );
};

export default ClientAccounttIndex;
