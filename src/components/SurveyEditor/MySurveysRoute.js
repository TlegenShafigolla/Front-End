import React from "react";
// noinspection ES6CheckImport
import {Route} from "react-router-dom";
import ListSurveyPreviewContainer from "../../containers/SurveyEditor/ListSurveyPreviewContainer";
import SurveyEditContainer from "../../containers/SurveyEditor/SurveyEditContainer";

const MySurveyRoute = () => {
    return (
        <div>
            <Route exact path='/admin/survey/editor' render={()=><ListSurveyPreviewContainer/>}/>
            <Route path='/admin/survey/editor/:id' render={()=><SurveyEditContainer/>} />
        </div>
    )
};

export default MySurveyRoute;