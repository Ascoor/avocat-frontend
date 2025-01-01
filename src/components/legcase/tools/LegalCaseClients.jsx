import { useEffect, useState } from 'react';
import axios from 'axios';
import API_CONFIG from '../../../config';

export default function LegalCaseClients({ legCaseId }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [legCaseClients, setLegCaseClients] = useState([]);

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
      await axios.post(
        `${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/add_clients`,
        {
          clients: legCaseNewClients.filter((client) => client.client_id),
        }
      );
      setSuccess('تم إضافة الموكلين بنجاح.');
      setError('');
      setLegCaseNewClients([]);
    } catch (error) {
      setError('حدث خطأ أثناء إضافة الموكلين.');
      setSuccess('');
    }
  };

  const handleRemoveClient = async (clientId) => {
    try {
      await axios.delete(
        `${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/remove_client/${clientId}`
      );
      setLegCaseClients((prevClients) =>
        prevClients.filter((client) => client.id !== clientId)
      );
    } catch (error) {
      console.error('Error removing client:', error);
    }
  };

  return (
    <>
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">بيانات الموكل</h3>
          {error && (
            <div className="text-red-500 bg-red-100 p-2 rounded-md">{error}</div>
          )}
          {success && (
            <div className="text-green-500 bg-green-100 p-2 rounded-md">{success}</div>
          )}
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            onClick={handleAddNewClient}
          >
            إضافة موكل
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">رقم المكتب</th>
                <th className="px-4 py-2">اسم الموكل</th>
                <th className="px-4 py-2">رقم الهاتف</th>
                <th className="px-4 py-2">الحالة</th>
                <th className="px-4 py-2">تحكم</th>
              </tr>
            </thead>
            <tbody>
              {legCaseClients.length > 0 ? (
                legCaseClients.map((client) => (
                  <tr key={client.id} className="border-b">
                    <td className="px-4 py-2">{client.slug}</td>
                    <td className="px-4 py-2">{client.name}</td>
                    <td className="px-4 py-2">{client.phone_number}</td>
                    <td
                      className={`px-4 py-2 ${
                        client.status === 'active'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {client.status}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleRemoveClient(client.id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center">
                    لا يوجد عملاء مرتبطين بالقضية حاليًا
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <form className="mt-4">
          {legCaseNewClients.map((client, index) => (
            <div key={index} className="flex items-center mb-4">
              <select
                className="w-full border rounded-md p-2 mr-4"
                value={client.client_id}
                onChange={(e) => handleNewClientChange(e, index)}
              >
                <option value="">اختر عميلًا</option>
                {clients.map((clientOption) => (
                  <option key={clientOption.id} value={clientOption.id}>
                    {clientOption.name}
                  </option>
                ))}
              </select>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                onClick={() => handleRemoveNewClient(index)}
              >
                حذف
              </button>
            </div>
          ))}

          {legCaseNewClients.length > 0 && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={handleAddLegCaseClients}
            >
              حفظ
            </button>
          )}
        </form>
      </div>
    </>
  );
}
