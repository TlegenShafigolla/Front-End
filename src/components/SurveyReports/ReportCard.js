import React from "react";
import s from "../QuizReports/ReportCard.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

class ReportCard extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className={s.ReportCard}>
                <CardContent className={s.CardContent}>
                    <div className={s.Person}>
                        <Typography gutterBottom>
                            {this.props.report.email}
                        </Typography>
                        <Typography gutterBottom>
                            {this.props.report.name + " " + this.props.report.surname}
                        </Typography>
                    </div>
                    <div>

                    </div>
                </CardContent>
                <Typography className={s.version} variant="body2" color='textSecondary' component="p">
                    {"Quiz version of: " + this.props.report.survey.created_date}
                </Typography>
            </div>
        );
    }
}

export default ReportCard;