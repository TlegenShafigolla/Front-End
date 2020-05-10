import React from "react";
import EditQuiz from "./Edition/editQuiz";
import {Route} from "react-router-dom";
import ListQuizPreview from "./Preview/listQuizPreview";

const MyQuizRoute = () => {
    return (
        <div>
            <Route exact path='/admin/quizzes' component={ListQuizPreview}/>
            <Route path='/admin/quizzes/edit/:id' render={()=><EditQuiz/>}/>
        </div>
    )
}
export default MyQuizRoute;