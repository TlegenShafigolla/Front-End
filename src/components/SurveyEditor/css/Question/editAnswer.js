import React from "react";
import MultipleChoice from "./multipleChoice";
import s from "../editAnswer.module.css";

const EditAnswer = (props) => {
    return (
        <div className={s.TextField}>
            {props.value.type === 'MULTIPLE CHOICE'  ?
                props.answers[props.index].map((val, index) =>
                    <MultipleChoice
                        deleteAnswerOnClick={props.deleteAnswer}
                        onChangeAnswer={props.onChangeAnswer}
                        id={index}
                        key={index}
                        index={props.index}
                        val={val}
                    />) : null}
        </div>

    );
};

export default EditAnswer;