import { LOGIN_SUCCESS, LOGOUT } from "./userActions"

const initialState = {
    isAuthenticated: false,
    currentUser: null
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                currentUser: action.payload
            }
        // case UPDATE_USERNAME:
        //     return {
        //         ...state,
        //         currentUser: {
        //             ...state.currentUser,
        //             username: action.payload
        //         }
        //     }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                currentUser: null
            }
        default:
            return state
    }
}

export default userReducer