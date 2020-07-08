import React from "react";
import s from "../QuizReports/ReportCard.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";

const ReportCard = (props) => {
    return (
        <Paper square elevation={3} className={s.ReportCard}>
            <Typography variant="h5" component="p" gutterBottom>
                {props.report.survey.survey_name}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                {props.report.survey.description}
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
                        {"No of questions: " + props.report.survey.questions_count.toString()}
                    </Typography>
                </div>
            </CardContent>
            <Typography className={s.version} variant="body2" color='textSecondary' component="p">
                {" version of: " + new Date(props.report.survey.created_date).toLocaleString()}
            </Typography>
        </Paper>
    );
}

export default ReportCard;