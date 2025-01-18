import { useEffect, useState, useCallback } from 'react';
import { getLawyers, createLawyer, updateLawyer, deleteLawyer } from '../services/api/lawyers';
import { FaEdit, FaTrash } from 'react-icons/fa';
import LawyerAddEdit from '../components/Lawyers/lawyerAddEdit';
import SectionHeader from '../components/common/SectionHeader';
import { LawyerIcon } from '../assets/icons';
import TableComponent from '../components/common/TableComponent';

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState(null);

  // ✅ جلب بيانات المحامين
  const fetchLawyers = useCallback(async () => {
    try {
      const response = await getLawyers();
      setLawyers(response.data);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب المحامين:', error);
    }
  }, []);

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  // ✅ إضافة محامي
  const handleAddLawyer = async (formData) => {
    try {
      await createLawyer(formData);
      fetchLawyers();
      setShowModal(false);
    } catch (error) {
      console.error('خطأ أثناء إضافة محامي:', error);
    }
  };

  // ✅ تعديل محامي
  const handleEditLawyer = async (formData) => {
    try {
      await updateLawyer(editingLawyer.id, formData);
      fetchLawyers();
      setShowModal(false);
    } catch (error) {
      console.error('خطأ أثناء تعديل محامي:', error);
    }
  };

  // ✅ حذف محامي
  const handleDeleteLawyer = async (lawyerId) => {
    try {
      await deleteLawyer(lawyerId);
      fetchLawyers();
    } catch (error) {
      console.error('خطأ أثناء حذف محامي:', error);
    }
  };

  // ✅ عرض نافذة التعديل
  const handleShowEditModal = (lawyer) => {
    setEditingLawyer(lawyer);
    setShowModal(true);
  };

  // ✅ إعداد رؤوس الجدول
  const headers = [
    { key: 'name', text: 'الاسم' },
    { key: 'birthdate', text: 'تاريخ الميلاد' },
    { key: 'identity_number', text: 'رقم الهوية' },
    { key: 'law_reg_num', text: 'رقم تسجيل المحاماة' },
    { key: 'lawyer_class', text: 'فئة المحامي' },
    { key: 'email', text: 'البريد الإلكتروني' },
    { key: 'phone_number', text: 'رقم الهاتف' },
  ];

  // ✅ عرض مخصص للتحكم
  const customRenderers = {
    actions: (lawyer) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShowEditModal(lawyer)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleteLawyer(lawyer.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    ),
  };

  // ✅ زر إضافة محامي
  const renderAddButton = () => (
    <button
      onClick={() => {
        setEditingLawyer(null);
        setShowModal(true);
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
    >
      إضافة محامي
    </button>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <SectionHeader listName="المحامون" icon={LawyerIcon} />

      <TableComponent
        data={lawyers}
        headers={headers}
        customRenderers={customRenderers}
        onEdit={handleShowEditModal}
        onDelete={handleDeleteLawyer}
        sectionName="lawyers"
        renderAddButton={renderAddButton}
      />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editingLawyer ? 'تعديل محامي' : 'إضافة محامي'}
            </h3>
            <LawyerAddEdit
              onSubmit={editingLawyer ? handleEditLawyer : handleAddLawyer}
              initialValues={editingLawyer}
            />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lawyers;
