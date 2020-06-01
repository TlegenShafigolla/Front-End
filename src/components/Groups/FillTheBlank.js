import React from "react";

const FillTheBlank = props => {
    return (
        <div>
            {props.report.questions[props.question_number].session.map((val, index) => <div
                key={index}>{val.email}: <span>{props.report.questions[props.question_number].session[index].answers[0].answer}</span>
            </div>)}
        </div>
    )
}
export default FillTheBlank