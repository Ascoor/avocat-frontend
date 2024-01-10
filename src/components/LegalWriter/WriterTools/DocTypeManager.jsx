import React, {useEffect, useState} from 'react';
import {Button, Table, Modal} from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../../config';
import AddEditDocType from './AddEditDocType';
import AddEditDocSubType from './AddEditDocSubType';
import {AiTwotoneDelete} from 'react-icons/ai';
import {FaEdit} from 'react-icons/fa';
import {IoMdAddCircleOutline} from 'react-icons/io';
import {ImCancelCircle} from 'react-icons/im';
import {MdOutlineDoneOutline} from 'react-icons/md';
const DocTypeManager = ({ docTypes, docSubTypes}) => {

  const [currentDocType, setCurrentDocType] = useState(null);
  const [currentDocSubType, setCurrentDocSubType] = useState(null);
  const [showDocTypeModal, setShowDocTypeModal] = useState(false);
  const [showDocSubTypeModal, setShowDocSubTypeModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
const [updateDocTypes] = useState(docTypes);
  // Fetch docTypes from the server
  useEffect(() => {
   
  }, []);

  // Show modals
  const handleShowDocTypeModal = () => setShowDocTypeModal(true);
  const handleShowDocSubTypeModal = () => setShowDocSubTypeModal(true);
  // Handle add   
  const handleAddDocType = () => {
    setCurrentDocType(null);
    handleShowDocTypeModal();
  }

  // Handle Add DocSubType
  const handleAddDocSubType = () => {
    setCurrentDocSubType(null);
    handleShowDocSubTypeModal();
  }
  
  // Handle Edit DocType
  const handleEditDocType = (docType) => {
    setCurrentDocType(docType);
    handleShowDocTypeModal();
  }

  // Handle Edit DocSubType
  const handleEditDocSubType = (subType) => {
    setCurrentDocSubType(subType);
    handleShowDocSubTypeModal();
  };

  // Handle deletion confirmation
  const handleConfirmDelete = (docType) => {
    setCurrentDocType(docType);
    setShowAlert(true);
  };

  // Handle deletion of document type
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_CONFIG.baseURL}/api/doc-types/${currentDocType.id}`,
      );
      
      const updatedDocTypes = docTypes.filter((docType) => docType.id !== currentDocType.id);
      // استخدام الوظيفة التي تمررها كخاصية من القمة لتحديث قائمة docTypes
      updateDocTypes(updatedDocTypes);
      
      setShowAlert(false);
       // إعادة تحميل البيانات بعد الحذف
    } catch (error) {
      console.error('Error deleting doc type:', error);
    }
  };
  // Render Document Type Table
  const renderDocTypeTable = () => {
    return (
      <Table className="special-table" striped bordered hover>
        <thead>
          <tr>
            <th>تصنيف</th>
            <th>التحكم</th>
          </tr>
        </thead>
        <tbody>
          {docTypes.map((docType) => (
            <tr key={docType.id}>
              <td>{docType.name}</td>

              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditDocType(docType)}
                >
                  <FaEdit />
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleConfirmDelete(docType)}
                >
                  <AiTwotoneDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  // Render Document Sub-Type Table
  const renderDocSubTypeTable = () => {
    return (
      <Table className="special-table" striped bordered hover>
        <thead className="thead-dark text-center">
          <tr>
            <th>تصنيف فرعي</th>
            <th>تصنيف</th>
            <th>التحكم</th>
          </tr>
        </thead>
        <tbody>
        {docSubTypes.map((subType) => (
            <tr key={subType.id}>
              <td>{subType.name}</td>
              <td>{docTypes.find(docType => docType.id === subType.doc_type_id)?.name}</td>
              
              <td>
                <Button
                  variant="primary"
                
                  onClick={() => handleEditDocSubType(subType)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleConfirmDelete(subType)}
                >
                  <AiTwotoneDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <Button variant="success" onClick={handleAddDocType}>
        <IoMdAddCircleOutline /> إضافة تصنيف
      </Button>
      <Button variant="success" onClick={handleAddDocSubType}>
        <IoMdAddCircleOutline /> إضافة تصنيف فرعي
      </Button>
      <AddEditDocType
        showDocTypeModal={showDocTypeModal}
        handleCloseDocTypeModal={() => setShowDocTypeModal(false)}
        docType={currentDocType}
        setDocType={setCurrentDocType}
      />
      <AddEditDocSubType
        showDocSubTypeModal={showDocSubTypeModal}
        handleCloseDocSubTypeModal={() => setShowDocSubTypeModal(false)}
        currentDocSubType={currentDocSubType}
        setCurrentDocSubType={setCurrentDocSubType}
        docTypes={docTypes}
      />

      {renderDocTypeTable()}
      {renderDocSubTypeTable()}
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>هل أنت متأكد أنك تريد حذف هذا العنصر؟</h5>
          <div className="buttons">
            <Button variant="danger" onClick={handleDelete}>
              <MdOutlineDoneOutline /> نعم
            </Button>
            <Button variant="secondary" onClick={() => setShowAlert(false)}>
              <ImCancelCircle /> لا
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DocTypeManager;
