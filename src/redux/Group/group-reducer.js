import {DELETE_GROUP, DISABLE_BUTTON, PUSH_GROUP, SET_GROUP} from "./actions";

let initialState = {
    groups: null,
    disableButton:false
}
const GroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GROUP: {
            return {
                ...state,
                groups: action.data

            }
        }
        case DISABLE_BUTTON:{
            return {
                ...state,
                disableButton:action.data
            }
        }
        case PUSH_GROUP:{
            return {
                ...state,
                groups: [
                    ...state.groups,
                    action.data
                ]
            }
        }
        case DELETE_GROUP:{
            return {
                ...state,
                groups: [...state.groups.filter(val=>val._id!==action.data._id)]
            }
        }
        default:
            return state
    }
}
export default GroupReducer