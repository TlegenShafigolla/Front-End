import React from "react";
import s from "./ReportQuestion.module.css";
import {Checkbox, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
const SessionAnswer=(props)=>{
    const correct = green.A700;
    const wrong = red.A700;
    return(
        <div  className={s.Answer}>
            <div className={s.answerForm} >
                <Checkbox
                    disableRipple
                    style={(props.val.point > 0 ||props. val.correct > 0)?{color:correct}:{color:wrong}}
                    checked={props.val.point > 0 || props.val.correct > 0 }
                />
                <Typography variant="body1">
                    {props.val.answer}
                </Typography>
            </div>
            <div>
                {/*{this.props.points ? (props.val.points > 0 ? <Typography*/}
                {/*    color='textSecondary'>points: {props.val.points}</Typography> : '') : (props.val.correct === 1 ?*/}
                {/*    <Typography color='textSecondary'>correct</Typography> : '')}*/}
            </div>
        </div>
    )
}
export default SessionAnswer;