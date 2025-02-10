
import { useEffect, useState, useCallback } from "react";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import LegalAdModal from "./Modals/LegalAdModal";
import { getLegalAdsByLegCaseId, deleteLegalAd } from "../../../services/api/legalCases";
import GlobalConfirmDeleteModal from "../../common/GlobalConfirmDeleteModal";
import { useAlert } from "../../../context/AlertContext";

const LegalCaseAds = ({ legCaseId }) => {

    const { triggerAlert } = useAlert();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [legalAds, setLegalAds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLegalAds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!legCaseId) throw new Error("لم يتم العثور على معرف القضية.");
      
      const response = await getLegalAdsByLegCaseId(legCaseId);
      console.log("Fetched Ads Data:", response.data);

      if (response?.data && Array.isArray(response.data)) {
        setLegalAds(response.data);
      } else {
        throw new Error("خطأ في تنسيق البيانات المسترجعة.");
      }
    } catch (err) {
      console.error("Error fetching legal ads:", err);
      triggerAlert("error", "حدث خطاء في تحميل الإعلانات.");
    } finally {
      setLoading(false);
    }
  }, [legCaseId]);

  useEffect(() => {
    fetchLegalAds();
  }, [fetchLegalAds]);

  const handleAddAd = () => {
    setModalMode("add");
    setSelectedAd(null);
    setShowModal(true);
  };

const handleEditAd = (ad) => {
  setModalMode("edit");
  setSelectedAd(ad);
  setShowModal(true);
};
 
  const handleDeleteAd = (ad) => {
    setAdToDelete(ad);
    setConfirmDelete(true);
  };

  const confirmDeleteAd = useCallback(async () => {
    try {
      if (adToDelete) {
        await deleteLegalAd(adToDelete.id);
        setLegalAds((prevAds) => prevAds.filter((ad) => ad.id !== adToDelete.id));
        
        setAdToDelete(null);

        setConfirmDelete(false);
        triggerAlert("success", "تم حذف الإعلان بنجاح.");
      }
    } catch (error) {
      triggerAlert("error", "حدث خطاء في حذف الإعلان.");
      

    }
  }, [adToDelete]);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAd(null);
    setModalMode("");
  };

  const handleAdSubmit = (data) => {
    setLegalAds((prevAds) => {
      if (modalMode === "add") {
        return [...prevAds, data];
      } else if (modalMode === "edit") {
        return prevAds.map((ad) => (ad.id === data.id ? data : ad));
      }
      return prevAds;
    });
    handleModalClose();
  };

  return (
     <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100">
       {/* Header */}
       <div className="p-4 shadow-md flex justify-between items-center bg-gradient-day dark:bg-gradient-night text-white rounded-b-header">
         <h1 className="text-lg font-bold">إعلانات القضية</h1>
         <button
           onClick={handleAddAd}
           className="flex items-center bg-gradient-day hover:bg-gradient-red-button text-white px-8 py-2 rounded-full shadow-md hover:scale-102 transform transition-all duration-200 ease-in-out"
         >
           <BiPlusCircle className="mr-2" />
   
          <span>إضافة إعلان قانوني</span>
        </button>
      </div>

      {error && <div className="mb-4 text-red-500 font-semibold text-center mt-4">{error}</div>}

      {loading ? (
        <div className="text-center py-4">جاري تحميل الإعلانات...</div>
      ) : (
        <div className="p-6">
<div className="overflow-x-auto">
  <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <thead>
    <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white text-center ">
    <th className="px-4 py-2">نوع الإعلان</th>
        <th className="px-4 py-2">تاريخ التسليم</th>
        <th className="px-4 py-2">تاريخ الإستلام</th>
        <th className="px-4 py-2">المسلم</th>
        <th className="px-4 py-2">المستلم</th>
        <th className="px-4 py-2">الوصف</th>
        <th className="px-4 py-2">الحالة</th>
        <th className="px-4 py-2">الإجراءات</th>
      </tr>
    </thead>
    <tbody>
      {legalAds.length > 0 ? (
        legalAds.map((ad) => (
          <tr key={ad.id}    className="border-b bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer text-center"
          >
            <td className="px-4 py-3">{ad.legal_ad_type?.name}</td>
            <td className="px-4 py-3">{ad.send_date}</td>
            <td className="px-4 py-3">{ad.receive_date || "جاري الإستلام"}</td>
            <td className="px-4 py-3">{ad.lawyer_send?.name || "غير متوفر"}</td>
            <td className="px-4 py-3">{ad.lawyer_receive?.name || "غير متوفر"}</td>
            <td className="px-4 py-3">{ad.description}</td>
            <td className="px-4 py-3">{ad.status}</td>
            <td className="px-4 py-3">
              <div className="flex justify-center gap-3">
                <button className="text-green-500 hover:text-green-700 transition-all transform hover:scale-110" onClick={() => handleEditAd(ad)}>
                  <BiPencil size={22} />
                </button>
                <button className="text-red-500 hover:text-red-700 transition-all transform hover:scale-110" onClick={() => handleDeleteAd(ad)}>
                  <BiTrash size={22} />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center py-4 text-gray-600 dark:text-gray-400">
            🚫 لا توجد إعلانات قانونية مرتبطة بهذه القضية.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

        </div>
      )}
      
      {/* ✅ Ads Modal */}
      {showModal && (
        <LegalAdModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        legCaseId={legCaseId}
        initialData={selectedAd}
        isEdit={modalMode === "edit"}
        fetchLegalAds={fetchLegalAds} 
        />
      )}

      {/* ✅ Confirmation Modal */}
      {confirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={confirmDelete}
          fetchLegalAds
          onClose={() => setConfirmDelete(false)}
          onConfirm={confirmDeleteAd}
          itemName={`  ${adToDelete?.legal_ad_type?.name || ""}؟`}
        />
      )} 
    </div>
  );
};

export default LegalCaseAds;
