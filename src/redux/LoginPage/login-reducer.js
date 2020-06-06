import {CHANGE_EMAIL, CHANGE_PASSWORD} from "./actions";

let initialState = {
    email: '',
    password: '',
    loggedIn: false,
    disabledButton: false,
    error: false
}
const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_EMAIL: {
            return {
                ...state,
                email: action.email,
                error: false
            }
        }
        case CHANGE_PASSWORD: {
            return {
                ...state,
                password: action.password,
                error: false
            }
        }
        default :
            return state
    }

}

export default LoginReducer;