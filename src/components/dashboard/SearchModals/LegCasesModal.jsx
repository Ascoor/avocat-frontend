import React, { useState, useEffect } from 'react';
import LegalCaseProcedures from '../../LegalCases/LegalCaseTools/LegalCaseProcedures';
import LegalCaseSessions from '../../LegalCases/LegalCaseTools/LegalCaseSessions';
import LegalCaseAds from '../../LegalCases/LegalCaseTools/LegalCaseAds';
import {
  FaFileAlt,
  FaBalanceScale,
  FaMapMarkerAlt,
  FaPhone,
  FaUserTie,
  FaUser,
  FaInfoCircle,
} from 'react-icons/fa';

const LegCasesModal = ({ selectedClient, activeTab }) => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('procedures');

  // ✅ إعادة ضبط `selectedCase` عند تغيير `activeTab`
  useEffect(() => {
    if (activeTab === 'services') {
      setSelectedCase(null);
    }
  }, [activeTab]);

  // ✅ إعادة ضبط `selectedCase` عند تغيير العميل أو إعادة البحث
  useEffect(() => {
    setSelectedCase(null);
    setActiveSubTab('procedures');
  }, [selectedClient]);

  // ✅ استبدال القيم غير المتوفرة بـ "غير متوفر"
  const getValue = (value) => (value && value !== 'null' ? value : 'غير متوفر');

  // ✅ عند اختيار قضية، يتم تخزينها وإخفاء القائمة الأصلية
  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
    setActiveSubTab('procedures');
  };

  // ✅ عند الضغط على زر الرجوع، يتم عرض جميع القضايا مجددًا
  const handleBack = () => {
    setSelectedCase(null);
  };

  return (
    <div>
      {/* ✅ إذا لم يتم تحديد أي قضية، يتم عرض جميع القضايا */}
      {!selectedCase && activeTab === 'legCases' && (
        <table className="w-full table-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
          <thead className="text-sm font-semibold text-center text-gray-100 bg-blue-500 dark:bg-gradient-night dark:text-avocat-orange-light uppercase border-b border-gray-600">
            <tr>
              <th className="px-4 py-3">رقم الملف</th>
              <th className="px-6 py-4 text-center font-semibold">الموضوع</th>
              <th className="px-6 py-4 text-center font-semibold">
                نوع القضية
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                حالة القضية
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
            {selectedClient.leg_cases.length > 0 ? (
              selectedClient.leg_cases.map((caseItem) => (
                <tr
                  key={caseItem.id}
                  className={`cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                    transition duration-200 border-b border-gray-200 dark:border-gray-600
                    ${selectedCase?.id === caseItem.id ? 'bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-300 scale-105 shadow-lg' : ''}`}
                  onClick={() => handleCaseSelect(caseItem)}
                >
                  <td className="px-6 py-4 text-center">{caseItem.slug}</td>
                  <td className="px-6 py-4 text-center">{caseItem.title}</td>
                  <td className="px-6 py-4 text-center">
                    {caseItem.case_type?.name || 'غير محدد'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium tracking-wide shadow-md
                        ${
                          caseItem.status === 'مغلقة'
                            ? 'bg-red-500 text-white'
                            : caseItem.status === 'مفتوحة'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-400 text-white'
                        }`}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  لا يوجد قضايا
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* ✅ عند تحديد قضية، يتم عرض تفاصيلها مع زر الرجوع */}
      {selectedCase && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* 🔙 زر الرجوع لإعادة عرض جميع القضايا */}
          <button
            className="px-4 py-2 mb-4 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={handleBack}
          >
            🔙 الرجوع إلى قائمة القضايا
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center border-b pb-3">
            📌 تفاصيل القضية
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 border-b pb-2">
              <FaFileAlt className="text-blue-500 dark:text-blue-400" />
              <p className="text-gray-700 dark:text-gray-300 font-semibold w-1/3">
                رقم الملف:
              </p>
              <span className="text-gray-900 dark:text-gray-100 w-2/3">
                {getValue(selectedCase.slug)}
              </span>
            </div>
          </div>

          {/* ✅ تبويبات الإجراءات والجلسات والإعلانات */}
          <div className="flex border-b mb-4">
            <button
              className={`flex-1 py-2 text-center font-semibold transition-all duration-200 
                ${
                  activeSubTab === 'procedures'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              onClick={() => setActiveSubTab('procedures')}
            >
              الإجراءات
            </button>
            <button
              className={`flex-1 py-2 text-center font-semibold transition-all duration-200 
                ${
                  activeSubTab === 'legSessions'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              onClick={() => setActiveSubTab('legSessions')}
            >
              الجلسات
            </button>
            <button
              className={`flex-1 py-2 text-center font-semibold transition-all duration-200 
                ${
                  activeSubTab === 'legalAds'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              onClick={() => setActiveSubTab('legalAds')}
            >
              الإعلانات
            </button>
          </div>

          {/* ✅ عرض مكونات القضية المختارة */}
          {activeSubTab === 'procedures' && (
            <LegalCaseProcedures legCaseId={selectedCase.id} />
          )}
          {activeSubTab === 'legSessions' && (
            <LegalCaseSessions legCaseId={selectedCase.id} />
          )}
          {activeSubTab === 'legalAds' && (
            <LegalCaseAds legCaseId={selectedCase.id} />
          )}
        </div>
      )}
    </div>
  );
};

export default LegCasesModal;
