import React from "react";
import s from "./ReportQuestion.module.css";
import {Checkbox, InputBase, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CheckIcon from '@material-ui/icons/Check';
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
const correct = green.A700;
const wrong = red.A700;
const FillTheBlank = (props) => {
    return (
        <div>
            <div className={s.Question} id={props.val._id.toString()}>
                <div className={s.QuestionInfo}>
                    <div className={s.QuestionOrder}>{props.val.order_id}.</div>
                    <div className={s.QuestionField}>
                        <Typography variant="body1" gutterBottom>
                            {props.val.question}
                        </Typography>
                        <div className={s.CorrectAnswer}>
                            <Typography variant="body1">
                                {props.val.answers[0].answer}
                            </Typography>
                            <CheckIcon/>
                        </div>
                    </div>
                </div>
            </div>

            {props.val.session === undefined ? null :
                <div className={s.Question}>
                    <div className={s.answers}>
                        <Typography
                            variant="body1">
                            Answer: {props.val.session[0].answer}
                        </Typography>
                        {props.points ? (
                            <InputBase className={s.InputBase} id={props.val.session[0]._id.toString()}
                                       defaultValue={props.val.session[0].points}
                                       type={'number'}
                                       onChange={props.onChangeInputBase}
                            />) : <Checkbox
                            style={props.val.session[0].correct === 1 ? {color: correct} :
                                {color: '#3333'}} defaultChecked={props.val.session[0].correct === 1}
                            id={props.val.session[0]._id.toString()}
                            onChange={props.onChangeCheckbox}/>}
                    </div>
                    <div className={s.SaveButton} id='ButtonSave'>
                        <Button onClick={props.onClickSaveButton}>Save</Button>
                    </div>
                </div>}
        </div>
    )
}
export default FillTheBlank;