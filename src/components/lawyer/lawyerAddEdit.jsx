import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ar";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for react-datepicker
moment.locale("ar");

const LawyerAddEdit = ({ onSubmit, initialValues }) => {
  const isValidDate = (date) => {
    return date !== null && date.toString() !== "Invalid Date";
  };

  const [name, setName] = useState(initialValues?.name || "");
  const [birthdate, setBirthdate] = useState(initialValues?.birthdate || null);
  const [identityNumber, setIdentityNumber] = useState(
    initialValues?.identity_number || ""
  );
  const [lawRegNumber, setLawRegNumber] = useState(
    initialValues?.law_reg_num || ""
  );
  const [lawyerClass, setLawyerClass] = useState(
    initialValues?.lawyer_class || ""
  );
  const [email, setEmail] = useState(initialValues?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    initialValues?.phone_number || ""
  );
  const [religion, setReligion] = useState(initialValues?.religion || "");
  const [gender, setGender] = useState(initialValues?.gender || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      birthdate,
      identity_number: identityNumber,
      law_reg_num: lawRegNumber,
      lawyer_class: lawyerClass,
      email,
      phone_number: phoneNumber,
      religion,
      gender,
    };

    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>الاسم</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="birthdate">
        <Form.Label>
          <FaCalendarAlt /> تاريخ الميلاد
        </Form.Label>
        <DatePicker
          selected={isValidDate(birthdate) ? birthdate : null}
          onChange={(date) => setBirthdate(date)}
          locale="ar"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          maxDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="form-control"
          placeholderText="اختر تاريخ الميلاد"
          isInvalid={!isValidDate(birthdate) || birthdate === null}
        />
      </Form.Group>
      <Form.Group controlId="lawRegNumber">
        <Form.Label>رقم التسجيل القانوني</Form.Label>
        <Form.Control
          type="text"
          value={lawRegNumber || ""}
          onChange={(e) => setLawRegNumber(e.target.value)}
          required
        />
      </Form.Group>
        <Form.Group>
        <Form.Label>فئة المحامي</Form.Label>
        <Form.Control
          as="select"
          value={lawyerClass || ""}
          onChange={(e) => setLawyerClass(e.target.value)}
          required
          >
      <option value="نقض">نقض</option>
        <option value="إستئناف">إستئناف</option>
        <option value="إبتدائي">إبتدائي</option>
        <option value="جدول عام">جدول عام</option>
</Form.Control>
          </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>البريد الإلكتروني</Form.Label>
        <Form.Control
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>الجنس</Form.Label>
        <Form.Control
          as="select"
          value={gender || ""}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">اختر</option>
          <option value="ذكر">ذكر</option>
          <option value="أنثى">أنثى</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>الديانة</Form.Label>
        <Form.Control
          as="select"
          value={religion || ""}
          onChange={(e) => setReligion(e.target.value)}
        >
          <option value="">اختر</option>
          <option value="مسلم">مسلم</option>
          <option value="مسيحى">مسيحى</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>رقم الهاتف</Form.Label>
        <Form.Control
          type="tel"
          value={phoneNumber || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        حفظ
      </Button>
    </Form>
  );
};

LawyerAddEdit.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,   
    birthdate: PropTypes.instanceOf(Date), 
    identity_number: PropTypes.string,
    law_reg_num: PropTypes.string,
    lawyer_class: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    religion: PropTypes.string,
    gender: PropTypes.string,
  }),
};

export default LawyerAddEdit;
