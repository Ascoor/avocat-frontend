import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import API_CONFIG from '../../config';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { BsPersonFillX } from 'react-icons/bs';

import Procedure from './tools/LegalCaseProcedures';
import LegalSession from './tools/LegalCaseSessions';
import LegCaseClients from './tools/LegalCaseClients';
import { LegCaseDetailsIcon } from '../../assets/icons';
import LegalAd from './tools/LegalCaseAds';
export default function LegCaseDetail() {
  const { id } = useParams();
  const [legCase, setLegCase] = useState(null);
  const [key, setKey] = useState('procedure');
  const [courts, setCourts] = useState([]);
  const [clients, setClients] = useState([]);
  const [legCaseCourts, setLegCaseCourts] = useState([]);

  const [legCaseNewClients, setLegCaseNewClients] = useState([]);
  const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);
  useEffect(() => {
    const fetchLegCase = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/legal-cases/${id}`,
        );
        setLegCase(response.data.leg_case);
        setLegCaseCourts(response.data.leg_case.courts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLegCase();
  }, [id]);

  const handleAddNewClient = () => {
    setLegCaseNewClients((prevClients) => [...prevClients, { client_id: '' }]);
  };
  // Function to add a new court to the legCaseNewCourts state
  const handleAddNewCourt = () => {
    setLegCaseNewCourts((prevCourts) => [
      ...prevCourts,
      { case_number: '', case_year: '', court_id: '' },
    ]);
  };

  // Function to remove a new court from the legCaseNewCourts state
  const handleRemoveNewCourt = (index) => {
    setLegCaseNewCourts((prevCourts) =>
      prevCourts.filter((_, i) => i !== index),
    );
  };

  // Function to handle changes in the new court form fields
  const handleNewCourtChange = (index, field, value) => {
    const updatedCourts = [...legCaseNewCourts];
    updatedCourts[index][field] = value;
    setLegCaseNewCourts(updatedCourts);
  };

  // Function to handle adding leg case courts
  const handleAddLegCaseCourts = async () => {
    try {
      // Prepare the data to send in the request
      const requestData = {
        leg_case_id: id,
        courts: legCaseNewCourts,
      };

      // Make a POST request to add leg case courts
      const response = await axios.post('/leg-case/add_courts', requestData);

      // Handle the response as needed (e.g., show a success message)
      console.log('Leg case courts added successfully', response.data);
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error('Error adding leg case courts', error);
    }
  };

  if (!legCase) {
    return <div>Loading...</div>;
  }

  const handleRemoveNewClient = (index) => {
    setLegCaseNewClients((prevClients) =>
      prevClients.filter((_, i) => i !== index),
    );
  };

  const handleNewClientChange = (index, field, value) => {
    const updatedClients = [...legCaseNewClients];
    updatedClients[index][field] = value;
    setLegCaseNewClients(updatedClients);
  };

  const CaseHeader = () => (
    <div className="flex justify-between items-center">
      <h3>بيانات القضية</h3>
      <img src={LegCaseDetailsIcon} alt="Icon" className="leg-case-icon" />
    </div>
  );
  
  const CaseBody = () => (
    <div className="m-4">
      {legCase && (
        <>
          <div className="leg-case-details-card">
            <div className="grid grid-cols-1 gap-4">
              <div className="data-box">
                <div className="data-label">موضوع القضية</div>
                <div className="data-value">{legCase.title}</div>
              </div>
              <div className="data-box">
                <div className="data-label">تفاصيل القضية</div>
                <div className="data-value">{legCase.description}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="data-box">
                  <div className="data-label">رقم الملف بالمكتب</div>
                  <div className="data-value">{legCase.slug}</div>
                </div>
                <div className="data-box">
                  <div className="data-label">حالة الدعوى</div>
                  <div className="data-value">{legCase.status}</div>
                </div>
                <div className="data-box">
                  <div className="data-label">صفة الموكل</div>
                  <div className="data-value">{legCase.client_capacity}</div>
                </div>
                <div className="data-box">
                  <div className="data-label">اسم الخصم</div>
                  <div className="data-value flex items-center">
                    <BsPersonFillX size={25} />
                    {legCase.litigants_name}
                  </div>
                </div>
                <div className="data-box">
                  <div className="data-label">تصنيف القضية</div>
                  <div className="data-value">{legCase.case_type?.name}</div>
                </div>
                <div className="data-box">
                  <div className="data-label">التصنيف الفرعي</div>
                  <div className="data-value">{legCase.case_sub_type?.name}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
  const CourtsHeader = () => (
    <div className="flex justify-between items-center">
      <h3 className="font-bold">بيانات المحاكم</h3>
      <div>
        <button
          className="btn btn-sm btn-start mx-2 bg-yellow-400 text-white"
          onClick={handleAddNewCourt}
        >
          إضافة محكمة <BiPlusCircle />
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="card">
      <CaseHeader />
      <div className="card-body">
        <CaseBody />
        <LegCaseClients
          legCaseId={id}
          clients={clients}
          onAddNewClient={handleAddNewClient}
          handleNewClientChange={handleNewClientChange}
          handleRemoveNewClient={handleRemoveNewClient}
        />
      </div>
      <CourtsHeader />
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="special-table">
            <thead>
              <tr>
                <th>رقم القضية</th>
                <th>سنة القضية</th>
                <th>المحكمة</th>
              </tr>
            </thead>
            <tbody>
              {legCaseCourts.map((court, index) => (
                <tr key={`legCaseCourt-${index}`}>
                  <td>{court.pivot.case_number}</td>
                  <td>{court.pivot.case_year}</td>
                  <td>{court.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {legCaseNewCourts.map((court, index) => (
          <div key={index} className="mb-3">
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label>رقم القضية</label>
                <input
                  type="text"
                  value={court.case_number}
                  onChange={(e) =>
                    handleNewCourtChange(
                      index,
                      'case_number',
                      e.target.value,
                    )
                  }
                  className="input"
                />
              </div>
              <div>
                <label>سنة القضية</label>
                <select
                  value={court.case_year}
                  onChange={(e) =>
                    handleNewCourtChange(index, 'case_year', e.target.value)
                  }
                  className="select"
                >
                  <option defaultValue={null}>اختر السنة</option>
                  {Array.from({ length: 51 }, (_, i) => (
                    <option key={2000 + i} value={2000 + i}>
                      {2000 + i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label>المحكمة</label>
                <select
                  value={court.court_id}
                  onChange={(e) =>
                    handleNewCourtChange(index, 'court_id', e.target.value)
                  }
                  className="select"
                >
                  <option defaultValue={null}>اختر المحكمة</option>
                  {courts.map((option) => (
                    <option key={`court-${option.id}`} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="col-span-1 flex items-center">
                <button
                  onClick={() => handleRemoveNewCourt(index)}
                  className="bg-red-500 text-white rounded-full p-2"
                >
                  <BiMinusCircle />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex">
          <button
            onClick={handleAddLegCaseCourts}
            className="bg-green-500 text-white rounded-full p-2"
          >
            <BiPlusCircle />
          </button>
        </div>
      </div>
  
      <div className="card-body">
        <div className="tabs">
          <div className="tab" onClick={() => setKey("procedure")}>
            الإجراءات
          </div>
          <div className="tab" onClick={() => setKey("session")}>
            الجلسات
          </div>
          <div className="tab" onClick={() => setKey("legalAd")}>
            الإعلانات
          </div>
        </div>
        {key === "procedure" && <Procedure legCaseId={String(id)} />}
        {key === "session" && <LegalSession legCaseId={String(id)} />}
        {key === "legalAd" && <LegalAd legCaseId={String(id)} />}
      </div>
      <div className="card-footer"></div>
    </div>
  );
}
