import React from "react";
import MultipleChoiceGroupReport from "./MultipleChoiceReport";
import FillTheBlankGroup from "./FillTheBlankReport";

const Questions = props => {
    return (
        <div>
            {props.val.type !== "FILL THE BLANK" ? <MultipleChoiceGroupReport val={props.val}
                                                                              index={props.index}
                                                                              report={props.report}
                /> :
                <FillTheBlankGroup
                    report={props.report}
                    question_number={props.question_number}
                    val={props.val}
                    points={props.points}
                    index={props.index}
                />
            }
        </div>

    )
}
export default Questions;
