import React from "react";
import s from "../QuizEditor/Preview/listQuizPreview.module.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

class ReportSurveyPreview extends React.Component {
    render() {
        return (
            <div className={s.Root}>
                <CardContent className={s.CardContent}>
                    <Typography variant="h5" component="h2">
                        {this.props.val.survey.survey_name}  </Typography>
                    <Typography color="textSecondary" gutterBottom> {this.props.val.survey.description} </Typography>
                    <Typography color="textSecondary"> {this.props.val.email} </Typography>
                    <Typography variant="body2"
                                component="p"> {this.props.val.end_date} </Typography>
                    <Link to={'/admin/surveys/reports/' + this.props.val._id.toString()}>
                        <Button color="primary">
                            Check
                        </Button>
                    </Link>
                </CardContent>
            </div>
        );
    }
}

export default ReportSurveyPreview;