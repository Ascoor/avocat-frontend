import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useAuth from '../../layout/AuthTool/AuthUser';
import API_CONFIG from '../../../config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function LegalCaseSessions({ legCaseId }) {
  const { getUser } = useAuth();
  const user = getUser();

  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [modalData, setModalData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  const fetchData = useCallback(async () => {
    try {
      const [sessionsRes, lawyersRes, courtsRes] = await Promise.all([
        axios.get(`${API_CONFIG.baseURL}/api/legal_sessions/leg-case/${legCaseId}`),
        axios.get(`${API_CONFIG.baseURL}/api/lawyers`),
        axios.get(`${API_CONFIG.baseURL}/api/courts`),
      ]);
      setSessions(sessionsRes.data);
      setLawyers(lawyersRes.data);
      setCourts(courtsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [legCaseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleModalOpen = (mode, session = {}) => {
    setModalMode(mode);
    setModalData({
      date: session.date ? new Date(session.date) : null,
      lawyerId: session.lawyer_id || '',
      rollNumber: session.roll_number || '',
      courtId: session.court_id || '',
      orders: session.orders || '',
      result: session.result || '',
      cost: session.cost || '',
      cost2: session.cost2 || '',
      status: session.status || 'قيد التنفيذ',
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData({});
  };

  const handleSaveSession = async () => {
    const payload = {
      ...modalData,
      date: modalData.date ? modalData.date.toISOString().split('T')[0] : null,
      leg_case_id: legCaseId,
      created_by: user.id,
    };

    try {
      if (modalMode === 'add') {
        await axios.post(`${API_CONFIG.baseURL}/api/legal_sessions`, payload);
        setAlert({ type: 'success', message: 'تمت الإضافة بنجاح.' });
      } else {
        await axios.put(`${API_CONFIG.baseURL}/api/legal_sessions/${modalData.id}`, payload);
        setAlert({ type: 'success', message: 'تم التعديل بنجاح.' });
      }
      fetchData();
    } catch (error) {
      setAlert({ type: 'error', message: 'حدث خطأ أثناء الحفظ.' });
    } finally {
      setShowAlert(true);
      handleModalClose();
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/legal_sessions/${id}`);
      setAlert({ type: 'success', message: 'تم الحذف بنجاح.' });
      fetchData();
    } catch (error) {
      setAlert({ type: 'error', message: 'حدث خطأ أثناء الحذف.' });
    } finally {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="p-4">
      {showAlert && (
        <div className={`alert ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white p-2 mb-4`}>
          {alert.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">جلسات القضية</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleModalOpen('add')}
        >
          إضافة جلسة
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">تاريخ الجلسة</th>
            <th className="border border-gray-300 px-4 py-2">اسم المحامي</th>
            <th className="border border-gray-300 px-4 py-2">المحكمة</th>
            <th className="border border-gray-300 px-4 py-2">الطلبات</th>
            <th className="border border-gray-300 px-4 py-2">النتيجة</th>
            <th className="border border-gray-300 px-4 py-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{session.date}</td>
              <td className="border border-gray-300 px-4 py-2">{session.lawyer?.name}</td>
              <td className="border border-gray-300 px-4 py-2">{session.court?.name}</td>
              <td className="border border-gray-300 px-4 py-2">{session.orders}</td>
              <td className="border border-gray-300 px-4 py-2">{session.result}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  onClick={() => handleModalOpen('edit', session)}
                >
                  تعديل
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDeleteSession(session.id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/2">
            <h3 className="text-lg font-bold mb-4">
              {modalMode === 'add' ? 'إضافة جلسة جديدة' : 'تعديل جلسة'}
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">تاريخ الجلسة</label>
                <DatePicker
                  className="w-full border border-gray-300 p-2 rounded"
                  selected={modalData.date}
                  onChange={(date) => setModalData((prev) => ({ ...prev, date }))}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">اسم المحامي</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={modalData.lawyerId}
                  onChange={(e) => setModalData((prev) => ({ ...prev, lawyerId: e.target.value }))}
                >
                  <option value="">اختر المحامي</option>
                  {lawyers.map((lawyer) => (
                    <option key={lawyer.id} value={lawyer.id}>
                      {lawyer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  onClick={handleModalClose}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleSaveSession}
                >
                  {modalMode === 'add' ? 'إضافة' : 'تعديل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


export default LegalCaseSessions;
