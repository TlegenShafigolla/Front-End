import {connect} from "react-redux";
import Surveys from "../../components/Surveys/Surveys";
import {requestUsedSurveys} from "../../redux/Reports/Quizzes/actions";
import {getReportsSurvey} from "../../redux/Reselects/QuizGroupReport-reselect'";

let mapStateToProps=(state)=>{
    return{
        surveys:getReportsSurvey(state)
    }
}
export default connect(mapStateToProps,{requestUsedSurveys})(Surveys)