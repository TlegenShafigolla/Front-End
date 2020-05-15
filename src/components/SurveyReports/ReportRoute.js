import React from "react";
import {Route} from "react-router-dom";
import ListReportSurveyPreview from "./ListReportPreview";
import Report from "./Report";


class ReportSurveyRoute extends React.Component {
    render() {
        return (
            <div>
                <Route exact path='/admin/surveys/reports' component={ListReportSurveyPreview}/>
                <Route path='/admin/surveys/reports/:id' component={Report}/>
            </div>
        );
    }
}

export default ReportSurveyRoute;