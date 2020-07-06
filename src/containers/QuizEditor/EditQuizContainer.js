import EditQuiz from "../../components/QuizEditor/Editing/editQuiz";
import {
    addQuestions,
    changeQuestion, editDescription, editQuizName, pointChecked,
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

let mapStateToProps = (state) => {
    return {
        questions: getQuestions(state),
        disabledButton: disableButton(state),
        questionNumberChanged: questionNumberChanged(state),
        answers: getAnswers(state),
    }
};
export default compose(
    connect(mapStateToProps, {
        requestQuestions,
        addQuestions,
        changeQuestion,
        questionsChanged,
        PutQuestion,
        pointChecked,
        PutQuiz,
        editDescription,
        editQuizName
    }),
    withRouter
)(EditQuiz)