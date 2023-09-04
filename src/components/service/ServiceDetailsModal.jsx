import React, { useState } from "react";
import { Card, Badge, ListGroup, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useSpring, animated, config } from "@react-spring/web";
import Procedures from "./service_procedure/Procedures"; // Import the Procedures component here

const ServiceDetailsModal = ({ service }) => {
  const cardAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle, // Adjust animation config as needed
  });

  const statusColors = {
    Pending: "warning",
    InProgress: "primary",
    Completed: "success",
  };

  const statusColor = statusColors[service.service_status] || "info";



  const renderField = (label, value) => {
    if (value === undefined || value === null || value === "") {
      return null;
    }
    return (
      <ListGroup.Item className="list-item">
        <strong>{label}:</strong> {value}
      </ListGroup.Item>
    );
  };

  return (
    <Row>
      <Col md={6} lg={12}>
        <animated.div
          className={`service-card bg-${statusColor}`}
          style={{ ...cardAnimation, marginBottom: "15px" }}
        >
          <Card text="white">
            <Card.Body>
              <Card.Title className="text-center">
                {service.service_name}
              </Card.Title>
              <Card.Text>{service.service_description}</Card.Text>
              <ListGroup variant="flush">
                {renderField("Status", (
                  <Badge bg={statusColor} className="badge">
                    {service.service_status}
                  </Badge>
                ))}
                {renderField(
                  "Client",
                  service.client_name || "Unregistered Client"
                )}
                {renderField(
                  "Service Place",
                  service.service_place || "N/A"
                )}
                {renderField("Field1", service.field1)} {/* Add your custom field */}
                {renderField("Field2", service.field2)} {/* Add another custom field */}
              </ListGroup>
            </Card.Body>
          </Card>
        </animated.div>

          <Procedures serviceId={service.id} />
 
      </Col>
    </Row>
  );
};

ServiceDetailsModal.propTypes = {
  service: PropTypes.shape({
    service_name: PropTypes.string.isRequired,
    service_description: PropTypes.string.isRequired,
    service_status: PropTypes.string.isRequired,
    client_name: PropTypes.string, // Add client_name PropTypes if available
    service_place: PropTypes.string, // Add service_place PropTypes if available
    field1: PropTypes.string, // Add PropTypes for custom fields
    field2: PropTypes.string,
  }).isRequired,
};

export default ServiceDetailsModal;
