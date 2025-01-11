import { Routes, Route } from 'react-router-dom';
import Home from '../../Home';
import Lawyers from '../../lawyer/lawyer_index.component';
import LawyersAddEdit from '../../lawyer/lawyer_index.component';
import CourtSetting from '../../setting/court_index.component';
import CourtSearch from '../../reports/SearchCourt';
import CaseTypeSet from '../../setting/case_index.component';
/** FinancialDashboard **/
import FinancialDashboard from '../../financially/index';

/** Reports **/
import SearchCourt from '../../reports/SearchCourt';

/** Clients **/
import AddEditClient from '../../ClientsAndUnclients/clients/AddEditClient';
import ClientList from '../../ClientsAndUnclients/clients/ClientList';
import UnclientList from '../../ClientsAndUnclients/unclients/UnclientList';

import LegalCasesIndex from '../../legcase/index';
import LegCaseDetail from '../../legcase/LegalCaseDetails';
import Services from '../../service/index';
// import LegalSession from '../../legcase/tools/Legal_session.component';
import ProcedureSearch from '../../reports/procedure_search.component';
import ProfileUser from '../../layout/AuthTool/ProfileUser';
// import Archives from '../../Archives/ArchiveDashboard';

const AuthRoutes = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/procedures" element={<ProcedureSearch />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/unclients" element={<UnclientList />} />
        <Route path="/courts" element={<CourtSetting />} />
        <Route path="/services" element={<Services />} />
        <Route path="/court-search" element={<CourtSearch />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/cases_setting" element={<CaseTypeSet />} />
        <Route path="/financial" element={<FinancialDashboard />} />
        <Route path="/legcases/show/:id" element={<LegCaseDetail />} />
        <Route path="/profile/:userId" element={<ProfileUser />} />
        <Route path="/legcases" element={<LegalCasesIndex />} />
        <Route path="/client/create" element={<AddEditClient />} />
        <Route path="/client/edit/:id" element={<AddEditClient />} />
        <Route path="/reports/search-court" element={<SearchCourt />} />
        <Route path="/lawyers/form" element={<LawyersAddEdit />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
