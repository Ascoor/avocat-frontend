import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Alert } from 'react-bootstrap';
import { ClientIcon } from '../../assets/icons/index';
import API_CONFIG from '../../config';
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillEdit,
  AiFillDelete,
} from 'react-icons/ai';
import CustomPagination from '../home_tools/Pagination';
import SectionHeader from '../home_tools/SectionHeader';
import AddEditClient from './AddEditClient';

function Clients() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentAlertMessage, setCurrentAlertMessage] = useState('');
  const itemsPerPage = 5;
  const [clientsPage, setClientsPage] = useState(1);
  const startIndex = (clientsPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredClients.length);
// Check if filteredClients is an array before calling slice
const paginatedClients = Array.isArray(filteredClients)
? filteredClients.slice(startIndex, endIndex)
: [];

  // Fetching clients only once when the component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  // Filtering and paginating clients based on searchQuery
  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.identity_number
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone_number.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredClients(filtered);
  }, [searchQuery, clients]);
  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
      setClients(response.data);
      setFilteredClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };
  const handlePageChange = (newPage) => {
    setClientsPage(newPage);
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
  const deleteClient = async (id) => {
    try {
      const response = await axios.delete(
        `${API_CONFIG.baseURL}/api/clients/${id}`,
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

  const handleSlugClick = (slug) => {
    const client = clients.find((client) => client.slug === slug);
    setSelectedClient(client);
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
        },
      );

      fetchClients();
      setAlertMessage(response.data.message);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error toggling status', error);
    }
  };

  const openAddEditModal = (client = null) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  return (
    <>
      <SectionHeader
        buttonName="موكل"
        listName="موكلين"
        icon={ClientIcon}
        setShowAddModal={() => openAddEditModal()}
      />
      <AddEditClient
        client={selectedClient}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => {
          setModalOpen(false);
          fetchClients();
        }}
      />

      <Card className="mt-4">
        <Card.Header>
          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
        </Card.Header>
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
        <Card.Body>
          <div className="table-responsive">
            <table className="special-table">
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
                {paginatedClients.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <Alert variant="warning">لا يوجد موكلين لعرضهم.</Alert>
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr key={client.id}>
                      <td onClick={() => handleSlugClick(client.slug)}>
                        {client.slug}
                      </td>

                      <td>{client.name}</td>
                      <td>{client.identity_number}</td>
                      <td>{client.address}</td>
                      <td>{client.phone_number}</td>
                      <td>
                        {client.status === 'active' ? (
                          <div onClick={() => handleToggleStatus(client.id)}>
                            <AiFillCheckCircle color="green" />
                            <span className="text-success">نشط</span>
                          </div>
                        ) : (
                          <div onClick={() => handleToggleStatus(client.id)}>
                            <AiFillCloseCircle color="red" />
                            <span className="text-danger">غير نشط</span>
                          </div>
                        )}
                      </td>

                      <td>
                        <AiFillEdit
                          color="blue"
                          onClick={() => openAddEditModal(client)}
                        />

                        <AiFillDelete
                          color="red"
                          onClick={() => deleteClient(client.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
        <Card.Footer>
        <CustomPagination
          totalCount={filteredClients.length}
          itemsPerPage={itemsPerPage}
          currentPage={clientsPage}
          onPageChange={handlePageChange}
        />
      </Card.Footer>
      </Card>
    </>
  );
}
export default Clients;
