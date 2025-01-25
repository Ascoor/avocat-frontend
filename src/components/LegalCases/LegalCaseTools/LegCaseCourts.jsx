  import { useState,useEffect } from 'react';
  import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';  
import  useLegalCaseApi  from '../../../services/api/legalCases';
import { useAlert } from '../../../context/AlertContext';
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal';
   

  const LegalCaseCourts = ({ legCase, fetchLegCase }) => {
    const { addLegalCaseCourts, getCourts,removeLegalCaseCourt } = useLegalCaseApi();
    const [courtLevels, setCourtLevels] = useState([]);
    const [courts, setCourts] = useState([]);
    const [filteredCourts, setFilteredCourts] = useState([]);
    const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);
    const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

    
    const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCourt, setSelectedCourt] = useState(null);

    const { triggerAlert } = useAlert();
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
        { case_number: '', case_year: '', court_level_id: '', court_id: '' },
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
        triggerAlert('Please add at least one court before saving.');
        return;
      }
  
      const invalidCourt = legCaseNewCourts.find(
        (court) => !court.case_number || !court.case_year || !court.court_id
      );
      if (invalidCourt) {
        triggerAlert(
          'error',
          'جميع الحقول مطلوبة لكل محكمة. يرجى استكمال الحقول المفقودة.'
        );
        return;
      }
      try {
        await addLegalCaseCourts(legCase.id, legCaseNewCourts);
        triggerAlert('success', 'تمت إضافة المحاكم بنجاح!');
        setLegCaseNewCourts([]);
        fetchLegCase();
      } catch (error) {
        console.error('Error saving courts:', error.response || error.message);
        triggerAlert('error', 'حدث خطأ أثناء حفظ المحاكم. حاول مرة أخرى.');
      }
    };
  
    const handleDelete = (courtId, courtName) => {
      setSelectedCourt({ id: courtId, name: courtName });
      setIsModalOpen(true); // فتح المودال
    };
    const confirmDelete = async () => {
      if (!selectedCourt) return;
  
      try {
        await removeLegalCaseCourt(legCase.id, selectedCourt.id);
        triggerAlert('success', `تم حذف ${selectedCourt.name} بنجاح!`);
        fetchLegCase(); // تحديث القائمة بعد الحذف
      } catch (error) {
        console.error("Failed to remove court:", error);
   
        triggerAlert('error', 'فشل في حذف المحكمة. حاول مرة أخرى.');
      } finally {
        setIsModalOpen(false); // إغلاق المودال
        setSelectedCourt(null);
      }
    };
    
  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg transition duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        المحاكم المرتبطة
      </h2>

      {/* Add Court Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={addNewCourt}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg transition"
        >
          <BiPlusCircle size={24} />
          إضافة محكمة
        </button>
      </div>

      {/* Add New Courts Form */}
      <div className="space-y-4">
        {legCaseNewCourts.map((court, index) => (
          <div
            key={index}
            className="flex flex-wrap gap-4 bg-gray-300 text-avocat-blue-dark dark:text-white dark:bg-avocat-blue-dark p-4 rounded-lg shadow transition"
          >
            <input
              type="text"
              placeholder="رقم القضية"
              value={court.case_number}
              onChange={(e) => updateCourtField(index, 'case_number', e.target.value)}
              className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={court.case_year}
              onChange={(e) => updateCourtField(index, 'case_year', e.target.value)}
              className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
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
              className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
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
              className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
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
              className="text-red-500 hover:text-red-700 transition"
            >
              <BiMinusCircle size={28} />
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      {legCaseNewCourts.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={saveCourts}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 shadow-lg transition"
          >
            حفظ
          </button>
        </div>
      )}

      {/* Existing Courts */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
          المحاكم الحالية
        </h3>
        {legCase.courts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200 border-collapse">
              <thead className="bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-center">المحكمة</th>
                  <th className="px-6 py-3 text-center">السنة</th>
                  <th className="px-6 py-3 text-center">رقم القضية</th>
                  <th className="px-6 py-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {legCase.courts.map((court, index) => (
                  <tr
                    key={court.id}
                    className={`border-b ${
                      index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-center">{court.name}</td>
                    <td className="px-6 py-4 text-center">{court.pivot.case_year}</td>
                    <td className="px-6 py-4 text-center">{court.pivot.case_number}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedCourt(court);
                          setIsModalOpen(true);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
            لا يوجد محاكم مسجلة حاليًا
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalCaseCourts; 