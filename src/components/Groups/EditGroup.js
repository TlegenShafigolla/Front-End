import React from "react";
import Typography from "@material-ui/core/Typography";
import s from './EditGroup.module.css'
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import QuizTable from "./QuizTable";
import SurveyTable from "./SurveyTable";
import Preloader from "../common/Preloader";
import Member from "./Memberrs";

class EditGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editGroupName: false,
            addMember: false,
        }
    }

    componentDidMount() {
        this.props.requestMembers(this.props.match.params.id)
        this.props.requestGroupQuizzes(this.props.match.params.id)
        this.props.requestGroupSurveys(this.props.match.params.id)
    }

    addMembers = () => {
        this.setState({addMember: true})
    };
    onBlurGroupName = () => {
        if (this.props.group_name.trim() !== '') {
            this.setState({editGroupName: false});
            if (this.props.group_name_change) {
                this.props.putGroup(this.props.match.params.id, this.props.group_name)
            }
        }
    }
    onChangeGroupName = (e) => {
        this.props.changeGroupName(e.target.value)
    };
    onDeleteMember = (id) => {
        if (this.props.disableButton) {
            return null;
        }
        this.props.deleteMembers(id, this.props.match.params.id)
    };
    onSubmit = (values) => {
        this.props.addNewMember(this.props.match.params.id, values.email)
        this.setState({addMember: false})
    }

    render() {
        if (this.props.isFetching) {
            return <Preloader/>
        }
        return (
            <Grid
                container
                justify="flex-end"
                alignItems="flex-start"
            >
                <Grid item lg={6} md={6} sm={10} xs={12}>
                    <Paper square elevation={3} className={s.GroupName}>
                        <div onClick={() => this.setState({editGroupName: true})}>
                            {!this.state.editGroupName ? <Typography>{this.props.group_name}</Typography>
                                : <TextField autoFocus onBlur={this.onBlurGroupName}
                                             onChange={this.onChangeGroupName} value={this.props.group_name}/>}
                        </div>
                    </Paper>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper square elevation={3} className={s.QuizList}>
                                <Typography variant='h6' className={s.QuizListHeading}>Group's Quizzes</Typography>
                                <QuizTable quizzes={this.props.quizzes}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper square elevation={3} className={s.SurveyList}>
                                <Typography variant='h6' className={s.SurveyListHeading}>Group's Survey</Typography>
                                <SurveyTable surveys={this.props.surveys}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={3} md={3}>
                    <>
                        <Member addmember={this.state.addMember} members={this.props.members}
                                onSubmit={this.onSubmit}
                                onDeleteMember={this.onDeleteMember} addMembers={this.addMembers}/>
                    </>
                </Grid>
            </Grid>
        )
    }
}

export default EditGroup;