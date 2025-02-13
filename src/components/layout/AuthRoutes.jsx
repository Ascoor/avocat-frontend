import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { useSpinner } from "../../context/SpinnerContext";
import GlobalSpinner from "../common/GlobalSpinner";
import { lazy } from "react";

// Lazy Load Components
const Home = lazy(() => import("../dashboard/Dashboard"));
const ClientsAndUnClients = lazy(() => import("../../pages/ClientUnClientList.jsx"));
const LegalServiceList = lazy(() => import("../../pages/LegalServicList"));
const CourtSearch = lazy(() => import("../Reports/SearchCourt"));
const CaseTypeSet = lazy(() => import("../Courts/case_index.component"));
const FinancialDashboard = lazy(() => import("../Financially/index"));
const LegalCasesIndex = lazy(() => import("../../pages/LegalCaseList"));
const LegCaseDetail = lazy(() => import("../LegalCases/LegalCaseDetails"));
const ProfileUser = lazy(() => import("../Settings/ProfileUser"));
const Procedures = lazy(() => import("../../pages/ProceduresList"));
const SearchCourtsApi = lazy(() => import("../../pages/SearchCourtsApi.jsx"));

const AuthRoutes = () => {
  const { showSpinner, hideSpinner, loading } = useSpinner();
  const location = useLocation();

  useEffect(() => {
    showSpinner();
    hideSpinner(); // This could be adjusted to wait for actual component loading
  }, [location]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 min-h-screen relative overflow-hidden">
      {/* Global Spinner when loading */}
      {loading && <GlobalSpinner />}

      <Suspense fallback={<GlobalSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<ClientsAndUnClients />} />
          <Route path="/legcase-services" element={<LegalServiceList />} />
          <Route path="/court-search" element={<CourtSearch />} />
          <Route path="/cases_setting" element={<CaseTypeSet />} />
          <Route path="/financial" element={<FinancialDashboard />} />
          <Route path="/legcases/show/:id" element={<LegCaseDetail />} />
          <Route path="/profile/:userId" element={<ProfileUser />} />
          <Route path="/legcases" element={<LegalCasesIndex />} />
          <Route path="/search-courts-api" element={<SearchCourtsApi />} />
          <Route path="/managment-settings/procedures" element={<Procedures />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AuthRoutes;
