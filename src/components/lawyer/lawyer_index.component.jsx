import {useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Card, Row, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import {LawyerIcon} from '../../assets/icons';
import LawyerAddEdit from "./lawyerForm.component";
import API_CONFIG from "../../config";


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
                `${API_CONFIG.baseURL}/api/lawyers/${formData.id}`,
                formData
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

    const handleShowEditModal = (lawyer) => {
        setSelectedLawyer(lawyer);
        setShowEditModal(true);
    };

    return (
        <Card>
            <Card.Header className="text-center">
                <Row>
                    <div className="court-setting-card-header">

                        إعدادات المحامين
                        <img src={LawyerIcon} alt="Icon" className="court-icon" />

                    </div>
                </Row>

            </Card.Header>
            <Card.Body>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    اضافة محامى
                </Button>
                <Table striped bordered responsive className="rtl-table">
                     <thead className="table-success">
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
                </Table>

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
            </Card.Body>
        </Card>
    );
};

export default Lawyers;