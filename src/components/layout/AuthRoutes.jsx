import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Lawyers from '../lawyer/lawyer_index.component';
import LawyersAddEdit from '../lawyer/lawyer_index.component';
import CourtSetting from '../setting/court_index.component';
// import CourtSearch from "../reports/court_search.component";
import CaseTypeSet from '../setting/case_index.component';
import AddEditClient from '../client/add_edit_client.component';

import ClientsList from '../client/ClientsList';
import LegcaseList from '../legcase/list.component';
import LegCaseDetail from '../legcase/leg_case_detail.component';
import Services from '../service/index';
import LegalSession from '../legcase/tools/Legal_session.component';
import ProcedureSearch from '../reports/procedure_search.component';
import LegCaseCreate from '../legcase/create.component';
import ProfileUser from '../Auth/ProfileUser';
import Archives from '../Archives/ArchiveDashboard';
import WordPadEditor from '../Archives/WordPadEditor/WordPadEditor';
import { Container, Row, Col } from 'react-bootstrap';
const AuthRoutes = () => {
  return (
    <Container fluid>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/procedures" element={<ProcedureSearch />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/courts" element={<CourtSetting />} />
        <Route path="/services" element={<Services />} />
        {/* <Route path="/court_search" element={<CourtSearch />} /> */}
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/cases_setting" element={<CaseTypeSet />} />
        <Route path="/client/create" element={<AddEditClient />} />
        <Route path="/client/edit/:id" element={<AddEditClient />} />
        <Route path="/legcases/show/:id" element={<LegCaseDetail />} />
        <Route path="/profile/:userId" element={<ProfileUser />} />
        <Route path="/legcases" element={<LegcaseList />} />
        <Route
          path="/legcases/edit/:id"
          element={<LegCaseCreate isEditing={true} />}
        />
        <Route
          path="/legcases/create"
          element={<LegCaseCreate isEditing={false} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/lawyers/form" element={<LawyersAddEdit />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/archives/wordpadeditor" element={<WordPadEditor />} />
        </Routes>

    </Container>
  );
};

export default AuthRoutes;