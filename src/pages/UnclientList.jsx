import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import API_CONFIG from '../config/config';
import CustomPagination from '../components/common/Pagination';
import SectionHeader from '../components/common/SectionHeader';
import AddEditUnclient from '../components/ClientsAndUnclients/unclients/AddEditUnclient';

function UnclientList() {
  const [unclients, setUnclients] = useState([]);
  const [selectedUnclient, setSelectedUnclient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch clients from API
  const fetchUnclients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/unclients`);
      setUnclients(response.data.unclients || []);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };

  useEffect(() => {
    fetchUnclients();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/unclients-search?search=${searchQuery}`
      );
      setUnclients(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching unclients:', error);
    }
  };

  const deleteUnclient = async (id) => {
    try {
      const response = await axios.delete(
        `${API_CONFIG.baseURL}/api/unclients/${id}`
      );
      fetchUnclients();
      setSuccessMessage(response.data.message || 'تم الحذف بنجاح');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting unclient:', error);
    }
  };

  const openAddEditModal = (unclient = null) => {
    setSelectedUnclient(unclient);
    setModalOpen(true);
  };

  const paginatedUnclients = unclients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <SectionHeader
        buttonName="إضافة عميل"
        listName="عملاء بدون وكالة"
        setShowAddModal={() => openAddEditModal()}
      />
      <AddEditUnclient
        unclient={selectedUnclient}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => fetchUnclients()}
      />

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded shadow">
          {successMessage}
        </div>
      )}

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="البحث عن العملاء غير الموكلين"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md w-1/2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          بحث
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="table-auto w-full text-right">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">رقم المكتب</th>
              <th className="px-4 py-2">اسم العميل</th>
              <th className="px-4 py-2">رقم القومى</th>
              <th className="px-4 py-2">النوع</th>
              <th className="px-4 py-2">رقم الهاتف</th>
              <th className="px-4 py-2">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUnclients.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  لا يوجد عملاء لعرضهم.
                </td>
              </tr>
            ) : (
              paginatedUnclients.map((unclient) => (
                <tr key={unclient.id} className="border-b">
                  <td className="px-4 py-2">{unclient.slug}</td>
                  <td className="px-4 py-2">{unclient.name}</td>
                  <td className="px-4 py-2">{unclient.identity_number}</td>
                  <td className="px-4 py-2">{unclient.gender}</td>
                  <td className="px-4 py-2">{unclient.phone_number}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => openAddEditModal(unclient)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiFillEdit size={20} />
                    </button>
                    <button
                      onClick={() => deleteUnclient(unclient.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <CustomPagination
          totalCount={unclients.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default UnclientList;
