import React from "react";
import s from '../css/editAnswer.module.css'
import FillTheBlank from "./AnswerTypes/fillTheBlank";
import Checkboxes from "./AnswerTypes/checkboxes";
import MultipleChoice from "./AnswerTypes/multipleChoice";

const EditAnswer = (props) => {
    return (
        <div className={s.TextField}>
            {props.value.type === 'FILL THE BLANK' ?
                <FillTheBlank
                    answers={props.answers}
                    onChangeAnswer={props.onChangeAnswer}
                    index={props.index}
                    question_id={props.value._id}
                    addNewAnswer={props.addNewAnswer}
                    point={props.point}
                    errorAnswer={props.errorAnswer}
                /> : null}
            {props.value.type === 'CHECKBOXES'?
                props.answers[props.index].map((val, index) =>
                    <Checkboxes
                        deleteAnswerOnClick={props.deleteAnswerOnClick}
                        onChangeAnswer={props.onChangeAnswer}
                        onChangePoint={props.onChangePoint}
                        index={props.index}
                        points={props.points}
                        id={index}
                        errorAnswer={props.errorAnswer}
                        key={index}
                        val={val}
                    />):null
            }
            {props.value.type === 'MULTIPLE CHOICE'?
                    props.answers[props.index].map((val, index) =>
                        <MultipleChoice
                            deleteAnswerOnClick={props.deleteAnswerOnClick}
                            onChangeAnswer={props.onChangeAnswer}
                            changePoint={props.changePoint}
                            index={props.index}
                            point={props.point}
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

