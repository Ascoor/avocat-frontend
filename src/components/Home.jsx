import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  MainLawyers,
  MainProcedures,
  MainClients,
  MainLegalCases,
  MainSessions,
  AdIcon,
  ServiceIcon,
} from '../assets/icons/index'; 
import axios from 'axios';
import Calendar from './home_tools/Calender';
import API_CONFIG from '../config';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import MainCard from './home_tools/MainCard';
moment.locale('ar');
 
const Home = () => {
  const [clientCount, setClientCount] = useState(0);
  const [legCaseCount, setLegCaseCount] = useState(0);
  const [procedureCount, setProcedureCount] = useState(0);
  const [lawyerCount, setLawyerCount] = useState(0);
  const [legalSessionCount, setLegalSessionCount] = useState(0);
  const [legalAdCount, setLegalAdCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
 

  const toArabicNumeral = (en) => ('' + en).replace(/[0-9]/g, (t) => '٠١٢٣٤٥٦٧٨٩'.slice(+t, +t + 1));
  
  useEffect(() => {
    fetchOfficeCount();
  }, []);

  const fetchOfficeCount = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/all_count_office`);
      setClientCount(response.data.client_count || 0);
      setLegCaseCount(response.data.leg_case_count || 0);
      setProcedureCount(response.data.procedure_count || 0);
      setLawyerCount(response.data.lawyer_count || 0);
      setLegalSessionCount(response.data.legal_session_count || 0);
      setLegalAdCount(response.data.legal_ad_count || 0);
      setServiceCount(response.data.service_count || 0);
    } catch (error) {
      console.error('Error fetching office count:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-800 dark:text-gray-200">جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto py-6 px-2   left-2">
      <div className="bg-gradient-orange-light 
dark:bg-gradient-to-t  dark:from-avocat-blue-darker dark:to-avocat-orange-dark 
  text-avocat-blue-light dark:text-white  text-center rounded-lg shadow-lg p-6 mb-8 animate-slideIn">
  <h1 className="text-4xl font-bold d font-['tharwat']">  مكتب أفوكات</h1>
</div>


  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-4 sm:grid-cols-3 lg:grid-cols-5'} gap-2 mb-8`}>
  <MainCard count={toArabicNumeral(legalSessionCount)} icon={MainSessions} label="الجلسات" description="عدد الجلسات الحالية" price="15.00" />
  <MainCard count={toArabicNumeral(legCaseCount)} icon={MainLegalCases} label="القضايا" description="عدد القضايا المتوفرة" price="25.00" />
  <MainCard count={toArabicNumeral(procedureCount)} icon={MainProcedures} label="الإجراءات" description="عدد الإجراءات الحالية" price="10.00" />
  <MainCard count={toArabicNumeral(clientCount)} icon={MainClients} label="العملاء" description="عدد العملاء النشطين" price="20.00" />
  <MainCard count={toArabicNumeral(lawyerCount)} icon={MainLawyers} label="المحامون" description="عدد المحامين المتاحين" price="30.00" />
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Calendar events={events} />
      </div>
    </div>
  );
};

export default Home;
