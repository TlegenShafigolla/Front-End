import React from "react";
import listQuizPreview from "./Existing/listQuizPreview";
import editQuiz from "./Editing/editQuiz";
import {Route} from "react-router-dom";

const MyQuizRoute = () => {
    return (
        <div>
            <Route exact path='/admin/quizzes' component={listQuizPreview}/>
            <Route path='/admin/quizzes/edit/:id' component={editQuiz}/>
        </div>
    )
}
export default MyQuizRoute;