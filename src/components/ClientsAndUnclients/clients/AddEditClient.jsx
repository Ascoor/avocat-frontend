import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';
import API_CONFIG from '../../../config/config';
import GlobalModal from '../../common/GlobalModal';

const AddEditClient = ({ client = {}, isOpen, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    slug: client?.slug ?? '',
    name: client?.name ?? '',
    gender: client?.gender ?? '',
    identity_number: client?.identity_number ?? '',
    date_of_birth: client?.date_of_birth ? moment(client.date_of_birth).toDate() : new Date(),
    address: client?.address ?? '',
    religion: client?.religion ?? '',
    work: client?.work ?? '',
    email: client?.email ?? '',
    phone_number: client?.phone_number ?? '',
    emergency_number: client?.emergency_number ?? '',
  });

  useEffect(() => {
    setFormData({
      ...client,
      date_of_birth: client?.date_of_birth ? moment(client.date_of_birth).toDate() : new Date(),
    });
  }, [client]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleDateChange = (date) => setFormData({ ...formData, date_of_birth: date });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = {
      ...formData,
      date_of_birth: formData.date_of_birth ? moment(formData.date_of_birth).format('YYYY-MM-DD') : null,
    };

    try {
      if (client.id) {
        await axios.put(`${API_CONFIG.baseURL}/api/clients/${client.id}`, clientData);
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/clients`, clientData);
      }
      onSaved();
      onClose();
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={client?.id ? 'تعديل العميل' : 'إضافة عميل'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1   text-right">الاسم الكامل</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">نوع العميل</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">الجنس</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-3 border rounded-lg">
            <option value="">اختر الجنس</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
        </div>
        <div>
          <label className="block mb-1  text-right">رقم الهوية</label>
          <input type="text" name="identity_number" value={formData.identity_number} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">تاريخ الميلاد</label>
          <DatePicker selected={formData.date_of_birth} onChange={handleDateChange} className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">العنوان</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">الديانة</label>
          <input type="text" name="religion" value={formData.religion} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">الوظيفة</label>
          <input type="text" name="work" value={formData.work} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">البريد الإلكتروني</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">رقم الهاتف</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block mb-1  text-right">رقم الطوارئ</label>
          <input type="text" name="emergency_number" value={formData.emergency_number} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-500 text-white rounded-lg">إلغاء</button>
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg">حفظ</button>
        </div>
      </form>
    </GlobalModal>
  );
};

export default AddEditClient;
