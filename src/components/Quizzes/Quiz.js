import React from "react";
import Grid from "@material-ui/core/Grid";
import s from "./Quiz.module.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Question from "./Question";
import Invitations from "./Invitations";
import Preloader from "../common/Preloader";

class Quiz extends React.Component {

    render() {
        if (this.props.quiz === null||this.props.quiz === undefined) {
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
                    <Paper square elevation={3} className={s.QuizNameDescription}>
                        <Typography noWrap
                                    className={s.QuizInfo}
                                    variant='h4'> {this.props.quiz.quiz_name}</Typography>
                        <Typography className={s.QuizInfo}
                                    variant='body1'>{this.props.quiz.description}</Typography>
                    </Paper>
                    {this.props.questions.map((question) => <Question key={question._id} value={question}
                                                                      points={this.props.quiz.points}/>)}
                </Grid>
                <Grid item lg={3} md={2} sm={12} xs={12} className={s.InfoPanel}>
                    <Invitations invitations={this.props.invitations}/>
                </Grid>
            </Grid>
        );
    }

    componentDidMount() {
        this.props.requestUsedQuestions(this.props.match.params.id)
        this.props.requestUsedInvite(this.props.match.params.id)

    }
}

export default Quiz;