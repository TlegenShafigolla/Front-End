import React from "react";
import s from "./listQuizPreview.module.css";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Snackbar, Tooltip} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import DeleteQuizDialog from "./deleteQuizDialog";
import InviteDialog from "../Editing/Invite/inviteDialog";
import Alert from "@material-ui/lab/Alert/Alert";
import {deleteQuiz} from "../../../services/API/adminAPI/Quiz/quiz";
import Paper from "@material-ui/core/Paper";


class ShowQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_id: this.props.quiz_id,
            last_edited_date: this.props.last_edited_date,
            quiz_name: this.props.quiz_name,
            openDeleteQuizDialog: false,
            openInviteDialog: false,
            noQuestionSnackbar: false,
        }
    }


    openDeleteDialog = () => {
        this.setState({openDeleteQuizDialog: true});
    };

    onClickInvite = () => {
        this.setState({openInviteDialog: false});
    };

    inviteDialog = () => {
        if (this.props.value.questions_count === 0) {
            this.setState({noQuestionSnackbar: true});
        } else {
            this.setState({openInviteDialog: !this.state.openInviteDialog})
        }
    };

    closeNoQuestionSnackbar = () => {
        this.setState({noQuestionSnackbar: false});
    };

    onClickQuiz = () => {
        console.log('ok')
        // this.history.push(`/admin/quizzes/edit/${this.props.value._id}`)
    };

    deleteQuizOnClick = async () => {
        if (this.state.quiz_id !== undefined) {
            await deleteQuiz(this.state.quiz_id)
        }
        this.props.deleteQuiz(this.props.value._id)
    };
    onClickDelete = (action) => {
        this.setState({openDeleteQuizDialog: false});
        if (!action) {
            return;
        }
        this.deleteQuizOnClick()
    }

    render() {
        return (
            <Paper square elevation={3} className={s.Root} onKeyDown={this.onClickQuiz}>
                <div className={s.CardContent}>
                    <Typography variant="h5" component="h2" noWrap>
                        {this.props.quiz_name}
                    </Typography>
                    < Typography>
                        {this.props.description}
                    </Typography>
                    <Typography>  {this.props.value.questions_count.toString()} </Typography>
                    <Typography variant="body2"
                                component="p"
                                color="textSecondary">
                        Version: {this.props.last_edited_date} </Typography>
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
                                        onClick={this.state.quiz_id === undefined ? this.deleteQuizOnClick : this.openDeleteDialog}
                                        aria-label='delete'>
                                <DeleteIcon color='primary'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Link to={'/admin/quiz/editor/edit/' + this.props.value._id.toString()}>
                        <IconButton color="primary" onClick={this.handleClick}>
                            <ArrowForwardIosIcon fontSize='large'/>
                        </IconButton>
                    </Link>
                </div>
                <InviteDialog openDialog={this.state.openInviteDialog} onClose={this.onClickInvite}
                              quiz_id={this.state.quiz_id} groups={this.props.groups}/>
                <DeleteQuizDialog openDialog={this.state.openDeleteQuizDialog} onClose={this.onClickDelete}/>
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
                No questions in the quiz
            </Alert>
        </Snackbar>
    );
};

export default ShowQuiz;
