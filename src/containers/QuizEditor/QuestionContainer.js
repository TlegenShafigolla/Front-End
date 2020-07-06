import {connect} from "react-redux";
import {
    addNewAnswer,
    changeAnswer,
    changePoint,
    deleteAnswersOnclick,
    requestAnswers, saveAnswer,
} from "../../redux/QuizEditor/Questions/actions";
import {
    answer,
    answerChanged, disableButton,
    disabledButton,  errorAnswer, errorDialog, errorQuestion,
    getAnswers, getQuestions,
    point, questionChanged
} from "../../redux/Reselects/QuizEditor-reselect";
import {changeQuestion, changeTypes, deleteQuestion, saveQuestion} from "../../redux/QuizEditor/actions";
import Question from "../../components/QuizEditor/Editing/Question/question";


let mapStateToProps = (state) => {
    return {
        answers: getAnswers(state),
        answerChanged: answerChanged(state),
        answer: answer(state),
        points: point(state),
        errorAnswer: errorAnswer(state),
        question_name: getQuestions(state),
        disabledButton: disabledButton(state),
        disableButton: disableButton(state),
        questionChanged: questionChanged(state),
        errorQuestion: errorQuestion(state),
        errorDialog: errorDialog(state),
    }
};
export default connect(mapStateToProps, {
    requestAnswers,
    changePoint,
    changeAnswer,
    deleteAnswersOnclick,
    addNewAnswer,
    changeQuestion,
    deleteQuestion,
    saveAnswer,
    saveQuestion,
    changeTypes,
})(Question);
