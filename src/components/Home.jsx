import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  MainLawyers,
  MainProcedures,
  MainClients,
  MainLegalCases,
  MainSessions,
} from '../assets/icons/index';
import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import Calendar from './home_tools/Calender';
import API_CONFIG from '../config';
import moment from 'moment';
import '../assets/css/home.css';
moment.locale('ar');

const useIconCardAnimation = () => {
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const cardSpringStyles = useSpring({
    scale: hovered || touched ? 1.1 : 1,
    y: touched ? -5 : 0,
  });

  const handleHover = () => setHovered(true);
  const handleHoverEnd = () => setHovered(false);
  const handleTouchStart = () => setTouched(true);
  const handleTouchEnd = () => setTouched(false);

  return {
    cardSpringStyles,
    handleHover,
    handleHoverEnd,
    handleTouchStart,
    handleTouchEnd,
  };
};

const MainCards = ({ count, icon }) => {
  const {
    cardSpringStyles,
    handleHover,
    handleHoverEnd,
    handleTouchStart,
    handleTouchEnd,
  } = useIconCardAnimation();

  return (
    <div className="w-1/2 sm:w-1/4 lg:w-1/5 p-2">
      <animated.div
        style={cardSpringStyles}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transform transition-transform"
      >
        <div className="mb-2">{icon}</div>
        <div className="text-lg font-semibold">{count}</div>
      </animated.div>
    </div>
  );
};

const toArabicNumeral = (en) => {
  return ('' + en).replace(/[0-9]/g, (t) => '٠١٢٣٤٥٦٧٨٩'.slice(+t, +t + 1));
};

const Home = () => {
  const [clientCount, setClientCount] = useState(0);
  const [legCaseCount, setLegCaseCount] = useState(0);
  const [procedureCount, setProcedureCount] = useState(0);
  const [lawyerCount, setLawyerCount] = useState(0);
  const [legalSessionCount, setLegalSessionCount] = useState(0);
  const [events, setEvents] = useState([]);

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
    } catch (error) {
      console.error('Error fetching office count:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
      </div>

      <div className="flex flex-wrap justify-center mb-8">
        <MainCards count={toArabicNumeral(legalSessionCount)} icon={<img src={MainSessions} alt="Sessions" />} />
        <MainCards count={toArabicNumeral(legCaseCount)} icon={<img src={MainLegalCases} alt="Cases" />} />
        <MainCards count={toArabicNumeral(procedureCount)} icon={<img src={MainProcedures} alt="Procedures" />} />
        <MainCards count={toArabicNumeral(clientCount)} icon={<img src={MainClients} alt="Clients" />} />
        <MainCards count={toArabicNumeral(lawyerCount)} icon={<img src={MainLawyers} alt="Lawyers" />} />
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" dir="rtl">
        {[
          { title: 'آخر الجلسات', text: 'معلومات حول آخر الجلسات.' },
          { title: 'الإجراءات', text: 'تفاصيل حول الإجراءات الأخيرة.' },
          { title: 'آخر العملاء', text: 'معلومات عن آخر العملاء.' },
          { title: 'آخر القضايا', text: 'معلومات عن آخر القضايا.' },
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
            <p className="text-gray-600 mb-4">{card.text}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              عرض المزيد
            </button>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <Calendar events={events} />
      </div>
    </div>
  );
};

export default Home;
