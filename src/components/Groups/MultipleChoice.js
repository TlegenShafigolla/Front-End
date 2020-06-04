import React from "react";
import s from './GroupReport.module.css'

const MultipleChoice = props => {
    console.log(props)
    const answers = props.report.questions[props.question_number].answers;
    let sessions = props.report.questions[props.question_number].session;
    let session = [...sessions]
    answers.map(val => {
        sessions.map((value, index) => value.answers.map((ans, ind) => {
                if (val._id === ans.answer_id) {
                    session[index].answers[ind] = {
                        ...session[index].answers[ind],
                        answer: val.answer
                    }
                }
            }
        ))
    })

    return (
        <div>
            {session.map(val => <div key={val.email}>{val.email}: {val.answers.map(value => <div
                className={value.correct > 0 ? s.correctAnswer : s.answer}
                key={value.answer_id}>{value.answer}</div>)}</div>)}
        </div>
    )
}
export default MultipleChoice;