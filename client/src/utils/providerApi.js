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
