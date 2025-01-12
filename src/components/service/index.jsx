    import { useState, useEffect, useCallback } from 'react';
    import axios from 'axios';
    import AddEditServiceModal from './AddEditServiceModal';
    import API_CONFIG from '../../config';

    import SectionHeader from '../home_tools/SectionHeader';
    import { ServiceSection } from '../../assets/icons/index';
    import TableComponent from '../global/TableComponent'; // ✅ استيراد مكون الجدول العالمي
    import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

    const Services = () => {
      const [services, setServices] = useState([]);
      const [showModal, setShowModal] = useState(false);
      const [editingService, setEditingService] = useState(null);

      // ✅ جلب بيانات الخدمات
      const fetchServices = useCallback(async () => {
        try {
          const response = await axios.get(`${API_CONFIG.baseURL}/api/services`);
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
          await axios.delete(`${API_CONFIG.baseURL}/api/services/${serviceId}`);
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
          
        // ✅ عرض مخصص للحالة
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
      

      // ✅ زر إضافة خدمة داخل الجدول فقط
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
          {/* ✅ رأس القسم بدون زر إضافة */}
          <SectionHeader
            listName="الخدمات"
            icon={ServiceSection}
          />

          {/* ✅ نافذة الإضافة أو التعديل */}
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

          {/* ✅ مكون الجدول العالمي مع زر إضافة داخلي */}
          <TableComponent
            data={services}
            headers={headers}
            onEdit={(id) => handleEditService(services.find((service) => service.id === id))}
            onDelete={handleDeleteService}
            sectionName="services"
            customRenderers={customRenderers}
            renderAddButton={renderAddButton} // ✅ زر الإضافة داخل الجدول فقط
          />
        </>
      );
    };

    export default Services;
