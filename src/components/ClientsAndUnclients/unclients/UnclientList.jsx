import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Alert } from 'react-bootstrap';
import { ClientIcon } from '../../../assets/icons/index';
import API_CONFIG from '../../../config';
import {
  AiFillEdit,
  AiFillDelete,
} from 'react-icons/ai';
import CustomPagination from '../../home_tools/Pagination';
import SectionHeader from '../../home_tools/SectionHeader';
import AddEditUnclient from './AddEditUnclient';

function UnclientList() {
  const [unclients, setUnclients] = useState([]);
  const [selectedUnclient, setSelectedUnclient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [currentAlertMessage, setCurrentAlertMessage] = useState('');
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);


  // API Calls
  const fetchUnclients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/unclients`);
      if (Array.isArray(response.data.unclients)) {
        setUnclients(response.data.unclients);

      } else {
        console.error('Data fetched is not an array:', response.data.unclients);
      }
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };
  // Fetch and filter clients
  useEffect(() => {
    fetchUnclients();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/unclients-search?search=${searchQuery}`);
      setUnclients(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };


  const deleteUnclient = async (id) => {
    try {
      const response = await axios.delete(
        `${API_CONFIG.baseURL}/api/unclients/${id}`,
      );
      fetchUnclients();
      setCurrentAlertMessage(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setCurrentAlertMessage('');
      }, 3000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleSuccess = (message) => {
    // Set the success message state in the parent component
    // Display the message or take other actions as needed
    setSuccessMessage(message);
    fetchUnclients();
    // Optionally, clear the message after a delay
    setTimeout(() => setSuccessMessage(''), 3000);
  };


  const openAddEditModal = (unclient = null) => {
    setSelectedUnclient(unclient);
    setModalOpen(true);
  };

  // Render

  const paginatedUnclients = unclients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <>
      <SectionHeader
        buttonName="عميل بدون"
        listName="عملاء بدون وكالة"
        icon={ClientIcon}
        setShowAddModal={() => openAddEditModal()}
      />
      <AddEditUnclient
        unclient={selectedUnclient}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSuccess}
        onUnclientDelete={deleteUnclient}
      />


      <Card className="mt-4">
        <Card.Header>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {currentAlertMessage}
            </Alert>
          )}
        </Card.Header>
        <div className="search-form w-50">
          <input
            type="text"
            className="search-input-group"
            placeholder="البحث عن العملاء غير الموكلين"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" type="button" onClick={handleSearch}>
            بحث
          </button>
        </div>

        <Card.Body>
          <div className="table-responsive">
            <table className="special-table">
              <thead>
                <tr>
                  <th>رقم المكتب</th>
                  <th>اسم العميل</th>
                  <th>رقم القومى</th>
                  <th>النوع</th>
                  <th>رقم الهاتف</th>
           
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUnclients.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      <Alert variant="warning">لا يوجد موكلين لعرضهم.</Alert>
                    </td>
                  </tr>
                ) : (
                  paginatedUnclients.map((unclient) => (
                    <tr key={unclient.id}>
                    <td>   <span className="btn client-slug"
                          onClick={() => openAddEditModal(unclient)}>
                        <AiFillEdit
                          color="blue"
                 
                        />
                  {unclient.slug}</span>
                      </td>
                      <td>{unclient.name}</td>
                      <td>{unclient.identity_number}</td>
                      <td>{unclient.gender}</td>
                      <td>{unclient.phone_number}</td>
             <td><AiFillDelete color="red" onClick={() => deleteUnclient(unclient)} />
</td>

                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>
        </Card.Body>
        <Card.Footer>
          <CustomPagination
            totalCount={unclients.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </Card.Footer>
      </Card>
    </>
  );
}
export default UnclientList;
