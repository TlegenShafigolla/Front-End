import React from "react";
import {Route} from "react-router-dom";
import ReportPersonContainer from "../../containers/Reports/ReportPersonContainer";


const ReportRoute = () => {
    return (
        <div>
            <Route path='/admin/reports/:id' render={() => <ReportPersonContainer/>}/>
        </div>
    );
}

export default ReportRoute;