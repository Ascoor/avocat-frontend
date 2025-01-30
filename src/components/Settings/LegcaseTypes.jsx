import { useState, useEffect, useCallback } from 'react';
import { useAlert } from '../../context/AlertContext';
import {
  getLegcaseTypes,
  getLegcaseSubTypes,
  createLegcaseType,
  createLegcaseSubType,
  updateLegcaseType,
  updateLegcaseSubType,
  deleteLegcaseType,
  deleteLegcaseSubType,
} from '../../services/api/legalCases';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { LegCaseIcon } from '../../assets/icons';

const LegcaseTypes = () => { 
    const [legcaseTypes, setLegcaseTypes] = useState([]); // تخزين أنواع القضايا
    const [legcaseSubTypes, setLegcaseSubTypes] = useState([]); // تخزين الأنواع الفرعية للقضايا
    const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية لأنواع القضايا
    const [currentSubPage, setCurrentSubPage] = useState(1); // الصفحة الحالية للأنواع الفرعية
    const [showModal, setShowModal] = useState(false); // حالة عرض النموذج
    const [editingItem, setEditingItem] = useState(null); // العنصر الحالي للتعديل
    const [isSubType, setIsSubType] = useState(false); // تحديد ما إذا كان التعديل على النوع الفرعي
    const { triggerAlert } = useAlert(); // إشعارات المستخدم
    const itemsPerPage = 10; // عدد العناصر في كل صفحة
  
    // جلب أنواع القضايا
    const fetchLegcaseTypes = useCallback(async () => {
      try {
        const response = await getLegcaseTypes();
        setLegcaseTypes(response.data || []);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب أنواع القضايا:', error);
        triggerAlert('error', 'فشل في جلب أنواع القضايا.');
      }
    }, [triggerAlert]);
  
    // جلب الأنواع الفرعية للقضايا
    const fetchLegcaseSubTypes = useCallback(async () => {
      try {
        const response = await getLegcaseSubTypes();
        setLegcaseSubTypes(response.data || []);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب الأنواع الفرعية للقضايا:', error);
        triggerAlert('error', 'فشل في جلب الأنواع الفرعية للقضايا.');
      }
    }, [triggerAlert]);
  
    // تحميل البيانات عند تشغيل المكون
    useEffect(() => {
      fetchLegcaseTypes();
      fetchLegcaseSubTypes();
    }, [fetchLegcaseTypes, fetchLegcaseSubTypes]);
  
    // حفظ النوع أو النوع الفرعي
    const handleSaveItem = async (formData) => {
      try {
        if (editingItem) {
          if (isSubType) {
            await updateLegcaseSubType(editingItem.id, formData);
          } else {
            await updateLegcaseType(editingItem.id, formData);
          }
          triggerAlert('success', 'تم التحديث بنجاح.');
        } else {
          if (isSubType) {
            await createLegcaseSubType(formData);
          } else {
            await createLegcaseType(formData);
          }
          triggerAlert('success', 'تم الإنشاء بنجاح.');
        }
        fetchLegcaseTypes();
        fetchLegcaseSubTypes();
        setShowModal(false);
      } catch (error) {
        console.error('حدث خطأ أثناء حفظ العنصر:', error);
        triggerAlert('error', 'فشل في الحفظ. حاول مرة أخرى.');
      }
    };
  
    // حذف النوع أو النوع الفرعي
    const handleDeleteItem = async (itemId, isSub) => {
      if (window.confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟')) {
        try {
          if (isSub) {
            await deleteLegcaseSubType(itemId);
          } else {
            await deleteLegcaseType(itemId);
          }
          fetchLegcaseTypes();
          fetchLegcaseSubTypes();
          triggerAlert('success', 'تم الحذف بنجاح.');
        } catch (error) {
          console.error('حدث خطأ أثناء الحذف:', error);
          triggerAlert('error', 'فشل في الحذف.');
        }
      }
    };
  
    // عرض النموذج لإضافة أو تعديل عنصر
    const handleShowModal = (item = null, subType = false) => {
      setEditingItem(item);
      setIsSubType(subType);
      setShowModal(true);
    };
  
    // منطق التصفح بين الصفحات لأنواع القضايا والأنواع الفرعية
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLegcaseTypes = legcaseTypes.slice(indexOfFirstItem, indexOfLastItem);
  
    const indexOfLastSubItem = currentSubPage * itemsPerPage;
    const indexOfFirstSubItem = indexOfLastSubItem - itemsPerPage;
    const currentLegcaseSubTypes = legcaseSubTypes.slice(indexOfFirstSubItem, indexOfLastSubItem);
  
    const totalPages = Math.ceil(legcaseTypes.length / itemsPerPage);
    const totalSubPages = Math.ceil(legcaseSubTypes.length / itemsPerPage);
  
    return (
      <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full bg-gray-50 dark:bg-gray-900">
        <SectionHeader listName="أنواع القضايا والأنواع الفرعية" icon={LegCaseIcon} />
  
        {/* أزرار لإضافة الأنواع والأنواع الفرعية */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handleShowModal(null, false)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            إضافة نوع قضية
          </button>
          <button
            onClick={() => handleShowModal(null, true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            إضافة نوع فرعي
          </button>
        </div>
  
        {/* جدول أنواع القضايا */}
        <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">أنواع القضايا</h3>
        <div className="overflow-x-auto shadow rounded-lg bg-gray-100 dark:bg-gray-800">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                  الاسم
                </th>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              {currentLegcaseTypes.map((type) => (
                <tr
                  key={type.id}
                  className="bg-white text-center dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                    {type.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    <div className="flex items-center justify-center gap-6">
                      <button
                        onClick={() => handleShowModal(type, false)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(type.id, false)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* التصفح بين الصفحات لأنواع القضايا */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            السابق
          </button>
          <span className="text-gray-800 dark:text-gray-100">
            الصفحة {currentPage} من {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            التالي
          </button>
        </div>
  
        {/* جدول الأنواع الفرعية */}
        <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">الأنواع الفرعية للقضايا</h3>
          <div className="overflow-x-auto shadow rounded-lg bg-gray-100 dark:bg-gray-800">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                      الاسم
                  </th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                      النوع الرئيسي
                  </th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                      الإجراءات
                  </th>
                  </tr>
              </thead>
              <tbody>
                  {currentLegcaseSubTypes.map((type) => (
                  <tr
                      key={type.id}
                      className="bg-white text-center dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                      {type.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                      {legcaseTypes.find((mainType) => mainType.id === type.case_type_id)?.name || 'غير محدد'}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                      <div className="flex items-center justify-center gap-6">
                          <button
                          onClick={() => handleShowModal(type, true)}
                          className="text-blue-500 hover:text-blue-700"
                          >
                          <FaEdit />
                          </button>
                          <button
                          onClick={() => handleDeleteItem(type.id, true)}
                          className="text-red-500 hover:text-red-700"
                          >
                          <FaTrash />
                          </button>
                      </div>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
              </div>
  
              {/* التصفح بين الصفحات للأنواع الفرعية */}
              <div className="flex justify-between items-center mt-4">
              <button
                  onClick={() => setCurrentSubPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentSubPage === 1}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
              >
                  السابق
              </button>
              <span className="text-gray-800 dark:text-gray-100">
                  الصفحة {currentSubPage} من {totalSubPages}
              </span>
              <button
                  onClick={() => setCurrentSubPage((prev) => Math.min(prev + 1, totalSubPages))}
                  disabled={currentSubPage === totalSubPages}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
              >
                  التالي
              </button>
      </div>
      </div>
    );
  };
  
  export default LegcaseTypes;
  