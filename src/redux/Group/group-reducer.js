import {
    CHANGE_GROUP_NAME,
    DELETE_GROUP,
    DISABLE_BUTTON, DISABLE_GROUP,
    GROUP_NAME, IS_FETCHING, POP_MEMBER,
    PUSH_GROUP, PUSH_MEMBER,
    QUIZZES,
    SET_GROUP,
    SET_MEMBERS,
    SURVEYS
} from "./actions";

let initialState = {
    groups: null,
    disableButton:false,
    surveys: null,
    quizzes: null,
    group_name: null,
    group_name_change:false,
    members: null,
    isFetching:true,
}
const GroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GROUP: {
            return {
                ...state,
                groups: action.data

            }
        }
        case DISABLE_GROUP:{
            return {
                ...state,
                group_name_change: false
            }
        }
        case POP_MEMBER:{
            return {
                ...state,
                members: [...state.members.filter(val=>val._id!==action.data._id)]
            }
        }
        case PUSH_MEMBER:{
            return {
                ...state,
                members: [
                    ...state.members,
                    action.data
                ]
            }
        }
        case IS_FETCHING:{
            return {
                ...state,
                isFetching: action.data,
            }
        }
        case QUIZZES:{
            return {
                ...state,
                quizzes: action.data,
            }
        }
        case CHANGE_GROUP_NAME:{
            return {
                ...state,
                group_name_change:true,
                group_name: action.data
            }
        }
        case SURVEYS:{
            return {
                ...state,
                surveys: action.data,
            }
        }
        case GROUP_NAME:{
            return {
                ...state,
                group_name: action.data
            }
        }
        case SET_MEMBERS:{
            return {
                ...state,
                members: action.data
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