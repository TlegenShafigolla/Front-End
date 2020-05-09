import React from "react";
import {Route} from "react-router-dom";
import ListSurveyPreview from "./listSurveysPreview";

const MySurveyRoute = () => {
    return (
        <div>
            <Route exact path='/admin/surveys' component={ListSurveyPreview}/>
        </div>
    )
};

export default MySurveyRoute;