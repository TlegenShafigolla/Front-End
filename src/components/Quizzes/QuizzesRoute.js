import React from "react";
import {Route} from "react-router-dom";
import Quizzes from "./Quizzes";
import Quiz from "./Quiz";

const   QuizzesRoute = (props) => {
    return (
        <div>
            <Route exact path='/admin/quizzes' component={Quizzes}/>
            <Route path='/admin/quizzes/:id' component={Quiz}/>
        </div>
    )
};
export default QuizzesRoute;