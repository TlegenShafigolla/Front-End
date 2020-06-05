import React from "react";

const FillTheBlank = props => {

    return (
        <div>
            {props.report.sessions.map(val => <div key={val.email}>{val.email}: {val.answers.map(value =>
                <div key={value._id}>{value.question_id === props.report.questions[props.question_number]._id ? value.answer : null}</div>)}</div>)}
        </div>
    )
}
export default FillTheBlank