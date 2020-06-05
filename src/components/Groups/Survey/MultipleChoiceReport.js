import React from "react";
import s from "../Questions.module.css";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const MultipleChoiceGroupReport = (props) => {
    const answers = props.val.answers;
    const sessions = props.report.sessions[props.index].answers;
    let session = [];
    for (let i = 0; i < answers.length; i++) {
        for (let j = 0; j < sessions.length; j++) {
            if (answers[i]._id === sessions[j].answer_id) {
                session.push(answers[i].answer)
            }
        }
    }
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
                {session.map((val,index) =>
                    <div className={s.answerForm} key={index}>
                        <Typography variant="body1">
                            {val}
                        </Typography>
                    </div>
                )
                }
            </div>
        </Paper>
    )
}
export default MultipleChoiceGroupReport;