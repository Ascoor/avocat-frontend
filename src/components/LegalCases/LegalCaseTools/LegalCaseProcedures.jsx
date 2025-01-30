import React, { useEffect, useState } from 'react';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import {
  getProceduresByLegCaseId,
  deleteProcedure,
} from '../../../services/api/procedures';
import ProcedureModal from './Modals/ProcedureModal';
import ProcedureDetailsModal from './Modals/ProcedureDetailsModal';
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal';
import { useAlert } from '../../../context/AlertContext';

const LegalCaseProcedures = ({ legCaseId }) => {
  const [procedures, setProcedures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [procedureToDelete, setProcedureToDelete] = useState(null);
  const { triggerAlert } = useAlert();

  // Fetch procedures
  const fetchProcedures = async () => {
    try {
      const response = await getProceduresByLegCaseId(legCaseId);
      setProcedures(response.data);
    } catch (error) {
      console.error('Error fetching procedures:', error);
      triggerAlert('error', 'حدث خطأ أثناء جلب البيانات.');
    }
  };

  useEffect(() => {
    fetchProcedures();
  }, [legCaseId]);

  const handleRowClick = (procedure) => {
    setSelectedProcedure(procedure);
    setShowModal(false); // Close modal if open
  };

  const handleAddProcedure = () => {
    setIsEditMode(false);
    setModalData({});
    setSelectedProcedure(null); // Close details modal
    setShowModal(true);
  };

  const handleEditProcedure = (procedure) => {
    setIsEditMode(true);
    setModalData(procedure);
    setSelectedProcedure(null); // Close details modal
    setShowModal(true);
  };

  const handleDeleteClick = (procedure) => {
    setProcedureToDelete(procedure); // تحديد الإجراء للحذف
    setShowConfirmDelete(true); // فتح نافذة التأكيد
  };

  const handleConfirmDelete = async () => {
    if (procedureToDelete) {
      try {
        await deleteProcedure(procedureToDelete.id); // حذف الإجراء من الخادم
        triggerAlert('success', 'تم حذف الإجراء بنجاح'); // إظهار رسالة النجاح
        fetchProcedures(); // Refresh procedures after deletion
      } catch (error) {
        console.error('Error deleting procedure:', error);
        triggerAlert('error', 'حدث خطأ أثناء حذف الإجراء');
      } finally {
        setShowConfirmDelete(false);
        setProcedureToDelete(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="p-4 shadow-md flex justify-between items-center bg-gradient-day dark:bg-gradient-night text-white rounded-b-header">
        <h1 className="text-lg font-bold">إجراءات القضية</h1>
        <button
          onClick={handleAddProcedure}
          className="flex items-center bg-gradient-blue-button hover:bg-gradient-red-button text-white px-4 py-2 rounded-full shadow-md hover:scale-102 transform transition-all duration-200 ease-in-out"
        >
          <BiPlusCircle className="mr-2" />
          إضافة إجراء
        </button>
      </div>

      {/* Procedures Table */}
      <div className="p-6">
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white dark:bg-gradient-blue-dark rounded-lg shadow-base overflow-hidden">
            <thead>
              <tr className="bg-avocat-indigo dark:bg-avocat-blue text-white">
                <th className="px-4 py-2 text-center">نوع الإجراء</th>
                <th className="px-4 py-2 text-center">المحامي</th>
                <th className="px-4 py-2 text-center">تاريخ البدء</th>
                <th className="px-4 py-2 text-center">تاريخ الانتهاء</th>
                <th className="px-4 py-2 text-center">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {procedures.map((procedure) => (
                <tr
                  key={procedure.id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => handleRowClick(procedure)}
                >
                  <td className="px-4 py-2 text-center">
                    {procedure.procedure_type?.name || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {procedure.lawyer?.name || '-'}
                  </td>
                  <td className="px-4 py-2 text-center">{procedure.date_start}</td>
                  <td className="px-4 py-2 text-center">{procedure.date_end}</td>
                  <td className="px-4 py-2 text-center flex justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProcedure(procedure);
                      }}
                      className="text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-500 transition"
                    >
                      <BiPencil />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(procedure);
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
      {selectedProcedure && (
        <ProcedureDetailsModal
          isOpen={!!selectedProcedure}
          onClose={() => setSelectedProcedure(null)}
          procedure={selectedProcedure}
        />
      )}
      {showModal && (
        <ProcedureModal
          legalCaseId={legCaseId}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={() => {
            fetchProcedures();
            setShowModal(false);
          }}
          initialData={modalData}
          isEdit={isEditMode}
        />
      )}
      {showConfirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={handleConfirmDelete}
          itemName={procedureToDelete?.procedure_type?.name || 'الإجراء'}
        />
      )}
    </div>
  );
};

export default LegalCaseProcedures;
