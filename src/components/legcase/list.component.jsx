import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Table, Row, Col, Button, Alert } from 'react-bootstrap';
import API_CONFIG from '../../config';
import { LegCaseIcon } from '../../assets/icons/index';
import CustomPagination from '../home_tools/Pagination'; // Import your custom Pagination component here
import LegCaseCreate from './LegCaseCreate';

import SectionHeader from '../home_tools/SectionHeader';
const LegCaseList = () => {
  const itemsPerPage = 10; // Set the number of items to display per page
  const [legCasesPage, setLegCasesPage] = useState(1); // Define legCasesPage and set its initial value to 1
  const [legCases, setLegCases] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentAlertMessage, setCurrentAlertMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLegCases, setFilteredLegCases] = useState([]);
  const data = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setLegCasesPage(newPage);
  };

  const startIndex = (legCasesPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLegCases = filteredLegCases.slice(startIndex, endIndex);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLegCases();
  }, []);

  const fetchLegCases = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/leg_cases`);
      setLegCases(response.data);
      setFilteredLegCases(response.data);
    } catch (error) {
      console.log('Failed to fetch leg cases');
    }
  };

  const handleSearch = () => {
    const filteredCases = legCases.filter((legCase) => {
      return (
        legCase.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        legCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        legCase.case_sub_type.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        legCase.clients.some((client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        legCase.courts.some((court) =>
          court.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    });
    setFilteredLegCases(filteredCases);
  };

  const deleteLegCase = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/leg_cases/${id}`);
      setShowAlert(true);
      setCurrentAlertMessage('تم حذف الحالة القانونية بنجاح');
      fetchLegCases();
      setFilteredLegCases(
        filteredLegCases.filter((legCase) => legCase.id !== id)
      );
    } catch (error) {
      console.log('فشل في حذف الحالة القانونية');
    }
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <SectionHeader
        setShowAddModal={handleAddClick}
        listName="القضايا"
        buttonName="قضية"
        icon={LegCaseIcon}
      />
      <Card className="m-4">
        <Card.Header>
          <Row className="add-case-row">
            {showModal && (
              <LegCaseCreate isEditing={isEditing} onClose={handleCloseModal} />
            )}
          </Row>

          {showAlert && (
            <Alert variant="success" className="text-center">
              {currentAlertMessage}
            </Alert>
          )}
        </Card.Header>
        <div className="text-center">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={6} className="text-center text-md">
              {/* Adjust the grid classes */}
              <input
                type="text"
                className="form-control search-input"
                placeholder="ابحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-primary btn-search"
                onClick={handleSearch}
              >
                بحث
              </button>
            </Col>
          </Row>
        </div>
        <Card.Body>
          <div className="table-responsive">
            <table className="special-table">
              <thead>
                <tr>
                  <th className="header-cell">رقم الملف</th>
                  <th className="header-cell"> الموكل</th>
                  <th className="header-cell">صفة</th>
                  <th className="header-cell">الموضوع </th>
                  <th className="header-cell">نوع القضية</th>
                  <th className="header-cell">المحكمة</th>
                  <th className="header-cell">الحالة</th>
                  <th className="header-cell">التحكم</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLegCases.map((legCase, index) => (
                  <tr key={index}>
                    <td>{legCase.slug}</td>
                    <td>
                      {legCase.clients.map((client, clientIndex) => (
                        <div key={clientIndex}>
                          <small>{client.name}</small>
                        </div>
                      ))}
                    </td>
                    <td>{legCase.client_capacity}</td>
                    <td>{legCase.title}</td>
                    <td>{legCase.case_sub_type.name}</td>
                    <td>
                      {legCase.courts.map((court, courtIndex) => (
                        <div key={courtIndex}>
                          <small>{court.name}</small>
                        </div>
                      ))}
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
                        <Link
                          className="btn btn-danger mb-2 float-end"
                          onClick={() => deleteLegCase(legCase.id)}
                        >
                          حذف
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
        <Card.Footer>
          <CustomPagination
            totalCount={filteredLegCases.length}
            itemsPerPage={itemsPerPage}
            currentPage={legCasesPage}
            onPageChange={handlePageChange}
          />
        </Card.Footer>
      </Card>
    </>
  );
};

export default LegCaseList;
