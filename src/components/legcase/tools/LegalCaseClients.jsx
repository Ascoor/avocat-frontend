import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import API_CONFIG from '../../../config';

export default function LegalCaseClients({  legCaseId }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);
useEffect(() => {
  const fetchLegCaseClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/clients`);
    }
    catch (error) {
      console.log(error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
      setClients(response.data);
    }
    catch (error) {
      console.log(error);

    }
  };

  fetchClients();
  fetchLegCaseClients();

}, [legCaseId]);
  const handleAddNewClient = () => {
    setLegCaseNewClients((prevClients) => [...prevClients, { client_id: '' }]);
  };

  const handleRemoveNewClient = (index) => {
    setLegCaseNewClients((prevClients) => prevClients.filter((_, i) => i !== index));
  };

  const handleNewClientChange = (e, index) => {
    const updatedClients = [...legCaseNewClients];
    updatedClients[index].client_id = e.target.value;
    setLegCaseNewClients(updatedClients);
  };

  const handleAddLegCaseClients = async () => {
    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/add_clients`, {
        clients: legCaseNewClients.filter((client) => client.client_id),
      });
      setSuccess(response.data.message); // Assuming the API returns a success message
      setError('');
      // Consider refreshing the client's list here
    } catch (error) {
      setError('Error adding clients: ' + error.message);
      setSuccess('');
    }
  };

  const handleRemoveClient = (clientId) => {
    axios
      .delete(`${API_CONFIG.baseURL}/api/legal-cases/${legCaseId}/remove_client/${clientId}`)
      .then(() => {
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
            <Button className="btn btn-sm btn-start mx-2" variant="warning" onClick={handleAddNewClient}>
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
                  <td className={client.status === 'active' ? 'text-success' : 'text-danger'}>
                    {client.status}
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveClient(client.id)}>
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
        {legCaseNewClients.map((client, index) => (
          <Row key={index}>
            <Col xs={12} lg={6}>
              <Form.Group className="mb-0" controlId={`newClientName_${index}`}>
                <Form.Control
                  as="select"
                  value={client.client_id}
                  onChange={(e) => handleNewClientChange(e, index)}
                >
                  <option value="">اختر عميلًا</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </Form.Control>
                {client.client_id === '' && <div className="text-danger">لابد من اختيار عميل</div>}
              </Form.Group>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => handleRemoveNewClient(index)}>
                <BiMinusCircle />
              </Button>
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