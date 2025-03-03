import React, { useState, useEffect } from 'react';
import ServiceProcedures from '../../LegalServices/Procedures';
import {
  FaAccessibleIcon,
  FaFileAlt,
  FaInfoCircle,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const iconMapping = {
  fileNumber: <FaAccessibleIcon className="text-blue-500 dark:text-blue-400" />,
  servicePlace: <FaFileAlt className="text-green-500 dark:text-green-400" />,
  serviceDetails: (
    <FaInfoCircle className="text-green-500 dark:text-green-400" />
  ),
  serviceStatus: (
    <FaMapMarkerAlt className="text-green-500 dark:text-green-400" />
  ),
};

const getIcon = (field) => {
  switch (field) {
    case 'fileNumber':
      return iconMapping.fileNumber;
    case 'servicePlace':
      return iconMapping.servicePlace;
    case 'serviceDetails':
      return iconMapping.serviceDetails;
    case 'serviceStatus':
      return iconMapping.serviceStatus;
    default:
      return null;
  }
};

const statusColors = {
  'قيد التنفيذ': 'bg-yellow-500 text-white',
  مكتملة: 'bg-green-500 text-white',
  معلقة: 'bg-red-500 text-white',
  ملغاة: 'bg-gray-500 text-white',
};

// ✅ دالة لمعالجة القيم الفارغة
const getValue = (value) => (value && value !== 'null' ? value : 'غير متوفر');

const ServicesModal = ({ selectedClient, activeTab }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('procedures');

  // ✅ إعادة ضبط `selectedService` عند تغيير `activeTab`
  useEffect(() => {
    if (activeTab === 'legCases') {
      setSelectedService(null);
    }
  }, [activeTab]);

  // ✅ إعادة ضبط `selectedService` عند تغيير العميل أو إعادة البحث
  useEffect(() => {
    setSelectedService(null);
    setActiveSubTab('procedures');
  }, [selectedClient]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setActiveSubTab('procedures');
  };

  const handleBack = () => {
    setSelectedService(null);
  };

  return (
    <div>
      {/* ✅ عرض جدول الخدمات إذا لم يتم تحديد أي خدمة */}
      {!selectedService && activeTab === 'services' && (
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* ✅ رأس الجدول */}
            <thead className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm sm:text-base">
              <tr>
                <th className="px-6 py-3 text-center">📌 الملف</th>
                <th className="px-6 py-3 text-center">🏛 جهة الخدمة</th>
                <th className="px-6 py-3 text-center">🛠 نوع الخدمة</th>
                <th className="px-6 py-3 text-center">⚡ حالة الخدمة</th>
              </tr>
            </thead>

            {/* ✅ جسم الجدول */}
            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
              {selectedClient.services.length > 0 ? (
                selectedClient.services.map((service) => (
                  <tr
                    key={service.id}
                    className={`cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 border-b border-gray-200 dark:border-gray-600
                      ${selectedService?.id === service.id ? 'bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-300 scale-105 shadow-lg' : ''}`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <td className="px-6 py-3 text-center font-semibold">
                      {service.slug}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {getValue(service.service_place_name)}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {getValue(service.service_type?.name)}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-md ${statusColors[service.status] || 'bg-gray-400 text-white'}`}
                      >
                        {service.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-3 text-center text-gray-500 dark:text-gray-400"
                  >
                    لا يوجد خدمات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ عرض تفاصيل الخدمة المختارة */}
      {selectedService && (
        <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border font-['tajawal'] border-gray-200 dark:border-gray-700">
          {/* 🔙 زر الرجوع */}
          <button
            className="px-4 py-2 mb-4 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={handleBack}
          >
            🔙 الرجوع إلى قائمة الخدمات
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center border-b pb-3">
            📌 تفاصيل الخدمة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* رقم الملف */}
            <div className="flex items-center space-x-3 border-b pb-2">
              {getIcon('fileNumber')}
              <p className="text-gray-700 dark:text-gray-300 font-semibold w-1/3">
                رقم الملف:
              </p>
              <span className="text-gray-900 dark:text-gray-100 w-2/3">
                {getValue(selectedService.slug)}
              </span>
            </div>

            {/* جهة الخدمة */}
            <div className="flex items-center space-x-3 border-b pb-2">
              {getIcon('servicePlace')}
              <p className="text-gray-700 dark:text-gray-300 font-semibold w-1/3">
                الجهة :
              </p>
              <span className="text-gray-900 dark:text-gray-100 w-2/3">
                {getValue(selectedService.service_place_name)}
              </span>
            </div>

            {/* تفاصيل الخدمة */}
            <div className="flex items-center space-x-3 border-b pb-2">
              {getIcon('serviceDetails')}
              <p className="text-gray-700 dark:text-gray-300 font-semibold w-1/3">
                تفاصيل :
              </p>
              <span className="text-gray-900 dark:text-gray-100 w-2/3">
                {getValue(selectedService.description)}
              </span>
            </div>

            {/* حالة الخدمة */}
            <div className="flex items-center space-x-3 border-b pb-2">
              {getIcon('serviceStatus')}
              <p className="text-gray-700 dark:text-gray-300 font-semibold w-1/3">
                الحالة :
              </p>
              <span className="text-gray-900 dark:text-gray-100 w-2/3">
                {getValue(selectedService.status)}
              </span>
            </div>
          </div>
          {activeSubTab === 'procedures' && (
            <ServiceProcedures serviceId={selectedService.id} />
          )}

          {/* ✅ عرض مكونات الإجراءات الخاصة بالخدمة */}
        </div>
      )}
    </div>
  );
};

export default ServicesModal;
