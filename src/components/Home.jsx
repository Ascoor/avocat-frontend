import { useState, useEffect } from 'react';
import { ProceduresTable, AnnouncementsTable, SessionsTable, TasksTable } from './home_tools/HomeCards';
import axios from 'axios';
import API_CONFIG from '../config';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import Calendar from './home_tools/Calender';
import MainCard from './home_tools/MainCard';
import AnalogClock from './home_tools/AnalogClock';

import {
  MainLawyers,
  MainProcedures,
  MainClients,
  MainLegalCases,
  MainSessions,
  ServiceIcon,
} from '../assets/icons/index';
import { LogoPatren } from '../assets/img';

moment.locale('ar');

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

  const toArabicNumeral = (en) => ('' + en).replace(/[0-9]/g, (t) => '٠١٢٣٤٥٦٧٨٩'.slice(+t, +t + 1));

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
    { count: counts.serviceCount, icon: ServiceIcon, label: 'الخدمات' },
    { count: counts.procedureCount, icon: MainProcedures, label: 'الإجراءات' },
    { count: counts.clientCount, icon: MainClients, label: 'العملاء' },
    { count: counts.lawyerCount, icon: MainLawyers, label: 'المحامون' },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-l from-indigo-600 via-purple-600 to-pink-600 text-white dark:bg-gradient-blue-dark rounded-lg shadow-2xl p-6 mb-8 transform hover:scale-105 transition-transform duration-500">
        <img className={` w-auto h-32`} src={LogoPatren} />
           <AnalogClock />
         
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3 lg:grid-cols-6'} gap-8`}>  
        {cardsData.map((card, index) => (
          <MainCard key={index} count={toArabicNumeral(card.count)} icon={card.icon} label={card.label} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <ProceduresTable />
        <AnnouncementsTable />
        <SessionsTable />
        <TasksTable />
      </div>

      <div className="mt-10">
        <Calendar />
      </div>
    </div>
  );
};

export default Home;
