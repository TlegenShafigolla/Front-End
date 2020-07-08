import {getReportGroup, getSurveyReportGroup} from "../../../services/API/adminAPI/Group/Report";

export const SET_REPORT = 'GROUP_REPORT/SET_REPORT'

const setReport = (data) => ({type: SET_REPORT, data})
export const requestReportGroup = (id) => async (dispatch) => {
    let data = await getReportGroup(id)
    dispatch(setReport(data))
}
export const requestSurveyReportGroup = (id) => async (dispatch) => {
    let data = await getSurveyReportGroup(id)
    dispatch(setReport(data))
}