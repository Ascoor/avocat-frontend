import { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../config/config';
import GlobalModal from '../common/GlobalModal';  // ✅ استخدام المودال العالمي

const AddEditServiceModal = ({ show, handleClose, service, isEditing, onSaved }) => {
  const [formData, setFormData] = useState({
    slug: '',
    service_type_id: '',
    description: '',
    service_place_name: '',
    status: 'active',
    service_year: '',
    created_by: '',
    client_id: '',
    unclient_id: '',
  });

  const [serviceTypes, setServiceTypes] = useState([]);
  const [clients, setClients] = useState([]);
  const [unclients, setUnclients] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('client');  // ✅ تحديد نوع المستخدم

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ جلب بيانات أنواع الخدمات والعملاء وغير العملاء
  useEffect(() => {
    axios.get(`${API_CONFIG.baseURL}/api/service-types`)
      .then(response => setServiceTypes(response.data))
      .catch(error => console.error('Error fetching service types:', error));

    axios.get(`${API_CONFIG.baseURL}/api/clients`)
      .then(response => setClients(response.data.clients))
      .catch(error => console.error('Error fetching clients:', error));

    axios.get(`${API_CONFIG.baseURL}/api/unclients`)
      .then(response => setUnclients(response.data.unclients))
      .catch(error => console.error('Error fetching unclients:', error));
  }, []);

  // ✅ تعبئة البيانات عند التعديل
  useEffect(() => {
    if (isEditing && service) {
      setFormData({
        slug: service.slug || '',
        service_type_id: service.service_type_id || '',
        description: service.description || '',
        service_place_name: service.service_place_name || '',
        status: service.status || 'active',
        service_year: service.service_year || '',
        created_by: service.created_by?.id || '',
        client_id: service.clients.length > 0 ? service.clients[0].id : '',
        unclient_id: service.unclients.length > 0 ? service.unclients[0].id : '',
      });

      // ✅ تحديد نوع المستخدم بناءً على البيانات
      if (service.clients.length > 0) {
        setSelectedUserType('client');
      } else if (service.unclients.length > 0) {
        setSelectedUserType('unclient');
      }
    }
  }, [isEditing, service]);

  // ✅ تحديث الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ تغيير نوع المستخدم
  const handleUserTypeChange = (e) => {
    const userType = e.target.value;
    setSelectedUserType(userType);
    setFormData({ ...formData, client_id: '', unclient_id: '' });
  };

  // ✅ إرسال البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        client_id: selectedUserType === 'client' ? formData.client_id : null,
        unclient_id: selectedUserType === 'unclient' ? formData.unclient_id : null,
      };

      if (isEditing) {
        await axios.put(`${API_CONFIG.baseURL}/api/services/${service.id}`, payload);
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/services`, payload);
      }

      onSaved();
      handleClose();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <GlobalModal isOpen={show} onClose={handleClose} title={isEditing ? 'تعديل الخدمة' : 'إضافة خدمة'} size="lg">
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ رمز الخدمة */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">الرمز</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* ✅ نوع الخدمة */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">نوع الخدمة</label>
          <select
            name="service_type_id"
            value={formData.service_type_id}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">اختر نوع الخدمة</option>
            {serviceTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        {/* ✅ اختيار نوع المستخدم */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">نوع المستخدم</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="client"
                checked={selectedUserType === 'client'}
                onChange={handleUserTypeChange}
                className="mr-2"
              />
              عميل
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="unclient"
                checked={selectedUserType === 'unclient'}
                onChange={handleUserTypeChange}
                className="mr-2"
              />
              غير عميل
            </label>
          </div>
        </div>

        {/* ✅ اختيار العميل أو غير العميل */}
        {selectedUserType === 'client' && (
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">اختر العميل</label>
            <select
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="">اختر عميل</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
        )}

        {selectedUserType === 'unclient' && (
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">اختر غير العميل</label>
            <select
              name="unclient_id"
              value={formData.unclient_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="">اختر غير عميل</option>
              {unclients.map(unclient => (
                <option key={unclient.id} value={unclient.id}>{unclient.name}</option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'جاري الحفظ...' : isEditing ? 'تحديث' : 'إضافة'}
        </button>
      </form>
    </GlobalModal>
  );
};

export default AddEditServiceModal;
