import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi'; 
import API_CONFIG from '../../../config/config';
import useAuth from '../../auth/AuthUser';

const LegalCaseProcedures = ({ legCaseId }) => {
  const { getUser } = useAuth();
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [procedures, setProcedures] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [showAddProcedureModal, setShowAddProcedureModal] = useState(false);

  const user = getUser();

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/procedures/leg-case/${legCaseId}`,
        );
        setProcedures(response.data);
      } catch (error) {
        console.log('Error fetching procedures:', error);
      }
    };
    fetchProcedures();
  }, [legCaseId]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={` 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}
    >
      {/* Header */}
      <div className="p-4 shadow-md flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-lg font-bold">إجراءات القضايا القانونية</h1>
      </div>

      {/* Alert Message */}
      {showAlert && alert && (
        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md my-4 mx-6">
          {alert}
        </div>
      )}

      {/* Procedures Table */}
      <div className="p-6">
        <button
          onClick={() => setShowAddProcedureModal(true)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          <BiPlusCircle className="mr-2" />
          إضافة إجراء
        </button>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2 text-center">نوع الإجراء</th>
                <th className="px-4 py-2 text-center">المحامي</th>
                <th className="px-4 py-2 text-center">تاريخ البدء</th>
                <th className="px-4 py-2 text-center">تاريخ الانتهاء</th>
                <th className="px-4 py-2 text-center">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {procedures.map((procedure) => (
                <tr
                  key={procedure.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2 text-center">
                    {procedure.procedure_type?.name || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.lawyer?.name || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.date_start}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.date_end}
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center space-x-2">
                    <button
                      onClick={() => console.log('Edit')}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <BiPencil />
                    </button>
                    <button
                      onClick={() => console.log('Delete')}
                      className="text-red-500 hover:text-red-700"
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

      {/* Modal for Adding Procedure */}
      {showAddProcedureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">إضافة إجراء</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم الإجراء"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowAddProcedureModal(false)}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                إلغاء
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalCaseProcedures;
