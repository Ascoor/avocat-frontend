import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import API_CONFIG from '../../../config';

export default function LegalCaseClients({ clients, legCaseClients, legCaseId }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);

  const handleAddNewClient = () => {
    setLegCaseNewClients([...legCaseNewClients, { client_id: '' }]);
  };

  const handleRemoveNewClient = index => {
    setLegCaseNewClients(prev => prev.filter((_, i) => i !== index));
  };

  const handleNewClientChange = (e, index) => {
    const updatedClients = [...legCaseNewClients];
    updatedClients[index].client_id = e.target.value;
    setLegCaseNewClients(updatedClients);
  };

  const handleAddLegCaseClients = async () => {
    try {
      await axios.post(`${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/add_clients`, {
        clients: legCaseNewClients.filter(client => client.client_id),
      });
      setSuccess('Clients added successfully');
      setError('');
      // Consider refreshing the client's list here
    } catch (err) {
      setError('Error adding clients: ' + err.message);
      setSuccess('');
    }
  };
  const handleRemoveClient = (clientId) => {
    // Make an API call to remove the client from the legal case
    axios
      .delete(`${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/remove_client/${clientId}`)
      .then(() => {
        // Update the list of legCaseClients by filtering out the removed client
        setLegCaseClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
      })
      .catch((error) => {
        console.error('Error removing client:', error);
        // Handle errors here, e.g., display an error message
      });
  };

  return (
    <>
      <Card.Header>
        <div className="legalcase-card-header d-flex justify-content-between align-items-center">

          <h3 style={{ fontWeight: 'bold' }}>بيانات الموكل</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <div>
            <Button
              className="btn btn-sm btn-start mx-2"
              variant="warning"
              onClick={handleAddNewClient}
            >
              إضافة موكل <BiPlusCircle />
            </Button>
          </div>

        </div>
      </Card.Header>

      <div className="table-responsive">
        <table className="special-table">
          <thead>

            <tr>
              <th>رقم المكتب</th>
              <th>اسم الموكل</th>
              <th>رقم الهاتف</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {legCaseClients && legCaseClients.length > 0 ? (
              legCaseClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.slug}</td>
                  <td>{client.name}</td>
                  <td>{client.phone_number}</td>
                  <td
                    className={`${client.status === 'active'
                        ? 'text-success'
                        : 'text-danger'
                      }`}
                  >
                    {client.status}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveNewClient(client)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">لا يوجد عملاء مرتبطين بالقضية حاليًا</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Form onSubmit={(e) => e.preventDefault()}>
        {clients.map((client, index) => (
          <Row key={index}>
            <Col xs={12} lg={6}>
              <Form.Group className="mb-0" controlId={`newClientName_${index}`}>
                <Form.Control as="select" value={client} onChange={(e) => handleNewClientChange(e, index)}>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}

                </Form.Control>

                {client.client_id === '' && (
                  <div className="text-danger">لابد من اختيار عميل</div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => handleRemoveClient(index)}><BiMinusCircle /></Button>
            </Col>
          </Row>
        ))}
        {legCaseNewClients.length > 0 && (
          <Button
            className="btn btn-sm btn-start mx-2"
            variant="success"
            onClick={handleAddLegCaseClients}
          >
            حفظ
          </Button>
        )}
      </Form>
    </>
  );
}
