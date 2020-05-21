import React from "react";
import Typography from "@material-ui/core/Typography";
import {Snackbar, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Link} from "react-router-dom";
import s from "./survey.module.css";
import InviteDialog from "./inviteDialog";
import Alert from "@material-ui/lab/Alert/Alert";
import Paper from "@material-ui/core/Paper";
import {deleteSurvey} from "../../services/API/adminAPI/Survey/survey";

class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.value._id,
            openInviteDialog: false,
            noQuestionSnackbar: false,
        };
    }

    inviteDialog = () => {
        if (this.props.value.questions_count === 0) {
            this.setState({noQuestionSnackbar: true});
        } else {
            this.setState({openInviteDialog: !this.state.openInviteDialog})
        }
    };

    onClickInvite = () => {
        this.setState({openInviteDialog: false});
    };

    closeNoQuestionSnackbar = () => {
        this.setState({noQuestionSnackbar: false});
    };
    deleteSurveyOnclick = () => {
        this.props.deleteSurvey(this.props.value._id)
    }


    render() {
        return (
            <Paper square elevation={3} className={s.Root} onKeyDown={this.onClickQuiz}>
                <div className={s.CardContent}>
                    <Typography variant="h5" component="h2" noWrap>
                        {this.props.value.survey_name}
                    </Typography>
                    <Typography> {this.props.value.description}</Typography>
                    <Typography> {this.props.value.questions_count.toString()} </Typography>
                    <Typography variant="body2"
                                component="p"
                                color="textSecondary">
                        Version: {new Date(this.props.value.last_edited_date).toLocaleString()} </Typography>
                </div>
                <div className={s.CardActions}>
                    <div className={s.DeleteAndInvite}>
                        <Tooltip title='Invite'>
                            <IconButton color="primary" onClick={this.inviteDialog}>
                                <SendIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete'>
                            <IconButton size='small'
                                        aria-label='delete' onClick={this.deleteSurveyOnclick}>
                                <DeleteIcon color='primary'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Link to={'/admin/survey/editor/edit/' + this.props.value._id.toString()}>
                        <IconButton color="primary" onClick={this.handleClick}>
                            <ArrowForwardIosIcon fontSize='large'/>
                        </IconButton>
                    </Link>
                </div>
                <InviteDialog openDialog={this.state.openInviteDialog} onClose={this.onClickInvite}
                              survey_id={this.props.value._id}/>
                <NoQuestionSnackbar openSnackbar={this.state.noQuestionSnackbar}
                                    snackClose={this.closeNoQuestionSnackbar}/>
            </Paper>
        );
    }
}

const NoQuestionSnackbar = (props) => {
    return (
        <Snackbar
            open={props.openSnackbar}
            onClose={props.snackClose}>
            <Alert variant="filled" severity="warning">
                No questions in the survey
            </Alert>
        </Snackbar>
    );
};

export default Survey;