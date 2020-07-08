import getUsedQuiz from "../../../services/API/adminAPI/Quiz/usedQuizzes";
import getUsedQuizQuestions from "../../../services/API/adminAPI/Quiz/usedQuizQuestions";
import getUsedQuizInvitations from "../../../services/API/adminAPI/Quiz/usedQuizInvitations";
import getUsedSurveyQuestions from "../../../services/API/adminAPI/Survey/usedSurveyQuestions";
import getUsedSurveyInvitations from "../../../services/API/adminAPI/Survey/usedSurveyInvitations";
import getUsedSurvey from "../../../services/API/adminAPI/Survey/usedSurveys";
import {getReport, postReport} from "../../../services/API/adminAPI/Quiz/reports";
import {getReportId} from "../../../services/API/adminAPI/Survey/reports";

export const SET_USED_QUIZ = "REPORT/SET_USED_QUIZ"
export const SET_USED_SURVEY = "REPORT/SET_USED_SURVEY"
export const SET_USED_QUESTIONS = "REPORT/SET_USED_QUESTIONS"
export const SET_USED_INVITATIONS_SURVEY = "REPORT/SET_USED_INVITATIONS_SURVEY"
export const SET_USED_INVITATIONS= "REPORT/SET_USED_INVITATIONS"
export const SET_USED_SURVEYS = "REPORT/SET_USED_SURVEYS"
export const SET_REPORT = "REPORT/SET_REPORT"
export const SET_REPORT_SURVEY = "REPORT/SET_REPORT_SURVEY"

const setUSed = (data) => ({type: SET_USED_QUIZ, data})
const setUSedSurvey = (data) => ({type: SET_USED_SURVEY, data})
const setReport = (data) => ({type: SET_REPORT, data})
const setReportSurvey = (data) => ({type: SET_REPORT_SURVEY, data})
const setUsedQuestions = (data) => ({type: SET_USED_QUESTIONS, data})
const setUsedSurveys = (data) => ({type: SET_USED_SURVEYS, data})
const setUsedInvitations = (data) => ({type: SET_USED_INVITATIONS, data})
const setUsedInvitationsSurvey = (data) => ({type: SET_USED_INVITATIONS_SURVEY, data})

export const requestUsedQuiz = () => async (dispatch) => {
    let data = await getUsedQuiz()
    dispatch(setUSed(data))
}
export const requestUsedSurveys = () => async (dispatch) => {
    let data = await getUsedSurvey()
    dispatch(setUSedSurvey(data))
}
export const requestUsedQuestions = (id) => async (dispatch) => {
    let data = await getUsedQuizQuestions(id)
    dispatch(setUsedQuestions(data))
}
export const requestUsedInvite = (id) => async (dispatch) => {
    let val = await getUsedQuizInvitations(id)
    dispatch(setUsedInvitations(val))
}
export const requestUsedSurvey = (id) => async (dispatch) => {
    let data = await getUsedSurveyQuestions(id)
    dispatch(setUsedSurveys(data))

}
export const requestUsedInvitations = (id) => async (dispatch) => {
    let val = await getUsedSurveyInvitations(id)
    dispatch(setUsedInvitationsSurvey(val))
}
export const RequestReport = (id) => async (dispatch) => {
    let data = await getReport(id)
    dispatch(setReport(data))
}
export const RequestSurveyReport = (id) => async (dispatch) => {
    let data = await getReportId(id)
    dispatch(setReportSurvey(data))
}
export const PutReport = (id, points, session_id) => async () => {
    await postReport(id, points, session_id)
}