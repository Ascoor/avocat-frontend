import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import arEG from 'date-fns/locale/ar-EG';

import API_CONFIG from '../../../config/config';
import useAuth from '../../auth/AuthUser';

registerLocale('ar_eg', arEG);
setDefaultLocale('ar_eg');

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
  const [selectedSendDate, setSelectedSendDate] = useState(null);
  const [selectedRecivedDate, setSelectedRecivedDate] = useState(null);
  const [selectedSendLawyer, setSelectedSendLawyer] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedLegalAdType, setSelectedLegalAdType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedResults, setSelectedResults] = useState('');
  const [selectedCost, setSelectedCost] = useState('');
  const [selectedCost2, setSelectedCost2] = useState('');

  const user = getUser();

  useEffect(() => {
    fetchLegalAds();
    fetchCourts();
    fetchLawyers();
    fetchLegalAdTypes();
  }, [legCaseId]);

  const fetchLegalAds = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal_ads?legCaseId=${legCaseId}`,
      );
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
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal_ad_types`,
      );
      setLegalAdTypes(response.data);
    } catch (error) {
      console.error('Error fetching legal ad types:', error);
    }
  };

  const handleAddLegalAd = () => {
    setModalMode('add');
    setShowAddLegalAdModal(true);
  };

  const handleModalClose = () => {
    setShowAddLegalAdModal(false);
    setModalMode('');
  };

  return (
    <div className="p-6 bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">الإعلانات القانونية</h2>
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          onClick={handleAddLegalAd}
        >
          <BiPlusCircle className="mr-2" />
          إضافة إعلان قانوني
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">نوع الإعلان</th>
              <th className="px-4 py-2 text-left">تاريخ الإرسال</th>
              <th className="px-4 py-2 text-left">تاريخ الاستلام</th>
              <th className="px-4 py-2 text-left">المحامي المرسل</th>
              <th className="px-4 py-2 text-left">المحامي المستلم</th>
              <th className="px-4 py-2 text-left">الحالة</th>
              <th className="px-4 py-2 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {legalAds.map((ad) => (
              <tr
                key={ad.id}
                className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{ad.legal_ad_type?.name || '-'}</td>
                <td className="px-4 py-2">{ad.send_date || '-'}</td>
                <td className="px-4 py-2">{ad.receive_date || '-'}</td>
                <td className="px-4 py-2">{ad.lawyer_send?.name || '-'}</td>
                <td className="px-4 py-2">{ad.lawyer_receive?.name || '-'}</td>
                <td className="px-4 py-2">{ad.status || '-'}</td>
                <td className="px-4 py-2 text-center flex justify-center gap-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    onClick={() => console.log('Edit')}
                  >
                    <BiPencil />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => console.log('Delete')}
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddLegalAdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold">
                {modalMode === 'add'
                  ? 'إضافة إعلان قانوني'
                  : 'تعديل إعلان قانوني'}
              </h3>
            </div>
            <div className="p-4">
              {/* Form fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium">نوع الإعلان</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  value={selectedLegalAdType}
                  onChange={(e) => setSelectedLegalAdType(e.target.value)}
                >
                  <option value="">اختر نوع الإعلان</option>
                  {legalAdTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                  onClick={handleModalClose}
                >
                  إلغاء
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  onClick={() => console.log('Save')}
                >
                  {modalMode === 'add' ? 'إضافة' : 'حفظ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalCaseAds;
