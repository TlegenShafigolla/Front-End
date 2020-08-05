import {
    ADD_NEW_ANSWER,
    CHANGE_ANSWER,
    CHANGE_ANSWER_FALSE,
    CHANGE_POINT, CHANGE_POINTS,
    DELETE_ANSWER,
    DELETE_ANSWER_SERVER,
    DISABLE_BUTTON,
    ERROR,
    OPEN_ERROR_DIALOG,
    SET_ANSWERS,
} from "./actions";

let initialState = {
    answers: [],
    answerChanged: false,
    disabledButton: false,
    error:false,
    errorDialog:false,
};
const QuizQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ANSWERS: {
            let answer=[...state.answers];
            answer[action.index]=action.data;
                return {
                    ...state,
                    answers: answer
            }
        }
        case OPEN_ERROR_DIALOG:{
            return {
                ...state,
                errorDialog:true,
            }
        }
        case ERROR:{
            return {
                ...state,
                error:true,
            }
        }
        case DISABLE_BUTTON: {
            return {
                ...state,
                disabledButton: action.data
            }
        }
        case CHANGE_ANSWER_FALSE:{
            return {
                ...state,
                answerChanged: false
            }
        }
        case CHANGE_POINT: {
            console.log(action.point)
            return {
                ...state,
                errorDialog: false,
                answerChanged: true,
                points: state.answers[action.index][action.id] = {
                    ...state.answers[action.index][action.id],
                    points: Number(action.point)
                },
            }
        }
        case CHANGE_ANSWER: {
            return {
                ...state,
                error: false,
                answerChanged: true,
                answer: state.answers[action.index][action.id] = {
                    ...state.answers[action.index][action.id],
                    answer: action.value
                },
            }
        }
        case DELETE_ANSWER: {
            let answer = [...state.answers];
            if(action.id!==null) {
                answer[action.index].splice(action.id, 1);
            }
            else{
                answer.splice(action.index,1)
            }
            return {
                answerChanged: true,
                ...state,
                answers: answer
            }
        }
        case DELETE_ANSWER_SERVER: {
            const answer = [...state.answers];
            answer[action.index] = answer[action.index].filter(val => val._id !== action.id);
            return {
                ...state,
                answers: answer
            }
        }
        case ADD_NEW_ANSWER:
            let answer = [...state.answers];
                answer[action.index].push(action.data);
            return {
                ...state,
                answerChanged: true,
                answers: answer
            };

        default:
            return state
    }
};
export default QuizQuestionsReducer;