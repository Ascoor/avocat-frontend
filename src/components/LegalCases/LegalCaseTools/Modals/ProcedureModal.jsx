import React, { useState, useEffect } from 'react';
import {
  createProcedure,
  updateProcedure,
  getProcedureTypes,
  getProcedurePlaceTypes,
} from '../../../../services/api/procedures';
import { getLawyers } from '../../../../services/api/lawyers';
import useAuth from '../../../auth/AuthUser';

const ProcedureModal = ({
  isOpen,
  onClose,
  onSubmit,
  legalCaseId,
  initialData = {},
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    job: '',
    date_start: '',
    date_end: '',
    cost: '',
    cost2: '',
    cost3: '',
    procedure_type_id: '',
    lawyer_id: '',
    procedure_place_type_id: '',
    procedure_place_name: '',
    result: '',
    status: 'جاري التنفيذ',
    leg_case_id: legalCaseId,
  });

  const [procedureTypes, setProcedureTypes] = useState([]);
  const [procedurePlaceTypes, setProcedurePlaceTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const {user } =useAuth();

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
/**
            'procedure_type_id' => 'required|exists:procedure_types,id',
            'leg_case_id' => 'required|exists:leg_cases,id',
            'procedure_place_name' => 'nullable|string',
            'procedure_place_type_id' => 'nullable|exists:procedure_place_types,id',
            'lawyer_id' => 'nullable|exists:lawyers,id',
            'job' => 'required|string',
            'result' => 'nullable|string',
            'note' => 'nullable|string',
            'status' => 'required|in:تمت,لم ينفذ,جاري التنفيذ',
            'event_id' => 'nullable|exists:events,id',
            'date_start' => 'nullable|date',
            'date_end' => 'nullable|date',
            'cost1' => 'nullable|numeric',
            'cost2' => 'nullable|numeric',
            'cost3' => 'nullable|numeric',
            'created_by' => 'required|exists:users,id', */
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
      
        job: initialData.job,
        date_start: initialData.date_start,
        date_end: initialData.date_end,
        cost: initialData.cost,
        cost2: initialData.cost2,
        cost3: initialData.cost3,
        procedure_type_id: initialData.procedure_type_id,
        lawyer_id: initialData.lawyer_id,
        procedure_place_type_id: initialData.procedure_place_type_id,
        procedure_place_name: initialData.procedure_place_name,
        result: initialData.result,
        status: initialData.status,
        leg_case_id: legalCaseId,
        updated_by: user.id
      });
    } else {
      setFormData({
      
        job: '',
        date_start: '',
        date_end: '',
        cost: '',
        cost2: '',
        cost3: '',
        procedure_type_id: '',
        lawyer_id: '',
        procedure_place_type_id: '',
        procedure_place_name: '',
        result: '',
        status: 'جاري التنفيذ',
        leg_case_id: legalCaseId,
        created_by: user.id
      });
    }
  }, [isEdit, initialData, legalCaseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const response = await updateProcedure(initialData.id, formData);
        console.log('Procedure updated:', response);
      } else {
        const response = await createProcedure(formData);
        console.log('Procedure created:', response);
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full sm:max-w-md md:max-w-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {isEdit ? 'تحديث الإجراء' : 'إضافة إجراء جديد'}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[70vh] overflow-y-auto pr-4"
        >
          {[
            { name: 'job', label: 'المطلوب', type: 'text' },
            { name: 'date_start', label: 'تاريخ البدء', type: 'date' },
            { name: 'date_end', label: 'تاريخ الانتهاء', type: 'date' },
            { name: 'cost', label: 'التكلفة', type: 'number' },
            { name: 'cost2', label: 'التكلفة 2', type: 'number' },
            { name: 'cost3', label: 'التكلفة 3', type: 'number' },
            { name: 'procedure_place_name', label: 'اسم الجهة', type: 'text' },
            { name: 'result', label: 'النتيجة', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                required={field.name !== 'cost2' && field.name !== 'cost3'}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              نوع الإجراء
            </label>
            <select
              name="procedure_type_id"
              value={formData.procedure_type_id}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              المحامي
            </label>
            <select
              name="lawyer_id"
              value={formData.lawyer_id}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
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
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {isEdit ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcedureModal;
