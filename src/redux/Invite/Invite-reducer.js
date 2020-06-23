import {CHECK_PERSON, GROUPS, SET_LINK, SET_PERSONS} from "./actions";

let initialState = {
    link: null,
    groups: [],
    group: [],
    selectGroup:0,
};
const QuizInviteReducer = (state = initialState, action) => {
    switch (action.type) {
        case GROUPS: {
            return {
                ...state,
                groups: action.data
            }
        }
        case SET_PERSONS: {
            return {
                ...state,
                selectGroup: action.index,
                group: [...state.groups[action.index].members,],
            }
        }
        case CHECK_PERSON: {
            const group=[...state.group];
            let groups={...group[action.id],_id:action.index};
            group[action.id]=groups;
                return {
                    ...state,
                    group:group
                }
        }
        case SET_LINK: {
            return {
                ...state,
                link: action.data
            }
        }
        default:
            return state
    }
};
export default QuizInviteReducer