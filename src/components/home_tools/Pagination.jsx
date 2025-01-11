import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Pagination from "../home_tools/Pagination";

const LegCaseSearch = ({ searchResults = [], casesPerPage, currentPage, paginate }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSpringProps = useSpring({
    from: { rotation: 0 },
    to: { rotation: showAlert ? 180 : 0 },
    config: { tension: 200, friction: 10 },
  });

  // Safely handle undefined or empty searchResults
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = searchResults?.slice(indexOfFirstCase, indexOfLastCase) || [];

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">نتائج البحث</h2>
          <animated.div
            style={{
              transform: handleSpringProps.rotation.to(
                (rotation) => `rotate(${rotation}deg)`
              ),
              cursor: "pointer",
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

        {searchResults?.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300 text-right">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700">
                      رقم القضية
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700">
                      العنوان
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700">
                      الحالة
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700">
                      الفئة
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCases.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className="hover:bg-gray-50 transition-all"
                    >
                      <td className="border border-gray-300 px-6 py-3 text-gray-700">
                        {caseItem.slug}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-gray-700">
                        {caseItem.name}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-gray-700">
                        {caseItem.email}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-gray-700">
                        {caseItem.phone_number}
                      </td>
                    </tr>
                  ))}
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
          <div className="text-center text-gray-500 mt-6">
            لم يتم العثور على نتائج
          </div>
        )}
      </div>
    </div>
  );
};

export default LegCaseSearch;
