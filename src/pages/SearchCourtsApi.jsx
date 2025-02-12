import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api/axiosConfig';
const SearchCourtsApi = () => {
    const [allData, setAllData] = useState({});
    const [degree, setDegree] = useState('');
    const [court, setCourt] = useState('');
    const [caseType, setCaseType] = useState('');
    const [caseYear, setCaseYear] = useState('');
    const [caseNumber, setCaseNumber] = useState('');
    const [courtOptions, setCourtOptions] = useState([]);
    const [caseTypeOptions, setCaseTypeOptions] = useState([]);
    const [showCourtGroup, setShowCourtGroup] = useState(false);
    const [showCaseTypeGroup, setShowCaseTypeGroup] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [showCountdown, setShowCountdown] = useState(false);
    const [searchResults, setSearchResults] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api/search-court');
                setAllData(response.data);
                setOptions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const setOptions = (data) => {
        const degreeOptions = data.search_degrees || [];
        setCourtOptions(degreeOptions);
    };

    const handleDegreeChange = (e) => {
        const selectedDegree = e.target.value;
        setDegree(selectedDegree);
        setCourtOptions(allData.search_courts.filter(item => item.degree_value === selectedDegree));
        setShowCourtGroup(!!courtOptions.length);
        setCaseTypeOptions([]);
        setShowCaseTypeGroup(false);
    };

    const handleCourtChange = (e) => {
        const selectedCourt = e.target.value;
        setCourt(selectedCourt);
        const filteredCaseTypes = allData.search_case_types.filter(item => 
            item.degree_value === degree && item.court_value === selectedCourt
        );
        setCaseTypeOptions(filteredCaseTypes);
        setShowCaseTypeGroup(!!filteredCaseTypes.length);
    };

    const handleSubmit = () => {
        setShowCountdown(true);
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    performSearch();
                    return 5; // Reset countdown
                }
                return prev - 1;
            });
        }, 1000);
    };

    const performSearch = async () => {
      const formData = { degree, court, caseType, caseYear, caseNumber };
  
      if (!degree || !court || !caseType || !caseYear || !caseNumber) {
          alert('يرجى ملء جميع الحقول المطلوبة.');
          return;
      }
  
      try {
          const response = await axios.post('https://search-api.ask-ar.net/search', formData, {
              headers: { "x-request-source": "React" } // تحديد الطلب كمصدره React
          });
  
          // التأكد من أن الرد يحتوي على بيانات صالحة
          if (!response.data || Object.keys(response.data).length === 0) {
              setSearchResults({ message: "الدعوى غير مقيدة" });
          } else {
              setSearchResults(response.data);
          }
      } catch (error) {
          console.error(error);
          setSearchResults({ message: "حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى." });
      }
  };
  
    return (
        <div className=" font-sans leading-normaltracking-normal p-4"> 
          <div className="flex flex-col md:flex-row justify-center  w-full  gap-4">
            <div className="bg-gray-300 dark:bg-gradient-night shadow-lg rounded-lg p-4 w-full md:w-full">
              <div className="bg-avocat-indigo text-avocat-orange-light text-lg font-semibold rounded-t-lg px-6 py-4 flex justify-center items-center">
                <h2 className="text-xl  font-semibold"> بحث دعوى بالمحاكم</h2>
              </div>
              <form className="p-6">
                <div className="mb-4">
                  <label htmlFor="degree" className="block text-sm mb-4 text-center font-bold dark:text-green-100">الدرجة </label>
                  <select id="degree" name="degree" onChange={handleDegreeChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                    <option className="text-center" value="">--اختر--</option>
                    {allData.search_degrees && allData.search_degrees.map(degree => (
                      <option className="text-center" key={degree.degree_value} value={degree.degree_value}>{degree.degree_name}</option>
                    ))}
                  </select>
                </div>
      
                {showCourtGroup && (
                  <div className="mb-4">
                    <label htmlFor="court" className="block mb-4 text-center font-bold dark:text-green-100">المحكمة </label>
                    <select id="court" name="court" onChange={handleCourtChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                      <option className="text-center" value="">--اختر--</option>
                      {courtOptions.map(court => (
                        <option className="text-center text-gray-800" key={court.court_value} value={court.court_value}>{court.court_name}</option>
                      ))}
                    </select>
                  </div>
                )}
      
                {showCaseTypeGroup && (
                  <div className="mb-4">
                    <label htmlFor="caseType" className="block mb-4 text-center font-bold dark:text-green-100">نوع الدعوى</label>
                    <select id="caseType" name="caseType" onChange={(e) => setCaseType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                      <option  className="text-center" value="">--اختر--</option>
                      {caseTypeOptions.map(caseType => (
                        <option className="text-center"  key={caseType.case_type_value} value={caseType.case_type_value}>{caseType.case_type_name}</option>
                      ))}
                    </select>
                  </div>
                )}
      
                <div className="mb-4">
                  <label htmlFor="caseYear" className="block mb-4 text-center font-bold dark:text-green-100">سنة الدعوى</label>
                  <input type="text" id="caseYear" name="caseYear" value={caseYear} onChange={(e) => setCaseYear(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" />
                </div>
      
                <div className="mb-4">
                  <label htmlFor="caseNumber" className="block mb-4 text-center font-bold dark:text-green-100">رقم الدعوى</label>
                  <input type="number" id="caseNumber" name="caseNumber" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" />
                </div>
      
                <button type="button" onClick={handleSubmit} className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Search</button>
              </form>
            </div>
          </div>
      
          {showCountdown && (
            <div className="flex items-center justify-center mt-4">
              <div className="relative w-24 h-24 flex items-center justify-center bg-purple-600 rounded-full text-white font-semibold text-2xl">
                {countdown}
              </div>
            </div>
          )}
      
          <div id="result" className="mt-4 mx-auto max-w-xl">
            <div id="searchResults" dangerouslySetInnerHTML={{ __html: searchResults }}></div>
          </div>
 
      </div>
      
    );
};

export default SearchCourtsApi;