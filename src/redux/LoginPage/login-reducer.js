import {LOGIN} from "./actions";

let initialState = {
    Auth: false,
}
const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                Auth: true
            }
        }

        default :
            return state
    }

}

export default LoginReducer;