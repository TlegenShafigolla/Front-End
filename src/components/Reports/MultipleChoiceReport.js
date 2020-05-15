import React from "react";
import s from "./ReportQuestion.module.css";
import {Checkbox, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import CheckIcon from "@material-ui/icons/Check";

const MultipleChoiceReport = (props) => {
    const correct = green.A700;
    const wrong = red.A700;
    console.log(props)

    let answers = props.val.answers;
    for (let i = 0; i < answers.length; i++) {
        if (props.val.session !== undefined) {
            for (let j = 0; j < props.val.session.length; j++) {
                if (answers[i]._id === props.val.session[j].answer_id) {
                    let sessionCorrect = props.val.session[j].correct
                    let sessionPoint = props.val.session[j].point
                    answers[i] = {
                        ...answers[i],
                        sessionCorrect,
                        sessionPoint
                    }
                }
            }
        } else {
            answers = props.val.answers;
        }
    }
    return (
        <div className={s.Answer}>
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
                            style={(val.point > 0 || val.correct > 0) ? {color: correct} : {color: wrong}}
                            checked={val.sessionCorrect === 0 || val.sessionPoint === 0 || val.sessionCorrect > 0 || val.sessionPoint > 0}
                        />
                    </div>
                )
                }
            </div>
        </div>
    )
}
export default MultipleChoiceReport;