import {SUCCESS_FEEDBACK} from "./actions";

let initialState = {
    Success: false
}
const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_FEEDBACK: {
            return {
                ...state,
                Success: true
            }
        }
        default:
            return state
    }

}
export default ProfileReducer;