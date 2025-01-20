import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '../dashboard/Dashboard';
import Lawyers from '../../pages/LawyerList';
import LawyersAddEdit from '../Lawyers/lawyerAddEdit';
import CourtSetting from '../Courts/court_index.component';
import CourtSearch from '../Reports/SearchCourt';
import CaseTypeSet from '../Courts/case_index.component';
import FinancialDashboard from '../Financially/index';
import AddEditClient from '../ClientsAndUnclients/clients/AddEditClient';
import ClientList from '../../pages/ClientList';
import UnclientList from '../../pages/UnclientList';
import LegalCasesIndex from '../../pages/LegalCaseList';
import LegCaseDetail from '../LegalCases/LegalCaseDetails';
import LegalServiceList from '../../pages/LegalServicList';
import ProcedureSearch from '../Reports/procedure_search.component';
import ProfileUser from '../Settings/ProfileUser';
import { useSpinner } from '../../context/SpinnerContext';
import GlobalSpinner from '../common/GlobalSpinner';

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
          <Route path="/procedures" element={<ProcedureSearch />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/unclients" element={<UnclientList />} />
          <Route path="/courts" element={<CourtSetting />} />
          <Route path="/legal-services" element={<LegalServiceList />} />
          <Route path="/court-search" element={<CourtSearch />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/cases_setting" element={<CaseTypeSet />} />
          <Route path="/financial" element={<FinancialDashboard />} />
          <Route path="/legcases/show/:id" element={<LegCaseDetail />} />
          <Route path="/profile/:userId" element={<ProfileUser />} />
          <Route path="/legcases" element={<LegalCasesIndex />} />
          <Route path="/client/create" element={<AddEditClient />} />
          <Route path="/client/edit/:id" element={<AddEditClient />} />
          <Route path="/lawyers/form" element={<LawyersAddEdit />} />
        </Routes>
      </div>
    </div>
  );
};

export default AuthRoutes;
