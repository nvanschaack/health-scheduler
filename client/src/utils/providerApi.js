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
        method: 'POST',
        headers: {
            "content-type": "application/json",
            authorization: token
        },
        body: JSON.stringify(data)
    })
}
