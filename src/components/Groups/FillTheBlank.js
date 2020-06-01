import React from "react";
const FillTheBlank=props=>{
    console.log(props)
    return(
        <div>
            {props.report.questions[props.question_number].session.map((val, index) => <div key={index}>{val.email}: {props.report.questions[props.question_number].session[index].answers.map(value =>
                <span>{value.answer}</span>)}</div>)}
        </div>
    )
}
export default FillTheBlank