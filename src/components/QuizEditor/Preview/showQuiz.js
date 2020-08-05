import React from "react";
import s from "./listQuizPreview.module.css";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Tooltip} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import DeleteQuizDialog from "./deleteQuizDialog";
import Paper from "@material-ui/core/Paper";
import Alerts from "../../common/Alert";
import InviteDialogContainer from "../../../containers/QuizEditor/InviteDialogContainer";


const ShowQuiz = (props) => {
    console.log(props)
    return (
        <Paper square elevation={3} className={s.Root}>
            <div className={s.CardContent}>
                <Typography variant="h5" component="h2" noWrap>
                    {props.value.quiz_name}
                </Typography>
                < Typography>
                    {props.value.description}
                </Typography>
                <Typography>  {props.value.questions_count.toString()} </Typography>
                <Typography variant="body2"
                            component="p"
                            color="textSecondary">
                    Version: {props.last_edited_date} </Typography>
            </div>
            <div className={s.CardActions}>
                <div className={s.DeleteAndInvite}>
                    <Tooltip title='Invite'>
                        <IconButton color="primary" onClick={() => props.onClickInvite(props.value.questions_count,props.value._id)}>
                            <SendIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton size='small'
                                    onClick={() => props.deleteQuiz(props.value._id)}
                                    aria-label='delete'>
                            <DeleteIcon color='primary'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <Link to={'/admin/quiz/editor/' + props.value._id.toString()}>
                    <IconButton color="primary">
                        <ArrowForwardIosIcon fontSize='large'/>
                    </IconButton>
                </Link>
            </div>
            <InviteDialogContainer openDialog={props.Invite}  onClose={props.onInvite} onSubmit={props.onSubmit}
                                   />
            <DeleteQuizDialog openDialog={props.DeleteQuiz} id={props.value._id} onClose={props.onClickDelete}/>
            <Alerts variant="filled" severity="warning" open={props.openSnackbar} children=" No questions in the quiz"/>
        </Paper>
    );
};

export default ShowQuiz;
