import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  CardHeader,
  Button,
  InputGroup,
  Alert,
  FormControl,
} from 'react-bootstrap';
import API_CONFIG from '../../config';
import { CiEdit } from 'react-icons/ci';
import AddEditLegCase from './AddEditLegCase';
import SectionHeader from '../home_tools/SectionHeader';
import CustomPagination from '../home_tools/Pagination';
import { LegCaseIcon } from '../../assets/icons';

const LegalCasesIndex = () => {
  const [legCases, setLegCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLegCase, setEditingLegCase] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    fetchLegCases();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    if (successMessage) {
      setAlertMessage(successMessage);
      setAlertVariant('success');
      setShowAlert(true);
      setSuccessMessage('');
    }
    fetchLegCases(); // Re-fetch cases to update the list
  };

  const fetchLegCases = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/legal-cases`);
      setLegCases(response.data);
    } catch (error) {
      console.error('Error fetching leg cases:', error);
    }
  };

  const handleEditCase = (legCase) => {
    setEditingLegCase(legCase);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal-case-search?search=${searchQuery}`,
      );
      setLegCases(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };

  const deleteLegCase = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/leg-cases/${id}`);
      fetchLegCases(); // Re-fetch cases after deletion
    } catch (error) {
      console.error('Error deleting legal case:', error);
    }
  };

  const paginatedLegCases = legCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <SectionHeader
        setShowAddModal={() => {
          setEditingLegCase(null);
          setIsEditing(false);
          setShowModal(true);
        }}
        listName="القضايا"
        buttonName="قضية جديدة"
        icon={LegCaseIcon}
      />

      {showModal && (
        <AddEditLegCase
          isEditing={isEditing}
          editingLegCase={editingLegCase}
          onClose={handleCloseModal}
          fetchLegCases={fetchLegCases}
        />
      )}
      <Card>
        <CardHeader>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={handleSearch}>
                  بحث
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {showAlert && (
                <Alert
                  variant={alertVariant}
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  {alertMessage}
                </Alert>
              )}
            </Col>
          </Row>
        </CardHeader>
        <Card.Body>
          <div className="table-responsive">
            <table className="special-table">
              <thead>
                <tr>
                  <th className="header-cell">رقم الملف</th>
                  <th className="header-cell">الموكل</th>
                  <th className="header-cell">صفة</th>
                  <th className="header-cell">الموضوع</th>
                  <th className="header-cell">نوع القضية</th>
                  <th className="header-cell">المحكمة</th>
                  <th className="header-cell">المحرر</th>
                  <th className="header-cell">الحالة</th>
                  <th className="header-cell">التحكم</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLegCases.map((legCase, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        className="btn item-link"
                        onClick={() => handleEditCase(legCase)}
                      >
                        <CiEdit className="edit-icon mb-1" />
                        {legCase.slug}
                      </a>
                    </td>
                    <td>
                      {legCase.clients &&
                        legCase.clients.map((client, clientIndex) => (
                          <span key={clientIndex}>
                            {client.name}
                            {clientIndex < legCase.clients.length - 1 && ', '}
                          </span>
                        ))}
                    </td>
                    <td>{legCase.client_capacity}</td>
                    <td>{legCase.title}</td>
                    <td>{legCase.case_sub_type?.name || '-'}</td>
                    <td>
                      {legCase.courts &&
                        legCase.courts.map((court, courtIndex) => (
                          <span key={courtIndex}>
                            {court.name}
                            {courtIndex < legCase.courts.length - 1 && ', '}
                          </span>
                        ))}
                    </td>
                    <td>
                      {legCase.created_by && (
                        <span className="span details-text text-danger">
                          تم تحرير البيانات بواسطة{' '}
                          <strong className="text-primary text-xs">
                            {legCase.created_by.name}
                          </strong>
                        </span>
                      )}
                      <br />
                      {legCase.updated_by && legCase.created_by && (
                        <span>, </span>
                      )}
                      {legCase.updated_by && (
                        <span className="span details-text text-danger">
                          تم تعديل البيانات بواسطة{' '}
                          <strong className="text-primary text-xs">
                            {legCase.updated_by.name}
                          </strong>
                        </span>
                      )}
                    </td>
                    <td>{legCase.status}</td>
                    <td>
                      <div className="button-container">
                        <Link
                          className="btn btn-secondary mb-2 float-end"
                          to={`/legcases/show/${legCase.id}`}
                        >
                          عرض
                        </Link>
                        <button
                          className="btn btn-danger mb-2 float-end"
                          onClick={() => deleteLegCase(legCase.id)}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{' '}
        </Card.Body>
        <Card.Footer>
          <CustomPagination
            totalCount={legCases.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Card.Footer>
      </Card>
    </>
  );
};

export default LegalCasesIndex;
