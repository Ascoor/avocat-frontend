import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import arEG from 'date-fns/locale/ar-EG';
import useAuth from '../../layout/AuthTool/AuthUser';
import API_CONFIG from '../../../config';
registerLocale('ar_eg', arEG);
setDefaultLocale('ar_eg');

const LegalCaseAds = ({ legCaseId }) => {
  const { getUser } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showAddLegalAdModal, setShowAddLegalAdModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [legalAdId, setLegalAdId] = useState(null);
  const [legalAds, setLegalAds] = useState([]);
  const [courts, setCourts] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [legalAdTypes, setLegalAdTypes] = useState([]);
  const [selectedSendDate, setSelectedSendDate] = useState(null);
  const [selectedRecivedDate, setSelectedRecivedDate] = useState(null);
  const [selectedSendLawyer, setSelectedSendLawyer] = useState('');
  const [selectedLegalAd, setSelectedLegalAd] = useState(null);
  const [selectedRecivedLawyer, setSelectedRecivedLawyer] = useState('');
  const [selectedResults, setSelectedResults] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedLegalAdType, setSelectedLegalAdType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCost, setSelectedCost] = useState('');
  const [selectedCost2, setSelectedCost2] = useState('');

  const user = getUser();

  useEffect(() => {
    fetchLegalAds(legCaseId);
    fetchCourts();
    fetchLawyers();
    fetchLegalAdTypes();
  }, [legCaseId]);

  const fetchLegalAds = async (legCaseId) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal_ads?legCaseId=${legCaseId}`,
      );
      setLegalAds(response.data);
    } catch (error) {
      console.log('خطأ في جلب الاعلانات القانونية:', error);
    }
  };

  const fetchCourts = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/courts`);
      setCourts(response.data);
    } catch (error) {
      console.log('خطأ في جلب المحاكم:', error);
    }
  };

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
      setLawyers(response.data);
    } catch (error) {
      console.log('خطأ في جلب المحامين:', error);
    }
  };

  const fetchLegalAdTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal_ad_types`,
      );
      setLegalAdTypes(response.data);
    } catch (error) {
      console.log('خطأ في جلب أنواع الإعلانات القانونية:', error);
    }
  };

  const handleAddLegalAd = () => {
    setModalMode('add');
    setShowAddLegalAdModal(true);
  };
  const handleEditLegalAd = (legalAd) => {
    setModalMode('edit');
    setLegalAdId(legalAd.id);
    setSelectedSendDate(legalAd.sendDate ? new Date(legalAd.sendDate) : null);
    setSelectedRecivedDate(
      legalAd.receive_date ? new Date(legalAd.receive_date) : null,
    );
    setSelectedSendLawyer(legalAd.sendLawyer);
    setSelectedLegalAd(legalAd.legalAd);
    setSelectedRecivedLawyer(legalAd.lawyer_receive_id);
    setSelectedResults(legalAd.results);
    setSelectedDescription(legalAd.description);
    setSelectedCourt(legalAd.courtId);
    setSelectedCost(legalAd.cost);
    setSelectedCost2(legalAd.cost2);
    setSelectedLegalAdType(legalAd.legalAdTypeId);
    setSelectedStatus(legalAd.status);
    setShowAddLegalAdModal(true);
  };

  const handleDeleteLegalAd = async (legalAdId) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/legal_ads/${legalAdId}`);
      fetchLegalAds(legCaseId);
      showAlertMessage('تم حذف الاعلان القانوني بنجاح.', 'success');
    } catch (error) {
      console.log('خطأ في حذف الاعلان القانوني:', error);
    }
  };

  const handleModalClose = () => {
    setShowAddLegalAdModal(false);
    setLegalAdId(null);
    setSelectedSendDate(null);
    setSelectedRecivedDate(null);
    setSelectedSendLawyer('');
    setSelectedLegalAd(null);
    setSelectedRecivedLawyer('');
    setSelectedResults('');
    setSelectedDescription('');
    setSelectedCourt('');
    setSelectedLegalAdType('');
    setSelectedStatus('');
  };

  const handleModalSave = async () => {
    if (modalMode === 'add') {
      try {
        const formattedSendDate = selectedSendDate
          ? selectedSendDate.toISOString().split('T')[0]
          : null;
        await axios.post(`${API_CONFIG.baseURL}/api/legal_ads`, {
          send_date: formattedSendDate,
          lawyer_send_id: selectedSendLawyer,
          cost: selectedCost,
          cost2: selectedCost2,
          description: selectedDescription,
          court_id: selectedCourt,
          legal_ad_type_id: selectedLegalAdType,
          status: selectedStatus,
          leg_case_id: legCaseId,
          created_by: user.id,
        });
        fetchLegalAds(legCaseId);
        handleModalClose();
        showAlertMessage('تمت إضافة الاعلان القانوني بنجاح.', 'success');
      } catch (error) {
        console.log('خطأ في إضافة الاعلان القانوني:', error);
      }
    } else if (modalMode === 'edit') {
      try {
        const formattedRecivedDate = selectedRecivedDate
          ? selectedRecivedDate.toISOString().split('T')[0]
          : null;
        await axios.put(`${API_CONFIG.baseURL}/api/legal_ads/${legalAdId}`, {
          receive_date: formattedRecivedDate,
          legal_ad_id: selectedLegalAd,
          lawyer_receive_id: selectedRecivedLawyer,
          results: selectedResults,
          cost: selectedCost,
          cost2: selectedCost2,
          status: selectedStatus,
          leg_case_id: legCaseId,
          updated_by: user.id,
        });
        fetchLegalAds(legCaseId);
        handleModalClose();
        showAlertMessage('تم تعديل الاعلان القانوني بنجاح.', 'success');
      } catch (error) {
        console.log('خطأ في تعديل الاعلان القانوني:', error);
      }
    }
  };
  const showAlertMessage = (message, type) => {
    setAlert({ message, type });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  
  return (
    <>
      {showAlert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="close" onClick={() => setShowAlert(false)}>
            <span>&times;</span>
          </button>
        </div>
      )}
      <div className="p-4 border-b">
        <button className="btn btn-success btn-sm" onClick={handleAddLegalAd}>
          <BiPlusCircle className="mr-1" />
          إضافة إعلان قانوني
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">نوع الإعلان القانوني</th>
              <th className="px-4 py-2">تاريخ التسليم</th>
              <th className="px-4 py-2">تاريخ الإستلام</th>
              <th className="px-4 py-2">المحامي المسلم</th>
              <th className="px-4 py-2">المحامي المستلم</th>
              <th className="px-4 py-2">الحالة</th>
              <th className="px-4 py-2 text-center">ألتحكم</th>
            </tr>
          </thead>
          <tbody>
            {legalAds.map((legalAd) => (
              <tr key={legalAd.id}>
                <td className="border px-4 py-2">{legalAd.legal_ad_type?.name}</td>
                <td className="border px-4 py-2">{legalAd.send_date}</td>
                <td className="border px-4 py-2">{legalAd.receive_date}</td>
                <td className="border px-4 py-2">{legalAd.lawyer_send?.name}</td>
                <td className="border px-4 py-2">{legalAd.lawyer_receive?.name}</td>
                <td className="border px-4 py-2">{legalAd.status}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleEditLegalAd(legalAd)}
                  >
                    <BiPencil />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteLegalAd(legalAd.id)}
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`modal ${showAddLegalAdModal ? 'show' : ''}`} style={{ display: showAddLegalAdModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {modalMode === 'add' && 'إضافة إعلان قانوني'}
                {modalMode === 'edit' && 'تعديل إعلان قانوني'}
              </h5>
              <button type="button" className="close" onClick={handleModalClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                {modalMode === 'add' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="legalAdType" className="form-label">نوع الإعلان</label>
                      <select
                        id="legalAdType"
                        className="form-select"
                        value={selectedLegalAdType}
                        onChange={(e) => setSelectedLegalAdType(e.target.value)}
                      >
                        <option value="">اختر نوع الإعلان</option>
                        {legalAdTypes.map((adType) => (
                          <option key={adType.id} value={adType.id}>
                            {adType.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="court" className="form-label">المحكمة</label>
                      <select
                        id="court"
                        className="form-select"
                        value={selectedCourt}
                        onChange={(e) => setSelectedCourt(e.target.value)}
                      >
                        <option value="">اختر المحكمة</option>
                        {courts.map((court) => (
                          <option key={court.id} value={court.id}>
                            {court.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">الوصف</label>
                      <textarea
                        id="description"
                        className="form-control"
                        rows={3}
                        value={selectedDescription}
                        onChange={(e) => setSelectedDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="sendDate" className="form-label">تاريخ الإرسال</label>
                      <DatePicker
                        className="form-control"
                        dateFormat="yyyy-MM-dd"
                        selected={selectedSendDate}
                        onChange={(date) => setSelectedSendDate(date)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="sendLawyer" className="form-label">المحامي المرسل</label>
                      <select
                        id="sendLawyer"
                        className="form-select"
                        value={selectedSendLawyer}
                        onChange={(e) => setSelectedSendLawyer(e.target.value)}
                        required
                      >
                        <option value="">اختر المحامي</option>
                        {lawyers.map((lawyer) => (
                          <option key={lawyer.id} value={lawyer.id}>
                            {lawyer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
  {modalMode === 'edit' && (
  <>
    <div className="mb-4">
      <label htmlFor="recivedDate" className="block text-sm font-medium text-gray-700">تاريخ الاستلام</label>
      <DatePicker
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        dateFormat="yyyy-MM-dd"
        selected={selectedRecivedDate}
        onChange={(date) => setSelectedRecivedDate(date)}
      />
    </div>

    <div className="mb-4">
      <label htmlFor="legalAdCost" className="block text-sm font-medium text-gray-700">رسوم بإيصال</label>
      <input
        type="number"
        id="legalAdCost"
        placeholder="ادخل القيمة"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        value={selectedCost}
        onChange={(e) => setSelectedCost(e.target.value)}
      />
    </div>

    <div className="mb-4">
      <label htmlFor="legalAdCost2" className="block text-sm font-medium text-gray-700">رسوم أخرى</label>
      <input
        type="number"
        id="legalAdCost2"
        placeholder="ادخل القيمة"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        value={selectedCost2}
        onChange={(e) => setSelectedCost2(e.target.value)}
      />
    </div>

    <div className="mb-4">
      <label htmlFor="status" className="block text-sm font-medium text-gray-700">الحالة</label>
      <select
        id="status"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="">اختر الحالة</option>
        <option value="قيد التجهيز">قيد التجهيز</option>
        <option value="تم التسليم">تم التسليم</option>
        <option value="تم الإستلام">تم الإستلام</option>
      </select>
    </div>

    <div className="mb-4">
      <label htmlFor="recivedLawyer" className="block text-sm font-medium text-gray-700">المحامي المستلم</label>
      <select
        id="recivedLawyer"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        value={selectedRecivedLawyer}
        onChange={(e) => setSelectedRecivedLawyer(e.target.value)}
      >
        <option value="">اختر المحامي</option>
        {lawyers.map((lawyer) => (
          <option key={lawyer.id} value={lawyer.id}>
            {lawyer.name}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label htmlFor="results" className="block text-sm font-medium text-gray-700">النتيجة</label>
      <input
        type="text"
        id="results"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        value={selectedResults}
        onChange={(e) => setSelectedResults(e.target.value)}
      />
    </div>
  </>
)}

  <div className="flex justify-between">
    <button className="px-4 py-2 text-white bg-gray-500 rounded-md" onClick={handleModalSave}>
      إلغاء
    </button>
    <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={handleModalSave}>
      {modalMode === 'edit' ? 'تعديل' : 'حفظ'}
    </button>
  </div>

</form>
</div>
</div>
</div>
</div>
    </>
  );
};

export default LegalCaseAds;
