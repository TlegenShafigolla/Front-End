import React from "react";
import s from "../QuizReports/ReportQuestion.module.css";
import {Checkbox, Typography} from "@material-ui/core";

const ReportSurvey = props => {
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
            {props.val.type === "FILL THE BLANK" ? props.val.session[0].answer :
                props.val.answers.map(value => <div key={value._id}>
                    <Checkbox disabled={true} checked={value.session===1}/>{value.answer}
                    <hr/>
                </div>)
            }
        </div>
    );
}
export default ReportSurvey;
