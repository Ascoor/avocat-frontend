import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Row, Col, Alert, Button ,Modal} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserEdit,
  FaOrcid,
} from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/ar';
import { BsArrowLeft, BsPersonPlus } from 'react-icons/bs';
import { ClientAddIcon } from '../../assets/icons/index';
import API_CONFIG from '../../config';

function AddEditClient({ client = {}, isOpen, onClose, onSaved }) {
  // Initialize state using client prop
  const [slug, setSlug] = useState(client?client.slug : '');
  const [name, setName] = useState(client?client.name : '');
  const [gender, setGender] = useState(client?client.gender : '');
  const [identityNumber, setIdentityNumber] = useState(client?client.identityNumber : '');
  const [dateOfBirth, setDateOfBirth] = useState(client?client.dateOfBirth : null);
  const [address, setAddress] = useState(client?client.address : '');
  const [religion, setReligion] = useState(client?client.religion : '');
  const [work, setWork] = useState(client?client.work : '');
  const [email, setEmail] = useState(client?client.email : '');
  const [phoneNumber, setPhoneNumber] = useState(client?client.phoneNumber : '');
  const [emergencyNumber, setEmergencyNumber] = useState(client?client.emergencyNumber : '');
  
  // ... same for other fields ...

  const datepickerRef = useRef(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  useEffect(() => {
    // Check if the client has an ID or a specific property that indicates it's a real client
    if (client && client.slug) { // Adjusted the condition
        // Populate state variables with client data for editing
        setSlug(client.slug);
        setName(client.name);
        setAddress(client.address);
        setGender(client.gender);
        setIdentityNumber(client.identityNumber);
        setDateOfBirth(new Date(client.dateOfBirth)); // If the dateOfBirth is a string, convert to Date object
        setReligion(client.religion);
        setWork(client.work);
        setEmail(client.email);
        setPhoneNumber(client.phoneNumber);
        setEmergencyNumber(client.emergencyNumber);
        // ... set other state variables ...
    } else {
        // Reset state variables for adding
        setSlug("");
        setName("");
        setAddress("");
        setGender("");
        setIdentityNumber("");
        setDateOfBirth(null); // Reset to null if you're using a date picker
        setReligion("");
        setWork("");
        setEmail("");
        setPhoneNumber("");
        setEmergencyNumber("");
        // ... reset other state variables ...
    }
}, [client]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = {
      slug,
       name, 
      dateOfBirth,  
      identityNumber,
      address,
      religion,
      gender,
      email,
      phoneNumber,
      work,
      emergencyNumber
      // ... other fields ...
    };
    try {
      if (client.id) { // If a client has an ID, we're in edit mode.
        await axios.put(`${API_CONFIG.baseURL}/api/clients/${client.id}`, clientData);
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/clients`, clientData);
      }
      onSaved(); // Notify parent that the data was saved successfully.
      onClose(); // Close the modal.
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Modal show={isOpen} onHide={onClose} centered dir="rtl">
    {isSuccess && (
  <Alert variant="success" onClose={() => setIsSuccess(false)} dismissible>
    {confirmationMessage}
  </Alert>
)}

      <Modal.Header closeButton>
        {client ? "تعديل بيانات العميل" : "إضافة عميل جديد"}
      </Modal.Header>
      <Modal.Body>
        <Card className="p-2">
          <Form onSubmit={handleSubmit}>

          <Row className="p-2">
          <Col xs={12} md={6}>
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
<Row>
    <Col xs={12} md={6}>
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

    <Col xs={12} md={6}>
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
    </Row>
<Row className="p-2">
    <Col xs={12} md={6}>
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
            <Col>
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
            
            <Col>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>
                  <FaCalendarAlt /> تاريخ الميلاد
                </Form.Label>
                <DatePicker
                  selected={dateOfBirth}
                  onChange={(date) => setDateOfBirth(date)}
                  locale="ar"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  maxDate={new Date()}
                  dateFormat="yyyy/MM/dd" // Format the displayed date
                  className="form-control"
                  placeholderText="اختر تاريخ الميلاد"
                  isInvalid={!isValidDate(dateOfBirth)}
                  ref={datepickerRef}
                />
              </Form.Group>
            </Col>

            </Row>
<Row className="p-2">

            <Col xs={12} md={6} lg={6}>
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
            <Col>
             
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
</Row>
<Row className="p-2">
  

            <Col xs={12} md={6} lg={6}>
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

            <Col xs={12} md={6} lg={6}>
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
                  <Button variant="primary" type="submit">
                  {client ? 'تحديث' : 'إضافة'}
              حفظ
            </Button>
          </Card.Footer>
          </Form>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default AddEditClient;
