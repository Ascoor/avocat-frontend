import { useState, useEffect, useCallback } from 'react';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import axios from 'axios';

import API_CONFIG from '../../../config/config';
import DatePicker from 'react-datepicker';
import useAuth from '../../auth/AuthUser';

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

  const handleCloseModal = () => {
    setModalMode('');
    setSelectedSession({});
    setSelectedDate(null);
    setSelectStatus('');
    setSelectedLawyer('');
    setRollNumber('');
    setOrders('');
    setSelectedCourt('');
    setResult('');
    setShowAddLegalSessionModal(false);
  };

  return (
    <div className="p-6 bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText rounded-lg shadow-lg">
      {/* Alert */}
      {showAlert && (
        <div
          className={`p-4 mb-4 rounded-lg shadow-md ${
            alert?.variant === 'danger'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }`}
        >
          {alert?.message}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">الجلسات القانونية</h2>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          onClick={() => setShowAddLegalSessionModal(true)}
        >
          <BiPlusCircle className="mr-2" />
          إضافة جلسة
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">تاريخ الجلسة</th>
              <th className="px-4 py-2 text-left">المحامي</th>
              <th className="px-4 py-2 text-left">الرول</th>
              <th className="px-4 py-2 text-left">المحكمة</th>
              <th className="px-4 py-2 text-left">الطلبات</th>
              <th className="px-4 py-2 text-left">النتيجة</th>
              <th className="px-4 py-2 text-left">الحالة</th>
              <th className="px-4 py-2 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {legalSessions.map((session) => (
              <tr
                key={session.id}
                className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{session.session_date}</td>
                <td className="px-4 py-2">{session.lawyer?.name || '-'}</td>
                <td className="px-4 py-2">{session.roll_number || '-'}</td>
                <td className="px-4 py-2">{session.court?.name || '-'}</td>
                <td className="px-4 py-2">{session.orders || '-'}</td>
                <td className="px-4 py-2">{session.result || '-'}</td>
                <td className="px-4 py-2">{session.status || '-'}</td>
                <td className="px-4 py-2 text-center flex justify-center gap-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEditLegalSession(session)}
                  >
                    <BiPencil />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteLegalSession(session.id)}
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddLegalSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold">
                {modalMode === 'add' ? 'إضافة جلسة جديدة' : 'تعديل جلسة'}
              </h3>
            </div>
            <div className="p-4">
              {/* Form fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  تاريخ الجلسة
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                  onClick={handleCloseModal}
                >
                  إلغاء
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  onClick={() => console.log('Save')}
                >
                  {modalMode === 'add' ? 'إضافة' : 'حفظ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalCaseSessions;
