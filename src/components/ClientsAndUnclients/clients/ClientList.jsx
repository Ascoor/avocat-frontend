import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import API_CONFIG from '../../../config';

import { ClientSectionIcon } from '../../../assets/icons/index';

import CustomPagination from '../../home_tools/Pagination';
import SectionHeader from '../../home_tools/SectionHeader';
import AddEditClient from './AddEditClient';

// Styled Components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ActionButton = styled.span`
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    opacity: 0.7;
  }
`;

const SearchBar = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 70%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function ClientList() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [clientsPage, setClientsPage] = useState(1);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const fetchClients = useCallback(async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
      setClients(response.data.clients || []);
      setFilteredClients(response.data.clients || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = clients.filter((client) =>
        ['slug', 'identity_number', 'name', 'phone_number'].some((key) =>
          client[key]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredClients(filtered);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, clients]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_CONFIG.baseURL}/api/clients/${id}`);
      fetchClients();
      setAlert({ show: true, message: response.data.message, type: 'success' });
    } catch (error) {
      console.error('Error deleting client:', error);
      setAlert({ show: true, message: 'Failed to delete client.', type: 'error' });
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const client = clients.find((c) => c.id === id);
      const newStatus = client.status === 'active' ? 'inactive' : 'active';
      await axios.put(`${API_CONFIG.baseURL}/api/clients/${id}`, { status: newStatus });
      fetchClients();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const openAddEditModal = (client = null) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  const startIndex = (clientsPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <SectionHeader
        buttonName="Add Client"
        listName="Client List"
        icon={ClientSectionIcon}
        setShowAddModal={() => openAddEditModal()}
      />
      <AddEditClient
        client={selectedClient}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={fetchClients}
      />

      {alert.show && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

      <SearchBar>
        <Input
          type="text"
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => setClientsPage(1)}>Search</Button>
      </SearchBar>

      <Table>
        <thead>
          <tr>
            <Th>Slug</Th>
            <Th>Name</Th>
            <Th>Identity Number</Th>
            <Th>Address</Th>
            <Th>Phone Number</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.length > 0 ? (
            paginatedClients.map((client) => (
              <tr key={client.id}>
                <Td>{client.slug}</Td>
                <Td>{client.name}</Td>
                <Td>{client.identity_number}</Td>
                <Td>{client.address}</Td>
                <Td>{client.phone_number}</Td>
                <Td>
                  {client.status === 'active' ? (
                    <ActionButton onClick={() => handleToggleStatus(client.id)}>
                      <AiFillCheckCircle color="green" />
                      Active
                    </ActionButton>
                  ) : (
                    <ActionButton onClick={() => handleToggleStatus(client.id)}>
                      <AiFillCloseCircle color="red" />
                      Inactive
                    </ActionButton>
                  )}
                </Td>
                <Td>
                  <ActionButton onClick={() => openAddEditModal(client)}>
                    <AiFillEdit color="blue" />
                  </ActionButton>
                  <ActionButton onClick={() => handleDelete(client.id)}>
                    <AiFillDelete color="red" />
                  </ActionButton>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="7">No clients available.</Td>
            </tr>
          )}
        </tbody>
      </Table>

      <CustomPagination
        totalCount={filteredClients.length}
        itemsPerPage={itemsPerPage}
        currentPage={clientsPage}
        onPageChange={setClientsPage}
      />
    </>
  );
}

export default ClientList;
