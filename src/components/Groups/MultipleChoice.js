import React from "react";

const MultipleChoice = props => {
    console.log(props)
    const answers = props.report.questions[props.question_number].answers;
    let sessions = props.report.questions[props.question_number].session;
    let session = [...answers];
    for (let i = 0; i < answers.length; i++) {
        for (let j = 0; j < sessions.length; j++) {
            if (answers[i]._id === sessions[j].answer_id) {
                session[i] = {
                    ...session[i],
                    session: 1
                }
            }
        }
    }
    console.log(answers)
    console.log(session)
    return (
        <div>
            {props.report.questions[props.question_number].session.map((val, index) => <div
                key={index}>{val.email}: {props.report.questions[props.question_number].session[index].answers.map(value =>
                <span>{value.answer_id}</span>)}</div>)}
        </div>
    )
}
export default MultipleChoice;