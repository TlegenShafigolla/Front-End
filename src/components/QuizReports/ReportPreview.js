import React from "react";
import s from "../QuizEditor/Preview/listQuizPreview.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";


const ReportPreview=(props)=> {
    return (
        <Link to={'/admin/reports/' + props.val._id.toString()}>
            <Paper className={s.Root} square elevation={3}>
                <CardContent className={s.CardContent}>
                    <Typography variant="h5" component="h2">
                        {props.val.quiz.quiz_name}  </Typography>
                    <Typography color="textSecondary" gutterBottom> {props.val.quiz.description} </Typography>
                    <Typography color="textSecondary"> {props.val.email} </Typography>
                    <Typography variant="body2"
                                component="p"> {props.val.end_date} </Typography>
                </CardContent>
            </Paper>
        </Link>
    );
}

export default ReportPreview;