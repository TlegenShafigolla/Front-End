import React from "react";
import s from "./Questions.module.css";
import {Checkbox, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import Paper from "@material-ui/core/Paper";

const MultipleChoiceGroupReport = (props) => {
    const correct = green.A700;
    const wrong = red.A700;
    const answers = props.val.answers;
    let sessions
    if (props.val.session !== undefined) {
        sessions = props.val.session[props.index].answers;
    } else {
        sessions= props.val.answers
    }
    let session = [...answers];
    for (let i = 0; i < answers.length; i++) {
        for (let j = 0; j < sessions.length; j++) {
            if (answers[i]._id === sessions[j].answer_id) {
                session[i] = {
                    ...session[i],
                    session: 1
                }
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
                {session.map(val =>
                    <div className={s.answerForm} key={val._id}>
                        <Typography variant="body1">
                            {val.answer}
                        </Typography>
                        <Checkbox
                            style={(val.points > 0) ? {color: correct} : {color: wrong}}
                            checked={val.session === 1}
                        />
                    </div>
                )
                }
            </div>
        </Paper>
    )
}
export default MultipleChoiceGroupReport;