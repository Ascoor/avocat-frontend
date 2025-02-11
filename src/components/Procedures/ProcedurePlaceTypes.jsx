import { useState, useEffect, useCallback } from 'react';
import { useAlert } from '../../context/AlertContext';
import {
  getProcedurePlaceTypes,
  createProcedurePlaceType,
  updateProcedurePlaceType,
  deleteProcedurePlaceType,
} from '../../services/api/procedures';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionHeader from '../common/SectionHeader';
import { ProcedurePlaceIcon } from '../../assets/icons';

const ProcedurePlaceTypes = () => {
  const [procedurePlaceTypes, setProcedurePlaceTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingProcedurePlaceType, setEditingProcedurePlaceType] =
    useState(null);
  const { triggerAlert } = useAlert();
  const itemsPerPage = 10;

  // جلب البيانات
  const fetchProcedurePlaceTypes = useCallback(async () => {
    try {
      const response = await getProcedurePlaceTypes();
      setProcedurePlaceTypes(response.data);
    } catch (error) {
      console.error('خطأ أثناء جلب البيانات:', error);
      triggerAlert('error', 'حدث خطأ أثناء جلب البيانات.');
    }
  }, [triggerAlert]);

  useEffect(() => {
    fetchProcedurePlaceTypes();
  }, [fetchProcedurePlaceTypes]);

  // إضافة نوع
  const handleAddProcedurePlaceType = async (formData) => {
    try {
      await createProcedurePlaceType(formData);
      fetchProcedurePlaceTypes();
      setShowModal(false);
      triggerAlert('success', 'تم إضافة جهة الإجراء بنجاح.');
    } catch (error) {
      console.error('خطأ أثناء إضافة الجهة:', error);
      triggerAlert('error', 'حدث خطأ أثناء إضافة الجهة.');
    }
  };

  // تعديل نوع
  const handleEditProcedurePlaceType = async (formData) => {
    try {
      await updateProcedurePlaceType(editingProcedurePlaceType.id, formData);
      fetchProcedurePlaceTypes();
      setShowModal(false);
      triggerAlert('success', 'تم تعديل جهة الإجراء بنجاح.');
    } catch (error) {
      console.error('خطأ أثناء تعديل الجهة:', error);
      triggerAlert('error', 'حدث خطأ أثناء تعديل الجهة.');
    }
  };

  // حذف نوع
  const handleDeleteProcedurePlaceType = async (procedurePlaceTypeId) => {
    try {
      await deleteProcedurePlaceType(procedurePlaceTypeId);
      fetchProcedurePlaceTypes();
      triggerAlert('success', 'تم حذف جهة الإجراء بنجاح.');
    } catch (error) {
      console.error('خطأ أثناء حذف الجهة:', error);
      triggerAlert('error', 'حدث خطأ أثناء حذف الجهة.');
    }
  };

  // عرض نافذة التعديل
  const handleShowEditModal = (procedurePlaceType) => {
    setEditingProcedurePlaceType(procedurePlaceType);
    setShowModal(true);
  };

  // عرض مخصص للتحكم
  const customRenderers = {
    actions: (procedurePlaceType) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShowEditModal(procedurePlaceType)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleteProcedurePlaceType(procedurePlaceType.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    ),
  };

  // حساب الفهرس الأول والفهرس الأخير للصفوف التي سيتم عرضها
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = procedurePlaceTypes.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // التعامل مع تغيير الصفحة
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(procedurePlaceTypes.length / itemsPerPage);

  const renderAddButton = () => (
    <button
      onClick={() => {
        setEditingProcedurePlaceType(null);
        setShowModal(true);
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
    >
      إضافة جهة الإجراء
    </button>
  );

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      <SectionHeader listName="أنواع الجهات" icon={ProcedurePlaceIcon} />
      <div className="flex justify-start mt-6">{renderAddButton()}</div>
      {/* نموذج إضافة/تعديل جهة الإجراء */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editingProcedurePlaceType
                ? 'تعديل جهة الإجراء'
                : 'إضافة جهة الإجراء'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingProcedurePlaceType
                  ? handleEditProcedurePlaceType(new FormData(e.target))
                  : handleAddProcedurePlaceType(new FormData(e.target));
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  اسم جهة الإجراء
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editingProcedurePlaceType?.name || ''}
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
                  {editingProcedurePlaceType
                    ? 'تعديل جهة الإجراء'
                    : 'إضافة جهة الإجراء'}
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
            {currentItems.map((procedurePlaceType) => (
              <tr key={procedurePlaceType.id}>
                <td className="px-4 py-2 border border-gray-300">
                  {procedurePlaceType.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShowEditModal(procedurePlaceType)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteProcedurePlaceType(procedurePlaceType.id)
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

      {/* زر إضافة جهة */}

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

export default ProcedurePlaceTypes;
