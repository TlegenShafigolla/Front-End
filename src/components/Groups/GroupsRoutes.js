import React from "react";
import {Route} from "react-router-dom";
import EditGroup from "./EditGroup";
import GroupsPreview from "./GroupsPreview";

class GroupRoutes extends React.Component {

    render() {
        return (
            <div>
                <Route exact path='/admin/group' component={GroupsPreview} />
                <Route path='/admin/group/:id' render={()=><EditGroup/>}/>
            </div>
        )
    }


}

export default GroupRoutes;