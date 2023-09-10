import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import arEG from 'date-fns/locale/ar-EG';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { useSpring, animated } from '@react-spring/web';
import DatePicker from 'react-datepicker';
import '../../../assets/css/Models.css';
import useAuth from '../../Auth/AuthUser';
import '../../../assets/css/Models.css';

const ServiceProcedureModal = ({
  show,
  onHide,
  lawyers,
  procedure,
  isEditing,
  serviceId,
  addServiceProcedure,
  editServiceProcedure,
}) => {
  const user = useAuth();

  registerLocale('ar_eg', arEG);
  setDefaultLocale('ar_eg');

  const { getUser } = useAuth();
  const handleDateChange = (field, date) => {
    // Check if date is not null
    if (date) {
      // Format the date as 'yyyy-MM-dd' and update formData
      const formattedDate = date.toISOString().split('T')[0];
      setFormData({
        ...formData,
        [field]: formattedDate,
      });
    } else {
      // If date is null, set the field as null in formData
      setFormData({
        ...formData,
        [field]: null,
      });
    }
  };

  const initialFormData = {
    title: '',
    job: '',
    lawyer_id: '',
    date_start: null,
    date_end: null,
    cost: 0,
    cost2: 0,
    result: '',
    place: '',
    created_by: getUser().id,
    updated_by: getUser().id,
    service_id: serviceId,
  };

  // Include status only when adding a new procedure
  if (!isEditing) {
    initialFormData.status = ''; // Default value for status
  }

  const modalAnimation = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0%)' : 'translateY(-100%)',
  });

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditing && procedure) {
      setFormData({
        ...initialFormData,
        title: procedure.title || '', // Use an empty string if null
        job: procedure.job || '', // Use an empty string if null
        lawyer_id: procedure.lawyer_id || '', // Use an empty string if null
        date_start: procedure.date_start || '', // Use an empty string if null
        date_end: procedure.date_end || '', // Use an empty string if null
        cost: procedure.cost || 0, // Use an empty string if null
        cost2: procedure.cost2 || 0, // Use an empty string if null
        result: procedure.result || '', // Use an empty string if null
        place: procedure.place || '', // Use an empty string if null
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditing, procedure]);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Edit an existing procedure
        await editServiceProcedure(procedure.id, formData);
      } else {
        // Add a new procedure
        await addServiceProcedure(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving/updating procedure:', error);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <animated.div style={modalAnimation}>
      <Modal
        show={show}
        onHide={onHide}
        centered
        className="service-procedure-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'تعديل الإجراء' : 'إضافة إجراء جديد'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col
              sm={12}
              md={12}
              lg={12}
              className="mb-3"
              style={{ textAlign: 'right' }}
            >
              <Form onSubmit={handleSubmit}>
                <FormGroup controlId="title" label="نوع الإجراء">
                  <FormControl
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup controlId="job" label="الوظيفة">
                  <FormControl
                    type="text"
                    value={formData.job}
                    onChange={(e) => handleFieldChange('job', e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup controlId="lawyer" label="المحامي">
                  <FormControl
                    as="select"
                    value={formData.lawyer_id}
                    onChange={(e) =>
                      handleFieldChange('lawyer_id', e.target.value)
                    }
                    required
                  >
                    <option value="">اختر المحامي</option>
                    {lawyers.map((lawyer) => (
                      <option key={lawyer.id} value={lawyer.id}>
                        {lawyer.name}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>

                <div className="mb-3">
                  <Form.Label>تاريخ البداية:</Form.Label>
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    name="date_start"
                    selected={
                      formData.date_start ? new Date(formData.date_start) : null
                    }
                    onChange={(date) => handleDateChange('date_start', date)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <Form.Label>تاريخ الانتهاء:</Form.Label>
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    name="date_end"
                    selected={
                      formData.date_end ? new Date(formData.date_end) : null
                    }
                    onChange={(date) => handleFieldChange('date_end', date)}
                    required
                  />
                </div>

                <FormGroup controlId="cost" label="التكلفة">
                  <FormControl
                    type="number"
                    value={formData.cost}
                    onChange={(e) => handleFieldChange('cost', e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlId="cost2" label="التكلفة 2">
                  <FormControl
                    type="number"
                    value={formData.cost2}
                    onChange={(e) => handleFieldChange('cost2', e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup controlId="result" label="النتيجة">
                  <FormControl
                    type="text"
                    value={formData.result}
                    onChange={(e) =>
                      handleFieldChange('result', e.target.value)
                    }
                  />
                </FormGroup>

                <FormGroup controlId="place" label="الجهة">
                  <FormControl
                    type="text"
                    value={formData.place}
                    onChange={(e) => handleFieldChange('place', e.target.value)}
                  />
                </FormGroup>

                {/* Include status field only when adding a new procedure */}
                {!isEditing && (
                  <FormGroup controlId="status" label="الحالة">
                    <FormControl
                      as="select"
                      name="status"
                      value={formData.status}
                      onChange={(e) =>
                        handleFieldChange('status', e.target.value)
                      }
                    >
                      <option value="قيد التجهيز">قيد التجهيز</option>
                      <option value="لم ينفذ">لم ينفذ</option>
                      <option value="منتهي">منتهي</option>
                    </FormControl>
                  </FormGroup>
                )}

                <Button variant="primary" type="submit">
                  {isEditing ? 'تحديث' : 'حفظ'}
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </animated.div>
  );
};

const FormGroup = ({ controlId, label, children }) => (
  <Form.Group controlId={controlId}>
    <Form.Label>{label}:</Form.Label>
    {children}
  </Form.Group>
);

const FormControl = ({ ...props }) => <Form.Control {...props} />;

ServiceProcedureModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  lawyers: PropTypes.array.isRequired,
  procedure: PropTypes.object,
  serviceId: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  fetchServiceProcedures: PropTypes.func,
  addServiceProcedure: PropTypes.func,
  editServiceProcedure: PropTypes.func,
};

export default ServiceProcedureModal;
