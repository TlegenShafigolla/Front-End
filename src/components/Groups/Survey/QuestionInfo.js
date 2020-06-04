import React from "react";
import Paper from "@material-ui/core/Paper";
import s from '../GroupReport.module.css'

const QuestionInfo = props => {
    console.log(props)
    return (
        <Paper className={s.QuestionInfo} square elevation={3}>
            {props.report.questions[props.question_number].order_id}.
            {props.report.questions[props.question_number].question}

        </Paper>
    )
}
export default QuestionInfo;