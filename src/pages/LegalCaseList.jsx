import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
  AiFillEye,
} from 'react-icons/ai';
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
    { key: 'actions', text: 'عرض' },
    { key: 'slug', text: 'رقم الملف' },
    { key: 'clients', text: 'الموكل' },
    { key: 'client_capacity', text: 'صفة الموكل' },
    { key: 'title', text: 'الموضوع' },
    { key: 'case_sub_type', text: 'نوع القضية' },
    { key: 'status', text: 'الحالة' },
  ];

  // ✅ تخصيص عرض بعض الأعمدة
    const customRenderers = {
      case_sub_type: (legCase) =>
        legCase.case_sub_type && legCase.case_sub_type.name
          ? legCase.case_sub_type.name
          : 'غير محدد',

      // عرض أسماء الموكلين مع تصميم محسن
      clients: (legCase) =>
        legCase.clients && legCase.clients.length > 0 ? (
          <div className="flex flex-wrap">
            {legCase.clients.map((client, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white px-2 py-1 rounded-full m-1"
              >
                {client.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">No Clients</span>
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
          <Link
            to={`/legcases/show/${legCase.id}`}
            className="text-orange-400 hover:text-orange-800 transition-transform hover:scale-110"
            title="عرض"
          >
            <AiFillEye size={20} />
          </Link>
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
    
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      {/* ✅ رأس القسم */}
      <SectionHeader listName="القضايا" icon={LegCaseIcon} />

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
        onEdit={(id) =>
          handleAddEditModal(legCases.find((legCase) => legCase.id === id))
        }
        onDelete={handleDeleteCase}
        sectionName="legal-cases"
        customRenderers={customRenderers}
        renderAddButton={renderAddButton}
      />
        </div>
  );
};

export default LegalCasesIndex;
