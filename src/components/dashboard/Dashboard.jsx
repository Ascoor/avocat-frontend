import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchClients, updateClientStatusAsync } from '../../store/clientsSlice';  
import { useThemeProvider } from '../../utils/ThemeContext';
import api from '../../services/api/axiosConfig';
import GlobalLogo from '../common/GlobalLogo';
import AnalogClock from '../common/AnalogClock';
import DashboardSearch from './DashboardSearch';
import MainCard from '../common/MainCard';
import HomeSpinner from '../common/Spinners/HomeSpinner';
import { MainSessions, MainLegalCases, MainProcedures, MainClients } from '../../assets/icons/index';

// Lazy loading components
const DashboardCard01 = lazy(() => import('./dashboard/DashboardCard01'));
const DashboardCard02 = lazy(() => import('./dashboard/DashboardCard02'));
const DashboardCard03 = lazy(() => import('./dashboard/DashboardCard03'));
const DashboardCard04 = lazy(() => import('./dashboard/DashboardCard04'));
const DashboardCard05 = lazy(() => import('./dashboard/DashboardCard05'));
const DashboardCard06 = lazy(() => import('./dashboard/DashboardCard06'));  
const CalendarPage = lazy(() => import('../calendar/CalendarPage'));

const Home = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.clients);
  const [filteredClients, setFilteredClients] = useState(clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [counts, setCounts] = useState({
    clientCount: 0,
    legCaseCount: 0,
    procedureCount: 0,
    lawyerCount: 0,
    serviceCount: 0,
    legalSessionCount: 0,
  });
  const { currentTheme } = useThemeProvider();
  const isDarkMood = currentTheme === 'dark';

  useEffect(() => {
    dispatch(fetchClients());
    fetchOfficeCount(); // Fetch counts only once when component mounts
  }, [dispatch]);

  const fetchOfficeCount = async () => {
    try {
      const response = await api.get('/api/all_count_office');
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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm.trim());
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const result = clients.filter((client) => {
      return client.name.toLowerCase().includes(normalizedSearchTerm) || client.slug.includes(normalizedSearchTerm);
    });
    setFilteredClients(result);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredClients(clients);
  };

  const cardsData = [
    { count: counts.legalSessionCount, icon: MainSessions, label: 'الجلسات' },
    { count: counts.legCaseCount, icon: MainLegalCases, label: 'القضايا' },
    { count: counts.procedureCount, icon: MainProcedures, label: 'الإجراءات' },
    { count: counts.clientCount, icon: MainClients, label: 'العملاء' },
  ];

  return (
    <div className="p-4 mt-16 xl:max-w-7xl xl:mx-auto w-full">
      {/* Header Section */}
      <div className={`flex flex-col sm:flex-row justify-between ${searchTerm ? 'hidden' : 'bg-gray-100'} border-b border-avocat-blue-light dark:border-avocat-orange shadow-md dark:bg-gradient-to-l dark:from-gradient-night dark:via-avocat-blue-dark dark:to-avocat-blue-darker items-center m-6 p-6 rounded-full`}>
        <GlobalLogo size="lg" />
        <div className="mt-4 sm:mt-0">
          <AnalogClock />
        </div>
      </div>

      {/* Search Component */}
   
<DashboardSearch 
onSearch={handleSearch}
loading={loading} 
error={error}
filteredClients={filteredClients}
handleClearSearch={handleClearSearch} 
/>

      {/* Cards Section */}
      {!searchTerm && (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 pb-4">
          {cardsData.map((card, index) => (
            <MainCard key={index} count={card.count} icon={card.icon} label={card.label} />
          ))}
        </div>
     
      {/* Dashboard Cards - Lazy Loaded */}
      <Suspense fallback={<HomeSpinner />}>
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-4">
          <DashboardCard01 isDarkMode={isDarkMood} />
          <DashboardCard02 isDarkMode={isDarkMood} />
          <DashboardCard03 isDarkMode={isDarkMood} />
          <DashboardCard04 isDarkMode={isDarkMood} />
          <DashboardCard05 isDarkMode={isDarkMood} />
          <DashboardCard06 isDarkMode={isDarkMood} />
        </div>
      </Suspense>

      {/* Calendar Section - Lazy Loaded */}
      <Suspense fallback={<HomeSpinner />}>
        <div className="mt-10">
          <CalendarPage />
        </div>
      </Suspense>
      </>
       )}

    </div>
  );
};

export default Home;
