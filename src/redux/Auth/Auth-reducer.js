import {LOGIN, REGISTER} from "./actions";

let initialState = {
    Auth:null,
    Register:false
}
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                Auth: action.data,
            }
        }
        case REGISTER:{
            return {
                ...state,
                Register: true
            }
        }
        default :
            return state
    }

}

export default AuthReducer;