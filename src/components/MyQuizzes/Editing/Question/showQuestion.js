import React from "react";
import s from "../css/showQuestion.module.css";
import Typography from "@material-ui/core/Typography";
import ShowAnswer from "./showAnswer";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

const ShowQuestion = (props) => {
        return (
            <div className={s.Question} id={props.value.order_id.toString()}>
                <div onClick={props.editOnClick}>
                    <div className={s.questioninfo}>
                        <div className={s.questionOrder}>{props.value.order_id}.</div>
                        <div className={s.questionField}>
                            <Typography variant="body1" gutterBottom>
                                {props.question === ' ' ? 'New question' : props.question}
                            </Typography>
                        </div>
                    </div>

                    <div className={s.answerType}>
                        <ShowAnswer
                            key={props.question_id}
                            question_id={props.question_id}
                            {...props}
                        />
                    </div>
                </div>
                <div className={s.Button}>
                    <IconButton aria-label="delete" onClick={props.deleteQuestionOnClick}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        );
};

export default ShowQuestion;