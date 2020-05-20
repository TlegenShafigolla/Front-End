import React from "react";
import {Route} from "react-router-dom";
import ListSurveyPreview from "./listSurveysPreview";
import EditSurvey from "./editSurvey";

const MySurveyRoute = () => {
    return (
        <div>
            <Route exact path='/admin/survey/editor' component={ListSurveyPreview}/>
            <Route path='/admin/survey/editor/edit/:id' component={EditSurvey} />
        </div>
    )
};

export default MySurveyRoute;