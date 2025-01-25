import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import API_CONFIG from '../../config/config';
import Procedure from './LegalCaseTools/LegalCaseProcedures';
import LegalSession from './LegalCaseTools/LegalCaseSessions';
import LegalAd from './LegalCaseTools/LegalCaseAds';
import LegCaseClients from './LegalCaseTools/LegalCaseClients';
import { CaseDetails } from '../../assets/icons';
import LegalCaseCourts from './LegalCaseTools/LegCaseCourts';

export default function LegCaseDetail() {
  const { id } = useParams();
  const [legCase, setLegCase] = useState(null);
  const [activeTab, setActiveTab] = useState('procedure');


    const fetchLegCase = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/legal-cases/${id}`,
        );
        setLegCase(response.data.leg_case);
      } catch (error) {
        console.error('Error fetching legal case details:', error);
      }
    };
    useEffect(() => {
    fetchLegCase();
  }, [id]);

  if (!legCase) {
    return (
      <div className="text-center py-10  dark:text-gray-300">
        جارٍ التحميل...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6  bg-gray-50 dark:bg-gray-900 transition-all">
      {/* Case Header */}
      <div className="dark:bg-gradient-to-r dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 bg-gradient-night  p-6 rounded-lg shadow-lg flex items-center justify-center">
        <img src={CaseDetails} alt="Case Icon" className="w-32 h-32 ml-4" />
        <h2 className="text-3xl text-white ml-4 font-['tharwat]  font-bold">بيانات القضية</h2>
      </div>
      
      <div className="mt-8">

      <LegCaseClients legCaseId={id} />
      </div>
      {/* Case Details */}
      <div className="bg-gradient-to-br from-pink-50 via-green-100 to-cyan-200 dark:from-avocat-indigo  dark:via-indigo-900 dark:to-avocat-indigo-darker  p-8 rounded-xl shadow-2xl mt-8">
  <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-6 text-center">
    تفاصيل القضية
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {[
      { label: "موضوع القضية", value: "شيك بنكي بدون رصيد 200000 جنيه" },
      { label: "حالة الدعوى", value: "متداولة" },
      { label: "تصنيف القضية", value: "جنح" },
      { label: "التصنيف الفرعي", value: "محكمة الجنح" },
      { label: "صفة الموكل", value: "متهم" },
      { label: "محامي الخصم", value: null },
      { label: "رقم محامي الخصم", value: null },
      { label: "الخصم", value: "محمود حسني عبد العزيز - نهاد حسني عبد العزيز" },
      { label: "عنوان الخصم", value: null },
      { label: "تاريخ القضية", value: "غير متوفر" },
    ].map(({ label, value }, index) => (
      <div
        key={index}
        className={`p-4 rounded-lg shadow-md hover:shadow-lg transition ${
          index % 2 === 0
            ? "bg-pink-50 dark:bg-avocat-blue-darker text-center"
            : "bg-cyan-50 dark:bg-avocat-blue-darker text-center"
        }`}
      >
        <p className="text-lg font-bold  text-gray-600 dark:text-gray-300 mb-1">{label}:</p>
        <p
          className={`text-md  ${
            value === null || value === "غير متوفر"
              ? "text-red-500 dark:text-red-400"
              : "text-avocat-blue dark:text-avocat-orange"
          }`}
        >
          {value || "غير متوفر"}
        </p>
      </div>
    ))}
  </div>
</div>


      {/* Courts Section */}
      <div className="mt-8">
        <LegalCaseCourts fetchLegCase={fetchLegCase} legCase ={legCase} />

      </div>

      {/* Tabs Section */}
      <div className="mt-8">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('procedure')}
            className={`px-6 py-3 text-sm font-medium transition-all ${
              activeTab === 'procedure'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
            }`}
          >
            الإجراءات
          </button>
          <button
            onClick={() => setActiveTab('session')}
            className={`px-6 py-3 text-sm font-medium transition-all ${
              activeTab === 'session'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
            }`}
          >
            الجلسات
          </button>
          <button
            onClick={() => setActiveTab('legalAd')}
            className={`px-6 py-3 text-sm font-medium transition-all ${
              activeTab === 'legalAd'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
            }`}
          >
            الإعلانات
          </button>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-4">
          {activeTab === 'procedure' && <Procedure legCaseId={id} />}
          {activeTab === 'session' && <LegalSession legCaseId={id} />}
          {activeTab === 'legalAd' && <LegalAd legCaseId={id} />}
        </div>
      </div>

      {/* Clients Section */}
    </div>
  );
}
