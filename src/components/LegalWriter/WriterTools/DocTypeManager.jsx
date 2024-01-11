import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../../config';
import AddEditDocType from './AddEditDocType';
import AddEditDocSubType from './AddEditDocSubType';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { ImCancelCircle } from 'react-icons/im';
import { MdOutlineDoneOutline } from 'react-icons/md';

const DocTypeManager = ({ fetchDocTypes, docTypes, docSubTypes }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubType, setIsSubType] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchDocTypes();
  }, []);

  const handleShowModal = (item, isSubType = false) => {
    setCurrentItem(item);
    setIsSubType(isSubType);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentItem(null);
    setIsSubType(false);
    fetchDocTypes();
  };

  const handleConfirmDelete = (item) => {
    setShowAlert(true);
    setCurrentItem(item);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/${isSubType ? 'doc-sub-types' : 'doc-types'}/${currentItem.id}`);
     
      setShowAlert(false);
      fetchDocTypes();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const renderTable = (items, isSubType) => (
    <Table className="special-table" striped bordered hover>
      <thead>
        <tr>
          <th>{isSubType ? 'تصنيف فرعي' : 'تصنيف'}</th>
          {isSubType && <th>تصنيف</th>}
          <th>التحكم</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            {isSubType && <td>{docTypes.find((docType) => docType.id === item.doc_type_id)?.name}</td>}
            <td>
              <Button variant="primary" onClick={() => handleShowModal(item, isSubType)}>
                <FaEdit />
              </Button>
              <Button variant="danger" onClick={() => handleConfirmDelete(item)}>
                <AiTwotoneDelete />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div>
      <Button variant="success" onClick={() => handleShowModal(null)}>
        <IoMdAddCircleOutline /> إضافة تصنيف
      </Button>
      <Button variant="success" onClick={() => handleShowModal(null, true)}>
        <IoMdAddCircleOutline /> إضافة تصنيف فرعي
      </Button>

      {renderTable(docTypes, false)}
      {renderTable(docSubTypes, true)}

      <AddEditDocType
        showDocTypeModal={showModal && !isSubType}
        handleCloseDocSubTypeModal={handleModalClose}
        currentDocSubType={currentItem}
        setCurrentDocSubType={setCurrentItem}
      />
<AddEditDocSubType
  docTypes={docTypes}
  showDocSubTypeModal={showModal && isSubType}
  handleCloseDocSubTypeModal={handleModalClose}
  currentDocSubType={currentItem}
  setCurrentDocSubType={setCurrentItem}
/>


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