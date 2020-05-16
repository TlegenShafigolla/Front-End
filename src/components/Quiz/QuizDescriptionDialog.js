import React from "react";
import s from "./Quiz.module.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import logo from "../../images/logoPng.png";

/*
logo
quiz_name:
description:
created_date: "2020-05-13T21:55:48.927Z"
questions_count: 9
mixed: true
showResults: true
points: true

start button: props.start
* */

const StartingPage = (props) => {
    console.log(props)
    return (
        <div className={s.QuizDescriptionDialog}>
            <Grid container
                  spacing={3}
                  direction="column"
                  justify="space-between"
                  alignItems="center">
                <img className={s.Logo} src={logo} alt="Logo"/>
                <span className={s.QuizName}>{props.quiz.quiz_name}</span>
                <span className={s.QuestionsCount}>{props.quiz.questions_count} Questions</span>
                <div className={s.Instructions}>
                    <Typography paragraph color="primary" variant="h6">{"Description"}</Typography>
                    <div className={s.Description}>
                        <Typography color="textSecondary" variant="body1">{props.quiz.description}</Typography>
                    </div>
                    <Typography paragraph color="primary" variant="h6">{"Instructions"}</Typography>
                    <ol type="1">
                        <li><Typography color="textSecondary" variant="body1">This is a graded quiz</Typography></li>
                        <li><Typography color="textSecondary" variant="body1">There might two types of questions. 1)Multiple Choice 2)Fill the blank</Typography></li>
                        <li><Typography color="textSecondary" variant="body1">After pressing "Finish" button, your session will be over and no changes can be done afterward.</Typography></li>
                        <li><Typography color="textSecondary" variant="body1">"Fill the blank" questions can be graded by host after passing the quiz.</Typography></li>
                        <li><Typography color="textSecondary" variant="body1">There is no time limit for this quiz.</Typography></li>
                    </ol>

                </div>
                <Button color='primary' onClick={props.start} variant='contained'>Start quiz</Button>
            </Grid>
        </div>
    )
};
export default StartingPage;