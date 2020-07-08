import {
    SET_REPORT,
    SET_REPORT_SURVEY,
    SET_USED_INVITATIONS,
    SET_USED_QUESTIONS,
    SET_USED_QUIZ, SET_USED_SURVEY,
    SET_USED_SURVEYS,
    SET_USED_INVITATIONS_SURVEY
} from "./actions";

let initialState = {
    reports: [],
    reportsSurvey: [],
    report: null,
    quiz: null,
    invitationsSurvey:[],
    reportSurvey:null,
    questions: [],
    invitations: [],
    sessions: [],
    survey: null,
    points: 0
}
const ReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USED_SURVEYS: {
            return {
                survey: action.data.survey,
                questions: action.data.questions
            }
        }
        case SET_USED_INVITATIONS_SURVEY:{
            return {
                ...state,
                invitationsSurvey: action.data.invitations,
            }
        }
        case SET_REPORT_SURVEY: {
            return {
                ...state,
                reportSurvey:action.data
            }
        }
        case SET_REPORT: {
            return {
                ...state,
                report: action.data
            }
        }
        case SET_USED_QUIZ: {
            return {
                ...state,
                reports: action.data
            }
        }
        case SET_USED_SURVEY:{
            return {
                ...state,
                reportsSurvey: action.data
            }
        }
        case SET_USED_INVITATIONS: {
            return {
                ...state,
                invitations: action.data.invitations,
                sessions: action.data.sessions
            }
        }
        case SET_USED_QUESTIONS: {
            return {
                ...state,
                quiz: action.data.quiz,
                questions: action.data.questions
            }
        }
        default:
            return state
    }
}
export default ReportReducer