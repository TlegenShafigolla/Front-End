import React from "react";
import listQuizPreview from "./Existing/listQuizPreview";
import Route from "react-router-dom/es/Route";
import editQuiz from "./Editing/editQuiz";
const MyQuizRoute=()=>{
return(
    <div>
        <Route path='/admin/quizzes/edit' component={editQuiz}/>
        <Route exact path='/admin/quizzes' component={listQuizPreview}/>
    </div>
)
}
export default MyQuizRoute;