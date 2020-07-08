import React from "react";
// noinspection ES6CheckImport
import {Route} from "react-router-dom";
import ReportSurveyContainer from "../../containers/Reports/ReportSurveyContainer";
import ReportSurveyPreviewContainer from "../../containers/Reports/ReportSurveyPreviewContainer";

const SurveysRoute = () => {
    return (
        <div>
            <Route exact path='/admin/surveys' render={()=><ReportSurveyPreviewContainer/>}/>
            <Route path='/admin/surveys/:id' render={()=><ReportSurveyContainer/>}/>
        </div>
    )
};
export default SurveysRoute;