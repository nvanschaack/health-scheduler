//login
//seeAllApptsByPatient
//seeOneApptPatient

//seeAvailability
export const seeAvailability = (data) => {
  return fetch("/api/availability/see", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // authorization: token
    },
    body: JSON.stringify(data),
  });
};
