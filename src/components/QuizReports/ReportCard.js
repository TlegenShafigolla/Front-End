import React from "react";
import s from "./ReportCard.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";

const ReportCard = (props) => {
    return (
        <Paper square elevation={3} className={s.ReportCard}>
            <Typography variant="h5" component="p" gutterBottom>
                {props.report.quiz.quiz_name}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                {props.report.quiz.description}
            </Typography>
            <CardContent>
                <div>
                    <Typography gutterBottom>
                        {props.report.email}
                    </Typography>
                    <Typography gutterBottom>
                        {props.report.session.email}
                    </Typography>
                </div>
                <div>
                    <Typography>
                        {"No of questions: " + props.report.quiz.questions_count.toString()}
                    </Typography>
                </div>
            </CardContent>
            <Typography className={s.version} variant="body2" color='textSecondary' component="p">
                {"Quiz version of: " + new Date(props.report.quiz.created_date).toLocaleString()}
            </Typography>
        </Paper>
    );
}

export default ReportCard;