import { useState, useEffect, useCallback } from 'react';
import { useAlert } from '../../context/AlertContext';
import {
  getProcedureTypes,
  createProcedureType,
  updateProcedureType,
  deleteProcedureType,
} from '../../services/api/procedures';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { ProcedureIcon } from '../../assets/icons';

const ProcedureTypes = () => {
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProcedureType, setEditingProcedureType] = useState(null);
  const { triggerAlert } = useAlert();
  const itemsPerPage = 10; // عرض 10 صفوف في كل صفحة

  // جلب البيانات
  const fetchProcedureTypes = useCallback(async () => {
    try {
      const response = await getProcedureTypes();
      setProcedureTypes(response.data);
    } catch (error) {
      console.error('خطأ أثناء جلب البيانات:', error);
      triggerAlert('error', 'حدث خطأ أثناء جلب البيانات.');
    }
  }, [triggerAlert]);

  useEffect(() => {
    fetchProcedureTypes();
  }, [fetchProcedureTypes]);

  // إضافة نوع جديد
  const handleAddProcedureType = async (formData) => {
    try {
      await createProcedureType(formData);
      fetchProcedureTypes();
      setShowModal(false);
      triggerAlert('success', 'تم إضافة نوع الإجراء بنجاح.');
    } catch (error) {
      console.error('خطأ أثناء إضافة النوع:', error);
      triggerAlert('error', 'حدث خطأ أثناء إضافة النوع.');
    }
  };

  // تعديل نوع موجود
  const handleEditProcedureType = async (formData) => {
    try {
      await updateProcedureType(editingProcedureType.id, formData);
      fetchProcedureTypes();
      setShowModal(false);
      triggerAlert('success', 'تم تعديل نوع الإجراء بنجاح.');
    } catch (error) {
      console.error('خطأ أثناء تعديل النوع:', error);
      triggerAlert('error', 'حدث خطأ أثناء تعديل النوع.');
    }
  };

  // حذف نوع
  const handleDeleteProcedureType = async (procedureTypeId) => {
    try {
      await deleteProcedureType(procedureTypeId);
      fetchProcedureTypes();
      triggerAlert('success', 'تم حذف نوع الإجراء بنجاح.');
    } catch (error) {
      console.error('خطأ أثناء حذف النوع:', error);
      triggerAlert('error', 'حدث خطأ أثناء حذف النوع.');
    }
  };

  // عرض نافذة التعديل
  const handleShowEditModal = (procedureType) => {
    setEditingProcedureType(procedureType);
    setShowModal(true);
  };

  // حساب الفهرس الأول والفهرس الأخير للصفوف التي سيتم عرضها
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = procedureTypes.slice(indexOfFirstItem, indexOfLastItem);

  // عرض مخصص للتحكم
  const customRenderers = {
    actions: (procedureType) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShowEditModal(procedureType)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleteProcedureType(procedureType.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    ),
  };

  // زر إضافة نوع
  const renderAddButton = () => (
    <button
      onClick={() => {
        setEditingProcedureType(null);
        setShowModal(true);
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
    >
      إضافة نوع إجراء
    </button>
  );

  // التعامل مع تغيير الصفحة
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(procedureTypes.length / itemsPerPage);

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      <SectionHeader listName="أنواع الإجراءات" icon={ProcedureIcon} />

      {/* زر إضافة نوع الإجراء */}
      <div className="flex justify-start mt-6">{renderAddButton()}</div>

      {/* نموذج إضافة/تعديل نوع الإجراء */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editingProcedureType ? 'تعديل نوع الإجراء' : 'إضافة نوع الإجراء'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingProcedureType
                  ? handleEditProcedureType(new FormData(e.target))
                  : handleAddProcedureType(new FormData(e.target));
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  اسم نوع الإجراء
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editingProcedureType?.name || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  إغلاق
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {editingProcedureType
                    ? 'تعديل نوع الإجراء'
                    : 'إضافة نوع الإجراء'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* عرض جدول الإجراءات */}
      <div className="overflow-x-auto mt-6 shadow rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">الاسم</th>
              <th className="px-4 py-2 border border-gray-300">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((procedureType) => (
              <tr key={procedureType.id}>
                <td className="px-4 py-2 border border-gray-300">
                  {procedureType.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShowEditModal(procedureType)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProcedureType(procedureType.id)
                      }
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

      {/* التنقل بين الصفحات */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          السابق
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default ProcedureTypes;
