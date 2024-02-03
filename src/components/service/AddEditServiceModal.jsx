import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';

const AddEditServiceModal = ({ show, handleClose, service, isEditing }) => {
  const { getUser } = useAuth();
  const user = getUser();

  // الحالة الأولية
  const initialServiceData = {
    client_choice: '',
    slug: '',
    client_id: '',
    unclient_id: '',
    created_by: user.id,
    updated_by: isEditing ? user.id : '',
    status: '',
    service_type_id: '',
    service_year: '',
    service_place_name: '',
    description: '',
  };

  const [serviceData, setServiceData] = useState(initialServiceData);
  const [clients, setClients] = useState([]);
  const [unclients, setUnclients] = useState([]);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [serviceTypes, setServiceTypes] = useState([]);

  // جلب العملاء وغير العملاء
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsResponse, unclientsResponse, serviceTypesResponse] =
          await Promise.all([
            axios.get(`${API_CONFIG.baseURL}/api/clients`),
            axios.get(`${API_CONFIG.baseURL}/api/unclients`),
            axios.get(`${API_CONFIG.baseURL}/api/service-types`),
          ]);
        setClients(clientsResponse.data.clients);
        setUnclients(unclientsResponse.data.unclients);
        setServiceTypes(serviceTypesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (isEditing && service) {
      setServiceData({
        ...service,
        client_choice:
          service.clients && service.clients.length > 0 ? 'client' : 'unclient',
        client_id:
          service.clients && service.clients.length > 0
            ? service.clients[0].id
            : '',
        unclient_id:
          service.unclients && service.unclients.length > 0
            ? service.unclients[0].id
            : '',
        updated_by: user.id, // تعيين updated_by في حالة التعديل
        status: service.status || 'active', // تعيين قيمة افتراضية لـ status
        service_type_id: service.service_type_id || '',
      });
    } else {
      setServiceData({
        ...initialServiceData,
        created_by: user.id, // تعيين created_by في حالة الإضافة
      });
    }
  }, [isEditing, service, user.id]);

  const generateServiceYearOptions = () => {
    const years = [];
    for (let year = 2010; year <= 2040; year++) {
      years.push(year);
    }
    return years;
  };
  // تعامل مع تغيير العميل
  const handleClientChange = (selectedOption, action) => {
    setServiceData((prevData) => ({
      ...prevData,
      [action.name]: selectedOption ? selectedOption.value : '',
    }));
  };

  // تعامل مع تغييرات النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  // التحقق من صحة النموذج
  const validateForm = () => {
    const newErrors = {};
    if (serviceData.client_choice === 'client' && !serviceData.client_id) {
      newErrors.client_id = 'Client selection is required.';
    } else if (
      serviceData.client_choice === 'unclient' &&
      !serviceData.unclient_id
    ) {
      newErrors.unclient_id = 'Unclient selection is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // تعامل مع إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowValidationAlert(false);

    // Validate the form data
    if (validateForm()) {
      try {
        // Define the endpoint and HTTP method based on whether it's an edit or add operation
        let endpoint = '/api/services'; // Default to POST (add)
        let method = 'post';

        if (isEditing) {
          // If editing, update the endpoint and method
          endpoint = `/api/services/${service.id}`;
          method = 'put';
        }

        // Make the API request based on the selected method (POST or PUT)
        await axios[method](`${API_CONFIG.baseURL}${endpoint}`, serviceData);

        // Close the modal or perform any necessary actions upon successful submission
        handleClose();
      } catch (error) {
        console.error('Error:', error);
        setShowValidationAlert(true);
      }
    }
  };

  // تعيين خيارات العملاء وغير العملاء للـ Select
  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: client.name,
  }));
  const unclientOptions = unclients.map((unclient) => ({
    value: unclient.id,
    label: unclient.name,
  }));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'تعديل الخدمة' : 'إضافة خدمة'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {showValidationAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowValidationAlert(false)}
            dismissible
          >
            <p>There was an error processing your request. Please try again.</p>
          </Alert>
        )}

        {/* اختيار العميل أو غير العميل */}
        <Form.Group controlId="client_choice">
          {isEditing ? (
            <Form.Label>
              {serviceData.client_choice === 'client'
                ? 'عميل'
                : 'عميل غير مسجل'}
            </Form.Label>
          ) : (
            <>
              <Form.Check
                type="radio"
                name="client_choice"
                label="عميل"
                value="client"
                checked={serviceData.client_choice === 'client'}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                name="client_choice"
                label="عميل غير مسجل"
                value="unclient"
                checked={serviceData.client_choice === 'unclient'}
                onChange={handleChange}
              />
            </>
          )}
        </Form.Group>

        {/* قائمة اختيار العميل */}
        {serviceData.client_choice === 'client' && (
          <Form.Group controlId="client_id">
            <Form.Label>اختر العميل</Form.Label>
            <Select
              name="client_id"
              value={clientOptions.find(
                (option) => option.value === serviceData.client_id,
              )}
              onChange={handleClientChange}
              options={clientOptions}
              placeholder="اختر العميل"
              isClearable
              isSearchable
            />
          </Form.Group>
        )}

        {/* قائمة اختيار غير العميل */}
        {serviceData.client_choice === 'unclient' && (
          <Form.Group controlId="unclient_id">
            <Form.Label>اسم العميل غير مسجل</Form.Label>
            <Select
              name="unclient_id"
              value={unclientOptions.find(
                (option) => option.value === serviceData.unclient_id,
              )}
              onChange={handleClientChange}
              options={unclientOptions}
              placeholder="اختر العميل غير المسجل"
              isClearable
              isSearchable
            />
          </Form.Group>
        )}

        {/* باقي حقول النموذج */}
        <Form.Group controlId="slug">
          <Form.Label>رقم ملف الخدمة</Form.Label>
          <Form.Control
            type="text"
            name="slug"
            value={serviceData.slug}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="service_place_name">
          <Form.Label>الجهة</Form.Label>
          <Form.Control
            type="text"
            name="service_place_name"
            value={serviceData.service_place_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="service_type">
          <Form.Label>نوع الخدمة</Form.Label>
          <Form.Control
            as="select"
            name="service_type_id"
            value={serviceData.service_type_id}
            onChange={handleChange}
          >
            <option value="">اختر نوع الخدمة</option>
            {serviceTypes.map((serviceType) => (
              <option key={serviceType.id} value={serviceType.id}>
                {serviceType.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>وصف الخدمة</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={serviceData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>سنة الخدمة</Form.Label>
          <Form.Control
            as="select"
            name="service_year"
            onChange={handleChange}
            value={serviceData.service_year}
          >
            <option value="">اختر سنة الخدمة</option>
            {generateServiceYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {isEditing && (
          <Form.Group controlId="status">
            <Form.Label>حالة الخدمة</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={serviceData.status}
              onChange={handleChange}
            >
              <option value="">إختر</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="جارى التنفيذ">جارى التنفيذ</option>
              <option value="منتهية">منتهية</option>
              <option value="متداولة">متداولة</option>
              <option value="استيفاء">استيفاء</option>
            </Form.Control>
          </Form.Group>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {isEditing ? 'إلغاء' : 'إغلاق'}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEditing ? 'تحديث' : 'إضافة'} الخدمة
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditServiceModal;
