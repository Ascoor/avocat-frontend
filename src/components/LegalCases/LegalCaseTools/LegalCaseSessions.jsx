import React, { useEffect, useState } from 'react';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import {
  getSessionsByLegCaseId,
  deleteSession,
} from '../../../services/api/sessions';
import SessionModal from './Modals/SessionModal'; // Modal component for Add/Edit
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal'; // Confirmation modal
import { useAlert } from '../../../context/AlertContext';
import SessionDetailsModal from './Modals/SessionDetailsModal';

const LegalCaseSessions = ({ legCaseId }) => {
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Data for editing
  const [isEditMode, setIsEditMode] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null); // Session to delete
  const { triggerAlert } = useAlert(); // Alert notifications
  const [selectedSession, setSelectedSession] = useState(null);

  const fetchSessions = async () => {
    try {
      const response = await getSessionsByLegCaseId(legCaseId);
      setSessions(response.data.data || []); // Ensure sessions are an array
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setSessions([]); // Handle errors gracefully
    }
  };
  useEffect(() => {
    fetchSessions();
  }, [legCaseId]);

  const handleAddSession = () => {
    setIsEditMode(false);
    setModalData(null);
    setShowModal(true);
  };

  const handleEditSession = (session) => {
    setIsEditMode(true);
    setModalData(session);
    setShowModal(true);
  };

  const handleDeleteClick = (session) => {
    setSessionToDelete(session);
  };

  const handleConfirmDelete = async () => {
    try {
      if (sessionToDelete) {
        await deleteSession(sessionToDelete.id);
        setSessions((prev) =>
          prev.filter((sess) => sess.id !== sessionToDelete.id),
        );
        triggerAlert('success', 'تم حذف الجلسة بنجاح.');
        setSessionToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      triggerAlert('error', 'فشل حذف الجلسة.');
    }
  };

  const handleSubmitSession = (newSessionData) => {
    if (isEditMode) {
      setSessions((prev) =>
        prev.map((sess) =>
          sess.id === newSessionData.id ? { ...sess, ...newSessionData } : sess,
        ),
      );
    } else {
      setSessions((prev) => [...prev, newSessionData]);
    }
    setShowModal(false);
    triggerAlert(
      'success',
      isEditMode ? 'تم تحديث الجلسة.' : 'تمت إضافة الجلسة.',
    );
  };

  const handleRowClick = (session) => {
    setSelectedSession(session); // Set selected session
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="p-4 shadow-md flex justify-between items-center bg-gradient-day dark:bg-gradient-night text-white rounded-b-header">
        <h1 className="text-lg font-bold">جلسات القضية</h1>
        <button
          onClick={handleAddSession}
          className="flex items-center bg-gradient-day hover:bg-gradient-red-button text-white px-4 py-2 rounded-full shadow-md hover:scale-102 transform transition-all duration-200 ease-in-out"
        >
          <BiPlusCircle className="mr-2" />
          إضافة جلسة
        </button>
      </div>

      {/* Sessions Table */}
      <div className="p-6">
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto bg-white dark:bg-gradient-blue-dark rounded-lg shadow-base overflow-hidden">
            <thead>
              <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white">
                <th className="px-2 py-2 text-center w-1/6">تاريخ الجلسة</th>
                <th className="px-2 py-2 text-center w-1/6">المحامي</th>
                <th className="px-2 py-2 text-center w-1/6">الرول</th>
                <th className="px-2 py-2 text-center w-1/6">المحكمة</th>
                <th className="px-2 py-2 text-center w-1/6">الطلبات</th>
                <th className="px-2 py-2 text-center w-1/6">النتيجة</th>
                <th className="px-2 py-2 text-center w-1/6">الحالة</th>
                <th className="px-2 py-2 text-center w-1/6">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => handleRowClick(session)}
                >
                  <td className="px-2 py-2 text-center">
                    {session.session_date}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {session.lawyer?.name || '-'}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {session.session_roll || '-'}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {session.court?.name || '-'}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {session.orders || '-'}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {session.result || '-'}
                  </td>
                  <td className="px-2 py-2 text-center">
                    {session.status || '-'}
                  </td>
                  <td className="px-2 py-2 text-center flex justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSession(session);
                      }}
                      className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 transition"
                    >
                      <BiPencil />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(session);
                      }}
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
      {showModal && (
        <SessionModal
          isOpen={showModal}
          fetchSessions={fetchSessions}
          legalCaseId={legCaseId}
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
          itemName={sessionToDelete.session_date || 'الجلسة'}
        />
      )}
    </div>
  );
};

export default LegalCaseSessions;
