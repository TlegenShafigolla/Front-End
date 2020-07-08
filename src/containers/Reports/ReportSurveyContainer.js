import {connect} from "react-redux";
import {compose} from "redux";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import Survey from "../../components/Surveys/Survey";
import {requestUsedInvitations, requestUsedSurvey} from "../../redux/Reports/Quizzes/actions";
import {
    getInvitationsSurvey,
    getQuestions,
    getSessions,
    getSurvey
} from "../../redux/Reselects/QuizGroupReport-reselect'";

let mapStateToProps = (state) => {
    return {
        survey: getSurvey(state),
        questions: getQuestions(state),
        invitations: getInvitationsSurvey(state),
        sessions: getSessions(state)
    }
}
export default compose(connect(mapStateToProps, {requestUsedSurvey,requestUsedInvitations}), withRouter)(Survey)