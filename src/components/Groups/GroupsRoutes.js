import React from "react";
import {Route} from "react-router-dom";
import EditGroup from "./EditGroup";
import GroupsPreview from "./GroupsPreview";
import GroupReport from "./GroupReport";
import GroupSurveyReport from "./Survey/GroupSurveyReport";

class GroupRoutes extends React.Component {

    render() {
        return (
            <div>
                <Route exact path='/admin/group' component={GroupsPreview}/>
                <Route exact path='/admin/group/:id' render={() => <EditGroup/>}/>
                <Route path='/admin/group/quiz/report/:id' render={()=><GroupReport/>}/>
                <Route path='/admin/group/survey/report/:id' render={()=><GroupSurveyReport/>}/>
            </div>
        )
    }


}

export default GroupRoutes;