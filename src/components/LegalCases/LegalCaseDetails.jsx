import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_CONFIG from '../../config/config';
import { CaseDetails } from '../../assets/icons';

const Procedure = lazy(() => import('./LegalCaseTools/LegalCaseProcedures'));
const LegalSession = lazy(() => import('./LegalCaseTools/LegalCaseSessions'));
const LegalCaseAds = lazy(() => import('./LegalCaseTools/LegalCaseAds'));
const LegCaseClients = lazy(() => import('./LegalCaseTools/LegalCaseClients'));
const LegalCaseCourts = lazy(() => import('./LegalCaseTools/LegCaseCourts'));

export default function LegCaseDetail() {
  const { id } = useParams();
  const [legCase, setLegCase] = useState(null);
  const [legcaseClients, setLegcaseClients] = useState([]);
  const [activeTab, setActiveTab] = useState('procedure');

  const fetchLegCase = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal-cases/${id}`,
      );
      setLegCase(response.data.leg_case);
      setLegcaseClients(response.data.leg_case.clients);
    } catch (error) {
      console.error('Error fetching legal case details:', error);
    }
  };

  useEffect(() => {
    fetchLegCase();
  }, [id]);

  if (!legCase) {
    return (
      <div className="text-center py-10 dark:text-gray-300">
        جارٍ التحميل...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 transition-all">
      {}
      <div className="dark:bg-gradient-to-r dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 bg-gradient-night p-6 rounded-lg shadow-lg flex items-center justify-center">
        <img src={CaseDetails} alt="Case Icon" className="w-32 h-32 ml-4" />
        <h2 className="text-3xl text-white ml-4 font-['tharwat] font-bold">
          بيانات القضية
        </h2>
      </div>

      <div className="mt-8">
        <Suspense fallback={<div className="text-center py-10">جارٍ التحميل...</div>}>
          <LegCaseClients
            legCaseId={id}
            fetchLegcaseClients={fetchLegCase}
            legcaseClients={legcaseClients}
          />
        </Suspense>
      </div>

      {}
      <div className="mt-8"></div>
        <Suspense fallback={<div>جارٍ التحميل...</div>}>
          <CaseDetails legCase={legCase} />
        </Suspense>

      {}
      <div className="mt-8">
        <Suspense fallback={<div>جارٍ التحميل...</div>}>
          <LegalCaseCourts legCase={legCase} fetchLegCase={fetchLegCase} />
        </Suspense>
      </div>

      {}
      <div className="mt-8">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('procedure')}
            className={`px-6 py-3 text-sm font-medium transition-all ${activeTab === 'procedure' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'}`}
          >
            الإجراءات
          </button>
          <button
            onClick={() => setActiveTab('session')}
            className={`px-6 py-3 text-sm font-medium transition-all ${activeTab === 'session' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'}`}
          >
            الجلسات
          </button>
          <button
            onClick={() => setActiveTab('legalAd')}
            className={`px-6 py-3 text-sm font-medium transition-all ${activeTab === 'legalAd' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'}`}
          >
            الإعلانات
          </button>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-4">
          {activeTab === 'procedure' && (
            <Suspense fallback={<div>جارٍ التحميل...</div>}>
              <Procedure legCaseId={id} />
            </Suspense>
          )}
          {activeTab === 'session' && (
            <Suspense fallback={<div>جارٍ التحميل...</div>}>
              <LegalSession legCaseId={id} />
            </Suspense>
          )}
          {activeTab === 'legalAd' && (
            <Suspense fallback={<div>جارٍ التحميل...</div>}>
              <LegalCaseAds legCaseId={id} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}