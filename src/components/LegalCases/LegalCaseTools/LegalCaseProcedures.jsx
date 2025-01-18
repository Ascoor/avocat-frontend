import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import useAuth from '../../auth/AuthUser';
import API_CONFIG from '../../../config/config';
const LegalCaseProcedures = ({ legCaseId }) => {
  const { getUser } = useAuth();
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [procedures, setProcedures] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedDateStart, setSelectedDateStart] = useState('');
  const [selectedDateEnd, setSelectedDateEnd] = useState('');
  const [selectedCost, setSelectedCost] = useState('');
  const [selectedCost2, setSelectedCost2] = useState('');
  const [selectedResult, setSelectedResult] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAddProcedureModal, setShowAddProcedureModal] = useState(false);
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [procedurePlaceTypes, setProcedurePlaceTypes] = useState([]);
  const [selectedProcedureType, setSelectedProcedureType] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [selectedProcedurePlaceType, setSelectedProcedurePlaceType] =
    useState('');
  const [selectedProcedurePlaceName, setSelectedProcedurePlaceName] =
    useState('');
  const [modalMode, setModalMode] = useState('');
  const [procedureId, setProcedureId] = useState(null);
  const user = getUser();
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchProcedurePlaceTypes(),
          fetchLawyers(),
          fetchProcedureTypes(),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProcedures = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/procedures/leg-case/${legCaseId}`,
        );
        setProcedures(response.data);
      } catch (error) {
        console.log('خطأ في جلب إجراءات المحاكم:', error);
      }
    };

    fetchProcedures();
    fetchAllData();
  }, [legCaseId]);

  const fetchProcedures = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/procedures/leg-case/${legCaseId}`,
      );
      setProcedures(response.data);
    } catch (error) {
      console.log('خطأ في جلب إجراءات المحاكم:', error);
    }
  };

  const fetchProcedureTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/procedure_types`,
      );
      setProcedureTypes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
      setLawyers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProcedurePlaceTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/procedure_place_types`,
      );
      setProcedurePlaceTypes(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenAddProcedureModal = () => {
    clearFields(); // Clearing all the input fields
    setModalMode('add');
    setShowAddProcedureModal(true);
  };

  const handleEditProcedure = (procedure) => {
    setModalMode('edit');
    setProcedureId(procedure.id);
    setSelectedTitle(procedure.title);
    setSelectedJob(procedure.job);
    setSelectedDateStart(procedure.date_start);
    setSelectedDateEnd(procedure.date_end);
    setSelectedCost(procedure.cost);
    setSelectedCost2(procedure.cost2);
    setSelectedResult(procedure.result);
    setSelectedProcedureType(procedure.procedure_type_id);
    setSelectedLawyer(procedure.lawyer_id);
    setSelectedProcedurePlaceName(procedure.procedure_place_name);
    setSelectedProcedurePlaceType(procedure.procedure_place_type_id);
    setSelectedStatus(procedure.status); // تمت إضافة تعيين الحالة هنا

    setShowAddProcedureModal(true);
  };

  const handleDeleteProcedure = async (procedureId) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/procedures/${procedureId}`);
      fetchProcedures();
      setAlert('تم حذف الإجراء بنجاح.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.log('خطأ في حذف الإجراء:', error);
    }
  };

  const handleAddProcedure = async () => {
    try {
      const newProcedure = {
        title: selectedTitle,
        job: selectedJob,
        date_start: selectedDateStart,
        date_end: selectedDateEnd,
        cost: selectedCost,
        cost2: selectedCost2,
        result: selectedResult,
        procedure_type_id: selectedProcedureType,
        lawyer_id: selectedLawyer,
        procedure_place_type_id_: selectedProcedurePlaceType,
        procedure_place_name_: selectedProcedurePlaceName,
        leg_case_id: legCaseId,

        created_by: user.id,
      };

      if (modalMode === 'edit') {
        await axios.put(
          `${API_CONFIG.baseURL}/api/procedures/${procedureId}`,
          newProcedure,
        );
        setAlert('تم تحديث الإجراء بنجاح.');
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/procedures`, newProcedure);
        setAlert('تم إضافة الإجراء بنجاح.');
      }

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      fetchProcedures();
      setShowAddProcedureModal(false);
      clearFields();
    } catch (error) {
      console.log('خطأ في إضافة/تحديث الإجراء:', error);
    }
  };

  const clearFields = () => {
    setSelectedTitle('');
    setSelectedJob('');
    setSelectedDateStart('');
    setSelectedDateEnd('');
    setSelectedCost('');
    setSelectedCost2('');
    setSelectedResult('');
    setSelectedProcedureType('');
    setSelectedLawyer('');
    setSelectedProcedurePlaceName('');
    setSelectedProcedurePlaceType('');
  };

  return (
    <>
     <div className="flex flex-col">
  {showAlert && alert && <div className="bg-green-500 text-white p-4 rounded">{alert}</div>}
</div>

<div className="bg-white shadow-md rounded">
  <div className="px-4 py-2 flex justify-between items-center">
    <button onClick={handleOpenAddProcedureModal} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded">
      <BiPlusCircle className="mr-1" />
      إإضافة إجراء
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نوع الإجراء</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نوع الجهة</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المحكمة</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ البدء</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الانتهاء</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">المحامي</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">النتيجة</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">التحكم</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {procedures.map((procedure) => (
          <tr key={procedure.id}>
            <td className="px-6 py-4 whitespace-nowrap">{procedure.procedure_type?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{procedure.procedure_place_type?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{procedure.procedure_place_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{procedure.date_start}</td>
            <td className="px-6 py-4 whitespace-nowrap">{procedure.date_end}</td>
            <td className="px-6 py-4 whitespace-nowrap">{procedure.lawyer?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{procedure.result}</td>
            <td className="px-6 py-4 whitespace-nowrap">{procedure.status}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="mr-2">
                <button onClick={() => handleEditProcedure(procedure)} className="text-blue-500">
                  <BiPencil />
                </button>
              </span>
              <span>
                <button onClick={() => handleDeleteProcedure(procedure.id)} className="text-red-500">
                  <BiTrash />
                </button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
<div className={`fixed z-10 inset-0 overflow-y-auto ${showAddProcedureModal ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-end justify-center min-h-screen p-4 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            {modalMode === 'edit' ? 'تعديل الإجراء' : 'إضافة إجراء'}
          </h3>
          <button type="button" className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-500" onClick={() => setShowAddProcedureModal(false)}>
            <span className="sr-only">Close</span>
            &times;
          </button>
        </div>
        <div className="mt-2">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureTitle">العنوان</label>
              <input type="text" placeholder="ادخل العنوان" value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureJob">الوظيفة</label>
              <input type="text" placeholder="ادخل الوظيفة" value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureDateStart">تاريخ البدء</label>
              <input type="date" placeholder="ادخل تاريخ البدء" value={selectedDateStart} onChange={(e) => setSelectedDateStart(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureDateEnd">تاريخ الانتهاء</label>
              <input type="date" placeholder="ادخل تاريخ الانتهاء" value={selectedDateEnd} onChange={(e) => setSelectedDateEnd(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureCost">التكلفة</label>
              <input type="number" placeholder="ادخل التكلفة" value={selectedCost} onChange={(e) => setSelectedCost(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureCost2">التكلفة 2</label>
              <input type="number" placeholder="ادخل التكلفة 2" value={selectedCost2 || ''} onChange={(e) => setSelectedCost2(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureResult">النتيجة</label>
              <input type="text" placeholder="ادخل النتيجة" value={selectedResult || ''} onChange={(e) => setSelectedResult(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedurePlaceName">مكان الجهة</label>
              <input type="text" placeholder="ادخل النتيجة" value={selectedProcedurePlaceName || ''} onChange={(e) => setSelectedProcedurePlaceName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureType">نوع الإجراء</label>
              <select value={selectedProcedureType} onChange={(e) => setSelectedProcedureType(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">اختر نوع الإجراء</option>
                {procedureTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedurePlaceType">نوع الجهة</label>
              <select value={selectedProcedurePlaceType} onChange={(e) => setSelectedProcedureType(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">اختر نوع الجهة</option>
                {procedurePlaceTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureLawyer">المحامي</label>
              <select value={selectedLawyer} onChange={(e) => setSelectedLawyer(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">اختر المحامي</option>
                {lawyers.map((lawyer) => (
                  <option key={lawyer.id} value={lawyer.id}>{lawyer.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="procedureStatus">الحالة</label>
              {modalMode === 'edit' ? (
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">اختر الحالة</option>
                  <option value="منتهي">منتهي</option>
                  <option value="لم ينفذ">لم ينفذ</option>
                  <option value="قيد التنفيذ">قيد التنفيذ</option>
                </select>
              ) : (
                <input type="text" readOnly value="قيد التنفيذ" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
  <button
    className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
    onClick={() => setShowAddProcedureModal(false)}
  >
    إلغاء
  </button>
  <button
    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
    onClick={handleAddProcedure}
  >
    حفظ
  </button>
</div>
</div>
</div>
</div>
    </>
  );
};

export default LegalCaseProcedures;
