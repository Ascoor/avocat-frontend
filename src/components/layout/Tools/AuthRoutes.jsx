import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Home';
import Lawyers from '../../lawyer/lawyer_index.component';
import LawyersAddEdit from '../../lawyer/lawyer_index.component';
import CourtSetting from '../../setting/court_index.component';
import CourtSearch from '../../reports/SearchCourt';
import CaseTypeSet from '../../setting/case_index.component';
/** FinancialDashboard**/
import FinancialDashboard from '../../financially/index';

/** reports **/
import SearchCourt from '../../reports/SearchCourt';
/** Clients**/
import AddEditClient from '../../client/AddEditClient';
import ClientsList from '../../client/ClientsList';

import LegcaseList from '../../legcase/list.component';
import LegCaseDetail from '../../legcase/leg_case_detail.component';
import Services from '../../service/index';
// import LegalSession from '../../legcase/tools/Legal_session.component';
import ProcedureSearch from '../../reports/procedure_search.component';
import ProfileUser from '../../layout/AuthTool/ProfileUser';
// import Archives from '../../Archives/ArchiveDashboard';
import LegalWriter from '../../LegalWriter/LegalWriterPlatform';
import { Container } from 'react-bootstrap';
const AuthRoutes = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/procedures" element={<ProcedureSearch />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/courts" element={<CourtSetting />} />
        <Route path="/services" element={<Services />} />
        <Route path="/court-search" element={<CourtSearch />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/cases_setting" element={<CaseTypeSet />} />

        <Route path="/financial" element={<FinancialDashboard />} />
        <Route path="/legcases/show/:id" element={<LegCaseDetail />} />
        <Route path="/profile/:userId" element={<ProfileUser />} />
        <Route path="/legcases" element={<LegcaseList />} />
        <Route path="/client/create" element={<AddEditClient />} />
        <Route path="/client/edit/:id" element={<AddEditClient />} />
        <Route path="/legal-writer" element={<LegalWriter />} />

        <Route path="/reports/search-court" element={<SearchCourt />} />
        <Route path="/lawyers/form" element={<LawyersAddEdit />} />
        {/* <Route path="/archives" element={<Archives />} /> */}
        {/* <Route path="/archives/wordpadeditor" element={<WordPadEditor />} /> */}
      </Routes>
    </Container>
  );
};

export default AuthRoutes;
