import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import API_CONFIG from '../../../config.js';

const AddEditDocType = ({ 
  showDocTypeModal, 
  handleCloseDocTypeModal, 
  currentDocType, 
  setCurrentDocType 
}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(currentDocType ? currentDocType.name : '');
  }, [currentDocType]);
  
  const isEditing = !!currentDocType;
  const title = isEditing ? 'Edit Document Type' : 'Add Document Type';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name };
      let response;
      if (isEditing) {
        response = await axios.put(`${API_CONFIG.baseURL}/api/doc-types/${currentDocType.id}`, payload);
      } else {
        response = await axios.post(`${API_CONFIG.baseURL}/api/doc-types`, payload);
      }

      setCurrentDocType(response.data);
      handleCloseDocTypeModal();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} DocType:`, error);
      handleCloseDocTypeModal();
    }
  };

  return (
    <Modal show={showDocTypeModal} onHide={handleCloseDocTypeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="docTypeName">
            <Form.Label>DocType Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditDocType;