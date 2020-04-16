import React from "react";
import s from "./ReportCard.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import MailOutlineIcon from '@material-ui/icons/MailOutline';

class ReportCard extends React.Component {
    render() {
        return (
            <div className={s.ReportCard}>
            <CardContent className={s.CardContent}>

                    <Typography gutterBottom>
                        {"Email:" + this.props.report.email}
                    </Typography>
                    <Typography gutterBottom>
                        {"To: " + this.props.report.name + " " + this.props.report.surname}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"Invited: " + this.props.report.invited_date}
                    </Typography>
                <Typography variant="body1" component="p">
                    {"Description: " + this.props.report.description}
                </Typography>
                <Typography color="textSecondary">
                    {"No of questions: " + this.props.report.questions_count.toString()}
                </Typography>


                <Typography variant="body2" component="p">
                    {"Mixed: " + this.props.report.mixed}
                </Typography>
                <Typography variant="body2" component="p">
                    {"showResults: " + this.props.report.showResults}
                </Typography>

            </CardContent>
            <Typography className={s.version} variant="body2" color='textSecondary' component="p">
                {"Quiz version of: " + this.props.report.created_date}
            </Typography>
            </div>
        );
    }
}

export default ReportCard;