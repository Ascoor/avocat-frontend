import api from './axiosConfig'; // Import your Axios instance

// ** Legal Case Courts Services **
export const addLegalCaseCourts = (caseId, courts) =>
  api.post(`/api/legal-case/add_courts`, { leg_case_id: caseId, courts });

export const removeLegalCaseCourt = (caseId, courtId) =>
  api.delete(`/api/leg-case/remove-court`, {
    data: { leg_case_id: caseId, court_id: courtId },
  });

// ** Courts Services **
export const getCourts = () => api.get('/api/courts');
export const getCourtById = (id) => api.get(`/api/courts/${id}`);
export const createCourt = (data) => api.post('/api/courts', data);
export const updateCourt = (id, data) => api.put(`/api/courts/${id}`, data);
export const deleteCourt = (id) => api.delete(`/api/courts/${id}`);

// ** Lawyers Services **
export const getLawyers = () => api.get('/api/lawyers');

// ** Legal Case Types Services **
export const getLegcaseTypes = () => api.get('/api/case_types');
export const getLegcaseTypeById = (id) => api.get(`/api/case_types/${id}`);
export const createLegcaseType = (data) => api.post('/api/case_types', data);
export const updateLegcaseType = (id, data) => api.put(`/api/case_types/${id}`, data);
export const deleteLegcaseType = (id) => api.delete(`/api/case_types/${id}`);

// ** Legal Case Subtypes Services **
export const getLegcaseSubTypes = () => api.get('/api/case_sub_types');
export const getLegcaseSubTypeById = (id) => api.get(`/api/case_sub_types/${id}`);
export const createLegcaseSubType = (data) => api.post('/api/case_sub_types', data);
export const updateLegcaseSubType = (id, data) => api.put(`/api/case_sub_types/${id}`, data);
export const deleteLegcaseSubType = (id) => api.delete(`/api/case_sub_types/${id}`);

  // ** Legal Ads Services **
  export const getLegalAds = () => api.get('/api/legal_ads');
  export const getLegalAdsByLegCaseId = (legCaseId) => api.get(`/api/legal_ads/${legCaseId}`);
  export const getLegalAdTypes = () => api.get('/api/legal_ad_types');

export const createLegalAd = (data) => api.post('/api/legal_ads', data);
export const updateLegalAd = (legalAdId, data) =>
  api.put(`/api/legal_ads/${legalAdId}`, data);
export const deleteLegalAd = (legalAdId) => api.delete(`/api/legal_ads/${legalAdId}`);
export const createLegalAdType = (data) => api.post('/api/legal_ad_types', data);

