import React from "react";
import s from "../Questions.module.css";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const FillTheBlankGroup = (props) => {
    return (
        <Paper square elevation={3} className={s.Question} id={props.val._id.toString()}>
            <div className={s.QuestionInfo}>
                <div className={s.QuestionOrder}>{props.val.order_id}.</div>
                <div className={s.QuestionField}>
                    <Typography variant="body1" gutterBottom>
                        {props.val.question}
                    </Typography>
                </div>
            </div>

            {props.report.sessions[props.index].answers === undefined ? 'no answer' :
                <div className={s.Question}>
                    <div className={s.answers}>
                        <Typography
                            variant="body1">
                            {props.report.sessions[props.index].answers[props.question_number].answer}
                        </Typography>
                    </div>
                </div>}
        </Paper>
    )
}
export default FillTheBlankGroup;