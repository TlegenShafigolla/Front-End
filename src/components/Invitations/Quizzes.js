import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import s from "./Quizzes.module.css";
import getUsedQuiz from "../../services/API/adminAPI/Quiz/usedQuizzes";

class Quizzes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quizzes: [],
        };
    }

    componentDidMount() {
        getUsedQuiz().then(json => {
            console.log(json);
            this.setState({quizzes: json});
        });
    }

    render() {
        return(
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
                        {this.state.quizzes.map((val, index) =>
                            <Grid key={index} item lg={3} md={3} sm={4} xs={12}>
                                <QuizCard quiz_name={val.quiz_name}/>
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
    return(
        <Paper square elevation={3} className={s.QuizCard}>
            {props.quiz_name}
        </Paper>
    );
};

export default Quizzes;