import React from "react";
import EditQuiz from "./Editing/editQuiz";
import {Route} from "react-router-dom";
import ListQuizPreview from "./Preview/listQuizPreview";

const MyQuizRoute = (props) => {
    return (
        <div>
            <Route exact path='/admin/quizzes' component={ListQuizPreview}/>
            <Route path='/admin/quizzes/edit/:id' render={()=><EditQuiz/>}/>
        </div>
    )
};
export default MyQuizRoute;