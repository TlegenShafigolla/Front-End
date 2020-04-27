import React from "react";
import s from "./ReportCard.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import MailOutlineIcon from '@material-ui/icons/MailOutline';

class ReportCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }


    render() {
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
                        <Typography variant="body1" component="p">
                            Scored points: {this.props.report.points ? this.props.report.total_points : this.props.report.total_corrects}
                        </Typography>
                    </div>
                    <div>
                        <Typography >
                            {"No of questions: " + this.props.report.quiz.questions_count.toString()}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Show Results: {this.props.report.showResults ? 'Yes' : 'No'}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {"Invited: " + this.props.report.invited_date}
                        </Typography>
                    </div>
                </CardContent>
                <Typography className={s.version} variant="body2" color='textSecondary' component="p">
                    {"Quiz version of: " + this.props.report.created_date}
                </Typography>
            </div>
        );
    }
}

export default ReportCard;