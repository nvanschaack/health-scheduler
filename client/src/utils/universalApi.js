//seeAllByRole
export const seeAllByRole = (role) => {
    return fetch(`/api/user/role?role=${role}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json",
            // authorization: token,
        }
    })
};
//login
export const login = (data) => {
    return fetch (`/api/user/login`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
};