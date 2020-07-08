import React from "react";
// noinspection ES6CheckImport
import {Route} from "react-router-dom";
import EditGroup from "./EditGroup";
import GroupReport from "./GroupReport";
import GroupSurveyReport from "./Survey/GroupSurveyReport";
import GroupPreviewContainer from "../../containers/Group/GroupPreviewContainer";

class GroupRoutes extends React.Component {

    render() {
        return (
            <div>
                <Route exact path='/admin/group' render={()=><GroupPreviewContainer/>}/>
                <Route exact path='/admin/group/:id' render={() => <EditGroup/>}/>
                <Route path='/admin/group/quiz/report/:id' render={()=><GroupReport/>}/>
                <Route path='/admin/group/survey/report/:id' render={()=><GroupSurveyReport/>}/>
            </div>
        )
    }


}

export default GroupRoutes;