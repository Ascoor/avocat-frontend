import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const DashboardSearch = ({
  onSearch,
  loading,
  error,
  filteredClients,
  paginate,
  currentPage,
  indexOfLastClient,
  handleClearSearch, 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false); // Track search status
  const [showResults, setShowResults] = useState(false); // To show/hide search results
  const [selectedClient, setSelectedClient] = useState(null); // Store selected client
  const [clientLegCases, setClientLegCases] = useState([]); // Store selected client's leg cases
  const [clientServices, setClientServices] = useState([]); // Store selected client's services
  const [topResults, setTopResults] = useState([]); // Store top 5 closest search results

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setIsSearching(true); // Set search status to true
    setShowResults(true); // Show results
    onSearch(searchTerm); // Send search term to parent component

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const result = filteredClients.filter((client) => {
      return client.name.toLowerCase().includes(normalizedSearchTerm) || client.slug.includes(normalizedSearchTerm);
    });

    // Get top 5 results
    const closestResults = result.slice(0, 5);
    setTopResults(closestResults); // Store top 5 closest results
  };

  const handleClear = () => {
    setSearchTerm(''); // Clear search term
    handleClearSearch(); // Reset search in parent component
    setIsSearching(false); // Reset search status
    setShowResults(false); // Hide results
    setSelectedClient(null); // Reset selected client
    setTopResults([]); // Reset top results
  };

  const handleClientClick = (clientId) => {
    // Find the selected client from the filtered list
    const client = filteredClients.find((client) => client.id === clientId);
    setSelectedClient(client);
    setShowResults(false); // Hide other search results when a client is clicked

    // Fetch the related leg cases and services for this client
    setClientLegCases(client.leg_cases); // Already included in the data
    setClientServices(client.services); // Display services if available
  };

  useEffect(() => {
    if (searchTerm === '') {
      setIsSearching(false); // If search term is empty, stop searching
      setShowResults(false); // Hide results
      setTopResults([]); // Reset top results
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg mb-6">
      <div className="flex w-full items-center">
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-avocat-blue-light text-white rounded-r-full focus:outline-none"
        >
          بحث
        </button>
        <input
          type="text"
          placeholder="بحث  بالإسم  , رقم التيلفون , رقم الموكل"
          value={searchTerm}
          onChange={handleChange}
          className="w-full p-2 rounded-l-full text-center bg-gray-200 dark:bg-gray-700 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-avocat-blue-light"
        />
      </div>

      {/* Show loading or error */}
      {loading && <p>جاري تحميل الموكلين...</p>}
      {error && <p>خطأ: {error}</p>}

      {/* Show filtered clients in a table */}
      {showResults && isSearching && topResults.length > 0 && (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md mt-4">
          <table className="min-w-full table-auto bg-white dark:bg-gray-900 rounded-lg shadow-base overflow-hidden">
            <thead>
              <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white">
                <th className="px-2 py-2 text-center w-1/6">رقم الموكل</th>
                <th className="px-2 py-2 text-center w-1/6">الاسم</th>
                <th className="px-2 py-2 text-center w-1/6">رقم الجوال</th>
                <th className="px-2 py-2 text-center w-1/6">رقم القومي</th>
                <th className="px-2 py-2 text-center w-1/6">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {topResults.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => handleClientClick(client.id)} // Handle client row click
                  className="border-b text-gray-600 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                  <td className="px-2 py-2 text-center">{client.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{client.name}</td>
                  <td className="px-2 py-2 text-center">{client.phone_number}</td>
                  <td className="px-2 py-2 text-center">{client.identity_number}</td>
                  <td onClick={() => handleToggleStatus(client.id)} className="px-2 py-2 text-center">
                    {client.status === 'active' ? (
                      <span className="text-green-600">نشط</span>
                    ) : (
                      <span className="text-red-600">غير نشط</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedClient && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Leg Cases</h3>
          <table className="min-w-full table-auto bg-white dark:bg-gray-900 rounded-lg shadow-md mt-4">
            <thead>
              <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white">
                <th className="px-2 py-2 text-center">رقم الملف</th>
                <th className="px-2 py-2 text-center">الموضوع</th>
                <th className="px-2 py-2 text-center">نوع القضية</th> 
                <th className="px-2 py-2 text-center">صفة الموكل</th> 
                <th className="px-2 py-2 text-center">حالة القضية</th>
              </tr>
            </thead>
            <tbody>
              {clientLegCases.map((caseItem) => (
                <tr key={caseItem.id} className="border-b text-gray-600 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <td className="px-2 py-2 text-center">{caseItem.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{caseItem.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{caseItem.case_type?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{caseItem.client_capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{caseItem.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mt-4">Services</h3>
          <table className="min-w-full table-auto bg-white dark:bg-gray-900 rounded-lg shadow-md mt-4">
            <thead>
              <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white">
                <th className="px-2 py-2 text-center">رقم الملف</th>
                <th className="px-2 py-2 text-center">نوع الخدمة</th>
                <th className="px-2 py-2 text-center">الجهة</th>
              </tr>
            </thead>
            <tbody>
              {clientServices.length > 0 ? (
                clientServices.map((service) => (
                  <tr key={service.id} className="border-b text-gray-600 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                    <td className="px-2 py-2 text-center">{service.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{service.service_type?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{service.service_place_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No services available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {showResults && isSearching && filteredClients.length > 10 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="bg-gray-300 text-black px-4 py-2 rounded-md mx-2 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            السابق
          </button>
          <span className="flex items-center text-lg">صفحة {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="bg-gray-300 text-black px-4 py-2 rounded-md mx-2 disabled:opacity-50"
            disabled={indexOfLastClient >= filteredClients.length}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardSearch;
