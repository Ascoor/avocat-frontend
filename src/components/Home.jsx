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
moment.locale('ar');

// 🔄 حركة البطاقات
const useIconCardAnimation = () => {
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const cardSpringStyles = useSpring({
    scale: hovered || touched ? 1.08 : 1,
    y: touched ? -8 : 0,
    boxShadow: hovered
      ? '0 10px 30px rgba(0, 0, 0, 0.25)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)',
  });

  return {
    cardSpringStyles,
    setHovered,
    setTouched,
  };
};

// ✅ مكون البطاقات الرئيسية
const MainCards = ({ count, icon, label }) => {
  const { cardSpringStyles, setHovered, setTouched } = useIconCardAnimation();

  return (
    <animated.div
      style={cardSpringStyles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTouched(false)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300"
    >
      <div className="mb-4 w-32 h-32 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
        {/* ✅ تكبير الأيقونات إلى 124x124 */}
        <img src={icon} alt={label} className="w-24 h-24" />
      </div>
      <div className="text-3xl font-bold text-gray-800 dark:text-white">
        {count}
      </div>
      <div className="text-md text-gray-500 dark:text-gray-400 mt-2">{label}</div>
    </animated.div>
  );
};

// 🔢 تحويل الأرقام للغة العربية
const toArabicNumeral = (en) => ('' + en).replace(/[0-9]/g, (t) => '٠١٢٣٤٥٦٧٨٩'.slice(+t, +t + 1));

// ✅ الصفحة الرئيسية
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

  // 🔄 جلب البيانات من الـ API
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
    <div className="container mx-auto py-8 px-4">
      {/* ✅ العنوان الرئيسي */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center rounded-lg shadow-lg p-6 mb-10">
        <h1 className="text-3xl font-bold">لوحة تحكم مكتب المحاماة</h1>
      </div>

      {/* ✅ بطاقات البيانات */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        <MainCards count={toArabicNumeral(legalSessionCount)} icon={MainSessions} label="الجلسات" />
        <MainCards count={toArabicNumeral(legCaseCount)} icon={MainLegalCases} label="القضايا" />
        <MainCards count={toArabicNumeral(procedureCount)} icon={MainProcedures} label="الإجراءات" />
        <MainCards count={toArabicNumeral(clientCount)} icon={MainClients} label="العملاء" />
        <MainCards count={toArabicNumeral(lawyerCount)} icon={MainLawyers} label="المحامون" />
      </div>

      {/* ✅ البحث */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="ابحث هنا..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* ✅ البطاقات الفرعية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {[
          { title: 'آخر الجلسات', text: 'معلومات حول آخر الجلسات.' },
          { title: 'الإجراءات', text: 'تفاصيل حول الإجراءات الأخيرة.' },
          { title: 'آخر العملاء', text: 'معلومات عن آخر العملاء.' },
          { title: 'آخر القضايا', text: 'معلومات عن آخر القضايا.' },
        ].map((card, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{card.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{card.text}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              عرض المزيد
            </button>
          </div>
        ))}
      </div>

      {/* ✅ التقويم */}
      <div>
        <Calendar events={events} />
      </div>
    </div>
  );
};

export default Home;
