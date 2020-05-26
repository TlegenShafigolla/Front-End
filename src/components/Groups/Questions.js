import React from "react";
import s from "./Questions.module.css";
import MultipleChoiceGroupReport from "./MultipleChoiceReport";
import FillTheBlankGroup from "./FillTheBlankReport";
const Questions=props=>{
    console.log(props)
    return(
        <div>
            {props.val.type !== "FILL THE BLANK" ? <MultipleChoiceGroupReport val={props.val}/> :
                <FillTheBlankGroup val={props.val}
                                   points={props.points}
                                   index={props.index}
                             />
            }
        </div>

    )
}
export default Questions;
