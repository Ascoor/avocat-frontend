import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api/axiosConfig';
import SearchResults from '../components/layout/SearchResults';
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
      <div className="bg-gray-300 dark:bg-gray-900 shadow-lg rounded-lg p-4 w-full md:w-full">
        <div className="bg-gradient-night shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-center text-avocat-orange mb-4">بحث عن قضية</h2>
  </div>
          {/* 📌 جعل الحقول صفين لكل سطر باستخدام Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <lael className="block p-4 text-gray-700 dark:text-green-100 text-center font-bold">الدرجة</lael>
              <select onChange={handleDegreeChange} className="w-full border rounded p-2">
                <option className="text-center" value="">-- اختر --</option>
                {allData.search_degrees?.map(degree => (
                  <option className="text-center" key={degree.degree_value} value={degree.degree_value}>{degree.degree_name}</option>
                ))}
              </select>
            </div>
            {showCourtGroup && (
  
            <div>
                <label className="block p-4 text-gray-700 dark:text-green-100 text-center font-bold">المحكمة</label>
              <select onChange={handleCourtChange} className="w-full border rounded p-2">
                <option className="text-center" value="">-- اختر --</option>
                {courtOptions.map(court => (
                  <option className="text-center" key={court.court_value} value={court.court_value}>{court.court_name}</option>
                ))}
              </select>
            </div>
            )}

            {showCaseTypeGroup && (
 
            <div>
             <label className="block p-4 text-gray-700 dark:text-green-100 text-center font-bold">نوع الدعوى</label>
              <select onChange={(e) => setCaseType(e.target.value)} className="w-full border rounded p-2">
                <option className="text-center" value="">-- اختر --</option>
                {caseTypeOptions.map(caseType => (
                  <option className="text-center" key={caseType.case_type_value} value={caseType.case_type_value}>{caseType.case_type_name}</option>
                ))}
              </select>
            </div>
               
              )}
            <div>
            <label className="block p-4 text-gray-700 dark:text-green-100 text-center font-bold">سنة الدعوى</label>
              <input type="text" value={caseYear} onChange={(e) => setCaseYear(e.target.value)} className="w-full border rounded p-2" />
            </div>
  
            <div>
            <label className="block p-4 text-gray-700 dark:text-green-100 text-center font-bold">رقم الدعوى</label>
              <input type="number" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} className="w-full border rounded p-2" />
            </div>
          </div>
  
          <button 
            onClick={handleSubmit} 
            className="w-full mt-4 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700"
          >
 
          </button>
        </div>
        
        {showCountdown && (
            <div className="flex items-center justify-center mt-4">
              <div className="relative w-24 h-24 flex items-center justify-center bg-purple-600 rounded-full text-white font-semibold text-2xl">
                {countdown}
              </div>
            </div>
          )}
        {/* 📌 مكون النتائج */}
        {searchResults && <SearchResults data={searchResults} />}
      </div>
      </div>
    );
  };
  
  export default SearchCourtsApi;
  