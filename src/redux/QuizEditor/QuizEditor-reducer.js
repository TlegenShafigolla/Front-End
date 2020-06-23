import {
    ADD_QUESTION,
    DELETE_QUIZ,
    DISABLE_BUTTON,
    GROUPS,
    IS_FETCHING,
    PUSH_QUIZ,
    QUIZ_LIST,
    SET_QUESTIONS
} from "./actions";

let initialState = {
    quizzes: [],
    disabledButton: false,
    isFetching: false,
    id: null,
    questions: null,
};
const QuizEditorReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUIZ_LIST: {
            return {
                ...state,
                quizzes: action.data
            }
        }

        case DISABLE_BUTTON: {
            return {
                ...state,
                disabledButton: action.data
            }
        }
        case PUSH_QUIZ: {
            return {
                ...state,
                id: action.data._id,
                quizzes: [...state.quizzes, action.data],
            }
        }
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.data
            }

        }
        case DELETE_QUIZ: {
            return {
                ...state,
                quizzes: [...state.quizzes.filter(val => val._id !== action.data._id)]
            }
        }
        case SET_QUESTIONS: {
            return {
                ...state,
                questions: action.data
            }
        }
        case ADD_QUESTION: {
            return {
                ...state,
                questions: {
                    ...state.questions,
                    questions: [...state.questions.questions, action.data]
                }
            }
        }
        default:
            return state
    }

};
export default QuizEditorReducer;