import { useState, useEffect } from 'react';
import { Button, Card, Row, Col,InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import ServiceModal from './ServiceModal';
import API_CONFIG from '../../config';
import ServiceDetailsModal from './ServiceDetailsModal';
import SectionHeader from '../home_tools/SectionHeader';
import { ServiceIcon } from '../../assets/icons/index';
import CustomPagination from '../home_tools/Pagination';
const Services = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const itemsPerPage = 10;
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

  const handleEditService = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleDeleteService = async (serviceId) => {
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
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/service-search?search=${searchQuery}`);
      setServices(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };



  const paginatedServices = services.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <>
      <SectionHeader
        listName="الخدمات"
        buttonName="خدمة"
        setShowAddModal={handleAddService}
        icon={ServiceIcon}
      />
      <Card>
      <Row>
            <Col xs={12} md={6} lg={4}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={handleSearch}>
                  بحث
                </Button>
              </InputGroup>
            </Col>
          </Row>
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
                {paginatedServices.map((service) => (
                  <tr key={service.id}>
                    <td>{service.slug}</td>
                    <td>{service.service_type?.name}</td>
                    <td>
  {service.clients && service.clients.length > 0
    ? service.clients.map((client, index) => (
        <span key={index}>
          {client.name}{index < service.clients.length - 1 ? ', ' : ''}
        </span>
      ))
    : service.unclients && service.unclients.map((unclient, index) => (
        <span key={index}>
          {unclient.name}{index < service.unclients.length - 1 ? ', ' : ''}
        </span>
      ))
  }
</td>


                    <td>{service.service_place_name}</td>
                    <td>{service.status}</td>
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
        <Card.Footer>
          <CustomPagination
            totalCount={services.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Card.Footer>
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
