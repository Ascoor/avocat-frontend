import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../../config';

const AddEditDocSubType = ({
  docTypes,
  showDocSubTypeModal,
  handleCloseDocSubTypeModal,
  currentDocSubType,
  setCurrentDocSubType,
}) => {
  const [selectedDocType, setSelectedDocType] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (currentDocSubType) {
      setName(currentDocSubType.name);
      setSelectedDocType(currentDocSubType.docTypeId); // تحديد نوع المستند المختار عند التحرير
    } else {
      setName('');
      setSelectedDocType(''); // إعادة تعيين نوع المستند المختار عند الإضافة
    }
  }, [currentDocSubType]);

  const isEditing = !!currentDocSubType;
  const title = isEditing ? 'تحرير تصنيف فرعي للمستند' : 'إضافة تصنيف فرعي للمستند';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, docTypeId: selectedDocType };
      let response;
      if (isEditing) {
        response = await axios.put(`${API_CONFIG.baseURL}/api/doc-sub-types/${currentDocSubType.id}`, payload);
      } else {
        response = await axios.post(`${API_CONFIG.baseURL}/api/doc-sub-types`, payload);
      }

      setCurrentDocSubType(response.data);
      handleCloseDocSubTypeModal();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} DocSubType:`, error);
      handleCloseDocSubTypeModal();
    }
  };

  return (
    <Modal show={showDocSubTypeModal} onHide={handleCloseDocSubTypeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="docSubTypeName">
            <Form.Label>اسم التصنيف الفرعي للمستند</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="docTypeName">
            <Form.Label>اختر نوع المستند</Form.Label>
            <Form.Control as="select" value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)}>
              <option value="">اختر نوع المستند</option>
              {docTypes.map((docType) => (
                <option key={docType.id} value={docType.id}>
                  {docType.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditing ? 'تحديث' : 'إضافة'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditDocSubType;
