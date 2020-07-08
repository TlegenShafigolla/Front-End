import React from "react";
import FillTheBlank from "./FillTheBlankReport";
import MultipleChoiceReport from "./MultipleChoiceReport";

const ReportQuestion = (props) => {
    if (props.val === null) {
        return '';
    }
    return (
        <div>
            {props.val.type !== "FILL THE BLANK" ? <MultipleChoiceReport val={props.val}/> :
                <FillTheBlank val={props.val}
                              points={props.points}
                              onChangeInputBase={props.onChangeInputBase}
                              onChangeCheckbox={props.onChangeCheckbox}
                              onSubmitInput={props.onSubmitInput}/>
            }
        </div>
    );
}

export default ReportQuestion;