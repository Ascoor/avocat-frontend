import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Pagination from '../home_tools/Pagination';

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
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">نتائج البحث</h2>
          <animated.div
            style={{
              transform: handleSpringProps.rotation.interpolate(
                (rotation) => `rotate(${rotation}deg)`
              ),
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
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </animated.div>
        </div>

        {searchResults.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-200 text-right">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">رقم القضية</th>
                    <th className="border border-gray-300 px-4 py-2">العنوان</th>
                    <th className="border border-gray-300 px-4 py-2">الحالة</th>
                    <th className="border border-gray-300 px-4 py-2">الفئة</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCases.length > 0 ? (
                    currentCases.map((caseItem) => (
                      <tr key={caseItem.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{caseItem.slug}</td>
                        <td className="border border-gray-300 px-4 py-2">{caseItem.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{caseItem.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{caseItem.phone_number}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-gray-500 py-4">
                        لا توجد بيانات متاحة
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Pagination
              casesPerPage={casesPerPage}
              totalCases={searchResults.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 mt-6">لم يتم العثور على نتائج</div>
        )}
      </div>
    </div>
  );
};

export default LegCaseSearch;
