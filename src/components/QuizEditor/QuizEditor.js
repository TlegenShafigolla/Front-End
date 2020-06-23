import React from "react";
import {Route} from "react-router-dom";
import ListQuizPreviewContainer from "../../containers/QuizEditor/ListQuizPreviewContainer";
import EditQuizContainer from "../../containers/QuizEditor/EditQuizContainer";

const QuizEditor = (props) => {
    return (
        <div>
            <Route exact path='/admin/quiz/editor' render={()=><ListQuizPreviewContainer/>}/>
            <Route path='/admin/quiz/editor/:id' render={()=><EditQuizContainer/>}/>
        </div>
    )
};
export default QuizEditor;