import {connect} from "react-redux";
import Question from "../../components/SurveyEditor/css/Question/question";
import {
    addNewAnswer,
    changeAnswer,
    deleteAnswersOnclick,
    requestAnswers, saveAnswer
} from "../../redux/SurveyEditor/Questions/actions";
import {changeQuestion, changeTypes, deleteQuestion, saveQuestion} from "../../redux/SurveyEditor/actions";
import {
    answer,
    answerChanged, disableButton,
    disabledButton, errorQuestion,
    getAnswers,
    getQuestions, questionChanged
} from "../../redux/Reselects/SurveyEditor-reselect";


let mapStateToProps = (state) => {
    return {
        answers: getAnswers(state),
        answerChanged: answerChanged(state),
        answer: answer(state),
        question_name: getQuestions(state),
        disabledButton: disabledButton(state),
        disableButton: disableButton(state),
        questionChanged: questionChanged(state),
        errorQuestion: errorQuestion(state),
    }
};
export default connect(mapStateToProps, {
    requestAnswers,
    changeAnswer,
    deleteAnswersOnclick,
    addNewAnswer,
    changeQuestion,
    deleteQuestion,
    saveAnswer,
    saveQuestion,
    changeTypes,
})(Question);
