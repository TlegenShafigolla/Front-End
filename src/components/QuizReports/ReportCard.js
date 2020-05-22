import React from "react";
import s from "./ReportCard.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";

class ReportCard extends React.Component {
    render() {
        console.log(this.props)
        return (
            <Paper square elevation={3} className={s.ReportCard}>
                <Typography variant="h5" component="p" gutterBottom>
                    {this.props.report.quiz.quiz_name}
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    {this.props.report.quiz.description}
                </Typography>
                <CardContent>
                    <div>
                        <Typography gutterBottom>
                            {this.props.report.email}
                        </Typography>
                        <Typography gutterBottom>
                            {this.props.report.session.email}
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            {"No of questions: " + this.props.report.quiz.questions_count.toString()}
                        </Typography>
                    </div>
                </CardContent>
                <Typography className={s.version} variant="body2" color='textSecondary' component="p">
                    {"Quiz version of: " + new Date(this.props.report.quiz.created_date).toLocaleString()}
                </Typography>
            </Paper>
        );
    }
}

export default ReportCard;