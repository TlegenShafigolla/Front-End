import React from "react";
import Typography from "@material-ui/core/Typography";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Link} from "react-router-dom";
import s from "../css/survey.module.css";
import Paper from "@material-ui/core/Paper";
import InviteDialogContainer from "../../../containers/SurveyEditor/InviteDialogContainer";
import Alerts from "../../common/Alert";

const Survey = (props) => {
    return (
        <Paper square elevation={3} className={s.Root}>
            <div className={s.CardContent}>
                <Typography variant="h5" component="h2" noWrap>
                    {props.value.survey_name}
                </Typography>
                <Typography> {props.value.description}</Typography>
                <Typography> {props.value.questions_count.toString()} </Typography>
                <Typography variant="body2"
                            component="p"
                            color="textSecondary">
                    Version: {props.last_edited_date} </Typography>
            </div>
            <div className={s.CardActions}>
                <div className={s.DeleteAndInvite}>
                    <Tooltip title='Invite'>
                        <IconButton color="primary"
                                    onClick={() => props.onClickInvite(props.value.questions_count, props.value._id)}>
                            <SendIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton size='small'
                                    aria-label='delete'
                                    onClick={() => props.deleteSurvey(props.value._id,)}>
                            <DeleteIcon color='primary'/>
                        </IconButton>
                    </Tooltip>
                </div>
                <Link to={'/admin/survey/editor/' + props.value._id.toString()}>
                    <IconButton color="primary" >
                        <ArrowForwardIosIcon fontSize='large'/>
                    </IconButton>
                </Link>
            </div>
            <InviteDialogContainer openDialog={props.Invite} onClose={props.onInvite}
                                   onSubmit={props.onSubmit}
            />
            <Alerts variant="filled" severity="warning" open={props.openSnackbar}
                    children=" No questions in the survey"/>
        </Paper>
    );
};

export default Survey;