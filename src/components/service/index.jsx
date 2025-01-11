import { useState, useEffect } from 'react';
import axios from 'axios';
import AddEditServiceModal from './AddEditServiceModal';
import API_CONFIG from '../../config';

import SectionHeader from '../home_tools/SectionHeader';
import { ServiceIcon } from '../../assets/icons/index';
import CustomPagination from '../home_tools/Pagination';

const Services = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/services`);
      setServices(response.data.services);
    } catch (error) {
      console.error('حدث خطأ أثناء جلب الخدمات:', error);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowModal(true);
  };
  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/services/${serviceId}`);
      fetchServices();
    } catch (error) {
      console.error('حدث خطأ أثناء حذف الخدمة:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/service-search?search=${searchQuery}`,
      );
      setServices(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };

  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <>
      <SectionHeader
        listName="الخدمات"
        buttonName="خدمة"
        setShowAddModal={handleAddService}
        icon={ServiceIcon}
      />
      {showModal && (
        <AddEditServiceModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            fetchServices();
          }}
          service={editingService}
          isEditing={!!editingService}
        />
      )}

      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 mt-2 mr-2 bg-gray-200 rounded-md px-4 py-2"
              >
                بحث
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">رقم الخدمة</th>
                <th className="px-4 py-2 text-left">وصف الخدمة</th>
                <th className="px-4 py-2 text-left">العميل</th>
                <th className="px-4 py-2 text-left">الجهة</th>
                <th className="px-4 py-2 text-left">الموضوع</th>
                <th className="px-4 py-2 text-left">الحالة</th>
                <th className="px-4 py-2 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedServices.map((service) => (
                <tr key={service.id}>
                  <td className="border px-4 py-2">{service.slug}</td>
                  <td className="border px-4 py-2">{service.service_type?.name}</td>
                  <td className="border px-4 py-2">
                    {service.clients && service.clients.length > 0
                      ? service.clients.map((client, index) => (
                          <span key={index}>
                            {client.name}
                            {index < service.clients.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      : service.unclients &&
                        service.unclients.map((unclient, index) => (
                          <span key={index}>
                            {unclient.name}
                            {index < service.unclients.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                  </td>
                  <td className="border px-4 py-2">{service.service_place_name}</td>
                  <td className="border px-4 py-2">{service.description}</td>
                  <td className="border px-4 py-2">{service.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="bg-red-500 text-white rounded-md px-4 py-2"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <CustomPagination
            totalCount={services.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Services;