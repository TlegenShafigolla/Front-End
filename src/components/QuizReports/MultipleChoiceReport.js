import React from "react";
import s from "./ReportQuestion.module.css";
import {Checkbox, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import CheckIcon from "@material-ui/icons/Check";
import Paper from "@material-ui/core/Paper";

const MultipleChoiceReport = (props) => {
    const correct = green.A700;
    const wrong = red.A700;

    let answers = props.val.answers;
    let session = props.val.session;
    for (let i in answers) {
        for (let j in session) {
            if (session[j].answer_id === answers[i]._id) {
                answers[i] = {
                    ...answers[i],
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
                {answers.map(val =>
                    <div className={s.answerForm} key={val._id}>
                        <Typography variant="body1">
                            {val.answer}
                        </Typography>
                        <Checkbox
                            style={(val.point !== 0) ? {color: correct} : {color: wrong}}
                            checked={val.session === 1}
                        />
                    </div>
                )
                }
            </div>
        </Paper>
    )
}
export default MultipleChoiceReport;