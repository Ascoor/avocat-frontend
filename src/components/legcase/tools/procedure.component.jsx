import {useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Button, Modal, Row, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { BiPlusCircle } from "react-icons/bi";
import useAuth from "../../Auth/AuthUser";
import API_CONFIG from "../../../config";
import { BiPencil, BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
const Procedure = ({ legCaseId }) => {
    const { getUser } = useAuth();
    const [alert, setAlert] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const [procedures, setProcedures] = useState([]);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedJob, setSelectedJob] = useState("");
    const [selectedDateStart, setSelectedDateStart] = useState("");
    const [selectedDateEnd, setSelectedDateEnd] = useState("");
    const [selectedCost, setSelectedCost] = useState("");
    const [selectedCost2, setSelectedCost2] = useState("");
    const [selectedResult, setSelectedResult] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showAddProcedureModal, setShowAddProcedureModal] = useState(false);
    const [procedureTypes, setProcedureTypes] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [courts, setCourts] = useState([]);
    const [selectedProcedureType, setSelectedProcedureType] = useState("");
    const [selectedLawyer, setSelectedLawyer] = useState("");
    const [selectedCourt, setSelectedCourt] = useState("");
    const [modalMode, setModalMode] = useState("");
    const [procedureId, setProcedureId] = useState(null);
    const user = getUser();
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                await Promise.all([
                    fetchCourts(),
                    fetchLawyers(),
                    fetchProcedureTypes(),
                ]);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchProcedures = async () => {
            try {
                const response = await axios.get(
                    `${API_CONFIG.baseURL}/api/procedures/leg-case/${legCaseId}`
                );
                setProcedures(response.data);
            } catch (error) {
                console.log("خطأ في جلب إجراءات المحاكم:", error);
            }
        };

        fetchProcedures();
        fetchAllData();
    }, [legCaseId]);

    const fetchProcedures = async () => {
        try {
            const response = await axios.get(
                `${API_CONFIG.baseURL}/api/procedures/leg-case/${legCaseId}`
            );
            setProcedures(response.data);
        } catch (error) {
            console.log("خطأ في جلب إجراءات المحاكم:", error);
        }
    };

    const fetchProcedureTypes = async () => {
        try {
            const response = await axios.get(
                `${API_CONFIG.baseURL}/api/procedure_types`
            );
            setProcedureTypes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLawyers = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
            setLawyers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCourts = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/courts`);
            setCourts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditProcedure = (procedure) => {
        setModalMode("edit");
        setProcedureId(procedure.id);
        setSelectedTitle(procedure.title);
        setSelectedJob(procedure.job);
        setSelectedDateStart(procedure.date_start);
        setSelectedDateEnd(procedure.date_end);
        setSelectedCost(procedure.cost);
        setSelectedCost2(procedure.cost2);
        setSelectedResult(procedure.result);
        setSelectedProcedureType(procedure.procedure_type_id);
        setSelectedLawyer(procedure.lawyer_id);
        setSelectedCourt(procedure.court_id);
        setSelectedStatus(procedure.status); // تمت إضافة تعيين الحالة هنا

        setShowAddProcedureModal(true);
    };

    const handleDeleteProcedure = async (procedureId) => {
        try {
            await axios.delete(`${API_CONFIG.baseURL}/api/procedures/${procedureId}`);
            fetchProcedures();
            setAlert("تم حذف الإجراء بنجاح.");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } catch (error) {
            console.log("خطأ في حذف الإجراء:", error);
        }
    };

    const handleAddProcedure = async () => {
        try {
            const newProcedure = {
                title: selectedTitle,
                job: selectedJob,
                date_start: selectedDateStart,
                date_end: selectedDateEnd,
                cost: selectedCost,
                cost2: selectedCost2,
                result: selectedResult,
                procedure_type_id: selectedProcedureType,
                lawyer_id: selectedLawyer,
                court_id: selectedCourt,
                leg_case_id: legCaseId,

                created_by: user.id,
            };

            if (modalMode === "edit") {
                await axios.put(
                    `${API_CONFIG.baseURL}/api/procedures/${procedureId}`,
                    newProcedure
                );
                setAlert("تم تحديث الإجراء بنجاح.");
            } else {
                await axios.post(`${API_CONFIG.baseURL}/api/procedures`, newProcedure);
                setAlert("تم إضافة الإجراء بنجاح.");
            }

            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            fetchProcedures();
            setShowAddProcedureModal(false);
            clearFields();
        } catch (error) {
            console.log("خطأ في إضافة/تحديث الإجراء:", error);
        }
    };

    const clearFields = () => {
        setSelectedTitle("");
        setSelectedJob("");
        setSelectedDateStart("");
        setSelectedDateEnd("");
        setSelectedCost("");
        setSelectedCost2("");
        setSelectedResult("");
        setSelectedProcedureType("");
        setSelectedLawyer("");
        setSelectedCourt("");
    };

    return (
        <>
            <Row>
                {showAlert && alert && <Alert variant="success">{alert}</Alert>}
            </Row>

            <Card.Header>
                <Button
                    variant="success"
                    className="btn-sm"
                    onClick={setShowAddProcedureModal}
                >
                    <BiPlusCircle className="mr-1" />
                    إإضافة إجراء
                </Button>
            </Card.Header>

            <Card.Body>
               
            <Table striped bordered hover responsive>
                    <thead className="table-success text-center">                        <tr>
                            <th className="col-2">نوع الإجراء</th>
                            <th className="col-1">المحكمة</th>
                            <th className="col-2">الوظيفة</th>
                            <th className="col-2">تاريخ البدء</th>
                            <th className="col-2">تاريخ الانتهاء</th>
                            <th className="col-1">المحامي</th>
                            <th className="col-3">النتيجة</th>
                            <th className="col-1">الحالة</th>
                            <th className="col-2">التحكم</th>
                        </tr>
                    </thead>
                    <tbody>
                    {procedures.map((procedure) => ( // Removed the unused 'index' variable
                            <tr key={procedure.id}>
                       
                
                                <td>{procedure.procedure_type?.name}</td>
                                <td>{procedure.court?.name}</td>
                                <td>{procedure.job}</td>
                                <td>{procedure.date_start}</td>
                                <td>{procedure.date_end}</td>
                                <td>{procedure.lawyer?.name}</td>
                                <td>{procedure.result}</td>
                                <td>{procedure.status}</td>
                                <td>
                                    <span>
                                        <Button
                                            variant="info"
                                            onClick={() => handleEditProcedure(procedure)}
                                        >
                                            <BiPencil />
                                        </Button>
                                    </span>
                                    <span>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteProcedure(procedure.id)}
                                        >
                                            <BiTrash />
                                        </Button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>

            <Modal
                show={showAddProcedureModal}
                onHide={() => setShowAddProcedureModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalMode === "edit" ? "تعديل الإجراء" : "إضافة إجراء"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="procedureTitle">
                            <Form.Label>العنوان</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ادخل العنوان"
                                value={selectedTitle}
                                onChange={(e) => setSelectedTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="procedureJob">
                            <Form.Label>الوظيفة</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ادخل الوظيفة"
                                value={selectedJob}
                                onChange={(e) => setSelectedJob(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="procedureDateStart">
                            <Form.Label>تاريخ البدء</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="ادخل تاريخ البدء"
                                value={selectedDateStart}
                                onChange={(e) => setSelectedDateStart(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="procedureDateEnd">
                            <Form.Label>تاريخ الانتهاء</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="ادخل تاريخ الانتهاء"
                                value={selectedDateEnd}
                                onChange={(e) => setSelectedDateEnd(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="procedureCost">
                            <Form.Label>التكلفة</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="ادخل التكلفة"
                                value={selectedCost}
                                onChange={(e) => setSelectedCost(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="procedureCost2">
                            <Form.Label>التكلفة 2</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="ادخل التكلفة 2"
                                value={selectedCost2 | ""}
                                onChange={(e) => setSelectedCost2(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="procedureResult">
                            <Form.Label>النتيجة</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ادخل النتيجة"
                                value={selectedResult || ""}
                                onChange={(e) => setSelectedResult(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="procedureType">
                            <Form.Label>نوع الإجراء</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedProcedureType}
                                onChange={(e) => setSelectedProcedureType(e.target.value)}
                            >
                                <option value="">اختر نوع الإجراء</option>
                                {procedureTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="procedureLawyer">
                            <Form.Label>المحامي</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedLawyer}
                                onChange={(e) => setSelectedLawyer(e.target.value)}
                            >
                                <option value="">اختر المحامي</option>
                                {lawyers.map((lawyer) => (
                                    <option key={lawyer.id} value={lawyer.id}>
                                        {lawyer.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="procedureCourt">
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
                        <Form.Group controlId="procedureStatus">
                            <Form.Label>الحالة</Form.Label>
                            {modalMode === "edit" && ( // شرط للتحقق من وضع التعديل
                                <Form.Control
                                    as="select"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="">اختر الحالة</option>
                                    <option value="منتهي">منتهي</option>
                                    <option value="لم ينفذ">لم ينفذ</option>
                                    <option value="قيد التنفيذ">قيد التنفيذ</option>
                                </Form.Control>
                            )}
                            {modalMode !== "edit" && ( // شرط للتحقق من وضع الإضافة
                                <Form.Control type="text" readOnly value="قيد التنفيذ" />
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAddProcedureModal(false)}
                    >
                        إلغاء
                    </Button>
                    <Button variant="primary" onClick={handleAddProcedure}>
                        حفظ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
Procedure.propTypes = {
    legCaseId: PropTypes.string.isRequired,
  };
  
export default Procedure;
