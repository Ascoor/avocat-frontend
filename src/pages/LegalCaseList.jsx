import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillDelete, AiFillEye } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';

import API_CONFIG from '../config/config';
import AddEditLegCase from '../components/LegalCases/AddEditLegCase';
import SectionHeader from '../components/common/SectionHeader';
import TableComponent from '../components/common/TableComponent';
import { LegCaseIcon } from '../assets/icons';

const LegalCasesIndex = () => {
  const [legCases, setLegCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLegCase, setEditingLegCase] = useState(null);

  const itemsPerPage = 10;

  // ✅ جلب القضايا القانونية
  const fetchLegCases = useCallback(async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/legal-cases`);
      setLegCases(response.data);
    } catch (error) {
      console.error('Error fetching legal cases:', error);
    }
  }, []);

  useEffect(() => {
    fetchLegCases();
  }, [fetchLegCases]);

  // ✅ فتح المودال للإضافة أو التعديل
  const handleAddEditModal = (legCase = null) => {
    setEditingLegCase(legCase);
    setIsEditing(!!legCase);
    setShowModal(true);
  };

  // ✅ تأكيد وحذف القضية
  const handleDeleteCase = async (id) => {
    const confirmDelete = window.confirm('هل أنت متأكد من حذف هذه القضية؟');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_CONFIG.baseURL}/api/leg-cases/${id}`);
        fetchLegCases();
      } catch (error) {
        console.error('Error deleting legal case:', error);
      }
    }
  };

  // ✅ إعداد رؤوس الجدول
  const headers = [
    { key: 'slug', text: 'رقم الملف' },
    { key: 'clients', text: 'الموكل' },
    { key: 'client_capacity', text: 'صفة الموكل' },
    { key: 'title', text: 'الموضوع' },
    { key: 'case_sub_type', text: 'نوع القضية' },
    { key: 'courts', text: 'المحكمة' },
    { key: 'status', text: 'الحالة' },
    { key: 'actions', text: 'الإجراءات' }
  ];

  // ✅ تخصيص عرض بعض الأعمدة
  const customRenderers = {
    case_sub_type: (legCase) =>
      legCase.case_sub_type && legCase.case_sub_type.name
        ? legCase.case_sub_type.name
        : 'غير محدد',
    
    courts: (legCase) =>
      legCase.courts && legCase.courts.length > 0
        ? legCase.courts.map((court, index) => (
            <span key={index}>
              {court.name}
              {index < legCase.courts.length - 1 && ', '}
            </span>
          ))
        : 'غير محدد',
    
    // عرض أسماء الموكلين مع تصميم محسن
    clients: (legCase) =>
      legCase.clients && legCase.clients.length > 0 ? (
        legCase.clients.map((client, index) => (
          <span
            key={index}
            className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white px-2 py-1 rounded-full m-1"
          >
            {client.name}
            {index < legCase.clients.length - 1 && ', '}
          </span>
        ))
      ) : (
        <span className="text-gray-400">لا يوجد عملاء</span>
      ),

    // عرض حالة القضية بشكل أفضل
    status: (legCase) =>
      legCase.status === 'مفتوحة' ? (
        <span className="flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          <AiFillCheckCircle /> مفتوحة
        </span>
      ) : (
        <span className="flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
          <AiFillCloseCircle /> مغلقة
        </span>
      ),

    // عرض إجراءات التحكم (تعديل - عرض - حذف)
    actions: (legCase) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleAddEditModal(legCase)}
          className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
          title="تعديل"
        >
          <CiEdit size={20} />
        </button>
        <Link
          to={`/legcases/show/${legCase.id}`}
          className="text-green-600 hover:text-green-800 transition-transform hover:scale-110"
          title="عرض"
        >
          <AiFillEye size={20} />
        </Link>
        <button
          onClick={() => handleDeleteCase(legCase.id)}
          className="text-red-600 hover:text-red-800 transition-transform hover:scale-110"
          title="حذف"
        >
          <AiFillDelete size={20} />
        </button>
      </div>
    ),
  };

  // ✅ زر الإضافة داخل الجدول
  const renderAddButton = () => (
    <button
      onClick={() => handleAddEditModal()}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      إضافة قضية جديدة
    </button>
  );

  return (
    <>
      {/* ✅ رأس القسم */}
      <SectionHeader
        listName="القضايا" 
        icon={LegCaseIcon}
      />

      {/* ✅ المودال الخاص بالإضافة أو التعديل */}
      {showModal && (
        <AddEditLegCase
          isEditing={isEditing}
          editingLegCase={editingLegCase}
          onClose={() => setShowModal(false)}
          fetchLegCases={fetchLegCases}
        />
      )}

      {/* ✅ جدول عرض القضايا */}
      <TableComponent
        data={legCases}
        headers={headers}
        onEdit={(id) => handleAddEditModal(legCases.find((legCase) => legCase.id === id))}
        onDelete={handleDeleteCase}
        sectionName="legal-cases"
        customRenderers={customRenderers}
        renderAddButton={renderAddButton}
      />
    </>
  );
};

export default LegalCasesIndex;
