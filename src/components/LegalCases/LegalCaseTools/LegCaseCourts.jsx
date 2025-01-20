  import { useState,useEffect } from 'react';
  import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi'; 
import { useLegalCaseApi } from '../../../services/api/courts';
  

  const LegalCaseCourts = ({ legCase, fetchLegCase }) => {

    const { addLegalCaseCourts, getCourts } = useLegalCaseApi(); // Use the custom hook for API
    const [courtLevels, setCourtLevels] = useState([]);
    const [courts, setCourts] = useState([]);
    const [filteredCourts, setFilteredCourts] = useState([]);
    const years = Array.from({ length: 51 }, (_, i) => 2000 + i);
    const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);
    useEffect(() => {
      // Fetch all courts and extract court levels
      const fetchCourtData = async () => {
        try {
          const response = await getCourts();
          const fetchedCourts = response.data;

          setCourts(fetchedCourts);

          // Extract unique court levels
          const uniqueLevels = fetchedCourts
            .map((court) => court.court_level)
            .filter(
              (level, index, self) =>
                level && self.findIndex((l) => l.id === level.id) === index,
            );

          setCourtLevels(uniqueLevels);
        } catch (error) {
          console.error('Error fetching courts:', error);
        }
      };

      fetchCourtData();
    }, []);

    const addNewCourt = () => {
      setLegCaseNewCourts((prev) => [
        ...prev,
        { case_number: '', case_year: '', court_id: '' },
      ]);
    };

    const removeNewCourt = (index) => {
      setLegCaseNewCourts((prev) => prev.filter((_, i) => i !== index));
    };

    const updateCourtField = (index, field, value) => {
      const updated = [...legCaseNewCourts];
      updated[index][field] = value;

      if (field === 'court_level_id') {
        updated[index].court_id = ''; // Reset court selection
        const filtered = courts.filter(
          (court) => court.court_level_id === parseInt(value),
        );
        setFilteredCourts(filtered);
      }

      setLegCaseNewCourts(updated);
    };
 
  

    const saveCourts = async () => {
      if (!legCaseNewCourts.length) {
        alert('Please add at least one court before saving.');
        return;
      }
  
      // Validate the fields of each court before proceeding
      const invalidCourt = legCaseNewCourts.find(
        (court) => !court.case_number || !court.case_year || !court.court_id
      );
  
      if (invalidCourt) {
        alert(
          'All fields are required for each court. Please complete the missing fields.'
        );
        return;
      }
  
      try {
        // Add leg_case_id to the request payload
        await addLegalCaseCourts(legCase.id, legCaseNewCourts);
        alert('Courts added successfully!');
        setLegCaseNewCourts([]); // Clear the form fields after a successful save
        fetchLegCase(); // Refresh the parent data
      } catch (error) {
        console.error('Error saving courts:', error.response || error.message);
        alert('An error occurred while saving courts. Please try again.');
      }
    };
  
    return(
      <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
          المحاكم المرتبطة
        </h2>

        <button
          onClick={addNewCourt}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <BiPlusCircle size={20} />
          إضافة محكمة
        </button>

        <div className="mt-4 space-y-3">
          {legCaseNewCourts.map((court, index) => (
            <div key={index} className="flex flex-wrap gap-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="رقم القضية"
                value={court.case_number}
                onChange={(e) => updateCourtField(index, 'case_number', e.target.value)}
                className="border rounded-lg p-2 flex-1 dark:bg-gray-800 dark:border-gray-600"
              />
              <select
                value={court.case_year}
                onChange={(e) => updateCourtField(index, 'case_year', e.target.value)}
                className="border rounded-lg p-2 flex-1 dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="">اختر السنة</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={court.court_level_id}
                onChange={(e) => updateCourtField(index, 'court_level_id', e.target.value)}
                className="border rounded-lg p-2 flex-1 dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="">اختر درجة المحكمة</option>
                {courtLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
              <select
                value={court.court_id}
                onChange={(e) => updateCourtField(index, 'court_id', e.target.value)}
                className="border rounded-lg p-2 flex-1 dark:bg-gray-800 dark:border-gray-600"
              >
                <option value="">اختر المحكمة</option>
                {filteredCourts.map((filteredCourt) => (
                  <option key={filteredCourt.id} value={filteredCourt.id}>
                    {filteredCourt.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeNewCourt(index)}
                className="text-red-500 hover:text-red-700"
              >
                <BiMinusCircle size={25} />
              </button>
            </div>
          ))}
        </div>

        {legCaseNewCourts.length > 0 && (
          <button
            onClick={saveCourts}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            حفظ
          </button>
        )}


        {legCaseNewCourts.length > 0 && (
          <button
            onClick={saveCourts}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            حفظ
          </button>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
            المحاكم الحالية
          </h3>
          {legCase.courts.length > 0 ? (
            <ul className="space-y-2">
              {legCase.courts.map((court) => (
                <li
                  key={court.id}
                  className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
                >
                  <span className="font-bold">{court.name}</span> -{' '}
                  {court.pivot.case_year}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              لا يوجد محاكم مسجلة حاليًا
            </div>
          )}
        </div>
      </div>
    );
  };

  export default LegalCaseCourts;
