import React from "react";
import s from "../Questions.module.css";
import { Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import Paper from "@material-ui/core/Paper";

const MultipleChoiceGroupReport = (props) => {
    const answers = props.val.answers;

    return (
        <Paper square elevation={3} className={s.Answer}>
            <div className={s.QuestionInfo}>
                <div className={s.QuestionOrder}>{props.val.order_id}.</div>
                <div className={s.QuestionField}>
                    <Typography variant="body1" gutterBottom>
                        {props.val.question}
                    </Typography>
                </div>
            </div>
            <div>
                {answers.map(val =>
                    <div className={s.answerForm} key={val._id}>
                        <Typography variant="body1">
                            {val.answer}
                        </Typography>
                    </div>
                )
                }
            </div>
        </Paper>
    )
}
export default MultipleChoiceGroupReport;