import {SET_REPORT} from "./action";

let initialState = {
    report: null
}
const GroupReportReducer=(state=initialState,action)=>{
    switch (action.type) {
        case SET_REPORT:{
            return {
                ...state,
                report: action.data
            }
        }
        default:
            return state
    }
}
export default GroupReportReducer