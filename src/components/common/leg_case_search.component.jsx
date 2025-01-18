import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Pagination from './Pagination';

const LegCaseSearch = ({
  searchResults,
  casesPerPage,
  currentPage,
  paginate,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSpringProps = useSpring({
    from: { rotation: 0 },
    to: { rotation: showAlert ? 180 : 0 },
    config: { tension: 200, friction: 10 },
  });

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = searchResults.slice(indexOfFirstCase, indexOfLastCase);

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-4/5 lg:w-10/12">
        <div className="flex justify-between items-center mb-4">
          <animated.div
            style={{
              transform: handleSpringProps.rotation.to(
                (rotation) => `rotate(${rotation}deg)`
              ),
              display: 'inline-block',
              cursor: 'pointer',
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
        </div>
        <div className="overflow-auto">
          {searchResults.length > 0 ? (
            <>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">رقم القضية</th>
                    <th className="border border-gray-300 p-2">العنوان</th>
                    <th className="border border-gray-300 p-2">الحالة</th>
                    <th className="border border-gray-300 p-2">الفئة</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCases.length > 0 ? (
                    currentCases.map((caseItem) => (
                      <tr key={caseItem.id}>
                        <td className="border border-gray-300 p-2">
                          {caseItem.slug}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {caseItem.name}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {caseItem.email}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {caseItem.phone_number}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4">
                        لا توجد بيانات متاحة
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                casesPerPage={casesPerPage}
                totalCases={searchResults.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <div className="text-center text-gray-600">
              لم يتم العثور على نتائج
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegCaseSearch;
