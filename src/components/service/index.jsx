import React, { useState, useEffect } from "react";
import { Table, Button, Card, Row } from "react-bootstrap";
import axios from "axios";
import ServiceModal from "./ServiceModal";
import API_CONFIG from "../../config";

const Services = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(API_CONFIG.baseURL + "/api/services");
      setServices(response.data.services);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب الخدمات:", error);
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
      await axios.delete(API_CONFIG.baseURL + `/api/services/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.error("حدث خطأ أثناء حذف الخدمة:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    fetchServices();
  };

  return (
    <Card>
      <Card.Header className="text-center">
        <Row>
          <div className="court-setting-card-header">إضافة</div>
        </Row>
      </Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={() => handleAddService()}>
          اضافة محامى
        </Button>
        <Table striped bordered responsive className="rtl-table">
          <thead className="table-success">
            <tr>
              <th>رقم الخدمة</th>
              <th>وصف الخدمة</th>
              <th> العميل</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{service.service_no}</td>
                <td>{service.service_description}</td>
                <td>
                  {service.client?.name ||
                    service.unclient_name ||
                    service.unclient_phone}
                </td>
                <td>{service.service_name}</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ServiceModal
          show={showModal}
          handleClose={handleCloseModal}
          service={editingService}
          isEditing={!!editingService}
        />
      </Card.Body>
    </Card>
  );
};

export default Services;
