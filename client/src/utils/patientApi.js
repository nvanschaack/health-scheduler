//seeAvailability
export const seeAvailability = (data, token) => {
  return fetch("/api/availability/see", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });
};
//bookAppt
export const bookAppt = (data, token) => {
  return fetch(`/api/appointment/patient`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });
};
//seeAllApptsByPatient
export const seeAllApptsByPatient = (token) => {
  return fetch(`/api/appointment/seeAllApptsByPatient`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
  });
};
//seeOneApptPatient
export const seeOneApptPatient = (data, token) => {
  return fetch(`/api/appointment/seeOneApptPatient`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });
};
