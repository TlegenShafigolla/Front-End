import React from "react";
import s from './QuestionNumberIcon.css'

const QuestionNumberIcon = (props) => {
    let correct=0;
    if (props.val.session !== undefined) {
        if (props.points) {
           correct =props.val.session.map(value => value.points)
        }
        correct =props.val.session.map(value => value.correct)
    }
    return (
        <div className={correct>0?'Correct':'Square'}>
            {props.index + 1}
        </div>
    );
}

export default QuestionNumberIcon;