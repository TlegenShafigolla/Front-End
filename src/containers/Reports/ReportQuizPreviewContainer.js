import {getReports} from "../../redux/Reselects/QuizGroupReport-reselect'";
import Quizzes from "../../components/Quizzes/Quizzes";
import {connect} from "react-redux";
import {requestUsedQuiz} from "../../redux/Reports/Quizzes/actions";

let mapStateToProps=(state)=>{
    return{
        quizzes:getReports(state)
    }
}
export default connect(mapStateToProps,{requestUsedQuiz})(Quizzes)