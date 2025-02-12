import React, { useEffect, useState } from "react";
import axios from "axios"; 
import SearchResults from "../components/layout/SearchResults";

const SearchCourtsApi = () => {
  const [allData, setAllData] = useState({});
  const [degree, setDegree] = useState("");
  const [court, setCourt] = useState("");
  const [caseType, setCaseType] = useState("");
  const [caseYear, setCaseYear] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [courtOptions, setCourtOptions] = useState([]);
  const [caseTypeOptions, setCaseTypeOptions] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://search-api.ask-ar.net/api/search-court");
        setAllData(response.data);
        setCourtOptions(response.data.search_degrees || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
    setCourtOptions(allData.search_courts?.filter(item => item.degree_value === e.target.value) || []);
  };

  const handleCourtChange = (e) => {
    setCourt(e.target.value);
    setCaseTypeOptions(allData.search_case_types?.filter(item => item.degree_value === degree && item.court_value === e.target.value) || []);
  };

  const performSearch = async () => {
    if (!degree || !court || !caseType || !caseYear || !caseNumber) {
      alert("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://search-api.ask-ar.net/search", 
        { degree, court, caseType, caseYear, caseNumber }, 
        { headers: { "x-request-source": "React" } }
      );

      if (!response.data || Object.keys(response.data).length === 0) {
        setSearchResults({ message: "الدعوى غير مقيدة" });
      } else {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error(error);
      setSearchResults({ message: "حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-center text-purple-600 mb-4">بحث عن قضية</h2>

        {/* 📌 جعل الحقول صفين لكل سطر باستخدام Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-bold">الدرجة:</label>
            <select onChange={handleDegreeChange} className="w-full border rounded p-2">
              <option value="">-- اختر --</option>
              {allData.search_degrees?.map(degree => (
                <option key={degree.degree_value} value={degree.degree_value}>{degree.degree_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold">المحكمة:</label>
            <select onChange={handleCourtChange} className="w-full border rounded p-2">
              <option value="">-- اختر --</option>
              {courtOptions.map(court => (
                <option key={court.court_value} value={court.court_value}>{court.court_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold">نوع الدعوى:</label>
            <select onChange={(e) => setCaseType(e.target.value)} className="w-full border rounded p-2">
              <option value="">-- اختر --</option>
              {caseTypeOptions.map(caseType => (
                <option key={caseType.case_type_value} value={caseType.case_type_value}>{caseType.case_type_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold">سنة الدعوى:</label>
            <input type="text" value={caseYear} onChange={(e) => setCaseYear(e.target.value)} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">رقم الدعوى:</label>
            <input type="number" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} className="w-full border rounded p-2" />
          </div>
        </div>

        <button 
          onClick={performSearch} 
          className="w-full mt-4 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700"
        >
          {loading ? "جاري البحث..." : "بحث"}
        </button>
      </div>

      {/* 📌 مكون النتائج */}
      {searchResults && <SearchResults data={searchResults} />}
    </div>
  );
};

export default SearchCourtsApi;
