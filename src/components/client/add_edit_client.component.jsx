import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Row, Col, Alert, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
    FaBriefcase,
    FaEnvelope,
    FaPhone,
    FaIdCard,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUserEdit,
    FaOrcid,
} from "react-icons/fa";
import { BsArrowLeft, BsPersonPlus } from "react-icons/bs";
import {ClientAddIcon} from "../../assets/icons";
import API_CONFIG from "../../config";
const AddEditClient = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [slug, setSlug] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [identityNumber, setIdentityNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [religion, setReligion] = useState("");
    const [email, setEmail] = useState("");
    const [work, setWork] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [emergencyNumber, setEmergencyNumber] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");

    const fetchClient = useCallback(async () => {
        try {
            const response = await axios.get(
                `${API_CONFIG.baseURL}/api/clients/${id}`
            );
            const { client } = response.data;
            setSlug(client.slug);
            setName(client.name);
            setGender(client.gender);
            setEmail(client.email);
            setPhoneNumber(client.phone_number);
            setEmergencyNumber(client.emergency_number);
            setWork(client.work);
            setDateOfBirth(new Date(client.date_of_birth));
            setReligion(client.religion);
            setAddress(client.address);

            setIdentityNumber(client.identity_number);
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await fetchClient();
            }
        };

        fetchData();
    }, [id, fetchClient]);

    useEffect(() => {
        if (alertMessage && alertVariant) {
            setTimeout(() => {
                setAlertMessage("");
                setAlertVariant("");
            }, 3000);
        }
    }, [alertMessage, alertVariant]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form field validation
        if (
            !slug ||
            !name ||
            !gender ||
            !identityNumber ||
            !dateOfBirth ||
            !religion ||
            !phoneNumber ||
            !address
        ) {
            setAlertVariant("danger");
            setAlertMessage("يرجى ملء جميع الحقول المطلوبة.");
            return;
        }

        const clientData = {
            slug,

            name,
            gender,
            date_of_birth: dateOfBirth.toISOString().split("T")[0],
            religion,
            address,
            identity_number: identityNumber,
            email: email || null,
            phone_number: phoneNumber,
            emergency_number: emergencyNumber || null,
            work: work || null,
        };

        try {
            if (id) {
                await axios.put(`${API_CONFIG.baseURL}/api/clients/${id}`, clientData);
                navigate("/clients", {
                    state: {
                        alertMessage: "تم تحديث بيانات العميل بنجاح.",
                        alertVariant: "success",
                    },
                });
            } else {
                await axios.post(`${API_CONFIG.baseURL}/api/clients`, clientData);
                navigate("/clients", {
                    state: {
                        alertMessage: "تم إضافة العميل بنجاح.",
                        alertVariant: "success",
                    },
                });
            }
        } catch (error) {
            console.error(error);
            setAlertVariant("danger");
            setAlertMessage("حدث خطأ أثناء حفظ العميل.");
        }
    };

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    return (
        <>
        <Card className="p-2">
            <Card.Header>
                <div className="custom-card-header">
                    {id ? "تعديل العميل" : "إضافة عميل جديد"}
                    <img src={ClientAddIcon} alt="Icon" className="client-add-icon" />
                </div>
            </Card.Header>
            <Card.Body>
                {alertMessage && (
                    <Alert
                        variant={alertVariant}
                        onClose={() => setAlertMessage("")}
                        dismissible
                    >
                        {alertMessage}
                    </Alert>
                )}
                <Row className="justify-content-start">
                    <Col className="col-2">
                        <Button
                            variant="warning"
                            className="btn-back"
                            type="button"
                            onClick={() => window.history.back()}
                        >
                            رجوع
                            <BsArrowLeft className="mr-3" style={{ marginRight: "0.5rem" }} />
                        </Button>
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Row className="p-2">
                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="slug">
                                <Form.Label>
                                    <FaOrcid /> رقم العميل بالمكتب
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="أدخل الرمز"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="p-2">
                        <Col xs={12} md={6} lg={5}>
                            <Form.Group controlId="name">
                                <Form.Label>
                                    <FaUserEdit /> الاسم
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="أدخل الاسم"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="identityNumber">
                                <Form.Label>
                                    <FaIdCard /> رقم الهوية
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="أدخل رقم الهوية"
                                    value={identityNumber}
                                    onChange={(e) => setIdentityNumber(e.target.value)}
                                    maxLength={14}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <Form.Group controlId="address">
                                <Form.Label>
                                    <FaMapMarkerAlt /> العنوان
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="أدخل العنوان"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="p-2">
                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>
                                    <FaPhone /> رقم الهاتف
                                </Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="أدخل رقم الهاتف"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="gender">
                                <Form.Label>الجنس</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="ذكر">ذكر</option>
                                    <option value="أنثى">أنثى</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="dateOfBirth">
                                <Form.Label>
                                    <FaCalendarAlt /> تاريخ الميلاد
                                </Form.Label>

                                <DatePicker
                                    selected={dateOfBirth}
                                    onChange={(date) => setDateOfBirth(date)}
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={100}
                                    maxDate={new Date()}
                                    className="form-control"
                                    placeholderText="اختر تاريخ الميلاد"
                                    isInvalid={!isValidDate(dateOfBirth)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Group controlId="religion">
                                <Form.Label>الديانة</Form.Label>
                                <Form.Control
                                    as="select"
                                    placeholder="أدخل الديانة"
                                    value={religion}
                                    onChange={(e) => setReligion(e.target.value)}
                                >
                                    <option value="">اختر الديانة</option>
                                    <option value="مسلم">مسلم</option>
                                    <option value="مسيحي">مسيحي</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="p-2">
                        <Col xs={12} md={6} lg={4}>
                            <Form.Group controlId="email">
                                <Form.Label>
                                    <FaEnvelope /> البريد الإلكتروني
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="أدخل البريد الإلكتروني"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                            <Form.Group controlId="work">
                                <Form.Label>
                                    <FaBriefcase /> العمل
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="أدخل العمل"
                                    value={work}
                                    onChange={(e) => setWork(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                            <Form.Group controlId="emergencyNumber">
                                <Form.Label>
                                    <FaPhone /> رقم الطوارئ
                                </Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="أدخل رقم الطوارئ"
                                    value={emergencyNumber}
                                    onChange={(e) => setEmergencyNumber(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <Button variant="primary" type="submit">
                                    {id ? "تحديث" : "إضافة"}
                                    <BsPersonPlus className="ml-1" />
                                </Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Form>
            </Card.Body>
        </Card>
        </>
    );
};

export default AddEditClient;
