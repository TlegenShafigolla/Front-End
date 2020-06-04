import React from "react";
import s from './GroupReport.module.css'

const FillTheBlank = props => {
    return (
        <div>
            {props.report.questions[props.question_number].session.map((val, index) => <div
                key={index}>{val.email}: <span
                className={props.report.questions[props.question_number].session[index].answers[0].answer.correct > 0 ? s.correctAnswer : s.answer}>{props.report.questions[props.question_number].session[index].answers[0].answer}</span>
            </div>)}
        </div>
    )
}
export default FillTheBlank