import React from "react";
import EditQuiz from "./Editing/editQuiz";
import {Route} from "react-router-dom";
import ListQuizPreview from "./Preview/listQuizPreview";

const QuizEditor = (props) => {
    return (
        <div>
            <Route exact path='/admin/quiz/editor' component={ListQuizPreview}/>
            <Route path='/admin/quiz/editor/edit/:id' render={()=><EditQuiz/>}/>
        </div>
    )
};
export default QuizEditor;