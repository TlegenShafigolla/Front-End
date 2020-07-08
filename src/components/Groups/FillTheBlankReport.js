import React from "react";
import s from "./Questions.module.css";
import {Checkbox, InputBase, Typography} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import {green} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

const correct = green.A700;
const FillTheBlankGroup = (props) => {
    let answers = props.val.answers[0].question_id;
    let session = props.val.session[props.index].answers;
    let sessions = null
    for (let j in session) {
        if (session[j].question_id === answers) {
            sessions = {
                ...session[j]
            }
        }
    }
    return (
        <Paper square elevation={3} className={s.Question} id={props.val._id.toString()}>
            <div className={s.QuestionInfo}>
                <div className={s.QuestionOrder}>{props.val.order_id}.</div>
                <div className={s.QuestionField}>
                    <Typography variant="body1" gutterBottom>
                        {props.val.question}
                    </Typography>
                    <div className={s.CorrectAnswer}>
                        <Typography variant="body1">
                            Correct answer: {props.val.answers[0].answer}
                        </Typography>
                        <CheckIcon/>
                    </div>
                </div>
            </div>

            {props.val.session === undefined ? null :
                <div className={s.Question}>
                    <div className={s.answers}>
                        <Typography
                            variant="body1">
                            User answer: {sessions.answer}
                        </Typography>
                        {props.points ? (
                            <InputBase className={s.InputBase} id={props.val.session[props.index]._id.toString()}
                                       defaultValue={props.val.session[props.index].points}
                                       type={'number'}
                                       onBlur={props.onSubmitInput}
                                       onSubmit={props.onSubmitInput}
                                       onChange={props.onChangeInputBase}
                            />) : <Checkbox
                            style={{color: correct}}

                            defaultChecked={props.val.session[props.index].points > 0}
                                                        onChange={props.onChangeCheckbox}/>}
                    </div>
                </div>}
        </Paper>
    )
}
export default FillTheBlankGroup;