import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddEditLegCase from './AddEditLegCase';
import SectionHeader from '../home_tools/SectionHeader';
import CustomPagination from '../home_tools/Pagination';
import { LegCaseIcon } from '../../assets/icons';
import API_CONFIG from '../../config';

const LegalCasesIndex = () => {
  const [legCases, setLegCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLegCase, setEditingLegCase] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    fetchLegCases();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    if (successMessage) {
      setAlertMessage(successMessage);
      setAlertVariant('success');
      setShowAlert(true);
      setSuccessMessage('');
    }
    fetchLegCases();
  };

  const fetchLegCases = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/legal-cases`);
      setLegCases(response.data);
    } catch (error) {
      console.error('Error fetching leg cases:', error);
    }
  };

  const handleEditCase = (legCase) => {
    setEditingLegCase(legCase);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal-case-search?search=${searchQuery}`
      );
      setLegCases(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };

  const deleteLegCase = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/leg-cases/${id}`);
      fetchLegCases();
    } catch (error) {
      console.error('Error deleting legal case:', error);
    }
  };

  const paginatedLegCases = legCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <SectionHeader
        setShowAddModal={() => {
          setEditingLegCase(null);
          setIsEditing(false);
          setShowModal(true);
        }}
        listName="القضايا"
        buttonName="قضية جديدة"
        icon={LegCaseIcon}
      />

      {showModal && (
        <AddEditLegCase
          isEditing={isEditing}
          editingLegCase={editingLegCase}
          onClose={handleCloseModal}
        />
      )}

      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg p-2 w-1/3"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            بحث
          </button>
        </div>

        {showAlert && (
          <div
            className={`text-white px-4 py-2 rounded-lg mb-4 ${
              alertVariant === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {alertMessage}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">رقم الملف</th>
                <th className="border px-4 py-2">الموكل</th>
                <th className="border px-4 py-2">صفة</th>
                <th className="border px-4 py-2">الموضوع</th>
                <th className="border px-4 py-2">نوع القضية</th>
                <th className="border px-4 py-2">المحكمة</th>
                <th className="border px-4 py-2">المحرر</th>
                <th className="border px-4 py-2">الحالة</th>
                <th className="border px-4 py-2">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLegCases.map((legCase, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditCase(legCase)}
                      className="text-blue-500 hover:underline"
                    >
                      {legCase.slug}
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    {legCase.clients &&
                      legCase.clients
                        .map((client) => client.name)
                        .join(', ')}
                  </td>
                  <td className="border px-4 py-2">{legCase.client_capacity}</td>
                  <td className="border px-4 py-2">{legCase.title}</td>
                  <td className="border px-4 py-2">
                    {legCase.case_sub_type?.name || '-'}
                  </td>
                  <td className="border px-4 py-2">
                    {legCase.courts &&
                      legCase.courts.map((court) => court.name).join(', ')}
                  </td>
                  <td className="border px-4 py-2">
                    {legCase.created_by?.name}
                  </td>
                  <td className="border px-4 py-2">{legCase.status}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      <Link
                        to={`/legcases/show/${legCase.id}`}
                        className="bg-gray-500 text-white rounded px-3 py-1"
                      >
                        عرض
                      </Link>
                      <button
                        onClick={() => deleteLegCase(legCase.id)}
                        className="bg-red-500 text-white rounded px-3 py-1"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <CustomPagination
            totalCount={legCases.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default LegalCasesIndex;
