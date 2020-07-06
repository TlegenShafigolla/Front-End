import React from "react";
import s from '../css/editAnswer.module.css'
import FillTheBlank from "./AnswerTypes/fillTheBlank";
import MultipleChoice from "./AnswerTypes/multipleChoice";
const EditAnswer =(props)=> {
        return (
                <div className={s.TextField}>
                    {props.value.type !== 'MULTIPLE CHOICE' ?
                        <FillTheBlank
                       answers={props.answers}
                       onChangeAnswer={props.onChangeAnswer}
                       changePoint={props.changePoint}
                       index={props.index}
                       question_id={props.value._id}
                       addNewAnswer={props.addNewAnswer}
                       point={props.point}
                       errorAnswer={props.errorAnswer}
                        /> : props.answers[props.index].map((val, index) =>
                                <MultipleChoice
                                    deleteAnswerOnClick={props.deleteAnswerOnClick}
                                    onChangeAnswer={props.onChangeAnswer}
                                    changePoint={props.changePoint}
                                    index={props.index}
                                    point={props.point}
                                    id={index}
                                    errorAnswer={props.errorAnswer}
                                    key={index}
                                    val={val}
                                />)
                    }
                </div>

        );
};
export default EditAnswer;

