import React from "react";
import {Route} from "react-router-dom";
import EditGroup from "./EditGroup";
import GroupsPreview from "./Preview/GroupsPreview";
import {createGroup, deleteGroup, getListGroup, putGroupName} from "../../services/API/adminAPI/Group/group";

class GroupRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            groupChanged: false,
        }
    }

    deleteGroup = (group_id) => {
        const groups = this.state.groups;
        deleteGroup(group_id).then(json => {
            console.log(json);
            for (let i = 0; i < groups.length; i++) {
                if (groups[i]._id === json._id) {
                    groups.splice(i, 1);
                }
            }
            this.setState({groups: groups})
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.groupChanged !== this.state.groupChanged) {
            getListGroup().then(json => {
                this.setState({groups: json.groups})
            })
            this.setState({groupChanged: false})
        }
    }


    addNewGroup = () => {
        let groups = this.state.groups
        let group = 'New Group'
        createGroup(group).then(val => {
            groups.push(val)
            this.setState({groups: groups})
        })
    }

    render() {
        return (
            <div>
                <Route exact path='/admin/group'
                       render={() => <GroupsPreview deleteGroup={this.deleteGroup}
                                                    groups={this.state.groups}
                                                    addNewGroup={this.addNewGroup}/>}/>
                <Route path='/admin/group/:id' component={EditGroup}/>
            </div>
        )
    }

    componentDidMount() {
        getListGroup().then(json => {
            console.log(json)
            this.setState({groups: json.groups})
        })
    }
}

export default GroupRoutes;