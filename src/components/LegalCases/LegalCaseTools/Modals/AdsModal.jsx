import React, { useState, useEffect } from "react";
import { BiX } from "react-icons/bi";
import { MdDateRange, MdDescription } from "react-icons/md";
import InputField from "../../../common/InputField"; // تأكد من صحة المسار
import { getLawyers, getCourts, getLegalAdTypes } from "../../../../services/api/legalCases";

const AdsModal = ({ isOpen, onClose, mode, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    description: "",
    results: "",
    send_date: "",
    receive_date: "",
    lawyer_send_id: "",
    lawyer_receive_id: "",
    legal_ad_type_id: "",
    court_id: "",
    cost: "",
    cost2: "",
  });

  const [legalAdTypes, setLegalAdTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        send_date: initialData.send_date || "",
        receive_date: initialData.receive_date || "",
      });
    } else {
      setFormData({
        description: "",
        results: "",
        send_date: "",
        receive_date: "",
        lawyer_send_id: "",
        lawyer_receive_id: "",
        legal_ad_type_id: "",
        court_id: "",
        cost: "",
        cost2: "",
      });
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [lawyersResponse, courtsResponse, legalAdTypesResponse] = await Promise.all([
            getLawyers(),
            getCourts(),
            getLegalAdTypes(),
          ]);
          setLawyers(lawyersResponse.data);
          setCourts(courtsResponse.data);
          setLegalAdTypes(legalAdTypesResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = "يجب إدخال الوصف";
    if (!formData.lawyer_send_id) newErrors.lawyer_send_id = "يجب اختيار المحامي المرسل";
    if (!formData.lawyer_receive_id) newErrors.lawyer_receive_id = "يجب اختيار المحامي المستلم";
    if (!formData.legal_ad_type_id) newErrors.legal_ad_type_id = "يجب اختيار نوع الإعلان";
    if (!formData.court_id) newErrors.court_id = "يجب اختيار المحكمة";
    if (!formData.results) newErrors.results = "يجب إدخال نتائج الإعلان";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      if (validateForm()) {
        onSubmit(formData);
      }
    } else {
      console.error("Error: onSubmit is not a function");
    }
  };

  const isReadOnly = mode === "details";

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-4xl w-full">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {mode === "add" ? "إضافة إعلان قانوني" : mode === "edit" ? "تعديل إعلان قانوني" : "تفاصيل الإعلان"}
          </h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
            <BiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          <InputField label="نوع الإعلان" name="legal_ad_type_id" value={formData.legal_ad_type_id} onChange={handleChange} options={legalAdTypes} readOnly={isReadOnly} placeholder="اختر نوع الإعلان" type="select" error={errors.legal_ad_type_id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="المحامي المرسل" name="lawyer_send_id" value={formData.lawyer_send_id} onChange={handleChange} options={lawyers} readOnly={isReadOnly} placeholder="اختر المحامي المرسل" type="select" error={errors.lawyer_send_id} />
            <InputField label="المحامي المستلم" name="lawyer_receive_id" value={formData.lawyer_receive_id} onChange={handleChange} options={lawyers} readOnly={isReadOnly} placeholder="اختر المحامي المستلم" type="select" error={errors.lawyer_receive_id} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="تاريخ التسليم" name="send_date" value={formData.send_date} onChange={handleChange} placeholder="اختر تاريخ التسليم" type="date" error={errors.send_date} icon={<MdDateRange />} />
            <InputField label="تاريخ الاستلام" name="receive_date" value={formData.receive_date} onChange={handleChange} placeholder="اختر تاريخ الاستلام" type="date" error={errors.receive_date} icon={<MdDateRange />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="المحكمة" name="court_id" value={formData.court_id} onChange={handleChange} options={courts} readOnly={isReadOnly} placeholder="اختر المحكمة" type="select" error={errors.court_id} />
            <InputField label="الوصف" name="description" value={formData.description} onChange={handleChange} readOnly={isReadOnly} placeholder="أدخل وصف الإعلان" type="text" error={errors.description} icon={<MdDescription />} />
          </div>

          {!isReadOnly && (
            <div className="flex justify-end gap-6 mt-6">
              <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg">إلغاء</button>
              <button type="submit" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">{mode === "add" ? "إضافة" : "حفظ"}</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdsModal;
