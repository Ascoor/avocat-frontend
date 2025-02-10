import { useState, useEffect, useCallback } from 'react';
import { getServices, deleteService } from '../services/api/services';
import AddEditServiceModal from '../components/LegalServices/AddEditServiceModal';
import SectionHeader from '../components/common/SectionHeader';
import { ServiceSection } from '../assets/icons/index';
import TableComponent from '../components/common/TableComponent';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import GlobalConfirmDeleteModal from '../components/common/GlobalConfirmDeleteModal';
import { useAlert } from '../context/AlertContext';

const LegalServiceList = () => {
  // ✅ State Management
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
const {triggerAlert} = useAlert();
const [isViewing, setIsViewing] = useState(false);

// عند فتح المودال، يمكنك تعيين `isViewing` بناءً على حالة معينة
  // ✅ Fetch Services
  const fetchServices = useCallback(async () => {
    try {
      const response = await getServices();
      setServices(response.data.services);
    } catch (error) {
      console.error('❌ خطأ أثناء جلب الخدمات:', error);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // ✅ Handlers
  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowModal(true);
  }; 
  const handleDeleteService = (service) => {

    setServiceToDelete(service);
    setConfirmDelete(true);
  };
  
  const openViewModal = (service) => {
    setEditingService(service);
    setIsViewing(true);
    setShowModal(true);
  };
  
  
  
  const confirmDeleteService = async () => {
    if (!serviceToDelete || !serviceToDelete.id) {
      triggerAlert('error', 'لم يتم تحديد الخدمة للحذف');
      return;
    }
  
    try {
      await deleteService(serviceToDelete.id);
      triggerAlert('success', `تم حذف الخدمة   بنجاح`);
      
      // تحديث قائمة الخدمات
      setServices((prev) => prev.filter((s) => s.id !== serviceToDelete.id));
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء حذف الخدمة');
      
    } finally {
      setConfirmDelete(false);
      setServiceToDelete(null);
    }
  };
  // ✅ Table Configuration
  const tableHeaders = [
    { key: 'slug', text: 'رقم الخدمة' },
    { key: 'service_type', text: 'نوع الخدمة' },
    { key: 'service_place_name', text: 'مكان الخدمة' },
    { key: 'description', text: 'الوصف' },
    { key: 'status', text: 'الحالة' },
  ];
  const statusColors = {
    "جارى التنفيذ": "text-yellow-500", // لون أصفر
    "قيد التنفيذ": "text-orange-500", // لون برتقالي
    "منتهية": "text-green-600", // لون أخضر
    "متداولة": "text-blue-500", // لون أزرق
    "استيفاء": "text-purple-500", // لون بنفسجي 
  };
  
  const statusIcons = {
    "جارى التنفيذ": <AiFillCheckCircle className="mr-1" />,
    "قيد التنفيذ": <AiFillCheckCircle className="mr-1" />,
    "منتهية": <AiFillCheckCircle className="mr-1" />,
    "متداولة": <AiFillCheckCircle className="mr-1" />,
    "استيفاء": <AiFillCheckCircle className="mr-1" />, 
  };
   
  const customRenderers = {
    service_type: (service) => (
      service.service_type?.name ? (
        <span className="text-avocat-indigo-light dark:text-avocat-orange font-medium">{service.service_type.name}</span>
      ) : (
        <span className="text-gray-400 italic">غير محدد</span>
      )
    ),
  
    status: (service) => {
      const statusText = service.status || "غير محدد";
      const textColor = statusColors[statusText] || "text-gray-400";
      const statusIcon = statusIcons[statusText] || null;
  
      return (
        <span className={`flex items-center ${textColor}`}>
          {statusIcon} {statusText}
        </span>
      );
    },
  };


  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      <SectionHeader listName="الخدمات" icon={ServiceSection} />
    
    
      <TableComponent
    data={services}
    headers={tableHeaders}
    onEdit={(id) => {
      setIsViewing(false);
      handleEditService(services.find((service) => service.id === id));
    }}
    onDelete={handleDeleteService}
    onView={(id) => openViewModal(services.find((service) => service.id === id))}
    customRenderers={customRenderers}
    renderAddButton={() => (
      <button
        onClick={handleAddService}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
      >
        إضافة خدمة
      </button>
    )}
  />
  
  {showModal && (
    <AddEditServiceModal
      show={showModal}
      handleClose={() => {
        setShowModal(false);
        setIsViewing(false); // إعادة ضبط حالة العرض عند إغلاق المودال
        fetchServices();
      }}
      service={editingService || null}
      isEditing={!!editingService && !isViewing} // يكون true عند التحرير فقط وليس العرض
      isViewing={isViewing} // تحديد إذا كان المودال في وضع العرض
      onSaved={fetchServices}
    />
  )}
      {confirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onConfirm={confirmDeleteService}
          itemName={serviceToDelete?.service_type?.name || serviceToDelete?.slug || 'الخدمة'}
        />
      )}
    </div>
  );
};


export default LegalServiceList;
