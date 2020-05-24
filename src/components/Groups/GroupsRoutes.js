import React from "react";
import {Route} from "react-router-dom";
import EditGroup from "./EditGroup";
import GroupsPreview from "./GroupsPreview";
import GroupReport from "./GroupReport";

class GroupRoutes extends React.Component {

    render() {
        return (
            <div>
                <Route exact path='/admin/group' component={GroupsPreview}/>
                <Route exact path='/admin/group/:id' render={() => <EditGroup/>}/>
                <Route path='/admin/group/report/:id' render={()=><GroupReport/>}/>
            </div>
        )
    }


}

export default GroupRoutes;