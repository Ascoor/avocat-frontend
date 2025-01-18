import { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../../config/config';

const Court = ({ show, handleClose }) => {
  const [courtTypes, setCourtTypes] = useState([]);
  const [courtSubTypes, setCourtSubTypes] = useState([]);
  const [courtLevels, setCourtLevels] = useState([]);
  const [courts, setCourts] = useState([]);
  const [newCourt, setNewCourt] = useState({
    typeId: '',
    subTypeId: '',
    levelId: '',
    name: '',
    address: '',
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData('/api/court_types/', setCourtTypes);
    fetchData('/api/court_levels/', setCourtLevels);
    fetchData('/api/courts/', setCourts);
  }, []);

  useEffect(() => {
    if (newCourt.typeId) {
      fetchData(`/api/court-types/${newCourt.typeId}`, setCourtSubTypes);
    }
  }, [newCourt.typeId]);

  const fetchData = async (url, setState) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}${url}`);
      setState(response.data);
    } catch (error) {
      setAlert({ show: true, message: 'حدث خطأ في جلب البيانات', type: 'danger' });
    }
    setLoading(false);
  };

  const handleAddCourt = async () => {
    if (!newCourt.typeId || !newCourt.levelId || !newCourt.name.trim()) {
      setAlert({ show: true, message: 'يرجى ملء جميع الحقول المطلوبة', type: 'danger' });
      return;
    }

    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/api/courts/`, {
        court_type_id: newCourt.typeId,
        court_sub_type_id: newCourt.subTypeId,
        court_level_id: newCourt.levelId,
        name: newCourt.name,
        address: newCourt.address,
      });
      setCourts([...courts, response.data]);
      setAlert({ show: true, message: 'تمت إضافة المحكمة بنجاح', type: 'success' });
      handleClose();
    } catch (error) {
      setAlert({ show: true, message: 'حدث خطأ أثناء إضافة المحكمة', type: 'danger' });
    }
  };

  const handleDeleteCourt = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/courts/${id}`);
      setCourts(courts.filter((court) => court.id !== id));
      setAlert({ show: true, message: 'تم حذف المحكمة بنجاح', type: 'success' });
    } catch (error) {
      setAlert({ show: true, message: 'حدث خطأ أثناء حذف المحكمة', type: 'danger' });
    }
  };

  const currentItems = courts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-4">
      {loading && <div className="text-center text-blue-500">جاري التحميل...</div>}

      {alert.show && (
        <div
          className={`p-4 mb-4 text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {alert.message}
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">المحاكم</h3>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">الاسم</th>
              <th className="px-4 py-2 border border-gray-300">النوع</th>
              <th className="px-4 py-2 border border-gray-300">النوع الفرعي</th>
              <th className="px-4 py-2 border border-gray-300">المستوى</th>
              <th className="px-4 py-2 border border-gray-300">العنوان</th>
              <th className="px-4 py-2 border border-gray-300">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((court) => (
              <tr key={court.id}>
                <td className="px-4 py-2 border border-gray-300">{court.name}</td>
                <td className="px-4 py-2 border border-gray-300">{court.court_type?.name}</td>
                <td className="px-4 py-2 border border-gray-300">{court.court_sub_type?.name}</td>
                <td className="px-4 py-2 border border-gray-300">{court.court_level?.name}</td>
                <td className="px-4 py-2 border border-gray-300">{court.address}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteCourt(court.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          السابق
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ml-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentItems.length < itemsPerPage}
        >
          التالي
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold">إضافة محكمة</h4>
              <button className="text-red-500" onClick={handleClose}>
                &times;
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCourt();
              }}
            >
              <label className="block mb-2 text-gray-700">نوع المحكمة:</label>
              <select
                className="w-full p-2 border rounded"
                value={newCourt.typeId}
                onChange={(e) => setNewCourt({ ...newCourt, typeId: e.target.value })}
              >
                <option value="">اختر نوع المحكمة</option>
                {courtTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <label className="block mt-4 mb-2 text-gray-700">اسم المحكمة:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newCourt.name}
                onChange={(e) => setNewCourt({ ...newCourt, name: e.target.value })}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={handleClose}
                >
                  إغلاق
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Court;
