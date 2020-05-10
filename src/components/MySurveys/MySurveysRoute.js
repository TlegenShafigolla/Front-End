import React from "react";
import {Route} from "react-router-dom";
import ListSurveyPreview from "./listSurveysPreview";
import EditSurvey from "./editSurvey";

const MySurveyRoute = () => {
    return (
        <div>
            <Route exact path='/admin/surveys' component={ListSurveyPreview}/>
            <Route path='/admin/surveys/edit/:id' component={EditSurvey} />
        </div>
    )
};

export default MySurveyRoute;