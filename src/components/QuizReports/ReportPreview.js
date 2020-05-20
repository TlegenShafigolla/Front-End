import React from "react";
import s from "../QuizEditor/Preview/listQuizPreview.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";


class ReportPreview extends React.Component {
    render() {
        return (
            <Link to={'/admin/reports/' + this.props.val._id.toString()}>
                <Paper className={s.Root} square elevation={3}>
                    <CardContent className={s.CardContent}>
                        <Typography variant="h5" component="h2">
                            {this.props.val.quiz.quiz_name}  </Typography>
                        <Typography color="textSecondary" gutterBottom> {this.props.val.quiz.description} </Typography>
                        <Typography color="textSecondary"> {this.props.val.email} </Typography>
                        <Typography variant="body2"
                                    component="p"> {this.props.val.end_date} </Typography>
                    </CardContent>
                </Paper>
            </Link>
        );
    }
}

export default ReportPreview;