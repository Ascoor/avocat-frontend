import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Table,
  Alert,
  Card,
  Button,
  Row,
  Modal,
  Col,
  TextField,
} from "@mui/material"; // Import Material-UI components
import { FcPlus } from "react-icons/fc";
import { TiArrowBackOutline } from "react-icons/ti";

// Import Material-UI icons
import {
  Phone as FaPhoneAlt,
  MailOutline as FaEnvelope,
  Room as FaMapMarkerAlt,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import {
  PersonFill as BsFillPersonFill,
  Calendar as AiFillCalendar,
  Phone as AiFillPhone,
  Genderless as RiGenderlessFill,
  Pray as GiPrayer,
  Work as MdWork,
} from "@mui/icons-material";

import { ClientIcon } from "../../assets/icons";
import API_CONFIG from "../../config";
import Pagination from "./Pagination"; // Assuming you have Pagination component

export default function Clients() {
  const navigate = useNavigate();
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentAlertMessage, setCurrentAlertMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
        setCurrentAlertMessage("");
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
        setCurrentAlertMessage("");
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
      const newStatus = client.status === "active" ? "inactive" : "active";

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
        setCurrentAlertMessage("");
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
    setCurrentPage(1); // reset to the first page when a new search is performed
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Card>
        <div className="court-setting-card-header">
          قائمة العملاء
          <img src={ClientIcon} alt="Icon" className="court-icon" />
        </div>
        <Row>
          <Col className="text-start">
            <Link className="btn btn-lg btn-primary  btn-add" to={"/client/create"}>
              <FcPlus size={20} />
              إضافة موكل
            </Link>
          </Col>
          <Col className="text-end">
            <Button
              variant="warning"
              className="btn-back btn-lg"
              type="button"
              onClick={() => window.history.back()}
            >
              <TiArrowBackOutline size={25} style={{ marginRight: "0.5rem" }} />
              رجوع
            </Button>
          </Col>
        </Row>
        <hr />
        {showAlert && (
          <Alert className="mt-4" variant="success">
            {currentAlertMessage}
          </Alert>
        )}

        <div className="input-group w-50">
          <TextField
            className="form-control"
            placeholder="البحث عن موكلين"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="primary" onClick={handleSearch}>
            بحث
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
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
            {currentClients.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <Alert variant="warning">لا يوجد موكلين لعرضهم.</Alert>
                </td>
              </tr>
            ) : (
              currentClients.map((client) => (
                <tr key={client.id}>
                  <td
                    className="client-link"
                    onClick={() => {
                      setSelectedClient(client);
                      setShowModal(true);
                    }}
                  >
                    {client.slug}
                  </td>
                  <td>{client.name}</td>
                  <td>{client.identity_number}</td>
                  <td>{client.address}</td>
                  <td>{client.phone_number}</td>
                  <td>
                    {client.status === "active" ? (
                      <span className="text-success">نشط</span>
                    ) : (
                      <span className="text-danger">غير نشط</span>
                    )}
                  </td>

                  <td>
                    <Button
                      variant={client.status === "active" ? "success" : "warning"}
                      onClick={() => handleToggleStatus(client.id)}
                    >
                      {client.status === "active" ? "إلغاء التنشيط" : "تنشيط"}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleEditClient(client.id)}
                    >
                      تعديل
                    </Button>{" "}
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
        <Pagination
          clientsPerPage={clientsPerPage}
          totalClients={filteredClients.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)} dir="rtl">
        <div className="court-setting-card-header">
          <Modal.Header closeButton>
            <Modal.Title>تفاصيل العميل</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <BsFillPersonFill size={48} className="mr-3" />
            <h4 className="name">{selectedClient?.name}</h4>
          </div>
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
                <span className="label">{selectedClient?.emergency_number}</span>
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
