import { useState, useEffect } from 'react';
import { Button, Card, Row, Col,InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import AddEditServiceModal from './AddEditServiceModal';
import API_CONFIG from '../../config';

import SectionHeader from '../home_tools/SectionHeader';
import { ServiceIcon } from '../../assets/icons/index';
import CustomPagination from '../home_tools/Pagination';
const Services = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
   
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

  // Handler Functions
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
      {showModal && (
  <AddEditServiceModal
    show={showModal}
    handleClose={() => {
      setShowModal(false);
      fetchServices(); // Refresh services list
    }}
    service={editingService}
    isEditing={!!editingService}
  />
)}


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
                  <th className="col-2">الموضوع</th>

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
                    <td>{service.description}</td>
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
     
      {/* Modals */}




    </>
  );
};


export default Services;
