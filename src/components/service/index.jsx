import { useState, useEffect } from 'react';
import axios from 'axios';
import AddEditServiceModal from './AddEditServiceModal';
import API_CONFIG from '../../config';
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
        `${API_CONFIG.baseURL}/api/service-search?search=${searchQuery}`
      );
      setServices(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };

  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">الخدمات</h1>
        <button
          onClick={handleAddService}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          إضافة خدمة
        </button>
      </div>

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

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="بحث..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          بحث
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">رقم الخدمة</th>
              <th className="border border-gray-200 px-4 py-2">وصف الخدمة</th>
              <th className="border border-gray-200 px-4 py-2">العميل</th>
              <th className="border border-gray-200 px-4 py-2">الجهة</th>
              <th className="border border-gray-200 px-4 py-2">الموضوع</th>
              <th className="border border-gray-200 px-4 py-2">الحالة</th>
              <th className="border border-gray-200 px-4 py-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{service.slug}</td>
                <td className="border border-gray-200 px-4 py-2">{service.service_type?.name}</td>
                <td className="border border-gray-200 px-4 py-2">
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
                <td className="border border-gray-200 px-4 py-2">{service.service_place_name}</td>
                <td className="border border-gray-200 px-4 py-2">{service.description}</td>
                <td className="border border-gray-200 px-4 py-2">{service.status}</td>
                <td className="border border-gray-200 px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
  );
};

export default Services;
