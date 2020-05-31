import React from "react";
import Paper from "@material-ui/core/Paper";
import s from './GroupReport.module.css'
import MultipleChoice from "./MultipleChoice";
import FillTheBlank from "./FillTheBlank";

const QuestionInfo = props => {
    console.log(props)
    return (
        <Paper className={s.QuestionInfo} square elevation={3}>
            {props.report.questions[props.question_number].order_id}.
            {props.report.questions[props.question_number].question}
            {props.report.questions[props.question_number].type === 'MULTIPLE CHOICE' ? <MultipleChoice {...props}/> :
                <FillTheBlank {...props}/>}

        </Paper>
    )
}
export default QuestionInfo;