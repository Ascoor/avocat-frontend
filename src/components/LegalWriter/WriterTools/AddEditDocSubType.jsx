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
    // حالات لحفظ نوع التصنيف المختار واسم التصنيف الفرعي
    const [selectedDocType, setSelectedDocType] = useState('');
    const [name, setName] = useState('');
  
    // تحديد إذا كان المستخدم يقوم بالتعديل بدلاً من الإضافة
    const isEditing = !!currentDocSubType;
  
    // تحديث الحالات عند تغيير currentDocSubType
    useEffect(() => {
      if (isEditing) {
        setName(currentDocSubType.name);
        setSelectedDocType(currentDocSubType.docTypeId);
      } else {
        setName('');
        setSelectedDocType('');
      }
    }, [isEditing, currentDocSubType]);
  
    // دالة للتعامل مع إرسال النموذج
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          name,
          docTypeId: selectedDocType
        };
        if (isEditing) {
          // تحديث التصنيف الفرعي
          await axios.put(
            `${API_CONFIG.baseURL}/api/doc-sub-types/${currentDocSubType.id}`,
            payload,
          );
        } else {
          // إضافة تصنيف فرعي جديد
          const response = await axios.post(
            `${API_CONFIG.baseURL}/api/doc-sub-types`,
            payload,
          );
          setCurrentDocSubType(response.data);
        }
        handleCloseDocSubTypeModal(); // إغلاق النافذة المنبثقة بعد الإرسال
      } catch (error) {
        console.error(`Error ${isEditing ? 'updating' : 'adding'} DocSubType:`, error);
        // يمكن إضافة معالجة الأخطاء هنا
      }
    };
  
    return (
      <Modal show={showDocSubTypeModal} onHide={handleCloseDocSubTypeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Document Sub-Type' : 'Add Document Sub-Type'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="docTypeName">
              <Form.Label>Select Document Type</Form.Label>
              <Form.Control as="select" value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value)}>
                <option value="">Select a Document Type</option>
                {docTypes.map((docType) => (
                  <option key={docType.id} value={docType.id}>{docType.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="docSubTypeName">
              <Form.Label>Document Sub-Type Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">{isEditing ? 'Update' : 'Add'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  
  export default AddEditDocSubType;