import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import API_CONFIG from '../../../config';

const LegalCaseProcedures = ({ legCaseId }) => {
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [procedures, setProcedures] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    job: '',
    dateStart: '',
    dateEnd: '',
    cost: '',
    cost2: '',
    result: '',
    procedureType: '',
    lawyer: '',
    procedurePlaceType: '',
    procedurePlaceName: '',
    status: 'قيد التنفيذ',
  });

  const [procedureTypes, setProcedureTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [procedurePlaceTypes, setProcedurePlaceTypes] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProcedureId, setEditingProcedureId] = useState(null);

  useEffect(() => {
    fetchProcedures();
    fetchProcedureTypes();
    fetchLawyers();
    fetchProcedurePlaceTypes();
  }, [legCaseId]);

  const fetchProcedures = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/procedures/leg-case/${legCaseId}`);
      setProcedures(response.data);
    } catch (error) {
      console.error('Error fetching procedures:', error);
    }
  };

  const fetchProcedureTypes = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/procedure_types`);
      setProcedureTypes(response.data);
    } catch (error) {
      console.error('Error fetching procedure types:', error);
    }
  };

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
      setLawyers(response.data);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    }
  };

  const fetchProcedurePlaceTypes = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/procedure_place_types`);
      setProcedurePlaceTypes(response.data);
    } catch (error) {
      console.error('Error fetching procedure place types:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrEditProcedure = async () => {
    try {
      const endpoint = isEditing
        ? `${API_CONFIG.baseURL}/api/procedures/${editingProcedureId}`
        : `${API_CONFIG.baseURL}/api/procedures`;
      const method = isEditing ? 'put' : 'post';

      await axios[method](endpoint, { ...formData, leg_case_id: legCaseId });
      setAlert(isEditing ? 'تم تحديث الإجراء بنجاح.' : 'تم إضافة الإجراء بنجاح.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      fetchProcedures();
      closeModal();
    } catch (error) {
      console.error('Error adding or editing procedure:', error);
    }
  };

  const handleDeleteProcedure = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/procedures/${id}`);
      setAlert('تم حذف الإجراء بنجاح.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      fetchProcedures();
    } catch (error) {
      console.error('Error deleting procedure:', error);
    }
  };

  const openModal = (procedure = null) => {
    if (procedure) {
      setFormData({
        title: procedure.title,
        job: procedure.job,
        dateStart: procedure.date_start,
        dateEnd: procedure.date_end,
        cost: procedure.cost,
        cost2: procedure.cost2,
        result: procedure.result,
        procedureType: procedure.procedure_type_id,
        lawyer: procedure.lawyer_id,
        procedurePlaceType: procedure.procedure_place_type_id,
        procedurePlaceName: procedure.procedure_place_name,
        status: procedure.status,
      });
      setIsEditing(true);
      setEditingProcedureId(procedure.id);
    } else {
      resetForm();
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      job: '',
      dateStart: '',
      dateEnd: '',
      cost: '',
      cost2: '',
      result: '',
      procedureType: '',
      lawyer: '',
      procedurePlaceType: '',
      procedurePlaceName: '',
      status: 'قيد التنفيذ',
    });
  };

  return (
    <div>
      {showAlert && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{alert}</div>}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">الإجراءات</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => openModal()}
        >
          <BiPlusCircle className="inline mr-1" /> إضافة إجراء
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">نوع الإجراء</th>
            <th className="py-2 px-4">نوع الجهة</th>
            <th className="py-2 px-4">المحكمة</th>
            <th className="py-2 px-4">تاريخ البدء</th>
            <th className="py-2 px-4">تاريخ الانتهاء</th>
            <th className="py-2 px-4">المحامي</th>
            <th className="py-2 px-4">النتيجة</th>
            <th className="py-2 px-4">الحالة</th>
            <th className="py-2 px-4">التحكم</th>
          </tr>
        </thead>
        <tbody>
          {procedures.map((procedure) => (
            <tr key={procedure.id} className="border-b">
              <td className="py-2 px-4">{procedure.procedure_type?.name}</td>
              <td className="py-2 px-4">{procedure.procedure_place_type?.name}</td>
              <td className="py-2 px-4">{procedure.procedure_place_name}</td>
              <td className="py-2 px-4">{procedure.date_start}</td>
              <td className="py-2 px-4">{procedure.date_end}</td>
              <td className="py-2 px-4">{procedure.lawyer?.name}</td>
              <td className="py-2 px-4">{procedure.result}</td>
              <td className="py-2 px-4">{procedure.status}</td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-500 mr-2 hover:underline"
                  onClick={() => openModal(procedure)}
                >
                  <BiPencil />
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteProcedure(procedure.id)}
                >
                  <BiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? 'تعديل الإجراء' : 'إضافة إجراء'}
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">العنوان</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              {/* باقي الحقول */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleAddOrEditProcedure}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalCaseProcedures;
