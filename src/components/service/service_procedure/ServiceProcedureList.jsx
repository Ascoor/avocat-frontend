import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import ServiceProcedureModal from './ServiceProcedureModal';
import API_CONFIG from '../../../config';

const ServiceProcedureList = ({ serviceId }) => {
  const [serviceProcedures, setServiceProcedures] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingServiceProcedure, setEditingServiceProcedure] = useState(null);

  useEffect(() => {
    fetchServiceProcedures();
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

  const fetchServiceProcedures = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/service-procedures/${serviceId}`
      );
      setServiceProcedures(response.data);
    } catch (error) {
      console.error('Error fetching procedures:', error);
    }
  };

  const handleEditServiceProcedure = (procedure) => {
    setIsEditing(true);
    setEditingServiceProcedure(procedure);
    setShowModal(true);
  };

  const handleDeleteServiceProcedure = async (procedureId) => {
    try {
      await axios.delete(
        `${API_CONFIG.baseURL}/api/service-procedure/delete/${procedureId}`
      );
      fetchServiceProcedures();
    } catch (error) {
      console.error('Error deleting procedure:', error);
    }
  };

  const openAddProcedureModal = () => {
    setIsEditing(false);
    setEditingServiceProcedure(null);
    setShowModal(true);
  };

  const addServiceProcedure = async (data) => {
    try {
      await axios.post(`${API_CONFIG.baseURL}/api/service-procedures`, data);
      fetchServiceProcedures();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding procedure:', error);
    }
  };

  const editServiceProcedure = async (procedureId, data) => {
    try {
      await axios.put(
        `${API_CONFIG.baseURL}/api/service-procedure/${procedureId}`,
        data
      );
      fetchServiceProcedures();
      setShowModal(false);
    } catch (error) {
      console.error('Error editing procedure:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
          onClick={openAddProcedureModal}
        >
          <BiPlusCircle size={20} /> إضافة إجراء
        </button>
        <ServiceProcedureModal
          show={showModal}
          onHide={() => setShowModal(false)}
          serviceId={serviceId}
          procedure={editingServiceProcedure}
          lawyers={lawyers}
          fetchServiceProcedures={fetchServiceProcedures}
          isEditing={isEditing}
          addServiceProcedure={addServiceProcedure}
          editServiceProcedure={editServiceProcedure}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">نوع الإجراء</th>
              <th className="border border-gray-300 px-4 py-2">تاريخ الإجراء</th>
              <th className="border border-gray-300 px-4 py-2">المحامي</th>
              <th className="border border-gray-300 px-4 py-2">الجهة</th>
              <th className="border border-gray-300 px-4 py-2">النتيجة</th>
              <th className="border border-gray-300 px-4 py-2">الحالة</th>
              <th className="border border-gray-300 px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {serviceProcedures.map((procedure) => (
              <tr key={procedure.id} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{procedure.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {procedure.date_start
                    ? new Date(procedure.date_start).toLocaleDateString('ar-EG')
                    : ''}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {procedure.lawyer?.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {procedure.place || ''}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {procedure.result || ''}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {procedure.status || ''}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEditServiceProcedure(procedure)}
                  >
                    <BiPencil size={18} />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteServiceProcedure(procedure.id)}
                  >
                    <BiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceProcedureList;
