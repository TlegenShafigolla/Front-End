import React from "react";
import s from "./Quiz.module.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const StartTest = (props) => {
    console.log(props)
    return (<div>
            <div className={s.dialogActions}>
                <Typography
                    variant='h4'
                    className={s.typography}>
                    {props.quiz.quiz_name}
                </Typography>
            </div>
            < div
                className={s.dialogContent}>
                <Typography
                    variant='h6'
                    color='textSecondary'> There are {props.quiz.questions_count} questions </Typography>
                <Typography className={s.description} variant='h4'>{props.quiz.description}</Typography>
            </div>
            <Button  color='primary' onClick={props.start} variant='contained'>Start test</Button>
        </div>
    )
};
export default StartTest;