import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '../dashboard/Dashboard';
import Lawyers from '../../pages/LawyerList';
import LawyersAddEdit from '../Lawyers/lawyerAddEdit';
import CourtSetting from '../Courts/court_index.component';
import CourtSearch from '../Reports/SearchCourt';
import CaseTypeSet from '../Courts/case_index.component';
import FinancialDashboard from '../Financially/index';
import AddEditClient from '../ClientsAndUnClients/clients/AddEditClient';
import ClientList from '../../components/ClientsAndUnClients/clients/index.jsx';
import UnClientList from '../../components/ClientsAndUnClients/unclients/index.jsx';
import LegalCasesIndex from '../../pages/LegalCaseList';
import LegCaseDetail from '../LegalCases/LegalCaseDetails';
import LegalServiceList from '../../pages/LegalServicList';
import ProcedureSearch from '../Reports/procedure_search.component';
import ProfileUser from '../Settings/ProfileUser';
import { useSpinner } from '../../context/SpinnerContext';
import GlobalSpinner from '../common/GlobalSpinner';
import Procedures from '../../pages/ProceduresList';
import ClientUnClientList from '../../pages/ClientUnClientList.jsx';
import ManagmentSettings from '../../pages/ManagmentSettings.jsx';
import ServiceTypes from '../Settings/ServiceTypes.jsx';
import LegcaseTypes from '../Settings/LegcaseTypes.jsx';
import Expensecategorys from '../Settings/ExpenseCategorys.jsx';
import SearchCourtsApi from '../../pages/SearchCourtsApi.jsx';

const AuthRoutes = () => {
  const { showSpinner, hideSpinner, loading } = useSpinner();
  const location = useLocation();

  // ✅ إظهار الـ Spinner بسلاسة عند تغيير الصفحة
  useEffect(() => {
    const handleRouteChange = async () => {
      showSpinner();
      await new Promise((resolve) => setTimeout(resolve, 300)); // تقليل وقت التحميل
      hideSpinner();
    };

    handleRouteChange();
  }, [location]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 min-h-screen relative overflow-hidden">
      {/* ✅ عرض الـ Spinner بشكل شفاف فوق المحتوى */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50 transition-opacity duration-300">
          <GlobalSpinner />
        </div>
      )}

      {/* ✅ منطقة التنقل */}
      <div
        className={`transition-opacity duration-300 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<ClientUnClientList />} />
          <Route path="/clients/regular" element={<ClientList />} />
          <Route path="/clients/one-time" element={<UnClientList />} />
          <Route path="/legcase-services" element={<LegalServiceList />} />
          <Route path="/court-search" element={<CourtSearch />} />
          <Route path="/cases_setting" element={<CaseTypeSet />} />
          <Route path="/financial" element={<FinancialDashboard />} />
          <Route path="/legcases/show/:id" element={<LegCaseDetail />} />
          <Route path="/profile/:userId" element={<ProfileUser />} />
          <Route path="/legcases" element={<LegalCasesIndex />} />
          <Route path="/client/create" element={<AddEditClient />} />
          <Route path="/client/edit/:id" element={<AddEditClient />} />
          <Route path="/lawyers/form" element={<LawyersAddEdit />} />
          <Route path="/managment-settings" element={<ManagmentSettings />} />
          <Route path="/managment-settings/courts" element={<CourtSetting />} />
          <Route path="/search-courts-api" element={<SearchCourtsApi />} />
          <Route
            path="/managment-settings/procedures"
            element={<Procedures />}
          />
          <Route path="/managment-settings/lawyers" element={<Lawyers />} />
          <Route
            path="/managment-settings/service-types"
            element={<ServiceTypes />}
          />
          <Route
            path="/managment-settings/legcase-types"
            element={<LegcaseTypes />}
          />
          <Route
            path="/managment-settings/expense-categorys"
            element={<Expensecategorys />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AuthRoutes;
