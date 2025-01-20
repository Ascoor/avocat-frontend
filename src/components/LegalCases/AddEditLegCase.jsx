import { useState, useEffect } from 'react';
import axios from 'axios';

import API_CONFIG from '../../config/config';
import useAuth from '../auth/AuthUser';

const AddEditLegCase = ({ onClose, isEditing, editingLegCase }) => {
  const { getUser } = useAuth();
  const [caseData, setCaseData] = useState({
    slug: '',
    title: '',
    description: '',
    case_type_id: '',
    case_sub_type_id: '',
    client_capacity: '',
    litigants_name: '',
    litigants_phone: '',
    created_by: getUser().id,
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);

  useEffect(() => {
    fetchCaseTypes();
  }, []); // إزالة التبعيات لتجنب التكرار المستمر

  useEffect(() => {
    if (isEditing && editingLegCase) {
      setCaseData(editingLegCase);
      const selectedCaseType = caseTypes.find(
        (type) => type.id === editingLegCase.case_type_id,
      );
      if (selectedCaseType) {
        setCaseSubTypes(selectedCaseType.case_sub_types);
        setCaseData((prevData) => ({
          ...prevData,
          case_sub_type_id: editingLegCase.case_sub_type_id,
        }));
      }
    } else {
      setCaseData({
        slug: '',
        title: '',
        description: '',
        case_type_id: '',
        case_sub_type_id: '',
        client_capacity: '',
        litigants_name: '',
        litigants_phone: '',
        created_by: getUser().id,
      });
      setCaseSubTypes([]); // تفريغ التصنيفات الفرعية للإضافة
    }
  }, [isEditing, editingLegCase, caseTypes]);

  const fetchCaseTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal-case/case-types-sub-types`,
      );
      setCaseTypes(response.data.caseTypes);
    } catch (error) {
      console.error('Error fetching case types:', error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCaseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCaseTypeChange = (event) => {
    const newCaseTypeId = event.target.value;
    setCaseData((prevData) => ({
      ...prevData,
      case_type_id: newCaseTypeId,
      case_sub_type_id: '',
    }));

    // تحديث قائمة التصنيفات الفرعية بناءً على التصنيف المحدد
    const selectedCaseType = caseTypes.find(
      (type) => type.id.toString() === newCaseTypeId,
    );
    setCaseSubTypes(selectedCaseType ? selectedCaseType.case_sub_types : []);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    let dataToSend = { ...caseData };
    if (isEditing) {
      dataToSend = { ...dataToSend, updated_by: getUser().id };
    }

    try {
      const method = isEditing ? 'put' : 'post';
      const url = `${API_CONFIG.baseURL}/api/legal-cases${isEditing ? `/${editingLegCase.id}` : ''}`;
      await axios[method](url, dataToSend);

      onClose();
    } catch (error) {
      setAlertMessage('Error: ' + error.message);
      setShowAlert(true);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-lg font-medium">
            {isEditing ? 'تعديل بيانات القضية' : 'إضافة قضية'}
          </h5>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <form noValidate validated={validated} onSubmit={handleSubmit}>
            {showAlert && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <span className="block">{alertMessage}</span>
                <button
                  onClick={() => setShowAlert(false)}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  &times;
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-sm font-medium">رقم الملف</label>
                <input
                  type="text"
                  placeholder="Enter slug"
                  name="slug"
                  value={caseData.slug}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <div className="text-red-600 text-sm">
                  لم تقم بإضافة رقم ملف المكتب
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">صفة الإدعاء</label>
                <select
                  name="client_capacity"
                  value={caseData.client_capacity}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">اختر صفة الإدعاء</option>
                  <option value="مدعى عليه">مدعى عليه</option>
                  <option value="مجنى عليه">مجنى عليه</option>
                  <option value="مدعى">مدعى</option>
                  <option value="متهم">متهم</option>
                </select>
                <div className="text-red-600 text-sm">
                  يجب اختيار صفة الإدعاء
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-sm font-medium">نوع القضية</label>
                <select
                  name="case_type_id"
                  onChange={handleCaseTypeChange}
                  value={caseData.case_type_id}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">اختر نوع القضية</option>
                  {caseTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  نوع القضية الفرعي
                </label>
                <select
                  name="case_sub_type_id"
                  onChange={handleInputChange}
                  value={caseData.case_sub_type_id}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">اختر نوع القضية الفرعي</option>
                  {caseSubTypes.map((subType) => (
                    <option key={subType.id} value={subType.id}>
                      {subType.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-sm font-medium">
                  موضوع الدعوى
                </label>
                <input
                  type="text"
                  name="title"
                  value={caseData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <div className="text-red-600 text-sm">
                  يجب إدخال موضوع الدعوى
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">الوصف</label>
                <textarea
                  rows={3}
                  name="description"
                  value={caseData.description}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <div className="text-red-600 text-sm">يجب إدخال الوصف</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-sm font-medium">وكيل الخصم</label>
                <input
                  type="text"
                  name="litigants_name"
                  value={caseData.litigants_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  رقم هاتف وكيل الخصم
                </label>
                <input
                  type="text"
                  name="litigants_phone"
                  value={caseData.litigants_phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'تحديث' : 'حفظ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditLegCase;
