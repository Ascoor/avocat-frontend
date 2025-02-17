import { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import MainCard from '../common/MainCard';
import AnalogClock from '../common/AnalogClock';
import { MainLawyers, MainProcedures, MainClients, MainLegalCases, MainSessions } from '../../assets/icons/index';
import { LogoPatren } from '../../assets/images/index';
import API_CONFIG from '../../config/config';
import GlobalLogo from '../common/GlobalLogo';

moment.locale('ar');

// Lazy loading components
const DashboardCard01 = lazy(() => import('./dashboard/DashboardCard01'));
const DashboardCard02 = lazy(() => import('./dashboard/DashboardCard02'));
const DashboardCard03 = lazy(() => import('./dashboard/DashboardCard03'));
const DashboardCard04 = lazy(() => import('./dashboard/DashboardCard04'));
const DashboardCard05 = lazy(() => import('./dashboard/DashboardCard05'));
const DashboardCard06 = lazy(() => import('./dashboard/DashboardCard06'));
const CalendarPage = lazy(() => import('../calendar/CalendarPage'));

const Home = () => {
  const [counts, setCounts] = useState({
    clientCount: 0,
    legCaseCount: 0,
    procedureCount: 0,
    lawyerCount: 0,
    serviceCount: 0,
    legalSessionCount: 0,
  });

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  const toArabicNumeral = (en) =>
    ('' + en).replace(/[0-9]/g, (t) => '٠١٢٣٤٥٦٧٨٩'.slice(+t, +t + 1));

  useEffect(() => {
    fetchOfficeCount();
  }, []);

  const fetchOfficeCount = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/all_count_office`);
      setCounts({
        clientCount: response.data.client_count || 0,
        legCaseCount: response.data.leg_case_count || 0,
        procedureCount: response.data.procedure_count || 0,
        lawyerCount: response.data.lawyer_count || 0,
        serviceCount: response.data.service_count || 0,
        legalSessionCount: response.data.legal_session_count || 0,
      });
    } catch (error) {
      console.error('Error fetching office count:', error);
    }
  };

  const cardsData = [
    { count: counts.legalSessionCount, icon: MainSessions, label: 'الجلسات' },
    { count: counts.legCaseCount, icon: MainLegalCases, label: 'القضايا' },
    { count: counts.procedureCount, icon: MainProcedures, label: 'الإجراءات' },
    { count: counts.clientCount, icon: MainClients, label: 'العملاء' },
  ];

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between bg-gray-100 border-b border-avocat-blue-light dark:border-avocat-orange shadow-md dark:bg-gradient-to-l dark:from-avocat-blue-darker dark:via-avocat-blue-darker dark:to-avocat-blue-dark items-center m-4 p-4 rounded-full">
        <GlobalLogo size="lg" />
        <div className="mt-4 sm:mt-0">
          <AnalogClock />
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pb-4">
        {cardsData.map((card, index) => (
          <MainCard
            key={index}
            count={toArabicNumeral(card.count)}
            icon={card.icon}
            label={card.label}
          />
        ))}
      </div>

      {/* Dashboard Cards - Lazy Loaded */}
      <Suspense fallback={<div>Loading Dashboard Cards...</div>}>
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-4">
          <DashboardCard01 />
          <DashboardCard02 />
          <DashboardCard03 />
          <DashboardCard04 />
          <DashboardCard05 />
          <DashboardCard06 />
        </div>
      </Suspense>

      {/* Calendar Section - Lazy Loaded */}
      <Suspense fallback={<div>Loading Calendar...</div>}>
        <div className="mt-10">
          <CalendarPage />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
