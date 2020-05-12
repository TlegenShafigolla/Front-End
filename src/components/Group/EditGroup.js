import React from "react";
import {addMembers, deleteMember, getMembers} from "../../services/API/adminAPI/Group/members";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Members from "./Members";
import s from './EditGroup.module.css'
import TextField from "@material-ui/core/TextField";
import {putGroupName} from "../../services/API/adminAPI/Group/group";

class EditGroup extends React.Component {
    constructor(props) {
        super(props);
        const path = window.location.pathname.split('/');
        this.state = {
            path: path[3],
            members: [],
            editGroupName: false,
            group_name: null,
            email: null,
            addMember: false
        }
    }

    componentDidMount() {
        const path = window.location.pathname.split('/');
        getMembers(path[3]).then(json => this.setState({
            members: json.members,
            group_name: json.group_name,
        }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    addMembers = () => {
        this.setState({addMember:false})
        addMembers(this.state.path, this.state.email).then(json => {
                console.log(json)
                if (json.ok === 1) {
                    console.log('ok')
                }
            }
        )
    }
    onBlurGroupName = () => {
        this.setState({editGroupName: false});
        putGroupName(this.state.path, this.state.group_name).then(json => console.log(json))
    }
    onChangeGroupName = (e) => {
        let group_name = e.target.value;
        this.setState({group_name: group_name})
    }
    onDeleteMember = (id) => {
        deleteMember(id, this.state.path).then(json => {
            console.log(json)
            let members = this.state.members
            if (json.ok === 1) {
                for (let i = 0; i < members.length; i++) {
                    if (members[i]._id === id) {
                        members.splice(i, 1)
                    }
                }
                this.setState({members: members})
            }
        })
    }
    onChangeEmail = e => {
        this.setState({email: e.target.value.trim()})
    }

    render() {
        console.log('ok')
        return (
            <div className={s.EditGroup}>
                <div className={s.GroupName} onClick={() => this.setState({editGroupName: true})}>
                    {!this.state.editGroupName ? <Typography>{this.state.group_name}</Typography>
                        : <TextField autoFocus={true} onBlur={this.onBlurGroupName}
                                     onChange={this.onChangeGroupName} defaultValue={this.state.group_name}/>}
                </div>
                <div className={s.Quiz}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi harum nulla rerum velit. A
                    accusantium alias facere officia praesentium. Quia.
                </div>
                <div className={s.MembersBoard}>
                    {this.state.members.map(val => <Members path={this.state.path}
                                                            onDeleteMember={this.onDeleteMember} key={val._id}
                                                            val={val}/>)}
                    {this.state.addMember ? <TextField onBlur={this.addMembers} onChange={this.onChangeEmail}/> :
                        <IconButton color="primary" size='small' onClick={() => this.setState({addMember: true})}>
                            <AddIcon fontSize='small'/>
                        </IconButton>}
                </div>
            </div>
        )
    }
}

export default EditGroup;