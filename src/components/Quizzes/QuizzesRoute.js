import React from "react";
// noinspection ES6CheckImport
import {Route} from "react-router-dom";
import ReportQuiz from "../../containers/Reports/ReportQuizPreviewContainer";
import ReportQuizContainer from "../../containers/Reports/ReportQuizContainer";

const   QuizzesRoute = () => {
    return (
        <div>
            <Route exact path='/admin/quizzes' render={()=><ReportQuiz/>}/>
            <Route path='/admin/quizzes/:id' render={()=><ReportQuizContainer/>}/>
        </div>
    )
};
export default QuizzesRoute;