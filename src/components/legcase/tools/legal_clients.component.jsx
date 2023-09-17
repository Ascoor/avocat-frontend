import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Card, Table, Button, Form } from 'react-bootstrap';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import API_CONFIG from '../../../config';
import PropTypes from 'prop-types';

export default function LegCaseClients({ legCaseId }) {
  LegCaseClients.propTypes = {
    legCaseId: PropTypes.string.isRequired,
  };

  const [clients, setClients] = useState([]);
  const [legCaseClients, setLegCaseClients] = useState([]);
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);

  useEffect(() => {
    const fetchLegCase = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/leg_cases/${legCaseId}`
        );
        setLegCaseClients(response.data.leg_case.clients);
        setClients(response.data.clients);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLegCase();
  }, [legCaseId]);

  const handleAddNewClient = () => {
    setLegCaseNewClients((prevClients) => [...prevClients, { client_id: '' }]);
  };

  const handleRemoveNewClient = (index) => {
    setLegCaseNewClients((prevClients) =>
      prevClients.filter((_, i) => i !== index)
    );
  };

  const handleNewClientChange = (index, field, value) => {
    const updatedClients = [...legCaseNewClients];
    updatedClients[index][field] = value;
    setLegCaseNewClients(updatedClients);
  };

  return (
    <>
      <Card>
        <Card.Header>
          <div className="legalcase-card-header">
            <h3>بيانات الموكلين بالدعوى</h3>
            <Button
              className="btn btn-sm mb-end"
              variant="warning"
              onClick={handleAddNewClient}
            >
              إضافة موكل <BiPlusCircle />
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-success text-center">
              <tr>
                <th>رقم المكتب </th>
                <th>اسم الموكل</th>
                <th>رقم الهاتف</th>

                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {legCaseClients &&
                legCaseClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.slug}</td>
                    <td>{client.name}</td>
                    <td>{client.phone_number}</td>
                    <td
                      className={`${
                        client.status === 'active'
                          ? 'text-success'
                          : 'text-danger'
                      }`}
                    >
                      {client.status === 'active' ? 'Active' : 'Inactive'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="mt-3">
            {legCaseNewClients.map((client, index) => (
              <div key={index} className="mb-3">
                <Row className="align-items-center mt-6">
                  <Col>
                    <Form.Group controlId="client Name">
                      <Form.Label>اسم العميل</Form.Label>
                      <Form.Control
                        as="select"
                        value={client.name}
                        onChange={(e) =>
                          handleNewClientChange(index, 'name', e.target.value)
                        }
                      >
                        <option value="null">اختر اسم العميل</option>
                        {clients &&
                          clients.map((clientOption) => (
                            <option
                              key={clientOption.id}
                              value={clientOption.id}
                            >
                              {clientOption.name}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={1}>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveNewClient(index)}
                      className="align-middle"
                    >
                      <BiMinusCircle />
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
