import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Table, Alert, Card, Button, Row, Modal, Col } from 'react-bootstrap';
import { ClientIcon } from '../../assets/icons/index';
import API_CONFIG from '../../config';
import { FcPlus } from 'react-icons/fc';
import { TiArrowBackOutline } from 'react-icons/ti';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillIdcard, AiFillCalendar, AiFillPhone } from 'react-icons/ai';
import { RiGenderlessFill } from 'react-icons/ri';
import { GiPrayer } from 'react-icons/gi';
import { MdWork } from 'react-icons/md';
import CustomPagination from '../home_tools/Pagination';
import SectionHeader from '../layout/SectionHeader';
export default function Clients() {
  const navigate = useNavigate();
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentAlertMessage, setCurrentAlertMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // تعريف العميل المحدد

  const itemsPerPage = 5;
  const [clientsPage, setClientsPage] = useState(1);
  const startIndex = (clientsPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);

  const paginatedClients = filteredClients.slice(startIndex, endIndex);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.alertMessage &&
      location.state.alertVariant
    ) {
      setCurrentAlertMessage(location.state.alertMessage);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setCurrentAlertMessage('');
      }, 3000);
    }
  }, [location]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
      setClients(response.data);
      setFilteredClients(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handlePageChange = (newPage) => {
    setClientsPage(newPage);
  };

  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(
        `${API_CONFIG.baseURL}/api/clients/${id}`
      );
      fetchClients();
      setCurrentAlertMessage(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setCurrentAlertMessage('');
      }, 3000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleEditClient = (id) => {
    navigate(`/client/edit/${id}`);
  };

  const handleToggleStatus = async (id) => {
    try {
      const client = clients.find((client) => client.id === id);
      const newStatus = client.status === 'active' ? 'inactive' : 'active';

      const response = await axios.put(
        `${API_CONFIG.baseURL}/api/clients/${id}`,
        {
          ...client,
          status: newStatus,
        }
      );

      fetchClients();
      setCurrentAlertMessage(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setCurrentAlertMessage('');
      }, 3000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSearch = () => {
    const filteredClients = clients.filter((client) => {
      return (
        client.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.identity_number
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone_number.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredClients(filteredClients);
  };

  return (
    <>
      <Card>
<SectionHeader buttonName="موكلين" listName="موكلين" icon={ClientIcon}/>

        {showAlert && (
          <Alert className="mt-4" variant="success">
            {currentAlertMessage}
          </Alert>
        )}

        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="البحث عن موكلين"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            بحث
          </button>
        </div>

        <Table striped bordered hover responsive>
          <thead className="table-success text-center">
            <tr>
              <th>رقم المكتب</th>
              <th>اسم العميل</th>
              <th>رقم القومى</th>
              <th>العنوان</th>
              <th>رقم الهاتف</th>
              <th>الحالة</th>
              <th>التحكم</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <Alert variant="warning">لا يوجد موكلين لعرضهم.</Alert>
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.slug}</td>
                  <td>{client.name}</td>
                  <td>{client.identity_number}</td>
                  <td>{client.address}</td>
                  <td>{client.phone_number}</td>
                  <td>
                    {client.status === 'active' ? (
                      <span className="text-success">نشط</span>
                    ) : (
                      <span className="text-danger">غير نشط</span>
                    )}
                  </td>

                  <td>
                    <Button
                      variant={
                        client.status === 'active' ? 'success' : 'warning'
                      }
                      onClick={() => handleToggleStatus(client.id)}
                    >
                      {client.status === 'active' ? 'إلغاء التنشيط' : 'تنشيط'}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleEditClient(client.id)}
                    >
                      تعديل
                    </Button>{' '}
                    <Button
                      variant="danger"
                      onClick={() => deleteClient(client.id)}
                    >
                      حذف
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <Card.Footer>
          {/* Render the CustomPagination component */}
          <CustomPagination
            totalCount={filteredClients.length}
            itemsPerPage={itemsPerPage}
            currentPage={clientsPage}
            onPageChange={handlePageChange}
          />
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} dir="rtl">
        <div className="court-setting-card-header">
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل العميل</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          {selectedClient && (
            <div className="d-flex justify-content-center align-items-center mb-3">
              <BsFillPersonFill size={48} className="mr-3" />
              <h4 className="name">{selectedClient?.name}</h4>
            </div>
          )}
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <AiFillIdcard size={24} className="mr-2" />
                <span className="label">{selectedClient?.identity_number}</span>
              </div>
              <div>
                <AiFillCalendar size={24} className="mr-2" />
                <span className="label">{selectedClient?.date_of_birth}</span>
              </div>
              <div>
                <GiPrayer size={24} className="mr-2" />
                <span className="label">{selectedClient?.religion}</span>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <div>
                <FaPhoneAlt size={24} className="mr-2 client-phone" />
                <span className="label">{selectedClient?.phone_number}</span>
              </div>
              <div>
                <FaEnvelope size={24} className="mr-2 client-email" />
                <span className="label">{selectedClient?.email}</span>
              </div>
              <div>
                <MdWork size={24} className="mr-2 client-work" />
                <span className="label">{selectedClient?.work}</span>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <div>
                <FaMapMarkerAlt size={24} className="mr-2 client-address" />
                <span className="label">{selectedClient?.address}</span>
              </div>
              <div>
                <AiFillPhone size={24} className="mr-2 client-emergency" />
                <span className="label">
                  {selectedClient?.emergency_number}
                </span>
              </div>
              <div>
                <RiGenderlessFill size={24} className="mr-2" />
                <span className="label">{selectedClient?.gender}</span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Button variant="info" onClick={() => setShowModal(false)}>
              إغلاق
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
