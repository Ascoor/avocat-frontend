import { Card, Badge, ListGroup, Row, Col } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import ServiceProcedureList from './service_procedure/ServiceProcedureList';

const ServiceDetailsModal = ({ service }) => {
  // Animation for the card
  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 120, friction: 14 },
  });

  // Function to determine the badge color based on service status
  const getStatusColor = (status) => {
    const statusColors = {
      Pending: 'warning',
      InProgress: 'primary',
      Completed: 'success',
      Default: 'info',
    };
    return statusColors[status] || statusColors['Default'];
  };

  // Render client-specific information
  const renderClientInfo = () => {
    return service.client_id ? (
      <>
        <ListGroup.Item>
          <strong>إسم العميل: </strong> {service.client?.name}
        </ListGroup.Item>
      </>
    ) : (
      <>
        <ListGroup.Item>
          <strong>إسم العميل بدون وكالة: </strong> {service.unclient_name}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>رقم هاتف: </strong> {service.unclient_phone}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>رقم بطاقة الرقم القومي: </strong> {service.unclient_nid}
        </ListGroup.Item>
      </>
    );
  };

  return (
    <Row>
      <Col>
        <animated.div style={cardAnimation}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">
                {service.service_name}
              </Card.Title>
              <Card.Text>{service.service_description}</Card.Text>
              <ListGroup variant="flush">
                {renderClientInfo()}
                <ListGroup.Item>
                  <strong>الحالة: </strong>
                  <Badge bg={getStatusColor(service.service_status)}>
                    {service.service_status}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>الجهه: </strong> {service.service_place || 'N/A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>رقم ملف الخدمة: </strong>{' '}
                  {service.service_no || 'N/A'}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </animated.div>

        {service && service.id && (
          <ServiceProcedureList serviceId={service.id} />
        )}
      </Col>
    </Row>
  );
};

export default ServiceDetailsModal;
