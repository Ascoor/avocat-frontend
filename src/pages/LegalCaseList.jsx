import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import axios from 'axios';
import { useSprings, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import API_CONFIG from '../config/config';
import SectionHeader from '../components/common/SectionHeader';
import TableComponent from '../components/common/TableComponent';
import { AiFillCheckCircle, AiFillEye } from 'react-icons/ai';
import { LegCaseIcon } from '../assets/icons';
import { getLegCases } from '../services/api/legalCases';
import api from '../services/api/axiosConfig';

// ✅ Lazy Load Add/Edit Modal Component
const AddEditLegCase = lazy(() => import('../components/LegalCases/AddEditLegCase'));

// ✅ Status Styles
const statusValues = { 'قيد التجهيز': 0, متداولة: 1, منتهية: 2, معلقة: 3 };
const statusStyles = [
  { bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
  { bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  { bgColor: 'bg-green-100', textColor: 'text-green-700' },
  { bgColor: 'bg-red-100', textColor: 'text-red-700' },
];

// ✅ Main Component
const LegalCasesIndex = () => {
  const [legCases, setLegCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLegCase, setEditingLegCase] = useState(null);

  // ✅ Fetch Data (Memoized)
  const fetchLegCases = useCallback(async () => {
    try {
      const res = await getLegCases({ page: 1, sort: JSON.stringify({ createdAt: -1 }) });
      setLegCases(res.data);
    } catch (error) {
      console.error('Error fetching legal cases:', error);
    }
  }, []);

  useEffect(() => {
    fetchLegCases();
  }, [fetchLegCases]);

  // ✅ Handle Add/Edit Modal
  const handleAddEditModal = (legCase = null) => {
    setEditingLegCase(legCase);
    setIsEditing(!!legCase);
    setShowModal(true);
  };

  // ✅ Delete Case
  const handleDeleteCase = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه القضية؟')) {
      try {
        await api.delete(`/legal-cases/${id}`);
        fetchLegCases();  // Refresh data after deletion
      } catch (error) {
        console.error('Error deleting legal case:', error);
      }
    }
  };

  // ✅ Table Animations
  const [springs, apiSprings] = useSprings(legCases.length, (i) => ({
    opacity: 0,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  }));

  useEffect(() => {
    if (legCases.length > 0) apiSprings.start();
  }, [legCases, apiSprings]);

  // ✅ Table Headers
  const headers = [
    { key: 'actions', text: 'عرض' },
    { key: 'slug', text: 'رقم الملف' },
    { key: 'clients', text: 'الموكل' },
    { key: 'client_capacity', text: 'صفة الموكل' },
    { key: 'title', text: 'الموضوع' },
    { key: 'case_sub_type', text: 'نوع القضية' },
    { key: 'status', text: 'الحالة' },
  ];

  // ✅ Status Colors & Icons
  const statusColors = {
    'جارى التنفيذ': 'text-yellow-500',
    'قيد التنفيذ': 'text-orange-500',
    منتهية: 'text-green-600',
    متداولة: 'text-blue-500',
    استيفاء: 'text-purple-500',
  };

  const statusIcons = {
    'جارى التنفيذ': <AiFillCheckCircle className="mr-1" />,
    'قيد التنفيذ': <AiFillCheckCircle className="mr-1" />,
    منتهية: <AiFillCheckCircle className="mr-1" />,
    متداولة: <AiFillCheckCircle className="mr-1" />,
    استيفاء: <AiFillCheckCircle className="mr-1" />,
  };

  // ✅ Custom Table Renderers
  const customRenderers = {
    case_sub_type: (legCase) => legCase.case_sub_type?.name || 'غير محدد',

    clients: (legCase) => {
      if (!legCase.clients || legCase.clients.length === 0) return <span className="text-gray-800">لا يوجد موكل</span>;
      const firstClient = legCase.clients[0]?.name;
      const remainingCount = legCase.clients.length - 1;
      return (
        <div className="flex flex-col items-center">
          {firstClient}
          {remainingCount > 0 && <span className="text-red-600 text-xs mt-1">و {remainingCount} آخرين</span>}
        </div>
      );
    },

    status: (legCase) => {
      const statusText = legCase.status || 'غير محدد';
      const textColor = statusColors[statusText] || 'text-gray-400';
      const statusIcon = statusIcons[statusText] || null;

      return (
        <span className={`flex items-center ${textColor}`}>
          {statusIcon} {statusText}
        </span>
      );
    },

    actions: (legCase) => (
      <div className="flex space-x-2">
        <Link to={`/legcases/show/${legCase.id}`} className="text-orange-400 hover:text-orange-800" title="عرض">
          <AiFillEye size={20} />
        </Link>
      </div>
    ),
  };

  // ✅ Button for Adding a New Case
  const renderAddButton = () => (
    <button onClick={() => handleAddEditModal()} className="bg-gradient-green-button hover:bg-gradient-green-dark-button text-white px-4 py-2 rounded-lg  transition">
      + إضافة قضية جديدة
    </button>
  );

  return (
    <div className="p-6 mt-12 w-full">
      <SectionHeader listName="القضايا" icon={LegCaseIcon} />

      {/* ✅ Lazy Load Modal Inside Suspense */}
      {showModal && (
        <Suspense fallback={<div className="text-center text-gray-500">جار التحميل...</div>}>
          <AddEditLegCase
            isEditing={isEditing}
            editingLegCase={editingLegCase}
            onClose={() => setShowModal(false)}
            fetchLegCases={fetchLegCases}
          />
        </Suspense>
      )}

      {/* ✅ Table Component */}
      <TableComponent
        data={legCases}
        headers={headers}
        onEdit={(id) => handleAddEditModal(legCases.find((legCase) => legCase.id === id))}
        onDelete={handleDeleteCase}
        sectionName="legal-cases"
        customRenderers={customRenderers}
        renderAddButton={renderAddButton}
      />
    </div>
  );
};

export default LegalCasesIndex;
