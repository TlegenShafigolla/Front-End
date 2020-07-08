import {connect} from "react-redux";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import GroupReport from "../../components/Groups/GroupReport";
import {compose} from "redux";
import {requestReportGroup} from "../../redux/Reports/Group/action";
import {getReport} from "../../redux/Reselects/QuizGroupReport-reselect'";

let mapStateToProps = (state) => {
    return {
        report: getReport(state)
    }
}
export default compose(
    connect(mapStateToProps, {requestReportGroup}),
    withRouter
)(GroupReport)