import {getReport} from "../../redux/Reselects/QuizGroupReport-reselect'";
import {connect} from "react-redux";
import GroupSurveyReport from "../../components/Groups/Survey/GroupSurveyReport";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {requestSurveyReportGroup} from "../../redux/Reports/Group/action";

let mapStateToProps=(state)=>{
  return {
      report: getReport(state)
  }}
export default compose(connect(mapStateToProps,{requestSurveyReportGroup}),withRouter)(GroupSurveyReport)
