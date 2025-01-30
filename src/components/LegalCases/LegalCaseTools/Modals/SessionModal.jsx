import React, { useState, useEffect } from 'react';
import {
  createProcedure,
  updateProcedure,
  getProcedureTypes,
  getProcedurePlaceTypes,
} from '../../../../services/api/procedures';
import { getLawyers } from '../../../../services/api/lawyers';

const SessionModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    procedure_type_id: '',
    procedure_place_id: '',
    procedure_place_name: '',
    lawyer_id: '',
    job: '',
    date_start: '',
    date_end: '',
    status: 'جاري التنفيذ',
  });

  const [procedureTypes, setProcedureTypes] = useState([]);
  const [procedurePlaceTypes, setProcedurePlaceTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [typesResponse, placesResponse, lawyersResponse] = await Promise.all([
          getProcedureTypes(),
          getProcedurePlaceTypes(),
          getLawyers(),
        ]);
        setProcedureTypes(typesResponse.data);
        setProcedurePlaceTypes(placesResponse.data);
        setLawyers(lawyersResponse.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        procedure_type_id: initialData.procedure_type?.id || '',
        procedure_place_id: initialData.procedure_place_id || '',
        procedure_place_name: initialData.procedure_place_name || '',
        lawyer_id: initialData.lawyer?.id || '',
        job: initialData.job || '',
        date_start: initialData.date_start || '',
        date_end: initialData.date_end || '',
        status: initialData.status || 'جاري التنفيذ',
      });
    } else if (!isEdit) {
      setFormData({
        procedure_type_id: '',
        procedure_place_id: '',
        procedure_place_name: '',
        lawyer_id: '',
        job: '',
        date_start: '',
        date_end: '',
        status: 'جاري التنفيذ',
      });
    }
  }, [isEdit, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProcedure(initialData.id, formData);
      } else {
        await createProcedure(formData);
      }
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting procedure:', error);
    }
  };

  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>

        <h2 className="text-xl font-bold mb-4">
          {isEdit ? 'تحديث الإجراء' : 'إضافة إجراء جديد'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Procedure Type Dropdown */}
            <div>
              <label className="block text-gray-700">نوع الإجراء</label>
              <select
                name="procedure_type_id"
                value={formData.procedure_type_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">اختر نوع الإجراء</option>
                {procedureTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Procedure Place Dropdown */}
            <div>
              <label className="block text-gray-700">مكان الإجراء</label>
              <select
                name="procedure_place_id"
                value={formData.procedure_place_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">اختر مكان الإجراء</option>
                {procedurePlaceTypes.map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Procedure Place Name */}
            <div>
              <label className="block text-gray-700">اسم مكان الإجراء</label>
              <input
                type="text"
                name="procedure_place_name"
                value={formData.procedure_place_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            
            {/* Lawyer Dropdown */}
            <div>
              <label className="block text-gray-700">المحامي</label>
              <select
                name="lawyer_id"
                value={formData.lawyer_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="">اختر المحامي</option>
                {lawyers.map((lawyer) => (
                  <option key={lawyer.id} value={lawyer.id}>
                    {lawyer.name}
                  </option>
                ))}
              </select>
            </div>


            {/* Job */}
            <div>
              <label className="block text-gray-700">المطلوب</label>
              <input
                type="text"
                name="job"
                value={formData.job}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Date Start */}
            <div>
              <label className="block text-gray-700">تاريخ البدء</label>
              <input
                type="date"
                name="date_start"
                value={formData.date_start}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Date End */}
            <div>
              <label className="block text-gray-700">تاريخ الانتهاء</label>
              <input
                type="date"
                name="date_end"
                value={formData.date_end}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEdit ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
