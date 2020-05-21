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
            addMember: false,
            group_name_change: false
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

    addMembers = (e) => {
        e.preventDefault();
        let email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        if (email.test(this.state.email)) {
            let members = this.state.members;
            addMembers(this.state.path, this.state.email).then(json => {
                    if (json.Error === undefined) {
                        members.push(json);
                        this.setState({
                            members: members,
                            addMember: false
                        })
                    }
                }
            )
        }
        if (this.state.email === '') {
            this.setState({
                addMember: false
            })
        }
    }
    onBlurGroupName = () => {
        if (this.state.group_name !== '') {
            this.setState({editGroupName: false});
            if (this.state.group_name_change) {
                putGroupName(this.state.path, this.state.group_name).then(() =>
                    this.setState({group_name_change: false}))
            }

        }
    }
    onChangeGroupName = (e) => {
        let group_name = this.state.group_name
        if (group_name !== e.target.value.trim()) {
            this.setState({group_name_change: true})
        }
        this.setState({group_name: e.target.value.trim()})
    }
    onDeleteMember = (id) => {
        deleteMember(id, this.state.path).then(json => {
            console.log(json)
            let members = this.state.members
            for (let i = 0; i < members.length; i++) {
                if (members[i]._id === json._id) {
                    members.splice(i, 1)
                }
                this.setState({members: members})
            }
        })
    }
    onChangeEmail = e => {
        this.setState({email: e.target.value.trim()})
    }

    render() {
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
                    <ol type='1'>{this.state.members.map(val => <li key={val._id}><Members path={this.state.path}
                                                                                           onDeleteMember={this.onDeleteMember}
                                                                                           val={val}/></li>)}</ol>
                    {this.state.addMember ?
                        <form onSubmit={this.addMembers}>
                            <TextField autoFocus={true} onBlur={this.addMembers} onChange={this.onChangeEmail}/>
                        </form> :
                        <IconButton color="primary" size='small' onClick={() => this.setState({addMember: true})}>
                            <AddIcon fontSize='small'/>
                        </IconButton>}
                </div>
            </div>
        )
    }
}

export default EditGroup;