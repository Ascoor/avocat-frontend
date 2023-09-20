import { useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import Pagination from '../home_tools/Pagination';
import PropTypes from 'prop-types';
const LegCaseSearch = ({
  searchResults,
  casesPerPage,
  currentPage,
  paginate
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSpringProps = useSpring({
    from: { rotation: 0 },
    to: { rotation: showAlert ? 180 : 0 },
    config: { tension: 200, friction: 10 }
  });

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = searchResults.slice(indexOfFirstCase, indexOfLastCase);

  return (
    <Row className="justify-content-center">
      <Col md={8} xs={12} lg={10}>
        <Row>
          <Col xs={12} lg={10}>
            {/* Handle and spring animation */}
            <animated.div
              style={{
                transform: handleSpringProps.rotation.interpolate(
                  (rotation) => `rotate(${rotation}deg)`
                ),
                display: 'inline-block',
                cursor: 'pointer'
              }}
              onClick={() => setShowAlert(!showAlert)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </animated.div>
          </Col>
        </Row>
        <div className="pagination">
          {searchResults.length > 0 ? (
            <>
              {/* Display search results */}

              <table className="table table-striped table-bordered table-hover table-responsive">
                {' '}
                <thead>
                  {' '}
                  <tr>
                    <th scope="col">رقم القضية</th>
                    <th scope="col">العنوان</th>
                    <th scope="col">الحالة</th>
                    <th scope="col">الفئة</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCases.length > 0
                    ? (
                      currentCases.map((caseItem) => (
                        <tr key={caseItem.id}>
                          <td>{caseItem.slug}</td>
                          <td>{caseItem.name}</td>
                          <td>{caseItem.email}</td>
                          <td>{caseItem.phone_number}</td>
                        </tr>
                      ))
                    )
                    : (
                      <tr>
                        <td colSpan="4">لا توجد بيانات متاحة</td>
                      </tr>
                    )}
                </tbody>
              </table>
              {/* Pagination */}
              <Pagination
                casesPerPage={casesPerPage}
                totalCases={searchResults.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <div>لم يتم العثور على نتائج</div>
          )}
        </div>
      </Col>
    </Row>
  );
};
LegCaseSearch.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  casesPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default LegCaseSearch;
