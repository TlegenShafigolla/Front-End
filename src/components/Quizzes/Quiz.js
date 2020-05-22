import React from "react";
import Grid from "@material-ui/core/Grid";
import s from "./Quiz.module.css";
import Paper from "@material-ui/core/Paper";
import getUsedQuizQuestions from "../../services/API/adminAPI/Quiz/usedQuizQuestions";
import getUsedQuizInvitations from "../../services/API/adminAPI/Quiz/usedQuizInvitations";
import Typography from "@material-ui/core/Typography";
import {CircularProgress} from "@material-ui/core";
import Question from "./Question";
import Invitations from "./Invitations";

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        const id = window.location.pathname.split('/');
        this.state = {
            quiz_id: id[3],
            quiz: null,
            questions: [],
            invitations: [],
            sessions: []
        }
    }

    render() {
        if (this.state.quiz === null) {
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

                <Grid item  lg={6} md={8} sm={12} xs={12}>
                    <Paper square elevation={3} className={s.QuizNameDescription}>
                        <Typography noWrap
                                    className={s.QuizInfo}
                                    variant='h4'> {this.state.quiz.quiz_name}</Typography>
                        <Typography className={s.QuizInfo}
                                    variant='body1'>{this.state.quiz.description}</Typography>
                    </Paper>
                    {this.state.questions.map((question, index) => <Question key={question._id} value={question}
                                                                             points={this.state.quiz.points}/>)}
                </Grid>
                <Grid item lg={3} md={2} sm={12} xs={12} className={s.InfoPanel}>
                    <Invitations invitations={this.state.invitations}/>
                </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        getUsedQuizQuestions(this.state.quiz_id).then(json => {
            console.log(json);
            this.setState({quiz: json.quiz, questions: json.questions});
        });
        getUsedQuizInvitations(this.state.quiz_id).then(json => {
            console.log(json);
            this.setState({invitations: json.invitations, sessions: json.sessions});
        });
    }
}

export default Quiz;