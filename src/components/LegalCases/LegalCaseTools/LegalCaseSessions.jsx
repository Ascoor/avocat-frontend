import React, { useEffect, useState } from "react";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import {
  getSessionsByLegCaseId,
  deleteSession,
} from "../../../services/api/sessions";
import SessionModal from "./Modals/SessionModal"; // Modal component for Add/Edit
import GlobalConfirmDeleteModal from "../../common/GlobalConfirmDeleteModal"; // Confirmation modal
import { useAlert } from "../../../context/AlertContext";
import SessionDetailsModal from "./Modals/SessionDetailsModal";

const LegalCaseSessions = ({ legCaseId }) => {
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Data for editing or viewing
  const [isEditMode, setIsEditMode] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null); // Session to delete
  const { triggerAlert } = useAlert(); // Alert notifications

  const [selectedSession, setSelectedSession] = useState(null); 
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await getSessionsByLegCaseId(legCaseId);
        setSessions(response.data.data || []); // Ensure sessions are an array
      } catch (error) {
        console.error("Error fetching sessions:", error);
        setSessions([]); // Handle errors gracefully
      }
    };

    fetchSessions();
  }, [legCaseId]);

  const handleAddSession = () => {
    setIsEditMode(false);
    setModalData(null);
    setShowModal(true);
  };

  const handleEditSession = (session) => {
    setIsEditMode(true);
    setModalData(session); // Pass the session data for editing
    setShowModal(true);
  };

  const handleDeleteClick = (session) => {
    setSessionToDelete(session); // Set the session to delete
  };

  const handleConfirmDelete = async () => {
    try {
      if (sessionToDelete) {
        await deleteSession(sessionToDelete.id);
        setSessions((prev) => prev.filter((sess) => sess.id !== sessionToDelete.id));
        triggerAlert("success", "تم حذف الجلسة بنجاح.");
        setSessionToDelete(null); // Clear the session to delete
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      triggerAlert("error", "فشل حذف الجلسة.");
    }
  };

  const handleSubmitSession = (newSessionData) => {
    if (isEditMode) {
      // Update session
      setSessions((prev) =>
        prev.map((sess) =>
          sess.id === newSessionData.id ? { ...sess, ...newSessionData } : sess
        )
      );
    } else {
      // Add session
      setSessions((prev) => [...prev, newSessionData]);
    }
    setShowModal(false); // Close modal after submission
    triggerAlert("success", isEditMode ? "تم تحديث الجلسة." : "تمت إضافة الجلسة.");
  };
  const handleRowClick = (session) => {
    setSelectedSession(session);
    setShowModal(false); // Close modal if open
  };

  return (
<div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100">
  {/* Header */}
  <div className="p-4 shadow-md flex justify-between items-center bg-gradient-day dark:bg-gradient-night text-white rounded-b-header">
    <h1 className="text-lg font-bold">جلسات القضية</h1>
    <button
      onClick={handleAddSession}
      className="flex items-center bg-gradient-blue-button hover:bg-gradient-red-button text-white px-4 py-2 rounded-full shadow-md hover:scale-102 transform transition-all duration-200 ease-in-out"
    >
      <BiPlusCircle className="mr-2" />
      إضافة جلسة
    </button>
      </div>

      {/* Sessions Table */}
      <div className="p-6">
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white dark:bg-gradient-blue-dark rounded-lg shadow-base overflow-hidden">
          <thead>
              <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white">
                <th className="px-4 py-2 text-center">تاريخ الجلسة</th>
                <th className="px-4 py-2 text-center">المحامي</th>
                <th className="px-4 py-2 text-center">الرول</th>
                <th className="px-4 py-2 text-center">المحكمة</th>
                <th className="px-4 py-2 text-center">الطلبات</th>
                <th className="px-4 py-2 text-center">النتيجة</th>
                <th className="px-4 py-2 text-center">الحالة</th>
                <th className="px-4 py-2 text-center">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
               <tr
               key={session.id}
               className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
               onClick={() => handleRowClick(session)}
             >
                  <td className="px-4 py-2 text-center">{session.session_date}</td>
                  <td className="px-4 py-2 text-center">{session.lawyer?.name || "-"}</td>
                  <td className="px-4 py-2 text-center">{session.roll_number || "-"}</td>
                  <td className="px-4 py-2 text-center">{session.court?.name || "-"}</td>
                  <td className="px-4 py-2 text-center">{session.orders || "-"}</td>
                  <td className="px-4 py-2 text-center">{session.result || "-"}</td>
                  <td className="px-4 py-2 text-center">{session.status || "-"}</td>
                  <td className="px-4 py-2 text-center flex justify-center space-x-2">
                    <button
                      onClick={() => handleEditSession(session)}
                      className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 transition"
                    >
                      <BiPencil />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(session)}
                      className="text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-500 transition"
                    >
                      <BiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

  {/* Modals */}
  {selectedSession && (
    <SessionDetailsModal
      isOpen={!!selectedSession}
      onClose={() => setSelectedSession(null)}
      session={selectedSession}
    />
  )}
      {/* Modals */}
      {showModal && (
        <SessionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitSession}
          initialData={modalData}
          isEdit={isEditMode}
        />
      )}

      {sessionToDelete && (
        <GlobalConfirmDeleteModal
          isOpen={!!sessionToDelete}
          onClose={() => setSessionToDelete(null)}
          onConfirm={handleConfirmDelete}
          itemName={sessionToDelete.session_date || "الجلسة"}
        />
      )}
    </div>
  );
};

export default LegalCaseSessions;
