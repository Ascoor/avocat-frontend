import { useState, useEffect, useCallback } from 'react';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import useAuth from '../../auth/AuthUser';
import API_CONFIG from '../../../config/config';
import DatePicker from 'react-datepicker';
const LegalCaseSessions = ({ legCaseId }) => {
  const { getUser } = useAuth();
  const user = getUser();

  // State variables
  const [alert, setAlert] = useState(null);
  const [selectStatus, setSelectStatus] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCost, setSelectedCost] = useState(0);
  const [selectedCost2, setSelectedCost2] = useState(0);
  const [selectedSession, setSelectedSession] = useState({});
  const [legalSessions, setLegalSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rollNumber, setRollNumber] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [orders, setOrders] = useState('');
  const [showAddLegalSessionModal, setShowAddLegalSessionModal] =
    useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [result, setResult] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [modalMode, setModalMode] = useState('');
  const userId = user.id;

  // Fetch data function
  const fetchData = useCallback(async () => {
    try {
      const [sessionsResponse, lawyersResponse, courtsResponse] =
        await Promise.all([
          axios.get(
            `${API_CONFIG.baseURL}/api/legal_sessions/leg-case/${legCaseId}`,
          ),
          axios.get(`${API_CONFIG.baseURL}/api/lawyers`),
          axios.get(`${API_CONFIG.baseURL}/api/courts`),
        ]);
      setLegalSessions(sessionsResponse.data);
      setLawyers(lawyersResponse.data);
      setCourts(courtsResponse.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }, [legCaseId]);

  // UseEffect for initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditLegalSession = (legalSession) => {
    setModalMode('edit');
    setSelectedSession(legalSession);
    setSelectedDate(new Date(legalSession.date.split('T')[0])); // Parse the date string into a Date object
    setSelectStatus(legalSession.status);
    setSelectedLawyer(legalSession.lawyer_id);
    setRollNumber(legalSession.roll_number);
    setSelectedCost(legalSession.cost);
    setSelectedCost2(legalSession.cost2);
    setOrders(legalSession.orders);
    setSelectedCourt(legalSession.court_id);
    setResult(legalSession.result);

    setShowAddLegalSessionModal(true);
  };
  const handleAddOrUpdateLegalSession = async () => {
    const dateOnly = selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : null;
    const data = {
      date: dateOnly,
      lawyer_id: selectedLawyer,
      roll_number: rollNumber,
      orders,
      court_id: selectedCourt,
      result,
      cost: selectedCost,
      cost2: selectedCost2,
      leg_case_id: legCaseId,
      created_by: userId,
    };

    if (modalMode === 'edit') {
      data.status = selectStatus;
    }

    // Include created_by only when creating a new record
    if (modalMode === 'add') {
      data.created_by = userId; // Include created_by when creating a new record
    }

    try {
      if (modalMode === 'add') {
        await axios.post(`${API_CONFIG.baseURL}/api/legal_sessions`, data);
        fetchData();
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);

        setAlert({ variant: 'info', message: 'تمت الإضافة بنجاح.' });
        setShowAlert(true);
      } else if (modalMode === 'edit') {
        await axios.put(
          `${API_CONFIG.baseURL}/api/legal_sessions/${selectedSession.id}`,
          data,
        );
        fetchData();

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);

        setAlert({ variant: 'info', message: 'تم التعديل بنجاح.' });
        setShowAlert(true);
      }

      handleCloseModal();
    } catch (error) {
      console.log(error);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      setAlert({
        variant: 'danger',
        message: 'حدث خطأ أثناء عملية التعديل.',
      });
      setShowAlert(true);
    }
  };

  const handleAddLegalSession = () => {
    setModalMode('add');
    setShowAddLegalSessionModal(true);
  };

  const handleDeleteLegalSession = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/legal_sessions/${id}`);
      fetchData();
      setAlert({ variant: 'success', message: 'تم الحذف بنجاح' });
      setShowAlert(true);
    } catch (error) {
      console.log('خطأ في حذف الجلسة القانونية:', error);
      setAlert({
        variant: 'danger',
        message: 'حدث خطأ أثناء حذف الجلسة القانونية',
      });
      setShowAlert(true);
    }
  };

  const handleCloseModal = () => {
    fetchData();
    setModalMode('');
    setSelectedSession({});
    setSelectedDate('');
    setSelectStatus('');
    setSelectedLawyer('');
    setRollNumber('');
    setOrders('');
    setSelectedCourt('');
    setResult('');
    setShowAddLegalSessionModal(false);
  };

  return (
    <>
   <div className="flex flex-col">
  {showAlert && (
    <div className={`alert alert-${alert.variant} flex items-center justify-between`}>
      <span>{alert.message}</span>
      <button onClick={() => setShowAlert(false)} className="close-button">
        &times;
      </button>
    </div>
  )}
</div>

<div className="bg-white shadow-md rounded-lg">
  <div className="header flex justify-between items-center p-4">
    <button
      className="bg-green-500 text-white text-sm py-2 px-4 rounded"
      onClick={handleAddLegalSession}
    >
      <BiPlusCircle className="mr-1" />
      إضافة جلسة
    </button>
  </div>
  <div className="body p-4">
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="w-1/5">تاريخ الجلسة</th>
            <th className="w-1/5">اسم المحامي</th>
            <th className="w-1/5">الرول</th>
            <th className="w-1/5">المحكمة</th>
            <th className="w-1/5">الطلبات</th>
            <th className="w-1/5">النتيجة</th>
            <th className="w-1/5">الحالة</th>
            <th className="w-1/5">تعديل</th>
            <th className="w-1/5">حذف</th>
          </tr>
        </thead>
        <tbody>
          {legalSessions.map((legalSession) => (
            <tr key={legalSession.id}>
              <td>{legalSession.session_date}</td>
              <td>{legalSession.lawyer.name}</td>
              <td>{legalSession.legal_session_type.name}</td>
              <td>{legalSession.court.name}</td>
              <td>{legalSession.orders}</td>
              <td>{legalSession.result}</td>
              <td>{legalSession.status}</td>
              <td>
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handleEditLegalSession(legalSession)}
                >
                  <BiPencil />
                </button>
              </td>
              <td>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDeleteLegalSession(legalSession.id)}
                >
                  <BiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
<div className={`fixed inset-0 flex items-center justify-center z-50 ${showAddLegalSessionModal ? 'block' : 'hidden'}`}>
  <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="text-lg font-semibold">
        {modalMode === 'add' ? 'إضافة جلسة جديدة' : 'تعديل جلسة'}
      </h3>
      <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
        &times;
      </button>
    </div>
    <div className="p-4">
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">تاريخ الجلسة</label>
          <DatePicker
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            dateFormat="yyyy-MM-dd"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>

        {modalMode === 'edit' && (
          <div className="mb-4">
            <label className="block text-sm font-medium">حالة الجلسة</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.target.value)}
            >
              <option value="">اختر حالة الجلسة</option>
              <option value="منتهي">منتهي</option>
              <option value="لم ينفذ">لم ينفذ</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium">اسم المحامي</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={selectedLawyer}
            onChange={(e) => setSelectedLawyer(e.target.value)}
          >
            <option value="">اختر المحامي</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer.id} value={lawyer.id}>
                {lawyer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">رقم الرول</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">الطلبات</label>
          <textarea
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={orders}
            onChange={(e) => setOrders(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">المحكمة</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e.target.value)}
          >
            <option value="">اختر المحكمة</option>
            {courts.map((court) => (
              <option key={court.id} value={court.id}>
                {court.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">التكلفة</label>
          <input
            type="number"
            placeholder="ادخل التكلفة"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={selectedCost}
            onChange={(e) => setSelectedCost(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">التكلفة 2</label>
          <input
            type="number"
            placeholder="ادخل التكلفة 2"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={selectedCost2 || ''}
            onChange={(e) => setSelectedCost2(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">النتيجة</label>
          <textarea
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        </div>
      </form>
    </div>
    <div className="flex justify-end p-4 border-t">
      <button onClick={handleCloseModal} className="mr-2 text-gray-500 hover:text-gray-700">
        إلغاء
      </button>
      <button onClick={handleAddOrUpdateLegalSession} className="bg-blue-500 text-white py-2 px-4 rounded">
        {modalMode === 'add' ? 'إضافة' : 'تعديل'}
      </button>
    </div>
  </div>
</div>
    </>
  );
};

export default LegalCaseSessions;
