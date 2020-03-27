import React from "react";
import s from '../MyQuizzes.module.css'
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/Delete';
class QuizPreview extends React.Component {
//quiz_name, questions_count, description, last_edited_date
    render() {
        return (
            <div className={s.root}>
                <CardContent>
                    <Typography className={s.title} color="textSecondary" gutterBottom>
                        {this.props.value.quiz_name.toString()}  </Typography>
                    <Typography variant="h5" component="h2"> {this.props.value.description.toString()} </Typography>
                    <Typography className={s.pos}
                                color="textSecondary"> {this.props.value.questions_count.toString()} </Typography>
                    <Typography variant="body2"
                                component="p"> {this.props.value.last_edited_date.toString()} </Typography>
                </CardContent>
                <CardActions className={s.CardActions}>
                    <IconButton color="primary" className={s.ArrowButton} >
                        <ArrowForwardIosIcon fontSize='large'/>
                    </IconButton>
                    <IconButton size='small'className={s.DeleteButton} >
                        <DeleteIcon fontSize='small'/>
                    </IconButton>

                </CardActions>
            </div>
        );
    }
}

export default QuizPreview;
