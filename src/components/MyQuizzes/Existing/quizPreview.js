import React from "react";
import s from '../listQuizPreview.module.css'
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/Delete';
import {NavLink} from "react-router-dom";

class QuizPreview extends React.Component {
//quiz_name, questions_count, description, last_edited_date
    render() {
        return (
            <div className={s.root}>
                <CardContent className={s.CardContent}>
                    <Typography className={s.title} color="textSecondary" gutterBottom>
                        {this.props.value.quiz_name.toString()}  </Typography>
                    <Typography variant="h5" component="h2"> {this.props.value.description.toString()} </Typography>
                    <Typography className={s.pos}
                                color="textSecondary"> {this.props.value.questions_count.toString()} </Typography>
                    <Typography variant="body2"
                                component="p"> {this.props.value.last_edited_date.toString()} </Typography>
                </CardContent>
                <CardActions className={s.CardActions}>
                    <NavLink to={'/admin/quizzes/edit/'+this.props.value.id.toString()}>
                    <IconButton color="primary" className={s.ArrowButton} >
                        <ArrowForwardIosIcon fontSize='large'/>
                    </IconButton>
                    </NavLink>
                    {/*<IconButton size='small'className={s.DeleteButton} >*/}
                    {/*    <DeleteIcon fontSize='small'/>*/}
                    {/*</IconButton>*/}

                </CardActions>

            </div>
        );
    }
}

export default QuizPreview;
