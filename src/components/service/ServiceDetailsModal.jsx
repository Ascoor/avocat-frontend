import React from "react";
import { Card, Badge, ListGroup, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSpring, animated, config } from "@react-spring/web";
import ServiceProcedureList from "./service_procedure/ServiceProcedureList";

const ServiceCard = ({ service }) => {
  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const getStatusColor = () => {
    const statusColors = {
      Pending: "warning",
      InProgress: "primary",
      Completed: "success",
    };
    return statusColors[service.service_status] || "info";
  };

  return (
    <animated.div
      className={`service-card bg-${getStatusColor()}`}
      style={{ ...cardAnimation, marginBottom: "15px" }}
    >
      <Card text="dark">
        <Card.Body>
          <Card.Title className="text-center">
            {service.service_name}
          </Card.Title>
          <Card.Text>{service.service_description}</Card.Text>
          <ListGroup variant="flush">
          <ListGroup.Item>
                <strong>{service.client_id ? "إسم العميل" : "إسم العميل بدون وكالة"}</strong>{" "}
                {service.client_id ? service.client?.name : service.unclient_name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>الحالة</strong>{" "}
                <Badge bg={getStatusColor()} className="badge">
                  {service.service_status}
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>رقم هاتف</strong>{" "}
                {service.client_id ? "N/A" : service.unclient_phone}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>رقم بطاقة الرقم القومي</strong>{" "}
                {service.client_id ? "N/A" : service.unclient_nid}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>الجهه</strong>{" "}
                {service.service_place || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>رقم ملف الخدمة</strong>{" "}
                {service.service_no || "N/A"}
              </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
            <ServiceProcedureList serviceId={service.id} />
        </Card.Footer>
      </Card>
    </animated.div>
  );
};

ServiceCard.propTypes = {
    service: PropTypes.shape({
      service_name: PropTypes.string.isRequired,
      service_description: PropTypes.string.isRequired,
      service_status: PropTypes.string.isRequired,
      client_name: PropTypes.string,
      service_place: PropTypes.string,
      field1: PropTypes.string,
      field2: PropTypes.string,
    }).isRequired,
  };

const ServiceDetailsModal = ({ service }) => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }} // Adjust the minimum height as needed
    >
        
      <Col sm={12} md={6} lg={6}>
        <ServiceCard service={service} />
      </Col>
    </Container>
  );
};


ServiceDetailsModal.propTypes = {
    service: PropTypes.shape({
      service_name: PropTypes.string.isRequired,
      service_description: PropTypes.string.isRequired,
      service_status: PropTypes.string.isRequired,
      client_name: PropTypes.string,
      service_place: PropTypes.string,
      field1: PropTypes.string,
      field2: PropTypes.string,
    }).isRequired,
  };
  
export default ServiceDetailsModal;