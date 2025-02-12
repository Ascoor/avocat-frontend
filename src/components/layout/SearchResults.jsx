import React from "react";

const SearchResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-purple-600 text-center">نتيجة البحث</h3>

      {data.message ? (
        <p className="text-center text-red-500">{data.message}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>رقم الدعوى:</strong> {data.CaseNumber}</p>
            <p><strong>السنة:</strong> {data.CaseYear}</p>
            <p><strong>نوع الدعوى:</strong> {data.CaseType}</p>
            <p><strong>تاريخ القيد:</strong> {data.DateCreation}</p>
            <p><strong>المدعي:</strong> {data.PlaintiffName}</p>
            <p><strong>المدعى عليه:</strong> {data.DefendantName}</p>
            <p><strong>موضوع الدعوى:</strong> {data.CaseSubject}</p>
            <p><strong>آخر جلسة:</strong> {data.DateLastSession}</p>
          </div>

          <h4 className="text-md font-bold mt-4 text-purple-500">تفاصيل الجلسات:</h4>
          <ul className="list-disc pl-6">
            {data["Case Sessions"]?.map((session, index) => (
              <li key={index}>
                <strong>{session.DateSession}</strong>: {session["Session Decision"]} → <span className="text-gray-600">{session["Next Session Date"]}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchResults;
