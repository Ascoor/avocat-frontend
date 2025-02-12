import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useSpinner } from "../../context/SpinnerContext";
import GlobalSpinner from "../common/GlobalSpinner";

// ✅ Lazy Loading Components (Only Load When Needed)
const Home = lazy(() => import("../dashboard/Dashboard"));
const Lawyers = lazy(() => import("../../pages/LawyerList"));
const LawyersAddEdit = lazy(() => import("../Lawyers/lawyerAddEdit"));
const CourtSetting = lazy(() => import("../Courts/court_index.component"));
const CourtSearch = lazy(() => import("../Reports/SearchCourt"));
const CaseTypeSet = lazy(() => import("../Courts/case_index.component"));
const FinancialDashboard = lazy(() => import("../Financially/index"));
const AddEditClient = lazy(() => import("../ClientsAndUnClients/clients/AddEditClient"));
const ClientList = lazy(() => import("../../components/ClientsAndUnClients/clients/index.jsx"));
const UnClientList = lazy(() => import("../../components/ClientsAndUnClients/unclients/index.jsx"));
const LegalCasesIndex = lazy(() => import("../../pages/LegalCaseList"));
const LegCaseDetail = lazy(() => import("../LegalCases/LegalCaseDetails"));
const LegalServiceList = lazy(() => import("../../pages/LegalServicList"));
const ProcedureSearch = lazy(() => import("../Reports/procedure_search.component"));
const ProfileUser = lazy(() => import("../Settings/ProfileUser"));
const Procedures = lazy(() => import("../../pages/ProceduresList"));
const ClientUnClientList = lazy(() => import("../../pages/ClientUnClientList.jsx"));
const ManagmentSettings = lazy(() => import("../../pages/ManagmentSettings.jsx"));
const ServiceTypes = lazy(() => import("../Settings/ServiceTypes.jsx"));
const LegcaseTypes = lazy(() => import("../Settings/LegcaseTypes.jsx"));
const Expensecategorys = lazy(() => import("../Settings/ExpenseCategorys.jsx"));
const SearchCourtsApi = lazy(() => import("../../pages/SearchCourtsApi.jsx"));

const AuthRoutes = () => {
  const { showSpinner, hideSpinner, loading } = useSpinner();
  const location = useLocation();

  // ✅ Show loading spinner on route changes
  useEffect(() => {
    const handleRouteChange = async () => {
      showSpinner();
      await new Promise((resolve) => setTimeout(resolve, 250)); // Smooth transition effect
      hideSpinner();
    };

    handleRouteChange();
  }, [location]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 min-h-screen relative overflow-hidden">
      {/* ✅ Show Global Spinner when loading */}
      {loading && (
        <>
          <GlobalSpinner />
        </>
      )}

      {/* ✅ Wrap All Routes in Suspense */}
      <Suspense fallback={<GlobalSpinner />}>
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
            <Route path="/managment-settings/procedures" element={<Procedures />} />
            <Route path="/managment-settings/lawyers" element={<Lawyers />} />
            <Route path="/managment-settings/service-types" element={<ServiceTypes />} />
            <Route path="/managment-settings/legcase-types" element={<LegcaseTypes />} />
            <Route path="/managment-settings/expense-categorys" element={<Expensecategorys />} />
          </Routes>
 
      </Suspense>
    </div>
  );
};

export default AuthRoutes;
