import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Home';
import Lawyers from '../../lawyer/lawyer_index.component';
import LawyersAddEdit from '../../lawyer/lawyer_index.component';
import CourtSetting from '../../setting/court_index.component';
// import CourtSearch from "../reports/court_search.component";
import CaseTypeSet from '../../setting/case_index.component';

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
// import WordPadEditor from '../../Archives/WordPadEditor/WordPadEditor';
import LoadingFallback from './LoadingFallback';
import { Container } from 'react-bootstrap';
const AuthRoutes = () => {
  return (
    <Container>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/procedures" element={<ProcedureSearch />} />
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/courts" element={<CourtSetting />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/court_search" element={<CourtSearch />} /> */}
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/cases_setting" element={<CaseTypeSet />} />

          <Route path="/legcases/show/:id" element={<LegCaseDetail />} />
          <Route path="/profile/:userId" element={<ProfileUser />} />
          <Route path="/legcases" element={<LegcaseList />} />
          <Route path="/client/create" element={<AddEditClient />} />
          <Route path="/client/edit/:id" element={<AddEditClient />} />

          <Route path="/home" element={<Home />} />
          <Route path="/lawyers/form" element={<LawyersAddEdit />} />
          {/* <Route path="/archives" element={<Archives />} /> */}
          {/* <Route path="/archives/wordpadeditor" element={<WordPadEditor />} /> */}
        </Routes>
      </Suspense>
    </Container>
  );
};

export default AuthRoutes;
