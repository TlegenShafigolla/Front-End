import React from "react";
import {Checkbox} from "@material-ui/core";
import s from "./Quiz.module.css";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Divider from "@material-ui/core/Divider";

const Answers = (props) => {
    let answer = props.value.answers
    for (let i = 0; i < props.value.answers.length; i++) {
        for (let j = 0; j < props.answers.length; j++) {
            if (props.value.answers[i].question_id === props.answers[j].question_id) {
                for (let k = 0; k < props.answers[j].answer_ids.length; k++) {
                    if (props.value.answers[i]._id === props.answers[j].answer_ids[k]) {
                        props.value.answers[i] = {
                            ...props.value.answers[i],
                            check: 1
                        }
                    }
                }
            }
        }
    }
    if (props.value.type !== 'FILL THE BLANK') {
        return (
            <div>
                <ol type='A'>
                    {answer === null ? '' : props.value.answers.map((val, index) =>
                        <div key={index}>
                            <div className={s.Answer}>
                                <li>  {val.answer}</li>
                                <Checkbox
                                    checked={val.check === 1}
                                    onChange={(e) => props.onChangeCheck(e, val.question_id.toString(), val._id.toString(), props.value.max_answers,index,props.index)}
                                    color='primary' size='small'/>
                            </div>
                            <Divider/>
                        </div>
                    )}
                </ol>

            </div>
        );
    } else {
        return (
            <div>
                {props.value.answers.length === 0 ?
                    <TextareaAutosize className={s.textarea} id={props.value._id}
                                      onChange={props.onChangeAnswer}/> : props.value.answers.map((val, index) =>
                        <TextareaAutosize id={val.question_id.toString()} className={s.textarea} key={index}
                                          onChange={props.onChangeAnswer}/>
                    )}
            </div>
        );
    }

}

export default Answers;