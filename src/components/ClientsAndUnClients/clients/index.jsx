import React, { useState, useEffect, useCallback } from 'react'; 
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'; 
import { ClientSectionIcon } from '../../../assets/icons/index';
import SectionHeader from '../../common/SectionHeader';
import AddEditClient from './AddEditClient';
import TableComponent from '../../common/TableComponent'; // ✅ مكون الجدول العالمي
import api from '../../../services/api/axiosConfig';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // ✅ جلب بيانات عملاء
  const fetchClients = useCallback(async () => {
    try {
      const response = await api.get(`/api/clients`);
      setClients(response.data.clients || []);
    } catch (error) {
      triggerAlert('error', 'حدث خطاء');
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // ✅ حذف عميل
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/clients/${id}`);
      fetchClients();
    } catch (error) {
      triggerAlert: ('error', 'حدث خطاء'); }
  };

  // ✅ تغيير حالة العميل
  const handleToggleStatus = async (id) => {
    try {
      const updatedClients = clients.map((client) =>
        client.id === id ? { ...client, status: client.status === "active" ? "inactive" : "active" } : client
      );
      setClients(updatedClients);
  
      await api.put(`/api/clients/${id}`, {
        status: updatedClients.find((c) => c.id === id).status,
      });
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };
  

  // ✅ فتح نافذة الإضافة أو التعديل
  const openAddEditModal = (client = null) => {
    setSelectedClient(client);
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

  // ✅ عرض مخصص لحالة العميل
  const customRenderers = {
    status: (client) =>
      client.status === 'active' ? (
        <span
          onClick={() => handleToggleStatus(client.id)}
          className="flex items-center text-green-600 cursor-pointer"
        >
          <AiFillCheckCircle className="mr-1" /> نشط
        </span>
      ) : (
        <span
          onClick={() => handleToggleStatus(client.id)}
          className="flex items-center text-red-600 cursor-pointer"
        >
          <AiFillCloseCircle className="mr-1" /> غير نشط
        </span>
      ),
  };

  // ✅ زر إضافة عميل
  const renderAddButton = () => (
    <button
      onClick={() => openAddEditModal()}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
    >
      إضافة عميل
    </button>
  );

  return (

    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
            {/* ✅ رأس القسم */}
      <SectionHeader
        buttonName="عميل"
        listName="عملاء"
        icon={ClientSectionIcon}
      />

      {/* ✅ نافذة الإضافة أو التعديل */}
      {isModalOpen && (
        <AddEditClient
          client={selectedClient}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={fetchClients}
        />
      )}

      {/* ✅ مكون الجدول العالمي */}
      <TableComponent
        data={clients}
        headers={headers}
        onEdit={(id) =>
          openAddEditModal(clients.find((client) => client.id === id))
        }
        onDelete={handleDelete}
        sectionName="clients"
        customRenderers={customRenderers}
        renderAddButton={renderAddButton} // ✅ إضافة زر الإضافة إلى الجدول
      />
    </div>
  );
}

export default ClientList;
