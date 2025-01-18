import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import API_CONFIG from '../../../config/config';

export default function LegalCaseClients({ legCaseId }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);
  const [legCaseClients, setLegCaseClients] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchLegCaseClients = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/clients`
        );
        setLegCaseClients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
        setClients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
    fetchLegCaseClients();
  }, [legCaseId]);

  const handleAddNewClient = () => {
    setLegCaseNewClients((prevClients) => [...prevClients, { client_id: '' }]);
  };

  const handleRemoveNewClient = (index) => {
    setLegCaseNewClients((prevClients) =>
      prevClients.filter((_, i) => i !== index)
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
        }
      );
      setSuccess(response.data.message);
      setError('');
    } catch (error) {
      setError('Error adding clients: ' + error.message);
      setSuccess('');
    }
  };

  const handleRemoveClient = (clientId) => {
    axios
      .delete(
        `${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/remove_client/${clientId}`
      )
      .then(() => {
        setLegCaseClients((prevClients) =>
          prevClients.filter((client) => client.id !== clientId)
        );
      })
      .catch((error) => {
        console.error('Error removing client:', error);
      });
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">بيانات الموكل</h3>
          <div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
          </div>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleAddNewClient}
          >
            إضافة موكل <BiPlusCircle className="ml-2" />
          </button>
        </div>
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">رقم المكتب</th>
                <th className="border border-gray-300 p-2">اسم الموكل</th>
                <th className="border border-gray-300 p-2">رقم الهاتف</th>
                <th className="border border-gray-300 p-2">الحالة</th>
                <th className="border border-gray-300 p-2">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {legCaseClients && legCaseClients.length > 0 ? (
                legCaseClients.map((client) => (
                  <tr key={client.id}>
                    <td className="border border-gray-300 p-2">{client.slug}</td>
                    <td className="border border-gray-300 p-2">{client.name}</td>
                    <td className="border border-gray-300 p-2">{client.phone_number}</td>
                    <td
                      className={`border border-gray-300 p-2 ${
                        client.status === 'active' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {client.status}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRemoveClient(client.id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    لا يوجد عملاء مرتبطين بالقضية حاليًا
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          {legCaseNewClients.map((client, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
              <select
                value={client.client_id}
                onChange={(e) => handleNewClientChange(e, index)}
                className="border border-gray-300 p-2 rounded flex-1"
              >
                <option value="">اختر عميلًا</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleRemoveNewClient(index)}
              >
                <BiMinusCircle />
              </button>
            </div>
          ))}
          {legCaseNewClients.length > 0 && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddLegCaseClients}
            >
              حفظ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
