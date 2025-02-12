import { useEffect, useState, useCallback } from 'react';
import {
  getLawyers,
  createLawyer,
  updateLawyer,
  deleteLawyer,
} from '../services/api/lawyers';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import SectionHeader from '../components/common/SectionHeader';
import { LawyerIcon } from '../assets/icons';
import TableComponent from '../components/common/TableComponent';

// Lazy-load LawyerAddEdit (improves performance)
const LawyerAddEdit = lazy(() => import('../components/Lawyers/lawyerAddEdit'));

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState(null);

  // ✅ جلب بيانات المحامين بكفاءة
  const fetchLawyers = useCallback(async () => {
    try {
      const response = await getLawyers();
      setLawyers(response.data);
    } catch (error) {
      console.error('❌ خطأ أثناء جلب المحامين:', error);
    }
  }, []);

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  // ✅ إضافة أو تعديل محامي
  const handleLawyerSubmit = async (formData) => {
    try {
      if (editingLawyer) {
        await updateLawyer(editingLawyer.id, formData);
      } else {
        await createLawyer(formData);
      }
      fetchLawyers();
      setShowModal(false);
    } catch (error) {
      console.error('❌ خطأ أثناء حفظ البيانات:', error);
    }
  };

  // ✅ حذف محامي
  const handleDeleteLawyer = async (lawyerId) => {
    try {
      await deleteLawyer(lawyerId);
      fetchLawyers();
    } catch (error) {
      console.error('❌ خطأ أثناء حذف محامي:', error);
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
          className="text-blue-500 hover:text-blue-700 transition-all duration-200"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleteLawyer(lawyer.id)}
          className="text-red-500 hover:text-red-700 transition-all duration-200"
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
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300"
    >
      ➕ إضافة محامي
    </button>
  );

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
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

      {/* ✅ عرض المودال عند الحاجة فقط */}
      {showModal && (
        <LawyerModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingLawyer ? 'تعديل محامي' : 'إضافة محامي'}
        >
          <Suspense fallback={<p>جاري التحميل...</p>}>
            <LawyerAddEdit onSubmit={handleLawyerSubmit} initialValues={editingLawyer} />
          </Suspense>
        </LawyerModal>
      )}
    </div>
  );
};

export default Lawyers;
