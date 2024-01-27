import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { MainCourts,MainSessionsIcon, MainLawyerIcon,MainProcedures,ClientIcon,MainLegalCases,MainSessions } from '../assets/icons/index';

import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import API_CONFIG from '../config';
// import ClientSearch from './home_tools/client_search.component';
// import LegCaseSearch from './home_tools/leg_case_search.component`  ';
import 'moment/locale/ar';
import moment from 'moment';
import '../assets/css/home.css';
moment.locale('ar');


const useIconCardAnimation = () => {
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);

  // Animation for card scaling and shadow
  const cardSpringStyles = useSpring({
    boxShadow: hovered || touched ? '0px 0px 10px 5px #f0f900)' : 'none',
    scale: hovered || touched ? 1.1 : 1,
    y: touched ? -5 : 0,
  });

 // Animation for icon light-on effect
  const iconSpringStyles = useSpring({
    filter: hovered || touched ? 'brightness(1.5)' : 'brightness(0.8)', // تقليل الإضاءة في الوضع الافتراضي
  });

  // Event handlers
  const handleHover = () => setHovered(true);
  const handleHoverEnd = () => setHovered(false);
  const handleTouchStart = () => setTouched(true);
  const handleTouchEnd = () => setTouched(false);

  return {
    cardSpringStyles,
    iconSpringStyles,
    handleHover,
    handleHoverEnd,
    handleTouchStart,
    handleTouchEnd,
    setHovered,
    setTouched,
  };
};

const EventCard = ({ count, icon }) => {
  const { cardSpringStyles, iconSpringStyles, setHovered, setTouched } = useIconCardAnimation();

  return (
      <animated.div
        style={cardSpringStyles}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTouched(false)}
      >
        <animated.span style={iconSpringStyles}>{icon}</animated.span> 
        <br/> {count}
      </animated.div>

  );
};

// Convert to Arabic Numerals
function toArabicNumeral(en) {
  return String(en).replace(/[0-9]/g, t => '٠١٢٣٤٥٦٧٨٩'[+t]);
}

// Home Component
const Home = () => {
  const [counts, setCounts] = useState({
    clientCount: 0,
    legCaseCount: 0,
    procedureCount: 0,
    lawyerCount: 0,
    legalSessionCount: 0,
  });
  
  const [clientCount, setClientCount] = useState([0]);
  const [legCaseCount, setLegCaseCount] = useState(0);
  const [procedureCount, setProcedureCount] = useState(0);
  const [lawyerCount, setLawyerCount] = useState(0);
  const [legalSessionCount, setlegalSessionCount] = useState(0);
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
    <div className="row mb-4">

    <div className="col d-flex">

        <EventCard
                      
                      color="#002d76"
                      count={toArabicNumeral(legCaseCount)}
                      icon={<img src={MainSessions} alt="Logo" />}
                    />
        <EventCard
                      
                      color="#002d76"
                      count={toArabicNumeral(legCaseCount)}
                      icon={<img src={MainLegalCases} alt="Logo"/>}
                    />
        
        
        <EventCard
                     
                      color="#002d76"
                      count={toArabicNumeral(legCaseCount)}
                      icon={<img src={MainProcedures} alt="Logo"  />}
                    />
        
    
    </div>
    </div>

    <div className="row">
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Last Sessions</h5>
                </div>
            </div>
        </div>
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Procedures</h5>
                </div>
            </div>
        </div>
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Last Clients</h5>
                </div>
            </div>
        </div>
    </div>


    <div className="row mt-3">
        <div className="col">
            <input type="text" className="form-control" placeholder="Search..."/>
        </div>
    </div>
</div>
  );
};

export default Home;
