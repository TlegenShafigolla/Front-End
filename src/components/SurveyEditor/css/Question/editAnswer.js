import React from "react";
import Checkboxes from "./checkboxes";
import s from "../editAnswer.module.css";
import MultipleChoice from "./multipleChoice";

const EditAnswer = (props) => {
    return (
        <div className={s.TextField}>
            {props.value.type === 'CHECKBOXES'  ?
                props.answers[props.index].map((val, index) =>
                    <Checkboxes
                        deleteAnswerOnClick={props.deleteAnswer}
                        onChangeAnswer={props.onChangeAnswer}
                        id={index}
                        key={index}
                        index={props.index}
                        val={val}
                    />) : null}
            {props.value.type === 'MULTIPLE CHOICE'?
                props.answers[props.index].map((val, index) =>
                    <MultipleChoice
                        deleteAnswerOnClick={props.deleteAnswerOnClick}
                        onChangeAnswer={props.onChangeAnswer}
                        index={props.index}
                        id={index}
                        multipleChoice={props.multipleChoice}
                        errorAnswer={props.errorAnswer}
                        key={index}
                        val={val}/>
                ):null
            }
        </div>

    );
};

export default EditAnswer;