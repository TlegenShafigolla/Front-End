import React from "react";
import s from "../listQuizPreview.module.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Tooltip} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import DeleteQuizDialog from "./deleteQuizDialog";
import InviteDialog from "../Edition/Invite/inviteDialog";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

class ShowQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_id: this.props.quiz_id,
            last_edited_date: this.props.last_edited_date,
            quiz_name: this.props.quiz_name,
            openDeleteQuizDialog: false,
            openInviteDialog: false,
        }
    }

    onClickDelete = (action) => {
        this.setState({openDeleteQuizDialog: false});
        if (!action) {
            return;
        }
        this.props.deleteQuizOnClick();
    };

    openDeleteDialog = () => {
        this.setState({openDeleteQuizDialog: true});
    };

    onClickInvite = () => {
        this.setState({openInviteDialog: false});
    };

    inviteDialog = () => {
        this.setState({openInviteDialog: !this.state.openInviteDialog})
    };
    onClickQuiz = () => {
        console.log('ok')
        // this.history.push(`/admin/quizzes/edit/${this.props.value._id}`)
    };

    render() {
        return (
                <div className={s.root} onKeyDown={this.onClickQuiz}>
                    <CardContent className={s.CardContent}>
                        <Typography variant="h5" component="h2" noWrap>
                            {this.props.quiz_name}
                        </Typography>
                        < Typography noWrap
                                     className={s.title}
                                     gutterBottom> {this.props.description}
                        </Typography>
                        <Typography className={s.pos}> {this.props.value.questions_count.toString()} </Typography>
                        <Typography variant="body2"
                                    component="p"
                                    color="textSecondary">
                            Version: {this.props.last_edited_date} </Typography>
                    </CardContent>
                    <CardActions className={s.CardActions}>
                        <div className={s.ButtonPanel}>
                            <Tooltip title='Invite'>
                                <IconButton color="primary" onClick={this.inviteDialog}>
                                    <SendIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete'>
                                <IconButton size='small'
                                            onClick={this.state.quiz_id === undefined ? this.props.deleteQuizOnClick : this.openDeleteDialog}
                                            aria-label='delete'>
                                    <DeleteIcon color='primary'/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Link to={'/admin/quizzes/edit/' + this.props.value._id.toString()}>
                            <IconButton color="primary" className={s.ArrowButton} onClick={this.handleClick}>
                                <ArrowForwardIosIcon fontSize='large'/>
                            </IconButton>
                        </Link>
                    </CardActions>
                    <InviteDialog openDialog={this.state.openInviteDialog} onClose={this.onClickInvite}
                                  quiz_id={this.state.quiz_id}/>
                    <DeleteQuizDialog openDialog={this.state.openDeleteQuizDialog} onClose={this.onClickDelete}/>
                </div>
        );
    }
}

export default ShowQuiz;
