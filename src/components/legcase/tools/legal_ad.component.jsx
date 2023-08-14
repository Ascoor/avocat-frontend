
import {useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import DatePicker from 'react-datepicker';
import arEG from "date-fns/locale/ar-EG";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import useAuth from "../../Auth/AuthUser";
import API_CONFIG from "../../../config";
import PropTypes from "prop-types";

registerLocale("ar_eg", arEG);
setDefaultLocale("ar_eg");

const LegalAd = ({ legCaseId }) => {
    LegalAd.propTypes = {
        legCaseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      };
      
    
    const { getUser } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(null);
    const [showAddLegalAdModal, setShowAddLegalAdModal] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [legalAdId, setLegalAdId] = useState(null);
    const [legalAds, setLegalAds] = useState([]);
    const [courts, setCourts] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [legalAdTypes, setLegalAdTypes] = useState([]);
    const [selectedSendDate, setSelectedSendDate] = useState(null);
    const [selectedRecivedDate, setSelectedRecivedDate] = useState(null);
    const [selectedSendLawyer, setSelectedSendLawyer] = useState("");
    const [selectedLegalAd, setSelectedLegalAd] = useState(null);
    const [selectedRecivedLawyer, setSelectedRecivedLawyer] = useState("");
    const [selectedResults, setSelectedResults] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");
    const [selectedCourt, setSelectedCourt] = useState("");
    const [selectedLegalAdType, setSelectedLegalAdType] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCost, setSelectedCost] = useState("");
    const [selectedCost2, setSelectedCost2] = useState("");
    const user = getUser();

    useEffect(() => {
        fetchLegalAds(legCaseId);
        fetchCourts();
        fetchLawyers();
        fetchLegalAdTypes();
    }, [legCaseId]);

    const fetchLegalAds = async (legCaseId) => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/legal_ads?legCaseId=${legCaseId}`);
            setLegalAds(response.data);
        } catch (error) {
            console.log("خطأ في جلب الاعلانات القانونية:", error);
        }
    };

    const fetchCourts = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/courts`);
            setCourts(response.data);
        } catch (error) {
            console.log("خطأ في جلب المحاكم:", error);
        }
    };

    const fetchLawyers = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
            setLawyers(response.data);
        } catch (error) {
            console.log("خطأ في جلب المحامين:", error);
        }
    };

    const fetchLegalAdTypes = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/legal_ad_types`);
            setLegalAdTypes(response.data);
        } catch (error) {
            console.log("خطأ في جلب أنواع الإعلانات القانونية:", error);
        }
    };

    const handleAddLegalAd = () => {
        setModalMode("add");
        setShowAddLegalAdModal(true);
    }; const handleEditLegalAd = (legalAd) => {
        setModalMode("edit");
        setLegalAdId(legalAd.id);
        setSelectedSendDate(legalAd.sendDate ? new Date(legalAd.sendDate) : null);
        setSelectedRecivedDate(legalAd.receive_date ? new Date(legalAd.receive_date) : null);
        setSelectedSendLawyer(legalAd.sendLawyer);
        setSelectedLegalAd(legalAd.legalAd);
        setSelectedRecivedLawyer(legalAd.lawyer_receive_id);
        setSelectedResults(legalAd.results);
        setSelectedDescription(legalAd.description);
        setSelectedCourt(legalAd.courtId);
        setSelectedCost(legalAd.cost);
        setSelectedCost2(legalAd.cost2);
        setSelectedLegalAdType(legalAd.legalAdTypeId);
        setSelectedStatus(legalAd.status);
        setShowAddLegalAdModal(true);
    };

    const handleDeleteLegalAd = async (legalAdId) => {
        try {
            await axios.delete(`${API_CONFIG.baseURL}/api/legal_ads/${legalAdId}`);
            fetchLegalAds(legCaseId);
            showAlertMessage("تم حذف الاعلان القانوني بنجاح.", "success");
        } catch (error) {
            console.log("خطأ في حذف الاعلان القانوني:", error);
        }
    };

    const handleModalClose = () => {
        setShowAddLegalAdModal(false);
        setLegalAdId(null);
        setSelectedSendDate(null);
        setSelectedRecivedDate(null);
        setSelectedSendLawyer("");
        setSelectedLegalAd(null);
        setSelectedRecivedLawyer("");
        setSelectedResults("");
        setSelectedDescription("");
        setSelectedCourt("");
        setSelectedLegalAdType("");
        setSelectedStatus("");
    };

    const handleModalSave = async () => {
        if (modalMode === "add") {
            try {
                const formattedSendDate = selectedSendDate ? selectedSendDate.toISOString().split('T')[0] : null;

                await axios.post(`${API_CONFIG.baseURL}/api/legal_ads`, {
                    send_date: formattedSendDate,

                    lawyer_send_id: selectedSendLawyer,

                    cost: selectedCost,
                    description: selectedDescription,
                    court_id: selectedCourt,
                    legal_ad_type_id: selectedLegalAdType,
                    status: selectedStatus,
                    leg_case_id: legCaseId,
                    created_by: user.id
                });
                fetchLegalAds(legCaseId);
                handleModalClose();
                showAlertMessage("تمت إضافة الاعلان القانوني بنجاح.", "success");
            } catch (error) {
                console.log("خطأ في إضافة الاعلان القانوني:", error);
            }
        } else if (modalMode === "edit") {
            try {

                const formattedRecivedDate = selectedRecivedDate ? selectedRecivedDate.toISOString().split('T')[0] : null;

                await axios.put(`${API_CONFIG.baseURL}/api/legal_ads/${legalAdId}`, {

                    receive_date: formattedRecivedDate,

                    legal_ad_id: selectedLegalAd,
                    lawyer_receive_id: selectedRecivedLawyer,
                    results: selectedResults,
                    cost: selectedCost,
                    cost2: selectedCost2,
                    status: selectedStatus,
                    leg_case_id: legCaseId,
                    updated_by: user.id

                });
                fetchLegalAds(legCaseId);
                handleModalClose();
                showAlertMessage("تم تعديل الاعلان القانوني بنجاح.", "success");
            } catch (error) {
                console.log("خطأ في تعديل الاعلان القانوني:", error);
            }
        }
    };

    const showAlertMessage = (message, type) => {
        setAlert({ message, type });
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };

    return (
        <>
            {showAlert && (
                <Alert variant={alert.type} onClose={() => setShowAlert(false)} dismissible>
                    {alert.message}
                </Alert>
            )}

            <Card.Header>


                <Button variant="success" className="btn-sm" onClick={handleAddLegalAd}>
                    <BiPlusCircle className="mr-1" />
                    إضافة إعلان قانوني
                </Button>

            </Card.Header>
            <Card.Body>
              
            <Table striped bordered hover responsive>
                    <thead className="table-success text-center">                        <tr>
                            <th>نوع الإعلان القانوني</th>
                            <th>تاريخ التسليم</th>
                            <th>تاريخ الإستلام</th>
                            <th>المحامي المسلم</th>
                            <th>المحامي المستلم</th>

                            <th>الحالة</th>

                            <th className="text-center">ألتحكم</th>



                        </tr>
                    </thead>
                    <tbody>
                        {legalAds.map((legalAd) => (
                            <tr key={legalAd.id}>
                                <td>{legalAd.legal_ad_type?.name}</td>
                                <td>{legalAd.send_date}</td>
                                <td>{legalAd.receive_date}</td>
                                <td>{legalAd.lawyer_send?.name}</td>
                                <td>{legalAd.lawyer_receive?.name}</td>
                                <td>{legalAd.status}</td>

                                <td className="text-center">
                                    <Button variant="info" className="btn-sm" onClick={() => handleEditLegalAd(legalAd)}>
                                        <BiPencil />
                                    </Button>

                                    <Button variant="danger" className="btn-sm" onClick={() => handleDeleteLegalAd(legalAd.id)}>
                                        <BiTrash />
                                    </Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>


            <Modal show={showAddLegalAdModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalMode === "add" && "إضافة إعلان قانوني"}
                        {modalMode === "edit" && "تعديل إعلان قانوني"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* حقول إضافة الإعلان القانوني */}
                        {modalMode === "add" && (
                            <>
                                <Form.Group controlId="legalAdType">
                                    <Form.Label>نوع الإعلان</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedLegalAdType}
                                        onChange={(e) => setSelectedLegalAdType(e.target.value)}
                                    >
                                        <option value="">اختر نوع الإعلان</option>
                                        {legalAdTypes.map((adType) => (
                                            <option key={adType.id} value={adType.id}>
                                                {adType.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="court">
                                    <Form.Label>المحكمة</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedCourt}
                                        onChange={(e) => setSelectedCourt(e.target.value)}
                                    >
                                        <option value="">اختر المحكمة</option>
                                        {courts.map((court) => (
                                            <option key={court.id} value={court.id}>
                                                {court.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>الوصف</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={selectedDescription}
                                        onChange={(e) => setSelectedDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="sendDate">
                                    <Form.Label>تاريخ الإرسال</Form.Label>
                                    <br />
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                        selected={selectedSendDate}
                                        onChange={(date) => setSelectedSendDate(date)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="legalAdCost">
                                    <Form.Label>التكلفة</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="ادخل التكلفة"
                                        value={selectedCost}
                                        onChange={(e) => setSelectedCost(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="sendLawyer">
                                    <Form.Label>المحامي المرسل</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedSendLawyer}
                                        onChange={(e) => setSelectedSendLawyer(e.target.value)}
                                        required
                                    >
                                        <option value="">اختر المحامي</option>
                                        {lawyers.map((lawyer) => (
                                            <option key={lawyer.id} value={lawyer.id}>
                                                {lawyer.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </>
                        )}

                        {modalMode === "edit" && (
                            <>
                                <Form.Group controlId="recivedDate">
                                    <Form.Label>تاريخ الاستلام</Form.Label>
                                    <br />
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                        selected={selectedRecivedDate}
                                        onChange={(date) => setSelectedRecivedDate(date)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="legalAdCost2">
                                    <Form.Label>التكلفة 2</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="ادخل التكلفة 2"
                                        value={selectedCost2 | ""}
                                        onChange={(e) => setSelectedCost2(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="status">
                                    <Form.Label>الحالة</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        <option value="">اختر الحالة</option>
                                        <option value="قيد التجهيز">قيد التجهيز</option>
                                        <option value="تم التسليم">تم التسليم</option>
                                        <option value="تم الإستلام">تم الإستلام</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="recivedLawyer">
                                    <Form.Label>المحامي المستلم</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedRecivedLawyer}
                                        onChange={(e) => setSelectedRecivedLawyer(e.target.value)}
                                    >
                                        <option value="">اختر المحامي</option>
                                        {lawyers.map((lawyer) => (
                                            <option key={lawyer.id} value={lawyer.id}>
                                                {lawyer.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>النتيجة</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={selectedResults}
                                        onChange={(e) => setSelectedResults(e.target.value)}
                                    />
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalSave}>
                            إلغاء
                        </Button>
                        <Button variant="primary" onClick={handleModalSave}>
                            {modalMode === "edit" ? "تعديل" : "حفظ"}
                        </Button>

                    </Modal.Footer>
                </Modal.Footer>
            </Modal>

        </ >
    );
};

export default LegalAd;
