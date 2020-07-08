import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Report from "../../components/SurveyReports/Report";
import {RequestSurveyReport} from "../../redux/Reports/Quizzes/actions";
import {getReportPersonSurvey} from "../../redux/Reselects/QuizGroupReport-reselect'";

let mapStateToProps = (state) => {
    return {
        report:getReportPersonSurvey(state)
    }
}
export default compose(connect(mapStateToProps, {RequestSurveyReport}), withRouter)(Report)