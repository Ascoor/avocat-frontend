import  { useState, useEffect } from 'react';
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
  
  const [filteredUnclients, setFilteredUnclients] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const[currentAlertMessage  , setCurrentAlertMessage] = useState('');

  const itemsPerPage = 5;
  const [unclientsPage, setUnclientsPage] = useState(1);


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
  // Filter clients based on search query
  useEffect(() => {
    const filtered = unclients.filter(client =>
      ['slug', 'identity_number', 'name', 'phone_number'].some(key =>
        client[key].toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredUnclients(filtered);
  }, [unclients, searchQuery]);

  // Handlers
  const handlePageChange = (newPage) => setUnclientsPage(newPage);

  const handleSearch = () => {
    setUnclientsPage(1); // Reset to first page on search
    // Filter logic already handled in useEffect
  };

  const handleSlugClick = (slug) => {
    const unclient = unclients.find((unclient) => unclient.slug === slug);
    setSelectedUnclient(unclient);
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

  const openAddEditModal = (unclient = null) => {
    setSelectedUnclient(unclient);
    setModalOpen(true);
  };

  // Render
  const startIndex = (unclientsPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredUnclients.length);
  const paginatedClients = filteredUnclients.slice(startIndex, endIndex);

  return (
    <>
      <SectionHeader
        buttonName="عميل بدون"
        listName="عملاء بدون وكالة"
        icon={ClientIcon}
        setShowAddModal={() => openAddEditModal()}
      />
      {/* <AddEditUnclient
        client={selectedUnclient}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => {
          setModalOpen(false);
          fetchUnclients();
        }}
      /> */}

      <Card className="mt-4">
        <Card.Header>
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
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="البحث عن موكلين"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
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
                  <th>العنوان</th>
                  <th>رقم الهاتف</th>
                  <th>الحالة</th>
                  <th>التحكم</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <Alert variant="warning">لا يوجد موكلين لعرضهم.</Alert>
                    </td>
                  </tr>
                ) : (
                  unclients.map((unclient) => (
                    <tr key={unclient.id}>
                      <td onClick={() => handleSlugClick(unclient.slug)}>
                        {unclient.slug}
                      </td>

                      <td>{unclient.name}</td>
                      <td>{unclient.identity_number}</td>
                      <td>{unclient.address}</td>
                      <td>{unclient.phone_number}</td>
                    

                      <td>
                        <AiFillEdit
                          color="blue"
                          onClick={() => openAddEditModal(unclient)}
                        />

                        <AiFillDelete
                          color="red"
                          onClick={() => deleteUnclient(unclient.id)}
                        />
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
            currentPage={unclientsPage}
            onPageChange={handlePageChange}
          />
        </Card.Footer>
      </Card>
    </>
  );
}
export default UnclientList;
