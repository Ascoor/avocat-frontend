import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';
import {
  FcBusinessman,
  FcLibrary,
  FcOvertime,
  FcBriefcase,
} from 'react-icons/fc';
import { ClientIcon, DashBoard } from '../assets/icons/index';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import Calendar from './home_tools/Calender';
import API_CONFIG from '../config';
import ClientSearch from './home_tools/client_search.component';
import LegCaseSearch from './home_tools/leg_case_search.component';
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
const EventCard = ({ title, count, icon }) => {
  const { cardSpringStyles, handleHover, handleHoverEnd } =
    useIconCardAnimation();

  return (
    <animated.div
      style={cardSpringStyles}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onTouchStart={handleHover}
      onTouchEnd={handleHoverEnd}
    >
      <Card
        className="text-center event-card"
        style={{
          background: 'linear-gradient(235deg,#092342  , #14435a, #10325a)',
        }}
      >
        <Card.Body className="event-card-body">
          <div className="event-card-content p-1">
            <span className="icon">{icon}</span>
          </div>
          <div className="event-card-title  m-10">{title}</div>
          <span className="count">{count}</span>
        </Card.Body>
      </Card>
    </animated.div>
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

  const [searchText, setSearchText] = useState(''); // State to store the search text
  const [searchResults, setSearchResults] = useState([]); // State to store the search results
  const [showResults, setShowResults] = useState(false); 
  const [searchType, setSearchType] = useState('clients'); // State to store the selected search type
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = async () => {
    setShowResults(true); // Show search results

    try {
      let endpoint = '';

      if (searchType === 'clients') {
        endpoint = `${API_CONFIG.baseURL}/api/client-search`;
      } else if (searchType === 'legCases') {
        endpoint = `${API_CONFIG.baseURL}/api/leg-case-search`;
      }

      const response = await axios.get(endpoint, {
        params: {
          query: searchText,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Row>
        <Col sm={6} md={4} lg={3} className="d-none d-lg-block">
          {/* This content will be hidden on screens smaller than large */}
        </Col>
        <Col sm={6} md={8} lg={9} className="text-center">
          {/* This content will be centered horizontally on all screen sizes */}
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="home-card">
            <Card.Header className="home-text-center">
              لوحة التحكم
              <div className="court-setting-card-header">
                <img src={DashBoard} alt="Icon" className="dashboard-icon" />
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="justify-content-center">
                <Col sm={6} md={4} lg={2}>
                  <Link to="/clients" style={{ textDecoration: 'none' }}>
                    <EventCard
                      title="العملاء"
                      color="#002d76"
                      count={toArabicNumeral(clientCount)}
                      icon={
                        <img
                          src={ClientIcon}
                          alt="Icon"
                          className="client-icon"
                        />
                      }
                    />
                  </Link>
                </Col>
                <Col sm={6} md={4} lg={2}>
                  <Link to="/legcases" style={{ textDecoration: 'none' }}>
                    <EventCard
                      title="القضايا"
                      color="#002d76"
                      count={toArabicNumeral(legCaseCount)}
                      icon={<FcBriefcase size={50} />}
                    />
                  </Link>
                </Col>
                <Col sm={6} md={4} lg={2}>
                  <Link to="/procedures" style={{ textDecoration: 'none' }}>
                    <EventCard
                      title="الإجراءات"
                      color="#002d76"
                      count={toArabicNumeral(procedureCount)}
                      icon={<FcOvertime size={50} />}
                    />
                  </Link>
                </Col>
                <Col sm={6} md={4} lg={2}>
                  <Link to="/lawyers" style={{ textDecoration: 'none' }}>
                    <EventCard
                      lang="ar"
                      title="المحامين"
                      color="#002d76"
                      count={toArabicNumeral(lawyerCount)}
                      icon={<FcBusinessman size={50} />}
                    />
                  </Link>
                </Col>
                <Col sm={6} md={4} lg={2}>
                  <EventCard
                    title="الجلسات"
                    color="#002d76"
                    count={toArabicNumeral(legalSessionCount)}
                    icon={<FcLibrary size={50} />}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-12 justify-content-center">
        <Col md={12}>
          <Card>
            <Card.Header className="home-text-center">
              <h3>بحث</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group id="searchTypeClients">
                  <Form.Label>نوع البحث</Form.Label>
                  <Form.Check
                    type="radio"
                    label="العملاء"
                    name="searchType"
                    value="clients"
                    checked={searchType === 'clients'}
                    onChange={(e) => setSearchType(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="القضايا"
                    name="searchType"
                    value="legCases"
                    checked={searchType === 'legCases'}
                    onChange={(e) => setSearchType(e.target.value)}
                  />
                </Form.Group>

                <Form.Group id="searchText">
                  <Form.Label>نص البحث</Form.Label>
                  <Form.Control
                    type="text"
                    value={searchText}
                    onChange={handleSearchInputChange}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button className="btn btn-home-search" type="submit">
                    بحث
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {showResults && (
            <Card className="mt-3">
              <Card.Header className="home-text-center">
                <h3>نتائج البحث</h3>
              </Card.Header>
              <Card.Body>
                {searchType === 'clients' ? (
                  <ClientSearch searchResults={searchResults} />
                ) : (
                  <LegCaseSearch searchResults={searchResults} />
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Row className="mt-12">
        <Col md={12}>
          <Calendar events={setEvents} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
