import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import API_CONFIG from '../../../config/config';

import { UnclientSectionIcon } from '../../../assets/icons/index';
import SectionHeader from '../../common/SectionHeader';
import AddEditUnclient from './AddEditUnclient';
import TableComponent from '../../common/TableComponent'; // ✅ مكون الجدول العالمي
import api from '../../../services/api/axiosConfig';
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal';

function UnClientList() {
  const [unclients, setUnunclients] = useState([]);
  const [selectedUnclient, setSelectedUnclient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // For delete confirmation modal
  const [unclientToDelete, setUnclientToDelete] = useState(null); // For storing the unclient to be deleted

  // ✅ جلب بيانات عملاء بدون وكالة
  const fetchUnunclients = useCallback(async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/unclients`);
      setUnunclients(response.data.unclients || []);
    } catch (error) {
      console.error('Error fetching unclients:', error);
    }
  }, []);

  useEffect(() => {
    fetchUnunclients();
  }, [fetchUnunclients]);

  // ✅ حذف عميل بدون وكالة
  const handleDelete = async () => {
    if (!unclientToDelete) return;

    try {
      // Proceed with deleting the unclient
      await api.delete(`/api/unclients/${unclientToDelete.id}`);
      fetchUnunclients(); // Refresh the client list after deletion
      setDeleteModalOpen(false); // Close the delete confirmation modal
    } catch (error) {
      console.error('Error deleting unclient:', error);
    }
  };

  // ✅ تغيير حالة العميل بدون وكالة
  const handleToggleStatus = async (id) => {
    try {
      const unclient = unclients.find((c) => c.id === id);
      const newStatus = unclient.status === 'active' ? 'inactive' : 'active';
      await axios.put(`${API_CONFIG.baseURL}/api/unclients/${id}`, {
        status: newStatus,
      });
      fetchUnunclients();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  // ✅ فتح نافذة الإضافة أو التعديل
  const openAddEditModal = (unclient = null) => {
    setSelectedUnclient(unclient);
    setModalOpen(true);
  };

  // ✅ إعداد رؤوس الجدول
  const headers = [
    { key: 'slug', text: 'الرمز' },
    { key: 'name', text: 'الاسم' },
    { key: 'identity_number', text: 'رقم الهوية' },
    { key: 'address', text: 'العنوان' },
    { key: 'phone_number', text: 'رقم الهاتف' },
    { key: 'status', text: 'الحالة' },
  ];

  // ✅ عرض مخصص لحالة العميل بدون وكالة
  const customRenderers = {
    status: (unclient) =>
      unclient.status === 'active' ? (
        <span
          onClick={() => handleToggleStatus(unclient.id)}
          className="flex items-center text-green-600 cursor-pointer"
        >
          <AiFillCheckCircle className="mr-1" /> نشط
        </span>
      ) : (
        <span
          onClick={() => handleToggleStatus(unclient.id)}
          className="flex items-center text-red-600 cursor-pointer"
        >
          <AiFillCloseCircle className="mr-1" /> غير نشط
        </span>
      ),
  };

  // ✅ زر إضافة عميل بدون وكالة
  const renderAddButton = () => (
    <button
      onClick={() => openAddEditModal()}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
    >
      إضافة عميل بدون وكالة
    </button>
  );

  // Open delete confirmation modal
  const openDeleteModal = (unclient) => {
    setUnclientToDelete(unclient);
    setDeleteModalOpen(true);
  };

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full " dir="rtl">
      {/* ✅ رأس القسم */}
      <SectionHeader
        buttonName="عميل بدون وكالة"
        listName="عملاء بدون وكالة"
        icon={UnclientSectionIcon}
      />

      {/* ✅ نافذة الإضافة أو التعديل */}
      {isModalOpen && (
        <AddEditUnclient
          unclient={selectedUnclient}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={fetchUnunclients}
        />
      )}

      {/* ✅ Modal for Delete Confirmation */}
      {isDeleteModalOpen && (
        <GlobalConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete} // Calls the handleDelete function on confirmation
          itemName={unclientToDelete?.name || 'هذا العميل'} // Ensure a fallback name if not available
        />
      )}

      {/* ✅ مكون الجدول العالمي */}
      <TableComponent
        data={unclients}
        headers={headers}
        onEdit={(id) =>
          openAddEditModal(unclients.find((unclient) => unclient.id === id))
        }
        onDelete={(id) =>
          openDeleteModal(unclients.find((unclient) => unclient.id === id))
        }
        sectionName="unclients"
        customRenderers={customRenderers}
        renderAddButton={renderAddButton} // ✅ إضافة زر الإضافة إلى الجدول
      />
    </div>
  );
}

export default UnClientList;
