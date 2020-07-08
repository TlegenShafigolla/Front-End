import React from "react";
import s from "./ReportQuestion.module.css";
import {Checkbox, InputBase, Typography} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import {green} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

const correct = green.A700;
const FillTheBlank = (props) => {
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
                            User answer: {props.val.session[0].answer}
                        </Typography>
                        {props.points ? (
                            <InputBase className={s.InputBase} id={props.val.session[0]._id.toString()}
                                       defaultValue={props.val.session[0].points}
                                       type={'number'}
                                       onBlur={props.onSubmitInput}
                                       onSubmit={props.onSubmitInput}
                                       onChange={props.onChangeInputBase}
                            />) : <Checkbox
                            style={{color: correct}}
                            defaultChecked={props.val.session[0].points !== 0}
                            id={props.val.session[0]._id.toString()}
                            onChange={props.onChangeCheckbox}/>}
                    </div>
                </div>}
        </Paper>
    )
}
export default FillTheBlank;