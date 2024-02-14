export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USERNAME = 'UPDATE_USERNAME'

export const loginSuccess = (user) => {
    // Store user information in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return {
        type: 'LOGIN_SUCCESS',
        payload: user,
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    return {
        type: 'LOGOUT'
    }
};

// export const updateUsername = (username) => {

//     localStorage.setItem('user', JSON.stringify(username));

//     return {
//         type: 'UPDATE_USERNAME',
//         payload: username
//     }
// }