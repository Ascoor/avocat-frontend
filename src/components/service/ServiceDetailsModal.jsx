import React from "react";
import { Card, Badge, ListGroup, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSpring, animated, config } from "@react-spring/web";
import ServiceProcedureList from "./service_procedure/ServiceProcedureList";

const ServiceDetailsModal = ({ service }) => {
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
    <Row>
      <Col md={6} lg={12}>
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
                  <strong>الحالة</strong>{" "}
                  <Badge bg={getStatusColor()} className="badge">
                    {service.service_status}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>إسم العميل:</strong>{" "}
                  {service.client_name || "Unregistered Client"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>الجهه</strong>{" "}
                  {service.service_place || "N/A"}
                </ListGroup.Item>
 
                <ListGroup.Item>
                  <strong> رقم ملف الخدمة</strong> {service.service_no || "N/A"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </animated.div>
<ServiceProcedureList serviceId={service.id} />
      </Col>
    </Row>
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
