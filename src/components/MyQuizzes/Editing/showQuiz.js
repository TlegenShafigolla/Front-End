import React from "react";
import s from "../listQuizPreview.module.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Tooltip} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

class ShowQuiz extends React.Component {
    render() {
        return (<div className={s.root}>
            <CardContent className={s.CardContent}>
                <Typography className={s.title} color="textSecondary" gutterBottom>
                    {this.props.quiz_name}  </Typography>
                <Typography variant="h5" component="h2"> {this.props.description} </Typography>
                <Typography className={s.pos}
                            color="textSecondary"> {this.props.value.questions_count.toString()} </Typography>
                <Typography variant="body2"
                            component="p"> {this.props.value.last_edited_date.toString()} </Typography>
            </CardContent>
            <CardActions className={s.CardActions}>
                <Button  onClick={this.props.editMode}>
                    Edit
                </Button>
                <Link to={'/admin/quizzes/edit/' + this.props.value.id.toString()}>
                    <IconButton color="primary" className={s.ArrowButton} onClick={this.handleClick}>
                        <ArrowForwardIosIcon fontSize='large'/>
                    </IconButton>
                </Link>
                <Tooltip title='Delete'>
                    <IconButton size='small' className={s.DeleteButton} onClick={this.props.deleteQuizOnClick} aria-label='delete'>
                        <HighlightOffIcon fontSize='small' color='secondary'/>
                    </IconButton>
                </Tooltip>
            </CardActions>
        </div>);
    }
}

export default ShowQuiz;
