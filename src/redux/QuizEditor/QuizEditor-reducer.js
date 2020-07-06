import {
    ADD_QUESTION, CHANGE_QUESTION_NAME, CHANGE_TYPE, DELETE_QUESTION,
    DELETE_QUIZ,
    DISABLE_BUTTON, EDIT_DESCRIPTION, EDIT_QUIZ_NAME, ERROR_QUESTION, FALSE,
    IS_FETCHING, POINTS_CHECKED,
    PUSH_QUIZ, QUESTION_NUMBER_CHANGED,
    QUIZ_LIST,
    SET_QUESTIONS
} from "./actions";

let initialState = {
    quizzes: [],
    disabledButton: false,
    isFetching: false,
    id: null,
    errorQuestion: false,
    questions: null,
    questionChanged: false,
    questionNumberChanged: false,
};
const QuizEditorReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUIZ_LIST: {
            return {
                ...state,
                quizzes: action.data
            }
        }
        case FALSE: {
            return {
                ...state,
                questionChanged: action.data,
            }
        }
        case DISABLE_BUTTON: {
            return {
                ...state,
                disabledButton: action.data
            }
        }
        case ERROR_QUESTION: {
            return {
                ...state,
                errorQuestion: true
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
        case DELETE_QUESTION: {
            let question = [...state.questions.questions.filter(val => val._id !== action.data._id)];
            for (let i = 0; i < question.length; i++) {
                if (question[i].order_id !== i + 1) {
                    question[i].order_id = i + 1
                }
            }
            return {
                ...state,
                questionNumberChanged: true,
                questions: {
                    ...state.questions,
                    questions: question

                }
            }
        }
        case CHANGE_TYPE: {
            let question = [...state.questions.questions];
            question[action.index].type = action.data;
            return {
                ...state,
                questionChanged: true,
                questions: {
                    ...state.questions,
                    questions: question
                }
            }
        }
        case QUESTION_NUMBER_CHANGED: {
            return {
                ...state,
                questionNumberChanged: action.data
            }
        }
        case CHANGE_QUESTION_NAME: {
            let question = [...state.questions.questions];
            question[action.index].question = action.data;
            return {
                ...state,
                errorQuestion: false,
                questionChanged: true,
                questions: {
                    ...state.questions,
                    questions: question
                }
            }
        }
        case EDIT_QUIZ_NAME: {
            return {
                ...state,
                questions: {
                    ...state.questions,
                    quiz_name: action.data,
                }
            }
        }
        case EDIT_DESCRIPTION: {
            return {
                ...state,
                questions: {
                    ...state.questions,
                    description: action.data,
                }
            }
        }
        case POINTS_CHECKED: {
            return {
                ...state,
                questions: {
                    ...state.questions,
                    points: action.data
                }
            }
        }
        case ADD_QUESTION: {
            return {
                ...state,
                questionChanged: true,
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