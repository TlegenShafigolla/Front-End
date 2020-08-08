import EditQuiz from "../../components/QuizEditor/Editing/editQuiz";
import {
    addQuestions, changePoints,
    editDescription, editQuizName, pointChecked,
    PutQuestion, PutQuiz, questionsChanged,
    requestQuestions
} from "../../redux/QuizEditor/actions";
import {connect} from "react-redux";
import {compose} from "redux";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import {
    disableButton,
    getAnswers,
    getQuestions,
    questionNumberChanged
} from "../../redux/Reselects/QuizEditor-reselect";
import {getGroups, getPerson, getSelectGroup} from "../../redux/Reselects/Quiz_invite-reselect";
import {postInvite} from "../../redux/QuizEditor/Invite/actions";

let mapStateToProps = (state) => {
    return {
        questions: getQuestions(state),
        disabledButton: disableButton(state),
        questionNumberChanged: questionNumberChanged(state),
        answers: getAnswers(state),
        groups:getGroups(state),
        group:getPerson(state),
        selectGroup:getSelectGroup(state),
    }
};
export default compose(
    connect(mapStateToProps, {
        requestQuestions,
        addQuestions,
        questionsChanged,
        PutQuestion,
        changePoints,
        pointChecked,
        PutQuiz,
        editDescription,
        editQuizName,
        postInvite
    }),
    withRouter
)(EditQuiz)