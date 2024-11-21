//seeAllApptsByPatient
//seeOneApptPatient

//seeAvailability
export const seeAvailability = (data, token) => {
  return fetch("/api/availability/see", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token
    },
    body: JSON.stringify(data),
  })
};
//bookAppt
export const bookAppt = (data, token) => {
  return fetch(`/api/appointment/patient`, {
    method: 'POST',
    headers: {
      "content-type": "application/json",
      authorization: token
    },
    body: JSON.stringify(data),
  })
};
