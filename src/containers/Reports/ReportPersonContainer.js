import {connect} from "react-redux";
import {compose} from "redux";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import {PutReport, RequestReport} from "../../redux/Reports/Quizzes/actions";
import Report from "../../components/QuizReports/Report";
import {getReportPerson} from "../../redux/Reselects/QuizGroupReport-reselect'";

let mapStateToProps = (state) => {
    return {
        report:getReportPerson(state)
    }
}
export default compose(connect(mapStateToProps, {RequestReport,PutReport}), withRouter)(Report)