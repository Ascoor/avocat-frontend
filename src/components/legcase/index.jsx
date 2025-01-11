import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import API_CONFIG from '../../config';
import { CiEdit } from 'react-icons/ci';
import AddEditLegCase from './AddEditLegCase';
import SectionHeader from '../home_tools/SectionHeader';
import CustomPagination from '../home_tools/Pagination';
import { LegCaseIcon } from '../../assets/icons';

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
    fetchLegCases(); // Re-fetch cases to update the list
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
        `${API_CONFIG.baseURL}/api/legal-case-search?search=${searchQuery}`,
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
      fetchLegCases(); // Re-fetch cases after deletion
    } catch (error) {
      console.error('Error deleting legal case:', error);
    }
  };

  const paginatedLegCases = legCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
<>
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
      fetchLegCases={fetchLegCases}
    />
  )}
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="p-4 border-b">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="mb-3">
          <div className="flex items-center">
            <input
              className="border rounded-l-md p-2 w-full"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-gray-200 border rounded-r-md px-4 py-2"
              onClick={handleSearch}
            >
              بحث
            </button>
          </div>
        </div>
      </div>
      <div>
        {showAlert && (
          <div className={`alert alert-${alertVariant} mb-4`} role="alert">
            <div className="flex justify-between items-center">
              <span>{alertMessage}</span>
              <button onClick={() => setShowAlert(false)} className="close">
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="header-cell">رقم الملف</th>
            <th className="header-cell">الموكل</th>
            <th className="header-cell">صفة</th>
            <th className="header-cell">الموضوع</th>
            <th className="header-cell">نوع القضية</th>
            <th className="header-cell">المحكمة</th>
            <th className="header-cell">المحرر</th>
            <th className="header-cell">الحالة</th>
            <th className="header-cell">التحكم</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedLegCases.map((legCase, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEditCase(legCase)}
                >
                  <CiEdit className="inline-block mb-1" />
                  {legCase.slug}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {legCase.clients &&
                  legCase.clients.map((client, clientIndex) => (
                    <span key={clientIndex}>
                      {client.name}
                      {clientIndex < legCase.clients.length - 1 && ', '}
                    </span>
                  ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{legCase.client_capacity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{legCase.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{legCase.case_sub_type?.name || '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {legCase.courts &&
                  legCase.courts.map((court, courtIndex) => (
                    <span key={courtIndex}>
                      {court.name}
                      {courtIndex < legCase.courts.length - 1 && ', '}
                    </span>
                  ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {legCase.created_by && (
                  <span className="text-red-600">
                    تم تحرير البيانات بواسطة{' '}
                    <strong className="text-blue-600 text-xs">{legCase.created_by.name}</strong>
                  </span>
                )}
                <br />
                {legCase.updated_by && legCase.created_by && <span>, </span>}
                {legCase.updated_by && (
                  <span className="text-red-600">
                    تم تعديل البيانات بواسطة{' '}
                    <strong className="text-blue-600 text-xs">{legCase.updated_by.name}</strong>
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{legCase.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-end space-x-2">
                  <Link
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    to={`/legcases/show/${legCase.id}`}
                  >
                    عرض
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteLegCase(legCase.id)}
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
    <div className="p-4">
      <CustomPagination
        totalCount={legCases.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  </div>
</>
  );
};

export default LegalCasesIndex;
