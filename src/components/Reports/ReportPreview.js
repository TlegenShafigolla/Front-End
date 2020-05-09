import React from "react";
import s from "../MyQuizzes/Preview/listQuizPreview.module.css";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


class ReportPreview extends React.Component{
    render() {
        return(
            <div className={s.root}>
                <CardContent className={s.CardContent}>
                    <Typography variant="h5" component="h2" >
                        {this.props.val.quiz.quiz_name}  </Typography>
                    <Typography className={s.title} color="textSecondary" gutterBottom> {this.props.val.quiz.description} </Typography>
                    <Typography className={s.pos}
                                color="textSecondary"> {this.props.val.email} </Typography>
                    <Typography variant="body2"
                                component="p"> {this.props.val.session.end_date} </Typography>
                    <Link to={'/admin/reports/' + this.props.val._id.toString()}>
                        <Button color="primary">
                            Check
                        </Button>
                    </Link>
                </CardContent>
            </div>
        );
    }
}

export default ReportPreview;