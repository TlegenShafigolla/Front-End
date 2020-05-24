import React from "react";
import s from "./Survey.module.css";
import {CircularProgress} from "@material-ui/core";
import getUsedSurveyQuestions from "../../services/API/adminAPI/Survey/usedSurveyQuestions";
import getUsedSurveyInvitations from "../../services/API/adminAPI/Survey/usedSurveyInvitations";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import Question from "./Question";
import InvitationsSurvey from "./Invitations";

class Survey extends React.Component {
    constructor(props) {
        super(props);
        const id = window.location.pathname.split('/');
        this.state = {
            survey_id: id[3],
            survey: null,
            questions: [],
            invitations: [],
            sessions: []
        }
    }

    render() {
        if (this.state.survey === null) {
            return (
                <div className={s.CircularProgress}>
                    <CircularProgress size={70}/>
                </div>
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
                                        variant='h4'> {this.state.survey.survey_name}</Typography>
                            <Typography className={s.SurveyInfo}
                                        variant='body1'>{this.state.survey.description}</Typography>
                        </Paper>
                        {this.state.questions.map((question, index) => <Question key={question._id} value={question}/> )}
                    </Grid>
                    <Grid item lg={3} md={2} sm={12} xs={12} className={s.InfoPanel}>
                        <InvitationsSurvey invitations={this.state.invitations}/>
                    </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        getUsedSurveyQuestions(this.state.survey_id).then(json => {
            console.log(json);
            this.setState({survey: json.survey, questions: json.questions});
        });
        getUsedSurveyInvitations(this.state.survey_id).then(json => {
            console.log(json);
            this.setState({invitations: json.invitations, sessions: json.sessions});
        });
    }
}

export default Survey;