import { useState, useEffect } from 'react';
import {
  FaOrcid,
  FaUserEdit,
  FaIdCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaPray,
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import API_CONFIG from '../../../config/config';

function AddEditUnclient({ unclient = {}, isOpen, onClose, onSaved }) {
  const isEditMode = !!unclient?.id;
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    identity_number: '',
    date_of_birth: '',
    address: '',
    religion: '',
    work: '',
    email: '',
    phone_number: '',
    emergency_number: '',
    slug: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        ...unclient,
        date_of_birth: unclient.date_of_birth
          ? new Date(unclient.date_of_birth)
          : '',
      });
    } else {
      resetForm();
    }
  }, [unclient]);

  const resetForm = () => {
    setFormData({
      name: '',
      gender: '',
      identity_number: '',
      date_of_birth: '',
      address: '',
      religion: '',
      work: '',
      email: '',
      phone_number: '',
      emergency_number: '',
      slug: '',
    });
    setValidationErrors({});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  const formatDateForBackend = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'الاسم مطلوب';
    if (!formData.slug) errors.slug = 'رقم العميل مطلوب';
    if (formData.phone_number && formData.phone_number.length !== 11)
      errors.phone_number = 'يجب أن يكون رقم الهاتف مكونًا من 11 رقمًا';
    if (formData.identity_number && formData.identity_number.length !== 14)
      errors.identity_number = 'رقم الهوية يجب أن يكون مكونًا من 14 رقمًا';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const formattedData = {
      ...formData,
      date_of_birth: formatDateForBackend(formData.date_of_birth),
    };

    try {
      const response = isEditMode
        ? await axios.put(
            `${API_CONFIG.baseURL}/api/unclients/${unclient.id}`,
            formattedData,
          )
        : await axios.post(
            `${API_CONFIG.baseURL}/api/unclients`,
            formattedData,
          );

      onSaved(response.data.message || 'تم الحفظ بنجاح');
      onClose();
      resetForm();
    } catch (error) {
      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors || {});
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormField = (label, name, type = 'text', placeholder = '') => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          validationErrors[name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {validationErrors[name] && (
        <p className="mt-1 text-xs text-red-600">{validationErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {isEditMode ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {validationErrors.non_field_errors && (
          <div className="mb-4 text-sm text-red-600">
            {validationErrors.non_field_errors.join(', ')}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderFormField('رقم العميل', 'slug', 'text', 'أدخل رقم العميل')}
          {renderFormField('الاسم', 'name', 'text', 'أدخل الاسم')}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="gender"
            >
              الجنس
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر الجنس</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
          </div>
          {renderFormField(
            'رقم الهوية',
            'identity_number',
            'number',
            'أدخل رقم الهوية',
          )}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="date_of_birth"
            >
              تاريخ الميلاد
            </label>
            <DatePicker
              selected={formData.date_of_birth}
              onChange={handleDateChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {renderFormField('العنوان', 'address', 'text', 'أدخل العنوان')}
          {renderFormField(
            'رقم الهاتف',
            'phone_number',
            'tel',
            'أدخل رقم الهاتف',
          )}
          {renderFormField(
            'البريد الإلكتروني',
            'email',
            'email',
            'أدخل البريد الإلكتروني',
          )}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="religion"
            >
              الديانة
            </label>
            <select
              name="religion"
              id="religion"
              value={formData.religion}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر الديانة</option>
              <option value="مسلم">مسلم</option>
              <option value="مسيحي">مسيحي</option>
            </select>
          </div>
          {renderFormField('الوظيفة', 'work', 'text', 'أدخل الوظيفة')}
          {renderFormField(
            'رقم الطوارئ',
            'emergency_number',
            'tel',
            'أدخل رقم الطوارئ',
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'جار التحميل...' : isEditMode ? 'تعديل' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditUnclient;
