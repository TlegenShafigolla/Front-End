import React from "react";
import {Route} from "react-router-dom";
import ReportPersonSurveyContainer from "../../containers/Reports/ReportPersonSurveyContainer";


const ReportSurveyRoute = () => {
    return (
        <div>
            <Route  path='/admin/survey/reports/:id' render={() => <ReportPersonSurveyContainer/>}/>
        </div>
    );
}

export default ReportSurveyRoute;