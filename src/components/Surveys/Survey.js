import React from "react";
import s from "./Survey.module.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import Question from "./Question";
import InvitationsSurvey from "./Invitations";
import Preloader from "../common/Preloader";

class Survey extends React.Component {


    render() {
        if (this.props.survey === null||this.props.survey === undefined) {
            return (
                <Preloader/>
            );
        }
        return (
            <Grid container
                  alignItems="flex-start"
                  justify="flex-end"
            >
                <Grid item lg={6} md={8} sm={12} xs={12}>
                    <Paper square elevation={3} className={s.SurveyNameDescription}>
                        <Typography noWrap
                                    className={s.SurveyInfo}
                                    variant='h4'> {this.props.survey.survey_name}</Typography>
                        <Typography className={s.SurveyInfo}
                                    variant='body1'>{this.props.survey.description}</Typography>
                    </Paper>
                    {this.props.questions.map((question,) => <Question key={question._id} value={question}/>)}
                </Grid>
                <Grid item lg={3} md={2} sm={12} xs={12} className={s.InfoPanel}>
                    <InvitationsSurvey invitations={this.props.invitations}/>
                </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        this.props.requestUsedSurvey(this.props.match.params.id)
        this.props.requestUsedInvitations(this.props.match.params.id)
    }
}

export default Survey;