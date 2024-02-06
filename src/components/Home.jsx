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
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Calendar from './home_tools/Calender';
import API_CONFIG from '../config';
// import ClientSearch from './home_tools/client_search.component';
// import LegCaseSearch from './home_tools/leg_case_search.component';
import 'moment/locale/ar';
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
  const handleHover = () => {
    setHovered(true);
  };

  const handleHoverEnd = () => {
    setHovered(false);
  };

  const handleTouchStart = () => {
    setTouched(true);
  };

  const handleTouchEnd = () => {
    setTouched(false);
  };

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
        <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
          <animated.div
            style={cardSpringStyles}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="card-container"
          >
            <div className="icon-wrapper d-flex flex-column justify-content-center align-items-center">
              <div className="icon mb-2">{icon}</div>
              <div className="count">{count}</div>
            </div>
          </animated.div>
        </div>
      );
    };

function toArabicNumeral(en) {
  return ('' + en).replace(/[0-9]/g, function (t) {
    return '٠١٢٣٤٥٦٧٨٩'.slice(+t, +t + 1);
  });
}

const Home = () => {
  const [clientCount, setClientCount] = useState([0]);
  const [legCaseCount, setLegCaseCount] = useState(0);
  const [procedureCount, setProcedureCount] = useState(0);
  const [lawyerCount, setLawyerCount] = useState(0);
  const [legalSessionCount, setlegalSessionCount] = useState(0);
  const [setEvents] = useState([]);
  useEffect(() => {}, []);
  useEffect(() => {
    fetchOfficeCount();
  }, []);

  const fetchOfficeCount = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/all_count_office`,
      );
      setClientCount(response.data.client_count);
      setLegCaseCount(response.data.leg_case_count);
      setProcedureCount(response.data.procedure_count);
      setLawyerCount(response.data.lawyer_count);
      setlegalSessionCount(response.data.legal_session_count);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
<Card className="text-center text-center-gradient-card">
  <Card.Header className="main-dashboard-card-header p-3">
  لوحة التحكم</Card.Header>
  <Card.Body className="main-dashboard-card-body">
    <div className="row justify-content-center">
    <MainCards
          count={toArabicNumeral(legalSessionCount)}
          icon={<img src={MainSessions} alt="Logo" />}
        />
        <MainCards
          count={toArabicNumeral(legCaseCount)}
          icon={<img src={MainLegalCases} alt="Logo" />}
        />
        <MainCards
          count={toArabicNumeral(procedureCount)}
          icon={<img src={MainProcedures} alt="Logo" />}
        />
        <MainCards
          count={toArabicNumeral(clientCount)}
          icon={<img src={MainClients} alt="Logo" />}
        />
        <MainCards
          count={toArabicNumeral(lawyerCount)}
          icon={<img src={MainLawyers} alt="Logo" />}
        />

    </div>
  </Card.Body>
</Card>
      <div className="row mt-3">
        <div className="col">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
      </div>
<div className="row" dir="rtl">
  <div className="col-md-6 mb-3">
    <div className="home-card">
      <div className="card-body">
        <h5 className="card-title p-3">آخر الجلسات</h5>
        <p className="card-text">معلومات حول آخر الجلسات.</p>
        <button className="btn btn-home-card">عرض المزيد</button>
      </div>
    </div>
  </div>
  <div className="col-md-6  mb-3">
    <div className="home-card">
      <div className="card-body">
        <h5 className="card-title p-3">الإجراءات</h5>
        <p className="card-text">تفاصيل حول الإجراءات الأخيرة.</p>
        <button className="btn btn-home-card">عرض المزيد</button>
      </div>
    </div>
  </div>
  <div className="col-md-6 mb-3">
    <div className="home-card">
      <div className="card-body">
        <h5 className="card-title p-3">آخر العملاء</h5>
        <p className="card-text">معلومات عن آخر العملاء.</p>
        <button className="btn btn-home-card">عرض المزيد</button>
      </div>
    </div>
  </div>

  <div className="col-md-6 mb-3">
    <div className="home-card">
      <div className="card-body">
        <h5 className="card-title p-3">آخر القضايا</h5>
        <p className="card-text">معلومات عن آخر القضايا.</p>
        <button className="btn btn-home-card">عرض المزيد</button>
      </div>
    </div>
  </div>
</div>




    
          <Calendar events={setEvents} />

    </div>
  );
};

export default Home;
