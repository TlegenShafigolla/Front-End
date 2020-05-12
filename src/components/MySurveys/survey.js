import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Link} from "react-router-dom";
import s from "./survey.module.css";
import InviteDialog from "./inviteDialog";

class Survey extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            openInviteDialog: false,
        };
    }

    inviteDialog = () => {
        this.setState({openInviteDialog: !this.state.openInviteDialog})
    };

    onClickInvite = () => {
        this.setState({openInviteDialog: false});
    };

    render() {
        return(
            <div className={s.Root} onKeyDown={this.onClickQuiz}>
                <CardContent className={s.CardContent}>
                    <Typography variant="h5" component="h2" noWrap>
                        {this.props.value.survey_name}
                    </Typography>
                    <Typography className={s.Title}> {this.props.value.description}
                    </Typography>
                    <Typography className={s.pos}> {this.props.value.questions_count.toString()} </Typography>
                    <Typography variant="body2"
                                component="p"
                                color="textSecondary">
                        Version: {this.props.value.last_edited_date} </Typography>
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
                                        aria-label='delete'>
                                <DeleteIcon color='primary'/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Link to={'/admin/surveys/edit/' + this.props.value._id.toString()}>
                        <IconButton color="primary" className={s.ArrowButton} onClick={this.handleClick}>
                            <ArrowForwardIosIcon fontSize='large'/>
                        </IconButton>
                    </Link>
                </CardActions>
                <InviteDialog openDialog={this.state.openInviteDialog} onClose={this.onClickInvite}
                              survey_id={this.props.value._id}/>
            </div>
        );
    }
}

export default Survey;