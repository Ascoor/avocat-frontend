import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import API_CONFIG from '../../../config/config';

export default function LegalCaseClients({ legCaseId }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [legCaseClients, setLegCaseClients] = useState([]);
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}`,
        );
        const { clients } = response.data.leg_case; // البيانات المرتبطة بالعملاء
        setLegCaseClients(clients);
      } catch (error) {
        console.error('Error fetching legal case data:', error);
      }
    };

    fetchData();
  }, [legCaseId]);

  const handleAddNewClient = () => {
    setLegCaseNewClients((prevClients) => [...prevClients, { client_id: '' }]);
  };

  const handleRemoveNewClient = (index) => {
    setLegCaseNewClients((prevClients) =>
      prevClients.filter((_, i) => i !== index),
    );
  };

  const handleNewClientChange = (e, index) => {
    const updatedClients = [...legCaseNewClients];
    updatedClients[index].client_id = e.target.value;
    setLegCaseNewClients(updatedClients);
  };

  const handleAddLegCaseClients = async () => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/add_clients`,
        {
          clients: legCaseNewClients.filter((client) => client.client_id),
        },
      );
      setSuccess(response.data.message);
      setError('');
      setLegCaseClients((prevClients) => [
        ...prevClients,
        ...legCaseNewClients.map((client) => ({
          ...client,
          name: client.client_id, // أضف بيانات إضافية إذا كانت موجودة
        })),
      ]);
      setLegCaseNewClients([]);
    } catch (error) {
      setError('Error adding clients: ' + error.message);
      setSuccess('');
    }
  };

  const handleRemoveClient = (clientId) => {
    axios
      .delete(
        `${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/remove_client/${clientId}`,
      )
      .then(() => {
        setLegCaseClients((prevClients) =>
          prevClients.filter((client) => client.id !== clientId),
        );
      })
      .catch((error) => {
        console.error('Error removing client:', error);
      });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-center  items-center mb-6">
        <h3 className="text-2xl font-bold text-avocat-indigo-dark  dark:text-avocat-orange">
          بيانات الموكل
        </h3>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}

        <button
          onClick={handleAddNewClient}
          className="flex items-center bg-avocat-indigo-dark hover:bg-avocat-orange-dark text-white px-4 py-2 rounded shadow-md transition duration-300"
        >
          إضافة موكل <BiPlusCircle className="ml-2" />
        </button>
      <div className="overflow-auto mt-4">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <tr>
              <th className="px-4 py-2">رقم المكتب</th>
              <th className="px-4 py-2">اسم الموكل</th>
              <th className="px-4 py-2">رقم الهاتف</th>
              <th className="px-4 py-2 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {legCaseClients.length > 0 ? (
              legCaseClients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2">{client.slug}</td>
                  <td className="px-4 py-2">{client.name}</td>
                  <td className="px-4 py-2">{client.phone_number}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveClient(client.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-md transition duration-300"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  لا يوجد عملاء مرتبطين بالقضية حاليًا
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {legCaseNewClients.map((client, index) => (
        <div key={index} className="flex items-center gap-4 mb-4">
          <input
            value={client.client_id}
            onChange={(e) => handleNewClientChange(e, index)}
            placeholder="اسم العميل"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button
            onClick={() => handleRemoveNewClient(index)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-md transition duration-300"
          >
            <BiMinusCircle />
          </button>
        </div>
      ))}
      {legCaseNewClients.length > 0 && (
        <button
          onClick={handleAddLegCaseClients}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
        >
          حفظ
        </button>
      )}
    </div>
  );
}
