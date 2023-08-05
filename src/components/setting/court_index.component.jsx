import React, { useState, useEffect } from "react";
import {CourtIcon} from '../../assets/icons';
import {
    Row,
    Col,
    Button,
    Modal,
    Form,
    Card,
    Alert,
    ButtonGroup,
    Pagination,
} from "react-bootstrap";
import API_CONFIG from "../../config";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { FcFullTrash } from 'react-icons/fc';

const CourtSetting = () => {
    // Court Type data (replace with actual data from API or state)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteItem, setDeleteItem] = useState({});
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [selectedCourtTypeId, setSelectedCourtTypeId] = useState("");

    const [courtTypes, setCourtTypes] = useState([]);
    const [courtSubTypes, setCourtSubTypes] = useState([]);
    const [courtLevels, setCourtLevels] = useState([]);
    const [courts, setCourts] = useState([]);

    const [showAddCourtTypeModal, setShowAddCourtTypeModal] = useState(false);
    const [showAddCourtSubTypeModal, setShowAddCourtSubTypeModal] =
        useState(false);
    const [showAddCourtLevelModal, setShowAddCourtLevelModal] = useState(false);
    const [showAddCourtModal, setShowAddCourtModal] = useState(false);
    const [newCourtTypeName, setNewCourtTypeName] = useState("");
    const [newCourtSubTypeName, setNewCourtSubTypeName] = useState("");
    const [newCourtLevelName, setNewCourtLevelName] = useState("");
    const [newCourtName, setNewCourtName] = useState("");
    const [newCourtTypeId, setNewCourtTypeId] = useState("");
    const [newCourtSubTypeId, setNewCourtSubTypeId] = useState("");
    const [newCourtLevelId, setNewCourtLevelId] = useState("");
    const [newCourtAddress, setNewCourtAddress] = useState("");
    const [error, setError] = useState(null);
    const [courtTypesPage, setCourtTypesPage] = useState(1);
    const [courtLevelsPage, setCourtLevelsPage] = useState(1);
    const [courtSubTypesPage, setCourtSubTypesPage] = useState(1);
    const [courtTypeSubTypes, setCourtTypeSubTypes] = useState(1);
    const [courtsPage, setCourtsPage] = useState(1);
    const itemsPerPage = 30;

    useEffect(() => {
        const fetchCourtTypeSubTypes = async () => {
            try {
                const response = await axios.get(
                    `${API_CONFIG.baseURL}/api/court-types/${selectedCourtTypeId}`
                );
                setCourtTypeSubTypes(response.data);
            } catch (error) {
                setError("حدث خطأ في استرجاع أنواع المحاكم الفرعية");
                console.error("حدث خطأ في استرجاع أنواع المحاكم الفرعية: ", error);
            }
        };

        if (selectedCourtTypeId !== "") {
            fetchCourtTypeSubTypes();
        } else {
            setCourtTypeSubTypes([]);
        }
    }, [selectedCourtTypeId]);

    const fetchCourtTypes = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/court_types/`);
            setCourtTypes(response.data);
        } catch (error) {
            setError("حدث خطأ في استرجاع أنواع المحاكم");
            console.error("حدث خطأ في استرجاع أنواع المحاكم: ", error);
        }
    };

    const fetchCourtSubTypes = async () => {
        try {
            const response = await axios.get(
                `${API_CONFIG.baseURL}/api/court_sub_types/`
            );
            setCourtSubTypes(response.data);
        } catch (error) {
            setError("حدث خطأ في استرجاع أنواع المحاكم الفرعية");
            console.error("حدث خطأ في استرجاع أنواع المحاكم الفرعية: ", error);
        }
    };

    const fetchCourtLevels = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/court_levels/`);
            setCourtLevels(response.data);
        } catch (error) {
            setError("حدث خطأ في استرجاع مستويات المحاكم");
            console.error("حدث خطأ في استرجاع مستويات المحاكم: ", error);
        }
    };

    const fetchCourts = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.baseURL}/api/courts/`);
            setCourts(response.data);
        } catch (error) {
            setError("حدث خطأ في استرجاع المحاكم");
            console.error("حدث خطأ في استرجاع المحاكم: ", error);
        }
    };

    useEffect(() => {
        fetchCourtSubTypes();
        fetchCourtTypes();
        fetchCourts();
        fetchCourtLevels();
    }, []);

    const handleCourtTypeChange = (e) => {
        const selectedTypeId = e.target.value;
        setSelectedCourtTypeId(selectedTypeId);
        setNewCourtTypeId(selectedTypeId);
    };

    const handleCourtTypesPageChange = (page) => {
        setCourtTypesPage(page);
    };

    const handleCourtLevelsPageChange = (page) => {
        setCourtLevelsPage(page);
    };

    const handleCourtSubTypesPageChange = (page) => {
        setCourtSubTypesPage(page);
    };

    const handleCourtsPageChange = (page) => {
        setCourtsPage(page);
    };

    const PaginationComponent = ({
        items,
        itemsPerPage,
        currentPage,
        onPageChange,
    }) => {
        const totalPages = Math.ceil(items.length / itemsPerPage);

        const handleClick = (page) => {
            if (typeof onPageChange === "function") {
                onPageChange(page);
            }
        };

        return (
            <Pagination>
                <Pagination.Prev
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handleClick(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        );
    };

    const handleAddCourtSubType = () => {
        fetch(`${API_CONFIG.baseURL}/api/court_sub_types/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                court_type_id: newCourtTypeId,
                name: newCourtSubTypeName,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                fetchCourtSubTypes();
                setShowAddCourtSubTypeModal(false);
                setNewCourtSubTypeName("");
                setNewCourtTypeId("");
                setShowAlert(true);
                setAlertMessage("تمت إضافة نوع المحكمة الفرعية بنجاح.");
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            })
            .catch((error) => {
                setError("حدث خطأ في إضافة نوع المحكمة الفرعية");
                console.error("حدث خطأ في إضافة نوع المحكمة الفرعية: ", error);
                setShowAlert(true);
                setAlertMessage("فشل في إضافة نوع المحكمة الفرعية.");
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            });
    };

    const handleAddCourtLevel = () => {
        fetch(`${API_CONFIG.baseURL}/api/court_levels`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newCourtLevelName,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                fetchCourtLevels();
                setShowAddCourtLevelModal(false);
                setNewCourtLevelName("");
                setShowAlert(true);
                setAlertMessage("تمت إضافة مستوى المحكمة بنجاح.");
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            })
            .catch((error) => {
                setError("حدث خطأ في إضافة مستوى المحكمة");
                console.error("حدث خطأ في إضافة مستوى المحكمة: ", error);
                setShowAlert(true);
                setAlertMessage("فشل في إضافة مستوى المحكمة.");
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            });
    };

    const handleAddCourt = () => {
        fetch(`${API_CONFIG.baseURL}/api/courts/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courtTypeId: newCourtTypeId,
                courtSubTypeId: newCourtSubTypeId,
                courtLevelId: newCourtLevelId,
                name: newCourtName,
                address: newCourtAddress,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                fetchCourts();
                setShowAddCourtModal(false);
                setNewCourtName("");
                setNewCourtTypeId("");
                setNewCourtSubTypeId("");
                setNewCourtLevelId("");
                setNewCourtAddress("");
                setShowAlert(true);
                setAlertMessage("تمت إضافة المحكمة بنجاح.");
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            })
            .catch((error) => {
                setError("حدث خطأ في إضافة المحكمة");
                console.error("حدث خطأ في إضافة المحكمة: ", error);
                setShowAlert(true);
                setAlertMessage("فشل في إضافة المحكمة.");
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            });
    };

    const handleAddCourtType = () => {
        fetch(`${API_CONFIG.baseURL}/api/court_types/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newCourtTypeName,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                fetchCourtTypes();
                setShowAddCourtTypeModal(false);
                setNewCourtTypeName("");
                setShowAlert(true);
                setAlertMessage("تمت إضافة نوع المحكمة بنجاح.");
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            })
            .catch((error) => {
                setError("حدث خطأ في إضافة نوع المحكمة");
                console.error("حدث خطأ في إضافة نوع المحكمة: ", error);
                setShowAlert(true);
                setAlertMessage("فشل في إضافة نوع المحكمة.");
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            });
    };

    const handleDelete = (id, value, tableName) => {
        let message = "";
        switch (tableName) {
            case "court_types":
                message = "تصنيف المحاكم";
                break;
            case "court_sub_types":
                message = "التصنيف الفرعى";
                break;
            case "court_levels":
                message = "درجة المحكمة";
                break;
            case "courts":
                message = "المحكمة";
                break;
            default:
                break;
        }

        const item = {
            id,
            value,
            tableName,
            message,
        };
        setDeleteItem(item);
        setShowConfirmationModal(true);
    };
    const handleConfirmDelete = () => {
        const { id, value, tableName, message } = deleteItem;

        fetch(`${API_CONFIG.baseURL}/api/${tableName}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                value: value,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    setDeleteSuccess(true);
                    setDeleteError(false);

                    fetchCourts();
                    fetchCourtTypes();
                    fetchCourtSubTypes();
                    fetchCourtLevels();

                    setMessage(`Successfully deleted ${message}.`);
                    setShowMessage(true);
                } else {
                    throw new Error("فشل في عملية الDelete");
                }
            })
            .catch((error) => {
                console.error("فشل في عملية الDelete", error);
                setDeleteSuccess(false);
                setDeleteError(true);

                setMessage("Failed to delete the item.");
                setShowMessage(true);
            })
            .finally(() => {
                setTimeout(() => {
                    setShowMessage(false);
                }, 5000);
                setShowConfirmationModal(false);
            });
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };
    return (
        <div>
            <Row>

            <Row>
                <div className="court-setting-card-header">
                    إعدادات المحاكم
                    <img src={CourtIcon} alt="Icon" className="court-icon" />
                </div>

            </Row>

            <Row>
                {showAlert && (
                    <div className="alert alert-success" role="alert">
                        {alertMessage}
                        {showMessage}
                        {message}
                    </div>
                )}
                {deleteSuccess && (
                    <Alert variant="success" onClose={() => setDeleteSuccess(false)} dismissible>
                        تم  {deleteItem.tableName} "{deleteItem.value}" بنجاح.
                    </Alert>
                )}
                {deleteError && (
                    <Alert variant="danger" onClose={() => setDeleteError(false)} dismissible>
                        فشل في  {deleteItem.tableName} "{deleteItem.value}". الرجاء المحاولة مرة أخرى لاحقًا.
                    </Alert>
                )}
            </Row>
            <Col className="text-center">
                    {error && <Alert variant="danger">{error}</Alert>}

                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={() => setShowAddCourtTypeModal(true)} variant="success">
                            إضافة تصنيف المحكمة
                        </Button>

                        <Button onClick={() => setShowAddCourtLevelModal(true)} variant="warning">
                            إضافة درجة المحكمة
                        </Button>
                        <Button onClick={() => setShowAddCourtSubTypeModal(true)} variant="warning">
                            إضافة نوع فرعي للمحكمة
                        </Button>
                        <Button onClick={() => setShowAddCourtModal(true)} variant="success">
                            إضافة محكمة
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Card>
                <Card.Body className="court-index">
                    <Card>
                        <Row>
                            <Col>
                                <Card.Header style={{ backgroundColor: "beige" }} className="text-center">
                                    <h3 style={{ color: "#006e5d" }}>تصنيف المحاكم</h3>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover>
                                        <thead style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}>
                                            <tr>
                                                <th>الاسم</th>
                                                <th>الإجراءات</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courtTypes
                                                .slice((courtTypesPage - 1) * itemsPerPage, courtTypesPage * itemsPerPage)
                                                .map((courtType) => (
                                                    <tr
                                                        style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}
                                                        key={courtType.id}
                                                    >
                                                        <td>{courtType.name}</td>
                                                        <td>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() =>
                                                                    handleDelete(courtType.id, courtType.name, "court_types")
                                                                }
                                                            >
                                                                <FcFullTrash />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                                <Row>
                                    <Card.Footer>
                                        <PaginationComponent
                                            items={courtTypes}
                                            itemsPerPage={itemsPerPage}
                                            currentPage={courtTypesPage}
                                            onPageChange={handleCourtTypesPageChange}
                                        />
                                    </Card.Footer>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Card.Body>
            </Card>

            <Card>
                <Row>
                    <Col>
                        <Card.Body>
                            <Card.Header style={{ backgroundColor: "beige" }} className="text-center">
                                <h3 style={{ color: "#006e5d" }}>درجات المحاكم</h3>
                            </Card.Header>
                            <Table striped bordered hover>
                                <thead style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}>
                                    <tr style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}>
                                        <th>الاسم</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courtLevels
                                        .slice((courtLevelsPage - 1) * itemsPerPage, courtLevelsPage * itemsPerPage)
                                        .map((courtLevel) => (
                                            <tr
                                                style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}
                                                key={courtLevel.id}
                                            >
                                                <td>{courtLevel.name}</td>
                                                <td>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(courtLevel.id, courtLevel.name, "court_levels")}
                                                    >
                                                        <FcFullTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <PaginationComponent
                                items={courtLevels}
                                itemsPerPage={itemsPerPage}
                                currentPage={courtLevelsPage}
                                onPageChange={handleCourtLevelsPageChange}
                            />
                        </Card.Footer>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Row>
                    <Col>
                        <Card.Header style={{ backgroundColor: "beige" }} className="text-center">
                            <h3 style={{ color: "#006e5d" }}>أنواع المحاكم الفرعية</h3>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}>
                                    <tr style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}>
                                        <th>الاسم</th>
                                        <th>اسم نوع المحكمة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courtSubTypes
                                        .slice((courtSubTypesPage - 1) * itemsPerPage, courtSubTypesPage * itemsPerPage)
                                        .map((courtSubType) => (
                                            <tr
                                                style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}
                                                key={courtSubType.id}
                                            >
                                                <td>{courtSubType.name}</td>
                                                <td>{courtSubType.court_type.name}</td>
                                                <td>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(courtSubType.id, courtSubType.name, "court_sub_types")}
                                                    >
                                                        <FcFullTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <PaginationComponent
                                items={courtSubTypes}
                                itemsPerPage={itemsPerPage}
                                currentPage={courtSubTypesPage}
                                onPageChange={handleCourtSubTypesPageChange}
                            />
                        </Card.Footer>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Card.Header style={{ backgroundColor: 'beige' }} className="text-center">
                    <h3 style={{ color: '#006e5d' }}>المحاكم</h3>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Table responsive striped bordered hover>
                                <thead style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}>
                                    <tr>
                                        <th>الاسم</th>
                                        <th>النوع</th>
                                        <th>النوع الفرعي</th>
                                        <th>المستوى</th>
                                        <th>العنوان</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courts
                                        .slice((courtsPage - 1) * itemsPerPage, courtsPage * itemsPerPage)
                                        .map((court) => (
                                            <tr style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }} key={court.id}>
                                                <td>{court.name}</td>
                                                <td>{court.court_type.name}</td>
                                                <td>{court.court_sub_type.name}</td>
                                                <td>{court.court_level.name}</td>
                                                <td>{court.address}</td>
                                                <td>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(court.id, court.name, "courts")}
                                                    >

                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <PaginationComponent
                                items={courts}
                                itemsPerPage={itemsPerPage}
                                currentPage={courtsPage}
                                onPageChange={handleCourtsPageChange}
                            />
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
            <Modal
                show={showAddCourtTypeModal}
                onHide={() => setShowAddCourtTypeModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>إضافة نوع المحكمة</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courtTypeName">
                            <Form.Label>اسم نوع المحكمة:</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourtTypeName}
                                onChange={(e) => setNewCourtTypeName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAddCourtTypeModal(false)}
                    >
                        إغلاق
                    </Button>
                    <Button variant="primary" onClick={handleAddCourtType}>
                        إضافة نوع المحكمة
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAddCourtSubTypeModal}
                onHide={() => setShowAddCourtSubTypeModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>إضافة نوع المحكمة الفرعي</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courtTypeId">
                            <Form.Label>نوع المحكمة:</Form.Label>
                            <Form.Control
                                as="select"
                                value={newCourtTypeId}
                                onChange={handleCourtTypeChange}
                            >
                                <option value="">اختر نوع المحكمة</option>
                                {courtTypes.map((courtType) => (
                                    <option key={courtType.id} value={courtType.id}>
                                        {courtType.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="courtSubTypeId">
                            <Form.Label>نوع المحكمة الفرعي:</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourtSubTypeName}
                                onChange={(e) => setNewCourtSubTypeName(e.target.value)}
                            />


                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAddCourtSubTypeModal(false)}
                    >
                        إغلاق
                    </Button>
                    <Button variant="primary" onClick={handleAddCourtSubType}>
                        إضافة نوع المحكمة الفرعي
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAddCourtLevelModal}
                onHide={() => setShowAddCourtLevelModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>إضافة مستوى المحكمة</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courtLevelName">
                            <Form.Label>اسم مستوى المحكمة:</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourtLevelName}
                                onChange={(e) => setNewCourtLevelName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAddCourtLevelModal(false)}
                    >
                        إغلاق
                    </Button>
                    <Button variant="primary" onClick={handleAddCourtLevel}>
                        إضافة مستوى المحكمة
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAddCourtModal}
                onHide={() => setShowAddCourtModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>إضافة محكمة</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="courtTypeId">
                            <Form.Label>نوع المحكمة:</Form.Label>
                            <Form.Control
                                as="select"
                                value={newCourtTypeId}
                                onChange={(e) => {
                                    const selectedTypeId = e.target.value;
                                    setSelectedCourtTypeId(selectedTypeId);
                                    setNewCourtTypeId(selectedTypeId);
                                }}
                            >
                                <option value="">اختر نوع المحكمة</option>
                                {courtTypes.map((courtType) => (
                                    <option key={courtType.id} value={courtType.id}>
                                        {courtType.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="courtSubTypeId">
                            <Form.Label>نوع المحكمة الفرعي:</Form.Label>
                            <Form.Control
                                as="select"
                                value={newCourtSubTypeId}
                                onChange={(e) => setNewCourtSubTypeId(e.target.value)}
                            >
                                <option value="">اختر نوع المحكمة الفرعي</option>

                                {courtTypeSubTypes.length > 0 &&
                                    courtTypeSubTypes.map((courtTypeSubType) => (
                                        <option
                                            key={courtTypeSubType.id}
                                            value={courtTypeSubType.id}
                                        >
                                            {courtTypeSubType.name}
                                        </option>
                                    ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="courtLevelId">
                            <Form.Label>مستوى المحكمة:</Form.Label>
                            <Form.Control
                                as="select"
                                value={newCourtLevelId}
                                onChange={(e) => setNewCourtLevelId(e.target.value)}
                            >
                                <option value="">اختر مستوى المحكمة</option>
                                {courtLevels.map((courtLevel) => (
                                    <option key={courtLevel.id} value={courtLevel.id}>
                                        {courtLevel.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="courtName">
                            <Form.Label>اسم المحكمة:</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourtName}
                                onChange={(e) => setNewCourtName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="courtAddress">
                            <Form.Label>عنوان المحكمة:</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCourtAddress}
                                onChange={(e) => setNewCourtAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAddCourtModal(false)}
                    >
                        إغلاق
                    </Button>
                    <Button variant="primary" onClick={handleAddCourt}>
                        إضافة محكمة
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>تأكيد الحذف</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {deleteItem && (
                        <p>
                            هل أنت متأكد من  {deleteItem.message} "{deleteItem.value}"؟
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmationModal}>
                        إلغاء
                    </Button>
                    <Button variant="primary" onClick={handleConfirmDelete}>
                        موافق
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default CourtSetting;
