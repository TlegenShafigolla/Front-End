import React from "react";
import Button from "@material-ui/core/Button";
import Group from "./Group";
import s from './GroupPreview.module.css'
import {createGroup, deleteGroup, getListGroup} from "../../services/API/adminAPI/Group/group";
import Grid from "@material-ui/core/Grid";

class GroupsPreview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            groupChanged: false,
        }
    }

    componentDidMount() {
        getListGroup().then(json => {
            console.log(json);
            this.setState({groups: json.groups})
        })
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
    };
    addNewGroup = () => {
        let groups = this.state.groups;
        let group = 'New Groups';
        createGroup(group).then(val => {
            groups.push(val);
            this.props.history.push(`/admin/group/${val._id}`);
            this.setState({groups: groups})
        })
    }
    onClickGroup = (id) => {
        this.props.history.push(`/admin/group/${id}`)
    };


    render() {
        return (
            <Grid
                container
                justify="center"
                alignItems="flex-start">
                <Grid item lg={6} md={8} sm={10} xs={12}>
                    {this.state.groups.map(val => <Group onClickGroup={this.onClickGroup}
                                                         deleteGroup={this.deleteGroup}
                                                         key={val._id}
                                                         val={val}/>)}
                    <Button color='primary' size='medium'
                            onClick={this.addNewGroup}>
                        Create group
                    </Button>
                </Grid>

            </Grid>
        );
    }


}


export default GroupsPreview;