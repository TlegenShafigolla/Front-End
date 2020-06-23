import EditQuiz from "../../components/QuizEditor/Editing/editQuiz";
import {addNewQuestion, requestQuestions} from "../../redux/QuizEditor/actions";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {disableButton, getQuestions} from "../../redux/Reselects/QuizEditor-reselect";

let mapStateToProps = (state) => {
    return {
        questions: getQuestions(state),
        disabledButton:disableButton(state),
    }
}
export default compose(
    connect(mapStateToProps, {requestQuestions,addNewQuestion}),
    withRouter
)(EditQuiz)