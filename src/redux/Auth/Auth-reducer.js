import {LOGIN} from "./actions";

let initialState = {
    Auth:null,
}
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                Auth: action.data,
            }
        }

        default :
            return state
    }

}

export default AuthReducer;