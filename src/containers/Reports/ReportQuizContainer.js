import {connect} from "react-redux";
import Quiz from "../../components/Quizzes/Quiz";
import {compose} from "redux";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import {requestUsedInvite, requestUsedQuestions} from "../../redux/Reports/Quizzes/actions";
import {getInvitations, getQuestions, getQuiz, getSessions} from "../../redux/Reselects/QuizGroupReport-reselect'";

let mapStateToProps = (state) => {
    return {
        quiz: getQuiz(state),
        questions: getQuestions(state),
        invitations: getInvitations(state),
        sessions: getSessions(state)
    }
}
export default compose(connect(mapStateToProps, {requestUsedQuestions,requestUsedInvite}), withRouter)(Quiz)