import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import arEG from 'date-fns/locale/ar-EG';
import useAuth from '../../layout/AuthTool/AuthUser';
import API_CONFIG from '../../../config';

DatePicker.registerLocale('ar_eg', arEG);

const LegalCaseAds = ({ legCaseId }) => {
  const { getUser } = useAuth();
  const [alert, setAlert] = useState(null);
  const [showAddLegalAdModal, setShowAddLegalAdModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [legalAdId, setLegalAdId] = useState(null);
  const [legalAds, setLegalAds] = useState([]);
  const [courts, setCourts] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [legalAdTypes, setLegalAdTypes] = useState([]);

  const [formData, setFormData] = useState({
    sendDate: null,
    receiveDate: null,
    sendLawyer: '',
    receiveLawyer: '',
    results: '',
    description: '',
    court: '',
    legalAdType: '',
    status: '',
    cost: '',
    cost2: '',
  });

  const user = getUser();

  useEffect(() => {
    fetchLegalAds(legCaseId);
    fetchCourts();
    fetchLawyers();
    fetchLegalAdTypes();
  }, [legCaseId]);

  const fetchLegalAds = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/legal_ads?legCaseId=${legCaseId}`);
      setLegalAds(response.data);
    } catch (error) {
      console.error('Error fetching legal ads:', error);
    }
  };

  const fetchCourts = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/courts`);
      setCourts(response.data);
    } catch (error) {
      console.error('Error fetching courts:', error);
    }
  };

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
      setLawyers(response.data);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    }
  };

  const fetchLegalAdTypes = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/legal_ad_types`);
      setLegalAdTypes(response.data);
    } catch (error) {
      console.error('Error fetching legal ad types:', error);
    }
  };

  const handleAddLegalAd = () => {
    setModalMode('add');
    setFormData({
      sendDate: null,
      receiveDate: null,
      sendLawyer: '',
      receiveLawyer: '',
      results: '',
      description: '',
      court: '',
      legalAdType: '',
      status: '',
      cost: '',
      cost2: '',
    });
    setShowAddLegalAdModal(true);
  };

  const handleEditLegalAd = (legalAd) => {
    setModalMode('edit');
    setLegalAdId(legalAd.id);
    setFormData({
      sendDate: legalAd.send_date ? new Date(legalAd.send_date) : null,
      receiveDate: legalAd.receive_date ? new Date(legalAd.receive_date) : null,
      sendLawyer: legalAd.sendLawyer,
      receiveLawyer: legalAd.lawyer_receive_id,
      results: legalAd.results,
      description: legalAd.description,
      court: legalAd.courtId,
      legalAdType: legalAd.legalAdTypeId,
      status: legalAd.status,
      cost: legalAd.cost,
      cost2: legalAd.cost2,
    });
    setShowAddLegalAdModal(true);
  };

  const handleDeleteLegalAd = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/legal_ads/${id}`);
      fetchLegalAds(legCaseId);
      setAlert({ type: 'success', message: 'تم حذف الإعلان بنجاح.' });
    } catch (error) {
      console.error('Error deleting legal ad:', error);
    }
  };

  const handleModalClose = () => {
    setShowAddLegalAdModal(false);
  };

  const handleModalSave = async () => {
    try {
      if (modalMode === 'add') {
        await axios.post(`${API_CONFIG.baseURL}/api/legal_ads`, {
          ...formData,
          leg_case_id: legCaseId,
          created_by: user.id,
        });
      } else if (modalMode === 'edit') {
        await axios.put(`${API_CONFIG.baseURL}/api/legal_ads/${legalAdId}`, {
          ...formData,
          updated_by: user.id,
        });
      }
      fetchLegalAds(legCaseId);
      handleModalClose();
    } catch (error) {
      console.error('Error saving legal ad:', error);
    }
  };

  return (
    <div>
      {alert && (
        <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {alert.message}
        </div>
      )}

      <button className="btn btn-green" onClick={handleAddLegalAd}>
        + إضافة إعلان قانوني
      </button>

      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>نوع الإعلان</th>
            <th>تاريخ التسليم</th>
            <th>تاريخ الاستلام</th>
            <th>المحامي المسلم</th>
            <th>المحامي المستلم</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {legalAds.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.legal_ad_type?.name}</td>
              <td>{ad.send_date}</td>
              <td>{ad.receive_date}</td>
              <td>{ad.lawyer_send?.name}</td>
              <td>{ad.lawyer_receive?.name}</td>
              <td>{ad.status}</td>
              <td>
                <button className="btn btn-blue mr-2" onClick={() => handleEditLegalAd(ad)}>
                  تعديل
                </button>
                <button className="btn btn-red" onClick={() => handleDeleteLegalAd(ad.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddLegalAdModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalMode === 'add' ? 'إضافة إعلان قانوني' : 'تعديل إعلان قانوني'}</h3>
            <form>
              <div className="form-group">
                <label>نوع الإعلان</label>
                <select
                  value={formData.legalAdType}
                  onChange={(e) => setFormData({ ...formData, legalAdType: e.target.value })}
                >
                  <option value="">اختر نوع الإعلان</option>
                  {legalAdTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Add more fields here */}
              <div className="form-actions">
                <button type="button" onClick={handleModalClose} className="btn btn-gray">
                  إلغاء
                </button>
                <button type="button" onClick={handleModalSave} className="btn btn-green">
                  {modalMode === 'add' ? 'حفظ' : 'تحديث'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalCaseAds;
