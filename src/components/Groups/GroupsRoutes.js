import React from "react";
// noinspection ES6CheckImport
import {Route} from "react-router-dom";
import GroupPreviewContainer from "../../containers/Group/GroupPreviewContainer";
import EditGroupContainer from "../../containers/Group/EditGroupContainer";
import GroupsReportContainer from "../../containers/Reports/GroupsReportContainer";
import GroupsSurveyReportContainer from "../../containers/Reports/GroupsSurveyReportContainer";

class GroupRoutes extends React.Component {

    render() {
        return (
            <div>
                <Route exact path='/admin/group' render={()=><GroupPreviewContainer/>}/>
                <Route exact path='/admin/group/:id' render={() => <EditGroupContainer/>}/>
                <Route path='/admin/group/quiz/report/:id' render={()=><GroupsReportContainer/>}/>
                <Route path='/admin/group/survey/report/:id' render={()=><GroupsSurveyReportContainer/>}/>
            </div>
        )
    }


}

export default GroupRoutes;