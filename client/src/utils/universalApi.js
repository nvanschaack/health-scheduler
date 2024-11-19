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