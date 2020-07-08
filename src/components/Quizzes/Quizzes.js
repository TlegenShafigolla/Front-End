import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import s from "./Quizzes.module.css";
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

class Quizzes extends React.Component {

    componentDidMount() {
        this.props.requestUsedQuiz()
    }

    render() {
        if(this.props.quizzes===undefined){
            return ''
        }
        return (
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                  className={s.Root}>
                <Grid item lg={2} md={2} sm={1} xs={1}>
                </Grid>
                <Grid item lg={8} md={8} sm={10} xs={12}>
                    <Grid container
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start"
                          spacing={1}
                          className={s.Body}>
                        {this.props.quizzes.map((val, index) =>
                            <Grid key={index} item lg={3} md={3} sm={4} xs={12}>
                                <QuizCard quiz_name={val.quiz_name}
                                          _id={val._id}
                                          questions_count={val.questions_count}
                                          created_date={val.created_date}/>
                            </Grid>)}
                    </Grid>
                </Grid>
                <Grid item lg={2} md={2} sm={1} xs={1}>
                </Grid>
            </Grid>
        );
    }
}

const QuizCard = (props) => {
    return (
        <NavLink to={`/admin/quizzes/${props._id}`}>
            <Paper square elevation={3} className={s.QuizCard}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <Typography variant="subtitle1" gutterBottom>{props.quiz_name}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>{props.questions_count + (props.questions_count > 1 ? " questions" : " question")}</Typography>
                    <Typography variant="caption" display="block" gutterBottom>Created date: {props.created_date}</Typography>
                </Grid>
            </Paper>
        </NavLink>
    );
};

export default Quizzes;