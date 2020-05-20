import React from "react";
import {Route} from "react-router-dom";
import Surveys from "./Surveys";
import Survey from "./Survey";

const SurveysRoute = (props) => {
    return (
        <div>
            <Route exact path='/admin/surveys' component={Surveys}/>
            <Route path='/admin/surveys/:id' component={Survey}/>
        </div>
    )
};
export default SurveysRoute;