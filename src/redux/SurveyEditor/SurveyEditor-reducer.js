import {
    ADD_QUESTION,
    DELETE_SURVEY,
    DISABLE_BUTTON, EDIT_DESCRIPTION,
    EDIT_SURVEY_NAME,
    IS_FETCHING,
    PUSH_SURVEY,
    SET_QUESTIONS,
    SURVEY_LIST,
    CHANGE_TYPE,
    QUESTION_NUMBER_CHANGED, CHANGE_QUESTION_NAME, FALSE, ERROR_QUESTION, DELETE_QUESTION
} from "./actions";

let initialState = {
    questions:null,
    surveys: [],
    disabledButton: false,
    id: null,
    isFetching: false,
    questionChanged: false,
    errorQuestion: false,
    questionNumberChanged: false,
};
const SurveyEditorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SURVEY_LIST: {
            return {
                ...state,
                surveys: action.data
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
        case FALSE: {
            return {
                ...state,
                questionChanged: action.data,
            }
        }
        case EDIT_SURVEY_NAME:{
            return {
                ...state,
                questions: {
                    ...state.questions,
                    survey_name: action.data,
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
        case SET_QUESTIONS: {
            return {
                ...state,
                questions: action.data
            }
        }
        case DELETE_SURVEY: {
            return {
                ...state,
                surveys: [...state.surveys.filter(val => val._id !== action.data._id)]
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
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.data
            }
        }
        case DISABLE_BUTTON: {
            return {
                ...state,
                disabledButton: action.data
            }
        }
        case PUSH_SURVEY: {
            return {
                ...state,
                id: action.data._id,
                surveys: [...state.surveys, action.data],
            }
        }
        case ERROR_QUESTION: {
            return {
                ...state,
                errorQuestion: true
            }
        }
        case QUESTION_NUMBER_CHANGED: {
            return {
                ...state,
                questionNumberChanged: action.data
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
export default SurveyEditorReducer;