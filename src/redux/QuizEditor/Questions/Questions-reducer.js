import {ADD_NEW_ANSWER, CHANGE_ANSWER, CHANGE_POINT, DELETE_ANSWER, SET_ANSWERS} from "./actions";

let initialState = {
    answers: [],
};
const QuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ANSWERS: {
            return {
                ...state,
                answers: [...state.answers, action.data]
            }
        }
        case CHANGE_POINT: {
            return {
                ...state,
                answers: [
                    ...state.answers,
                ],
                ...state.answers[action.index][action.id].points = action.point,
            }
        }
        case CHANGE_ANSWER: {
            return {
                ...state,
                answers: [
                    ...state.answers,
                ],
                ...state.answers[action.index][action.id].answer = action.value,
                // answers: [
                //     ...state.answers,
                //     state.answers[action.index
                //         ][action.id] = {
                //         ...state.action[action.index][action.id],
                //         answer: action.value
                //     },
                // ]
            }
        }
        case DELETE_ANSWER: {
            return {
                ...state,
                answers: [
                    ...state.answers,
                ],
                ...state.answers[action.index].splice(action.id, 1),

            }
        }
        case ADD_NEW_ANSWER:
            return {
                ...state,
                answers: {...state.answers, ...state.answers[action.index].push(action.data)}

            };

        default:
            return state
    }
};
export default QuestionsReducer;