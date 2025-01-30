import { useEffect, useState } from "react";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import AdsModal from "./Modals/AdsModal";
import { getLegalAds, deleteLegalAd } from "../../../services/api/legalCases";
import GlobalConfirmDeleteModal from "../../common/GlobalConfirmDeleteModal";

const LegalCaseAds = ({ legCase }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [legalAds, setLegalAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLegalAds = async () => {
      try {
        setError(null);
        if (legCase && legCase.id) {
          const response = await getLegalAds();
          if (response.data && response.data.data) {
            const filteredAds = response.data.data.filter((ad) => ad.leg_case_id === legCase.id);
            setLegalAds(filteredAds);
          } else {
            throw new Error("Unexpected data format");
          }
        } else {
          throw new Error("Case ID not found");
        }
      } catch (error) {
        console.error("Error fetching legal ads:", error);
        setError("تعذر تحميل الإعلانات القانونية. الرجاء المحاولة لاحقًا.");
      }
    };
    fetchLegalAds();
  }, [legCase]);

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

  const confirmDeleteAd = async () => {
    try {
      if (adToDelete) {
        await deleteLegalAd(adToDelete.id);
        setLegalAds((prevAds) => prevAds.filter((ad) => ad.id !== adToDelete.id));
        setAdToDelete(null);
        setConfirmDelete(false);
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      setError("حدث خطأ أثناء حذف الإعلان. الرجاء المحاولة لاحقًا.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      
      {/* ✅ Header */}
      <div className="p-6 shadow-lg flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-700 text-white rounded-b-lg">
        <h2 className="text-2xl font-bold">📜 الإعلانات القانونية</h2>
        <button
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          onClick={handleAddAd}
        >
          <BiPlusCircle className="text-xl" />
          <span>إضافة إعلان قانوني</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-500 font-semibold text-center mt-4">{error}</div>
      )}

      {/* ✅ جدول الإعلانات */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-blue-500 dark:bg-gray-900 text-white">
                <th className="px-4 py-3 text-center dark:text-gray-300">نوع الإعلان</th>
                <th className="px-4 py-3 text-center dark:text-gray-300">تاريخ التسليم</th>
                <th className="px-4 py-3 text-center dark:text-gray-300">تاريخ الاستلام</th>
                <th className="px-4 py-3 text-center dark:text-gray-300">المحكمة</th>
                <th className="px-4 py-3 text-center dark:text-gray-300">الحالة</th>
                <th className="px-4 py-3 text-center dark:text-gray-300">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {legalAds.length > 0 ? (
                legalAds.map((ad) => (
                  <tr
                    key={ad.id}
                    className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <td className="px-4 py-3 text-center dark:text-gray-200">{ad.legal_ad_type?.name || "-"}</td>
                    <td className="px-4 py-3 text-center dark:text-gray-200">{ad.send_date || "-"}</td>
                    <td className="px-4 py-3 text-center dark:text-gray-200">{ad.receive_date || "-"}</td>
                    <td className="px-4 py-3 text-center dark:text-gray-200">{ad.court?.name || "-"}</td>
                    <td className="px-4 py-3 text-center dark:text-gray-200">{ad.status || "-"}</td>
                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                      <button
                        className="text-green-500 hover:text-green-700 transition-all transform hover:scale-110"
                        onClick={() => handleEditAd(ad)}
                      >
                        <BiPencil size={22} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 transition-all transform hover:scale-110"
                        onClick={() => handleDeleteAd(ad)}
                      >
                        <BiTrash size={22} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-600 dark:text-gray-400">
                    🚫 لا توجد إعلانات قانونية مرتبطة بهذه القضية.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Ads Modal */}
      {showModal && (
        <AdsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          mode={modalMode}
          initialData={selectedAd}
          onSubmit={(data) => {
            if (modalMode === "add") {
              setLegalAds([...legalAds, data]);
            } else if (modalMode === "edit") {
              setLegalAds(legalAds.map((ad) => (ad.id === data.id ? data : ad)));
            }
            setShowModal(false);
          }}
        />
      )}

      {/* ✅ Confirmation Modal */}
      {confirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onConfirm={confirmDeleteAd}
          message={`هل تريد حذف الإعلان ${adToDelete?.legal_ad_type?.name || ""}؟`}
        />
      )}
    </div>
  );
};

export default LegalCaseAds;
