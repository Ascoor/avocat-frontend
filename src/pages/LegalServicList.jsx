import { useState, useEffect, useCallback } from 'react';
import { getServices, deleteService } from '../services/api/services';
import AddEditServiceModal from '../components/LegalServices/AddEditServiceModal';
import SectionHeader from '../components/common/SectionHeader';
import { ServiceSection } from '../assets/icons/index';
import TableComponent from '../components/common/TableComponent';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const LegalServiceList = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // ✅ جلب بيانات الخدمات
  const fetchServices = useCallback(async () => {
    try {
      const response = await getServices();
      setServices(response.data.services);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب الخدمات:', error);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // ✅ إضافة خدمة جديدة
  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  // ✅ تعديل خدمة
  const handleEditService = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  // ✅ حذف خدمة
  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(`/api/services/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.error('حدث خطأ أثناء حذف الخدمة:', error);
    }
  };

  // ✅ إعداد رؤوس الجدول
  const headers = [
    { key: 'slug', text: 'رقم الخدمة' },
    { key: 'service_type', text: 'نوع الخدمة' },
    { key: 'service_place_name', text: 'مكان الخدمة' },
    { key: 'description', text: 'الوصف' },
    { key: 'status', text: 'الحالة' },
  ];

  const customRenderers = {
    service_type: (service) =>
      service.service_type && service.service_type.name ? (
        <span className="text-blue-600 font-medium">
          {service.service_type.name}
        </span>
      ) : (
        <span className="text-gray-400 italic">غير محدد</span>
      ),

    status: (service) =>
      service.status === 'active' ? (
        <span className="flex items-center text-green-600">
          <AiFillCheckCircle className="mr-1" /> نشطة
        </span>
      ) : (
        <span className="flex items-center text-red-600">
          <AiFillCloseCircle className="mr-1" /> غير نشطة
        </span>
      ),
  };

  const renderAddButton = () => (
    <button
      onClick={handleAddService}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
    >
      إضافة خدمة
    </button>
  );

  return (
    <>
      <SectionHeader listName="الخحدمات" icon={ServiceSection} />
      {showModal && (
        <AddEditServiceModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            fetchServices();
          }}
          service={editingService}
          isEditing={!!editingService}
        />
      )}

      <TableComponent
        data={services}
        headers={headers}
        onEdit={(id) =>
          handleEditService(services.find((service) => service.id === id))
        }
        onDelete={handleDeleteService}
        sectionName="services"
        customRenderers={customRenderers}
        renderAddButton={renderAddButton}
      />
    </>
  );
};

export default LegalServiceList;
