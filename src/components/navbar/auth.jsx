import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import useAuth from "../auth/AuthUser";
import Home from "../home";
import TopNav from "./TopNav";
import SidebarHeader from "./SidebarHeader";
  /**Settings**/
  import Lawyers from "../setting/lawyer_index.component";
  import LawyersAddEdit from "../setting/lawyer_index.component";
  import CourtSetting from "../setting/court_index.component";
  // import CourtSearch from "../reports/court_search.component";
  import CaseTypeSet from "../setting/case_index.component";
  /**Clients**/
  import AddEditClient from "../client/add_edit_client.component";
  import Clients from "../client/list.component";
  /**LegCases**/
  import LegCaseDetail from "../legcase/leg_case_detail.component";
  import LegCase from "../legcase/create.component";
  import LegcaseList from "../legcase/list.component";
  import LegalSession from "../legcase/tools/Legal_session.component";
  // /**reports**/
   import ProfileUpdateComponent from "../auth/profile";
   import ProcedureSearch from "../reports/procedure_search.component";
  import Footer from "./Footer";


  const Auth = () => {
    const { token, logout } = useAuth();
    const userId = useAuth().user.id;
    const logoutUser = () => {
      if (token !== undefined) {
        logout();
      }
    };
  
   
  
    return (
      <>
     <TopNav
        userId={userId}
        ProfileUpdateComponent={ProfileUpdateComponent}
        logoutUser={logoutUser}
       />
     
      <div id="main">
      <Container>
            <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/procedures" element={<ProcedureSearch />} />
                          <Route path="/clients" element={<Clients />} />
                          <Route path="/courts" element={<CourtSetting />} />
                          {/* <Route path="/court_search" element={<CourtSearch />} /> */}
                          <Route path="/lawyer_setting" element={<Lawyers />} />
                          <Route path="/cases_setting" element={<CaseTypeSet />} />
                          <Route path="/client/create" element={<AddEditClient />} />
                          <Route path="/client/edit/:id" element={<AddEditClient />} />
                          <Route path="/legcases/show/:userId" element={<LegCaseDetail />} />
                          <Route path="/legcases" element={<LegcaseList />} />
                          <Route path="/legcases/create" element={<LegCase />} />
                          <Route path="/legal_session" element={<LegalSession />} />
                          <Route path="/lawyers/form" element={<LawyersAddEdit />} />
                          <Route path="/profile/:userId" element={<ProfileUpdateComponent />} />
                          <Route path="/home" element={<Home />} />
                          {/* <Route path="/legal_doc_list" element={<LegalDocList />} /> */}
                          {/* <Route path="/legal_doc_create" element={<LegalDocCreate />} /> */}
                          </Routes>
                          </Container>
        </div>
      <Footer />
    </>
    );
  };

  export default Auth;
