import React from "react";
// noinspection ES6CheckImport
import {Route} from "react-router-dom";
import Quizzes from "./Quizzes";
import Quiz from "./Quiz";

const   QuizzesRoute = () => {
    return (
        <div>
            <Route exact path='/admin/quizzes' render={()=><Quizzes/>}/>
            <Route path='/admin/quizzes/:id' component={Quiz}/>
        </div>
    )
};
export default QuizzesRoute;