import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LawyerIcon } from '../../assets/icons';
import LawyerAddEdit from './lawyerAddEdit';
import API_CONFIG from '../../config';
import SectionHeader from '../home_tools/SectionHeader';

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
      setLawyers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddLawyer = async (formData) => {
    try {
      await axios.post(`${API_CONFIG.baseURL}/api/lawyers`, formData);
      await fetchLawyers();
      setShowAddModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditLawyer = async (formData) => {
    try {
      await axios.put(
        `${API_CONFIG.baseURL}/api/lawyers/${selectedLawyer.id}`,
        formData,
      );
      await fetchLawyers();
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLawyer = async (lawyerId) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/lawyers/${lawyerId}`);
      await fetchLawyers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowEditModal = (selectedLawyer) => {
    setSelectedLawyer({
      ...selectedLawyer,
      birthdate: selectedLawyer.birthdate
        ? new Date(selectedLawyer.birthdate)
        : null,
    });
    setShowEditModal(true);
  };

  return (
    <>
      <SectionHeader
        listName="المحامين"
        buttonName="محامي"
        setShowAddModal={setShowAddModal} // pass setShowAddModal function
        icon={LawyerIcon}
      />

      <Card className="m-4">
        <Card.Header></Card.Header>
        <div className="table-responsive">
          <table className="special-table">
            <thead className="table-info">
              <tr>
                <th>الاسم</th>
                <th>تاريخ الميلاد</th>
                <th>رقم الهوية</th>
                <th>رقم تسجيل المحاماة</th>
                <th>فئة المحامي</th>
                <th>البريد الإلكتروني</th>
                <th>رقم الهاتف</th>
                <th>التحكم</th>
              </tr>
            </thead>
            <tbody>
              {lawyers.map((lawyer) => (
                <tr key={lawyer.id}>
                  <td>{lawyer.name}</td>
                  <td>{lawyer.birthdate}</td>
                  <td>{lawyer.identity_number}</td>
                  <td>{lawyer.law_reg_num}</td>
                  <td>{lawyer.lawyer_class}</td>
                  <td>{lawyer.email}</td>
                  <td>{lawyer.phone_number}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleShowEditModal(lawyer)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteLawyer(lawyer.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>إضافة محامي</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LawyerAddEdit onSubmit={handleAddLawyer} />
          </Modal.Body>
        </Modal>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>تعديل محامي</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LawyerAddEdit
              onSubmit={handleEditLawyer}
              initialValues={selectedLawyer}
            />
          </Modal.Body>
        </Modal>
      </Card>
    </>
  );
};

export default Lawyers;
