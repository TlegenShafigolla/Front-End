import React from "react";
import {addMembers, deleteMember, getMembers} from "../../services/API/adminAPI/Group/members";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Members from "./Members";
import s from './EditGroup.module.css'
import TextField from "@material-ui/core/TextField";
import {putGroupName} from "../../services/API/adminAPI/Group/group";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {getGroupQuizzes} from "../../services/API/adminAPI/Group/quizzes";
import {getGroupSurveys} from "../../services/API/adminAPI/Group/surveys";
import QuizTable from "./QuizTable";
import SurveyTable from "./SurveyTable";

class EditGroup extends React.Component {
    constructor(props) {
        super(props);
        const path = window.location.pathname.split('/');
        this.state = {
            group_id: path[3],
            members: [],
            editGroupName: false,
            group_name: null,
            email: null,
            addMember: false,
            group_name_change: false,
            surveys: null,
            quizzes: null
        }
    }

    componentDidMount() {
        getMembers(this.state.group_id).then(json => this.setState({
            members: json.members,
            group_name: json.group_name,
        }));
        getGroupQuizzes(this.state.group_id).then(json => this.setState({quizzes: json.invitations}));
        getGroupSurveys(this.state.group_id).then(json => this.setState({surveys: json.invitations}));
    }

    addMembers = (e) => {
        e.preventDefault();
        let email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        if (email.test(this.state.email)) {
            let members = this.state.members;
            addMembers(this.state.group_id, this.state.email).then(json => {
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
    };
    onBlurGroupName = () => {
        if (this.state.group_name !== '') {
            this.setState({editGroupName: false});
            if (this.state.group_name_change) {
                putGroupName(this.state.group_id, this.state.group_name).then(() =>
                    this.setState({group_name_change: false}))
            }

        }
    };
    onChangeGroupName = (e) => {
        let group_name = this.state.group_name;
        if (group_name !== e.target.value.trim()) {
            this.setState({group_name_change: true})
        }
        this.setState({group_name: e.target.value.trim()})
    };
    onDeleteMember = (id) => {
        deleteMember(id, this.state.path).then(json => {
            let members = this.state.members;
            for (let i = 0; i < members.length; i++) {
                if (members[i]._id === json._id) {
                    members.splice(i, 1)
                }
                this.setState({members: members})
            }
        })
    };
    onChangeEmail = e => {
        this.setState({email: e.target.value.trim()})
    };

    render() {
        return (
            <Grid
                container
                justify="flex-end"
                alignItems="flex-start"
                spacing={1}>
                <Grid item lg={6} md={8} sm={10} xs={12}>
                    <Paper square elevation={3} className={s.GroupName}>
                        <div onClick={() => this.setState({editGroupName: true})}>
                            {!this.state.editGroupName ? <Typography>{this.state.group_name}</Typography>
                                : <TextField autoFocus={true} onBlur={this.onBlurGroupName}
                                             onChange={this.onChangeGroupName} defaultValue={this.state.group_name}/>}
                        </div>
                    </Paper>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper square elevation={3} className={s.QuizList}>
                                <Typography variant='h6' className={s.QuizListHeading}>Group's Quizzes</Typography>
                                <QuizTable quizzes={this.state.quizzes}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper square elevation={3} className={s.SurveyList}>
                                <Typography variant='h6' className={s.SurveyListHeading}>Group's Quizzes</Typography>
                                <SurveyTable surveys={this.state.surveys}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={3} md={2} sm={10} xs={12}>
                    <Paper square elevation={3} className={s.MembersBoard}>
                    <div>
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
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default EditGroup;