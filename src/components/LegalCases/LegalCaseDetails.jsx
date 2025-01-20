import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import API_CONFIG from '../../config/config';
import Procedure from './LegalCaseTools/LegalCaseProcedures';
import LegalSession from './LegalCaseTools/LegalCaseSessions';
import LegalAd from './LegalCaseTools/LegalCaseAds';
import LegCaseClients from './LegalCaseTools/LegalCaseClients';
import { LegCaseDetailsIcon } from '../../assets/icons';
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
      <div className="text-center py-10 text-gray-600 dark:text-gray-300">
        جارٍ التحميل...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 transition-all">
      {/* Case Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <h2 className="text-3xl font-bold">بيانات القضية</h2>
        <img src={LegCaseDetailsIcon} alt="Case Icon" className="w-12 h-12" />
      </div>

      {/* Case Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              موضوع القضية:
            </p>
            <p className="text-lg font-semibold dark:text-gray-200">
              {legCase.title}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              حالة الدعوى:
            </p>
            <p className="text-lg font-semibold dark:text-gray-200">
              {legCase.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              تصنيف القضية:
            </p>
            <p className="text-lg font-semibold dark:text-gray-200">
              {legCase.case_type?.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              التصنيف الفرعي:
            </p>
            <p className="text-lg font-semibold dark:text-gray-200">
              {legCase.case_sub_type?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Courts Section */}
      <div className="mt-8">
        <LegalCaseCourts fetchLegCase={fetchLegCase} legCase ={legCase} />
        <LegCaseClients legCaseId={id} />
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
