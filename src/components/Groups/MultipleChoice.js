import React from "react";
const MultipleChoice=props=>{
    console.log(props)
    return(
        <div >
            {props.report.questions[props.question_number].answers.map(val=><div>{val.answer}</div>)}
        </div>
    )
}
export default MultipleChoice;