import { Button, Form } from "react-bootstrap";
import {useState } from "react";
import PropTypes from 'prop-types';
const LawyerAddEdit = ({ onSubmit, initialValues }) => {
    const [name, setName] = useState(initialValues ? initialValues.name : "");
    const [birthdate, setBirthdate] = useState(
        initialValues ? initialValues.birthdate : ""
    );
    const [identityNumber, setIdentityNumber] = useState(
        initialValues ? initialValues.identity_number : ""
    );
    const [lawRegNumber, setLawRegNumber] = useState(
        initialValues ? initialValues.law_reg_num : ""
    );
    const [lawyerClass, setLawyerClass] = useState(
        initialValues ? initialValues.lawyer_class : ""
    );
    const [email, setEmail] = useState(
        initialValues ? initialValues.email : ""
    );
    const [phoneNumber, setPhoneNumber] = useState(
        initialValues ? initialValues.phone_number : ""
    );
    const [religion, setReligion] = useState(
        initialValues ? initialValues.religion : ""
    );
    const [gender, setGender] = useState(
        initialValues ? initialValues.gender : ""
    );

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
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </Form.Group>
        <Form.Group controlId="birthdate">
            <Form.Label>تاريخ الميلاد</Form.Label>
            <Form.Control
                type="date"
                value={birthdate || ""}
                onChange={(e) => setBirthdate(e.target.value)}
                dateFormat="dd/MM/yyyy"
                required
            />
        </Form.Group>
        <Form.Group controlId="identityNumber">
            <Form.Label>رقم الهوية</Form.Label>
            <Form.Control
                type="text"
                value={identityNumber || ""}
                onChange={(e) => setIdentityNumber(e.target.value)}
                required
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
        <Form.Group controlId="lawyerClass">
            <Form.Label>فئة المحامي</Form.Label>
            <Form.Control
                type="text"
                value={lawyerClass || ""}
                onChange={(e) => setLawyerClass(e.target.value)}
                required
            />
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
                type="text"
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
      birthdate: PropTypes.string,
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
