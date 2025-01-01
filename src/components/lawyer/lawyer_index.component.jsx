import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LawyerIcon } from '../../assets/icons';
import LawyerAddEdit from './lawyerAddEdit';
import API_CONFIG from '../../config';
import SectionHeader from '../home_tools/SectionHeader';

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
      setLawyers(response.data);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    }
  };

  const handleAddLawyer = async (formData) => {
    try {
      await axios.post(`${API_CONFIG.baseURL}/api/lawyers`, formData);
      await fetchLawyers();
      setShowAddModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditLawyer = async (formData) => {
    try {
      await axios.put(
        `${API_CONFIG.baseURL}/api/lawyers/${selectedLawyer.id}`,
        formData
      );
      await fetchLawyers();
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLawyer = async (lawyerId) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/lawyers/${lawyerId}`);
      await fetchLawyers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowEditModal = (selectedLawyer) => {
    setSelectedLawyer({
      ...selectedLawyer,
      birthdate: selectedLawyer.birthdate
        ? new Date(selectedLawyer.birthdate)
        : null,
    });
    setShowEditModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <SectionHeader
        listName="المحامين"
        buttonName="محامي"
        setShowAddModal={setShowAddModal}
        icon={LawyerIcon}
      />

      <div className="bg-white shadow rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 text-right">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">الاسم</th>
                <th className="border border-gray-300 px-4 py-2">تاريخ الميلاد</th>
                <th className="border border-gray-300 px-4 py-2">رقم الهوية</th>
                <th className="border border-gray-300 px-4 py-2">رقم تسجيل المحاماة</th>
                <th className="border border-gray-300 px-4 py-2">فئة المحامي</th>
                <th className="border border-gray-300 px-4 py-2">البريد الإلكتروني</th>
                <th className="border border-gray-300 px-4 py-2">رقم الهاتف</th>
                <th className="border border-gray-300 px-4 py-2">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {lawyers.map((lawyer) => (
                <tr key={lawyer.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{lawyer.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{lawyer.birthdate}</td>
                  <td className="border border-gray-300 px-4 py-2">{lawyer.identity_number}</td>
                  <td className="border border-gray-300 px-4 py-2">{lawyer.law_reg_num}</td>
                  <td className="border border-gray-300 px-4 py-2">{lawyer.lawyer_class}</td>
                  <td className="border border-gray-300 px-4 py-2">{lawyer.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{lawyer.phone_number}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleShowEditModal(lawyer)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteLawyer(lawyer.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">إضافة محامي</h3>
            <LawyerAddEdit onSubmit={handleAddLawyer} />
            <button
              onClick={() => setShowAddModal(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">تعديل محامي</h3>
            <LawyerAddEdit
              onSubmit={handleEditLawyer}
              initialValues={selectedLawyer}
            />
            <button
              onClick={() => setShowEditModal(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lawyers;
