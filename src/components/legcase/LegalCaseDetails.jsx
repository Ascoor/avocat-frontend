import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { BsPersonFillX } from 'react-icons/bs';

import API_CONFIG from '../../config';
import Procedure from './tools/LegalCaseProcedures';
import LegalSession from './tools/LegalCaseSessions';
import LegCaseClients from './tools/LegalCaseClients';
import LegalAd from './tools/LegalCaseAds';
import { LegCaseDetailsIcon } from '../../assets/icons';

export default function LegCaseDetail() {
  const { id } = useParams();
  const [legCase, setLegCase] = useState(null);
  const [key, setKey] = useState('procedure');
  const [courts, setCourts] = useState([]);
  const [legCaseCourts, setLegCaseCourts] = useState([]);
  const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);

  useEffect(() => {
    const fetchLegCase = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/api/legal-cases/${id}`);
        setLegCase(response.data.leg_case);
        setLegCaseCourts(response.data.leg_case.courts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLegCase();
  }, [id]);

  const handleAddNewCourt = () => {
    setLegCaseNewCourts((prev) => [...prev, { case_number: '', case_year: '', court_id: '' }]);
  };

  const handleRemoveNewCourt = (index) => {
    setLegCaseNewCourts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNewCourtChange = (index, field, value) => {
    const updated = [...legCaseNewCourts];
    updated[index][field] = value;
    setLegCaseNewCourts(updated);
  };

  const CaseHeader = () => (
    <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
      <h3 className="text-lg font-bold">بيانات القضية</h3>
      <img src={LegCaseDetailsIcon} alt="Icon" className="w-10 h-10" />
    </div>
  );

  const CaseBody = () => (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">موضوع القضية:</p>
          <p className="font-medium">{legCase?.title}</p>
        </div>
        <div>
          <p className="text-gray-500">حالة الدعوى:</p>
          <p className="font-medium">{legCase?.status}</p>
        </div>
        <div>
          <p className="text-gray-500">تصنيف القضية:</p>
          <p className="font-medium">{legCase?.case_type?.name}</p>
        </div>
        <div>
          <p className="text-gray-500">التصنيف الفرعي:</p>
          <p className="font-medium">{legCase?.case_sub_type?.name}</p>
        </div>
      </div>
    </div>
  );

  const TabButton = ({ tabKey, label }) => (
    <button
      onClick={() => setKey(tabKey)}
      className={`px-4 py-2 rounded-t-lg ${
        key === tabKey ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
      } transition-all hover:bg-blue-500 hover:text-white`}
    >
      {label}
    </button>
  );

  if (!legCase) {
    return <div className="text-center py-10">جارٍ التحميل...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="shadow-lg rounded-lg overflow-hidden">
        <CaseHeader />
        <CaseBody />
      </div>

      <div className="mt-6">
        <div className="flex gap-2">
          <TabButton tabKey="procedure" label="الإجراءات" />
          <TabButton tabKey="session" label="الجلسات" />
          <TabButton tabKey="legalAd" label="الإعلانات" />
        </div>

        <div className="p-4 bg-white shadow-md rounded-b-lg">
          {key === 'procedure' && <Procedure legCaseId={id} />}
          {key === 'session' && <LegalSession legCaseId={id} />}
          {key === 'legalAd' && <LegalAd legCaseId={id} />}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">المحاكم</h3>
        <button
          onClick={handleAddNewCourt}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          إضافة محكمة <BiPlusCircle size={20} />
        </button>

        {legCaseNewCourts.map((court, index) => (
          <div key={index} className="flex gap-4 items-center mt-3">
            <input
              type="text"
              placeholder="رقم القضية"
              value={court.case_number}
              onChange={(e) => handleNewCourtChange(index, 'case_number', e.target.value)}
              className="border rounded-lg p-2 w-1/3"
            />
            <input
              type="text"
              placeholder="سنة القضية"
              value={court.case_year}
              onChange={(e) => handleNewCourtChange(index, 'case_year', e.target.value)}
              className="border rounded-lg p-2 w-1/3"
            />
            <button
              onClick={() => handleRemoveNewCourt(index)}
              className="text-red-500 hover:text-red-700"
            >
              <BiMinusCircle size={25} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
