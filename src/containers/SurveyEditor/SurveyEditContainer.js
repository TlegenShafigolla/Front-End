import {connect} from "react-redux";
import {compose} from "redux";
// noinspection ES6CheckImport
import {withRouter} from "react-router-dom";
import EditSurvey from "../../components/SurveyEditor/Editing/editSurvey";
import {
    addQuestions,
    editDescription,
    editSurveyName,
    PutQuestion,
    PutSurvey, questionsChanged,
    requestQuestions
} from "../../redux/SurveyEditor/actions";
import {
    disableButton,
    getAnswers,
    getQuestions,
    questionNumberChanged
} from "../../redux/Reselects/SurveyEditor-reselect";


let mapStateToProps = (state) => {
    return {
        questions:getQuestions(state),
        disabledButton: disableButton(state),
        questionNumberChanged: questionNumberChanged(state),
        answers: getAnswers(state),
    }
};
export default compose(
    connect(mapStateToProps, {
        requestQuestions,
        addQuestions,
        editSurveyName,
        questionsChanged,
        editDescription,
        PutQuestion,
        PutSurvey,
    }),
    withRouter
)(EditSurvey)