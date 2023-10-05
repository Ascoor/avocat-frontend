import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Card, Button, Form, Alert } from 'react-bootstrap';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import API_CONFIG from '../../../config';
import PropTypes from 'prop-types';

export default function LegCaseClients({ legCaseId }) {
  // PropTypes
  LegCaseClients.propTypes = {
    legCaseId: PropTypes.string.isRequired,
  };


    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState('');
    const [deleteErrorMsg, setDeleteErrorMsg] = useState('');
  
  // State variables
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [clients, setClients] = useState([]);
  const [legCaseClients, setLegCaseClients] = useState([]);
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);

  // Fetch leg case clients from the API
  const fetchLegCaseClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/leg_cases/${legCaseId}`);
      setLegCaseClients(response.data.leg_case.clients);
    } catch (error) {
      console.error("Error fetching leg case clients:", error);
    }
  };

  useEffect(() => {
    fetchLegCaseClients();
  }, [legCaseId]);

  // Fetch all available clients from the API
  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching all clients:", error);
      }
    };

    fetchAllClients();
  }, []);

  // Handle the addition of a new client to the leg case
  const handleAddNewClient = () => {
    if (clients.length > 0) {
      setLegCaseNewClients([...legCaseNewClients, { client_id: '' }]);
    } else {
      setErrorMsg('يرجى اختيار عميل أولاً قبل إضافة عملاء جدد');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  };

  // Handle the removal of a client from the leg case
  const handleRemoveClient = (index, listType) => {
    if (listType === "existing") {
      setLegCaseClients(prevClients =>
        prevClients.filter((_, i) => i !== index)
      );
    } else {
      setLegCaseNewClients(prevClients =>
        prevClients.filter((_, i) => i !== index)
      );
    }
  };

  // Handle client change
  const handleClientChange = (index, key, value, listType) => {
    if (!value) {
      setErrorMsg('لابد من اختيار عميل');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      return;
    }

    // Check if the client ID already exists in either legCaseClients or legCaseNewClients
    const clientExistsInLegCase = legCaseClients.some(
      (client) => client.client_id === value
    );

    const clientExistsInNew = legCaseNewClients.some(
      (client) => client.client_id === value
    );

    if (clientExistsInLegCase || clientExistsInNew) {
      setErrorMsg('لا يمكن إضافة عميل موجود بالفعل في القضية');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      return;
    }

    if (listType === 'existing') {
      setLegCaseClients((prevClients) => {
        const updatedClients = [...prevClients];
        updatedClients[index][key] = value;
        return updatedClients;
      });
    } else {
      setLegCaseNewClients((prevClients) => {
        const updatedClients = [...prevClients];
        updatedClients[index][key] = value;
        return updatedClients;
      });
    }
  };

  const handleDeleteClient = async (client) => {
    try {
      // Make a DELETE request to your API to delete the client
      const response = await axios.delete(
        `${API_CONFIG.baseURL}/api/leg_cases/${legCaseId}/clients/${client.id}`
      );
  
      // Check if the deletion was successful
      if (response.status === 200) {
        // Client deleted successfully, update the client list
        setTimeout(() => {
          setDeleteSuccessMsg(`تم حذف العميل ${client.name} بنجاح`);
          setDeleteErrorMsg(''); // Clear any previous error message
        }, 3000);
          fetchLegCaseClients(); // Refresh the list of clients
          
        setDeleteErrorMsg(''); // Clear any previous error message
        fetchLegCaseClients(); // Refresh the list of clients
      } else {
        setTimeout(() => {
        setDeleteErrorMsg(`فشل حذف العميل ${client.name}`);
        setDeleteSuccessMsg(''); // Clear any previous success message
      }, 3000);
      }
    } catch (error) {
      setDeleteErrorMsg(`خطأ أثناء حذف العميل ${client.name}: ${error.message}`);
      setDeleteSuccessMsg(''); // Clear any previous success message
    }
  };
  // Handle form submission
  const handleSubmit = async () => {
    // Check if there are new clients to add
    const clientsToSubmit = legCaseNewClients.filter(
      (client) => client.client_id && client.client_id !== ''
    );

    if (clientsToSubmit.length === 0) {
      setErrorMsg('لابد من اختيار عميل أولاً قبل إرسال الطلب');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      return;
    }

    // Check for duplicate clients in legCaseClients
    const duplicateClients = clientsToSubmit.filter((newClient) =>
      legCaseClients.some((legCaseClient) =>
        legCaseClient.client_id === newClient.client_id
      )
    );

    if (duplicateClients.length > 0) {
      setErrorMsg('لا يمكن إضافة عميل موجود بالفعل في القضية');
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      return;
    }

    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/api/leg_cases/${legCaseId}/add_clients`,
        { clients: clientsToSubmit }
      );

      if (response.data) {
        console.log('Clients added successfully');
        setLegCaseNewClients([]);
        fetchLegCaseClients();
        setSuccessMsg('تمت إضافة العملاء بنجاح');
        setTimeout(() => {
          setSuccessMsg('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error saving clients:', error);
    }
  };

  return (
    <>
      <Card.Header>
        <div className="legalcase-card-header d-flex justify-content-between align-items-center">
          <h3 style={{ fontWeight: 'bold' }}>بيانات الموكل</h3>
          <div>
            <Button
              className="btn btn-sm btn-start mx-2"
              variant="warning"
              onClick={handleAddNewClient}
            >
              <BiPlusCircle /> إضافة موكل
            </Button>
          </div>
        </div>
      </Card.Header>
      
      {deleteErrorMsg && (
        <div className="mb-3">
          <Alert variant="danger">{deleteErrorMsg}</Alert>
        </div>
      )}

      {deleteSuccessMsg && (
        <div className="mb-3">
          <Alert variant="success">{deleteSuccessMsg}</Alert>
        </div>
      )}
      {errorMsg && (
        <div className="mb-3">
          <Alert variant="danger">{errorMsg}</Alert>
        </div>
      )}

      {successMsg && (
        <div className="mb-3">
          <Alert variant="success">{successMsg}</Alert>
        </div>
      )}
      {legCaseClients.length > 0 && (
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
              {legCaseClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.slug}</td>
                  <td>{client.name}</td>
                  <td>{client.phone_number}</td>
                  <td
                    className={`${
                      client.status === 'active' ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {client.status}
                  </td>
                  <td>

                      <Button
                      variant="danger"
                      onClick={() => handleDeleteClient(client)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Form>
        {legCaseNewClients.map((client, index) => (
          <Row key={index}>
            <Col>
              <Form.Group controlId={`newClientName_${index}`}>
                <Form.Control
                  as="select"
                  value={client.client_id}
                  onChange={(e) =>
                    handleClientChange(index, 'client_id', e.target.value, 'new')
                  }
                >
                  <option value="">اختر العميل</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Control>
                {client.client_id === "" && (
                  <div className="text-danger">لابد من اختيار عميل</div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={() => handleRemoveClient(index, 'new')}
              >
                <BiMinusCircle /> حذف
              </Button>
            </Col>
          </Row>
        ))}
        <Button
          className="btn btn-sm btn-start mx-2"
          variant="success"
          onClick={handleSubmit}
        >
          حفظ
        </Button>
      </Form>
    </>
  );
}
 