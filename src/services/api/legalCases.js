// src/api/legalCaseApi.js
import useAuth from "../../components/auth/AuthUser";

const useLegalCaseApi = () => {
  const { http } = useAuth();

  // Legal Case Courts
  const addLegalCaseCourts = (caseId, courts) =>
    http.post(`/api/legal-case/add_courts`, { leg_case_id: caseId, courts });

  const removeLegalCaseCourt = (caseId, courtId) =>
    http.delete(`/api/leg-case/remove-court`, {
      data: { leg_case_id: caseId, court_id: courtId },
    });

  // Courts
  const getCourts = () => http.get("/api/courts");
  const getCourtById = (id) => http.get(`/api/courts/${id}`);
  const createCourt = (data) => http.post("/api/courts", data);
  const updateCourt = (id, data) => http.put(`/api/courts/${id}`, data);
  const deleteCourt = (id) => http.delete(`/api/courts/${id}`);

  // Legal Case Types
  const getLegcaseTypes = () => http.get("/api/case_types");
  const getLegcaseTypeById = (id) => http.get(`/api/case_types/${id}`);
  const createLegcaseType = (data) => http.post("/api/case_types", data);
  const updateLegcaseType = (id, data) => http.put(`/api/case_types/${id}`, data);
  const deleteLegcaseType = (id) => http.delete(`/api/case_types/${id}`);

  // Legal Case Subtypes
  const getLegcaseSubTypes = () => http.get("/api/case_sub_types");
  const getLegcaseSubTypeById = (id) => http.get(`/api/case_sub_types/${id}`);
  const createLegcaseSubType = (data) => http.post("/api/case_sub_types", data);
  const updateLegcaseSubType = (id, data) => http.put(`/api/case_sub_types/${id}`, data);
  const deleteLegcaseSubType = (id) => http.delete(`/api/case_sub_types/${id}`);

  return {
    addLegalCaseCourts,
    removeLegalCaseCourt,
    getCourts,
    getCourtById,
    createCourt,
    updateCourt,
    deleteCourt,
    getLegcaseTypes,
    getLegcaseTypeById,
    createLegcaseType,
    updateLegcaseType,
    deleteLegcaseType,
    getLegcaseSubTypes,
    getLegcaseSubTypeById,
    createLegcaseSubType,
    updateLegcaseSubType,
    deleteLegcaseSubType,
  };
};

export default useLegalCaseApi;
