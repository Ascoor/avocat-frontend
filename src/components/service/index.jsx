import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import ServiceModal from './ServiceModal';
import API_CONFIG from '../../config';
import ServiceDetailsModal from './ServiceDetailsModal';
import SectionHeader from '../home_tools/SectionHeader';
import { ServiceIcon } from '../../assets/icons/index';
const Services = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    // Fetch services when the component mounts
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/services`);
      setServices(response.data.services);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب الخدمات:', error);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEditService = service => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleDeleteService = async serviceId => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/services/${serviceId}`);
      // After deleting a service, fetch services again to update the list
      fetchServices();
    } catch (error) {
      console.error('حدث خطأ أثناء حذف الخدمة:', error);
    }
  };

  const handleServiceAddedOrEdited = () => {
    // After adding or editing a service, fetch services again to update the list
    fetchServices();
  };
  const handleReturn = () => {
    // Show the table and reset the selected service when returning
    setSelectedService(null);
    setShowDetailsModal(false); // Add this line to set showDetailsModal to false
  };

  return (
    <>
      <SectionHeader
        listName="الخدمات"
        buttonName="خدمة"
        setShowAddModal={handleAddService}
        icon={ServiceIcon}
      />

      <Card className="m-4">
        <Card.Body>
          <div className="table-responsive">
            <table className="special-table">
              <thead>
                <tr>
                  <th className="col-1">رقم الخدمة</th>
                  <th className="col-2">وصف الخدمة</th>
                  <th className="col-3">العميل</th>
                  <th className="col-2">الجهة</th>
                  <th className="col-2">الحالة</th>
                  <th className="col-2">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.id}>
                    <td>{service.service_no}</td>
                    <td>{service.service_name}</td>
                    <td>{service.client?.name || service.unclient?.name}</td>
                    <td>{service.service_place}</td>
                    <td>{service.service_status}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEditService(service)}
                      >
                        تعديل
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        حذف
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSelectedService(service);
                          setShowDetailsModal(true); // Add this line to set showDetailsModal to true
                        }}
                      >
                        عرض التفاصيل
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
      {showDetailsModal && (
        <ServiceDetailsModal
          service={selectedService}
          handleClose={handleReturn}
        />
      )}
      <ServiceModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        service={editingService}
        handleServiceAddedOrEdited={handleServiceAddedOrEdited}
        isEditing={!!editingService}
      />
    </>
  );
};

export default Services;
