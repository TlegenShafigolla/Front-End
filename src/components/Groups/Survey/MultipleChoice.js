import React from "react";
const MultipleChoice = props => {
    const questions = props.report.questions[props.question_number];
    let sessions = props.report.sessions
    return (
        <div>
            {sessions.map((val, index) => <div key={val.email}>{val.email}: {val.answers.map((value, ind) =>
                questions._id === value.question_id ?
                questions.answers.map(answer =>
                value.answer_id === answer._id ? <div key={value._id}> {answer.answer}</div> : null
                ) : null)}
            </div>)}
        </div>
    )
}
export default MultipleChoice;