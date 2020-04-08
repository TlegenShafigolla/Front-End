import React from "react";
import {Route} from "react-router-dom";
import listReportPreview from "./listReportPreview";
import Report from "./Report";


class ReportRoute extends React.Component{
    render() {
        return(
            <div>
                <Route exact path='/admin/reports' component={Report}/>
                <Route path='/admin/reports/:id' component={listReportPreview}/>
            </div>
        );
    }
}

export default ReportRoute;