import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import styled from 'styled-components';
import API_CONFIG from '../../../config';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#007BFF' : '#6C757D')};
  color: white;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#5a6268')};
  }
`;

function AddEditClient({ client = {}, isOpen, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    slug: client?.slug ?? '',
    name: client?.name ?? '',
    gender: client?.gender ?? '',
    identity_number: client?.identity_number ?? '',
    date_of_birth: client?.date_of_birth
      ? moment(client.date_of_birth).toDate()
      : new Date(),
    address: client?.address ?? '',
    religion: client?.religion ?? '',
    work: client?.work ?? '',
    email: client?.email ?? '',
    phone_number: client?.phone_number ?? '',
    emergency_number: client?.emergency_number ?? '',
  });

  useEffect(() => {
    setFormData({
      ...formData,
      slug: client?.slug ?? '',
      name: client?.name ?? '',
      gender: client?.gender ?? '',
      identity_number: client?.identity_number ?? '',
      date_of_birth: client?.date_of_birth
        ? moment(client.date_of_birth).toDate()
        : new Date(),
      address: client?.address ?? '',
      religion: client?.religion ?? '',
      work: client?.work ?? '',
      email: client?.email ?? '',
      phone_number: client?.phone_number ?? '',
      emergency_number: client?.emergency_number ?? '',
    });
  }, [client]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = {
        ...formData,
        date_of_birth: formData.date_of_birth
          ? moment(formData.date_of_birth).format('YYYY-MM-DD')
          : null,
      };

      if (client.id) {
        await axios.put(
          `${API_CONFIG.baseURL}/api/clients/${client.id}`,
          clientData
        );
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/clients`, clientData);
      }
      onSaved();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <h2>{client?.id ? 'Edit Client' : 'Add Client'}</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="inputSlug">Client Slug</Label>
            <Input
              type="text"
              id="inputSlug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="inputName">Name</Label>
            <Input
              type="text"
              id="inputName"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          {/* Other fields follow the same structure */}
          <FormGroup>
            <Label htmlFor="inputDateOfBirth">Date of Birth</Label>
            <DatePicker
              selected={formData.date_of_birth}
              onChange={handleDateChange}
              id="inputDateOfBirth"
            />
          </FormGroup>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button primary type="submit">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </Overlay>
  );
}

export default AddEditClient;
