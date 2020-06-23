import {ERROR, GET_PROFILE, LOGIN, LOGOUT, REGISTER} from "./actions";

let initialState = {
    Register: false,
    Profile: null,
    isLoggedIn:null,
    error: false
};
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                Auth: action.data,
            }
        }
        case REGISTER: {
            return {
                ...state,
                Register: true
            }
        }
        case GET_PROFILE: {
            return {
                ...state,
                Profile: action.data,
                isLoggedIn:true
            }
        }
        case LOGOUT: {
            localStorage.clear();
            return {
                ...state,
                Profile: null,
                isLoggedIn:false,
                Register: false,
            }
        }
        case ERROR: {
            return {
                ...state,
                error: true,
            }
        }
        default :
            return state
    }

};

export default AuthReducer;