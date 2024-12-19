//seeDayOfAppts
export const dayOfAppts = (token) => {
  return fetch("/api/appointment/dayOfAppts", {
    method: "GET", //get method is default - don't need this
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  });
};
//seeOneApptProvider
export const seeOneApptProvider = (token, data) => {
  return fetch(`/api/appointment/seeOneApptProvider`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });
};
//addMedicalHx
export const addMedicalHx = (token, data) => {
  return fetch(`/api/medicalHx`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });
};
//getMedicalHx
export const getMedicalHx = (token, patientId) => {
  return fetch(`/api/medicalHx/${patientId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  });
};
//seeAllAvailability - provider
export const seeAllAvailability = (token) => {
  return fetch(`/api/availability/all`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  });
};
export const setAvailability = (token, data) => {
  return fetch(`/api/availability/set`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });
};
