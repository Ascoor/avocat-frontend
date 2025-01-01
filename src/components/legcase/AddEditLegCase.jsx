import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';

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
  }, []);

  useEffect(() => {
    if (isEditing && editingLegCase) {
      setCaseData(editingLegCase);
      const selectedCaseType = caseTypes.find(
        (type) => type.id === editingLegCase.case_type_id
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
      setCaseSubTypes([]);
    }
  }, [isEditing, editingLegCase, caseTypes]);

  const fetchCaseTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal-case/case-types-sub-types`
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

    const selectedCaseType = caseTypes.find(
      (type) => type.id.toString() === newCaseTypeId
    );
    setCaseSubTypes(selectedCaseType ? selectedCaseType.case_sub_types : []);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!caseData.slug || !caseData.title || !caseData.description) {
      setValidated(true);
      return;
    }

    let dataToSend = { ...caseData };
    if (isEditing) {
      dataToSend = { ...dataToSend, updated_by: getUser().id };
    }

    try {
      const method = isEditing ? 'put' : 'post';
      const url = `${API_CONFIG.baseURL}/api/legal-cases${
        isEditing ? `/${editingLegCase.id}` : ''
      }`;
      await axios[method](url, dataToSend);

      onClose();
    } catch (error) {
      setAlertMessage('Error: ' + error.message);
      setShowAlert(true);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {isEditing ? 'تعديل بيانات القضية' : 'إضافة قضية'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {showAlert && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
              {alertMessage}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="slug" className="block text-sm font-medium">
                رقم الملف
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={caseData.slug}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="client_capacity" className="block text-sm font-medium">
                صفة الإدعاء
              </label>
              <select
                id="client_capacity"
                name="client_capacity"
                value={caseData.client_capacity}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500"
                required
              >
                <option value="">اختر صفة الإدعاء</option>
                <option value="مدعى عليه">مدعى عليه</option>
                <option value="مجنى عليه">مجنى عليه</option>
                <option value="مدعى">مدعى</option>
                <option value="متهم">متهم</option>
              </select>
            </div>
          </div>
          {/* باقي الحقول بنفس الفلسفة */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ml-2"
            >
              {isEditing ? 'تحديث' : 'حفظ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditLegCase;
