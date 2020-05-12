import React from "react";
import {Route} from "react-router-dom";
import EditGroup from "./EditGroup";
import GroupsPreview from "./Preview/GroupsPreview";
import {createGroup, deleteGroup, getListGroup} from "../../services/API/adminAPI/Group/group";

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
    addNewGroup = () => {
        let groups = this.state.groups
        let group = 'New Group'
        createGroup(group).then(val => {
            groups.push(val)
            this.props.history.push(`/admin/group/${val._id}`)
            this.setState({groups: groups})
        })
    }
    onClickGroup = (id) => {
    this.props.history.push(`/admin/group/${id}`)
    }

    render() {
        return (
            <div>
                <Route exact path='/admin/group'
                       render={() => <GroupsPreview onClickGroup={this.onClickGroup}
                                                    deleteGroup={this.deleteGroup}
                                                    groups={this.state.groups}
                                                    addNewGroup={this.addNewGroup}/>}/>
                <Route path='/admin/group/:id' render={()=><EditGroup/>}/>
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