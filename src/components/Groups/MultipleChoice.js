import React from "react";
import s from './GroupReport.module.css'

const MultipleChoice = props => {
    const answers = props.report.questions[props.question_number].answers;
    let sessions = props.report.questions[props.question_number].session;
    let session = [...sessions]
    // eslint-disable-next-line array-callback-return
    answers.map(val => {
        // eslint-disable-next-line array-callback-return
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
            {session.map(val => <div className={s.Answer} key={val.email}>
                <div className={s.Session}>{val.email}:</div>
                <div>{val.answers.map(value => <div
                    className={value.points > 0 ? s.correctAnswer : s.answer}
                    key={value.answer_id}>{value.answer}</div>)}</div>
            </div>)}
        </div>
    )
}
export default MultipleChoice;