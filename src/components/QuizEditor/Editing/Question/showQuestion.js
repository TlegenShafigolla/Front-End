import React from "react";
import s from "../css/showQuestion.module.css";
import Typography from "@material-ui/core/Typography";
import ShowAnswer from "./showAnswer";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

const ShowQuestion = (props) => {
    return (
        <Paper square elevation={3} id={props.value.order_id.toString()} className={s.Question}>
            <div onClick={props.editOnClick}>
                <div className={s.QuestionInfo}>
                    <div className={s.QuestionOrder}>{props.value.order_id}.</div>
                    <div className={s.QuestionField}>
                        <Typography variant="body1" gutterBottom >
                            {props.value.question === ' ' ? 'New question' :props.value.question}
                        </Typography>
                    </div>
                </div>
                <div >
                    <ShowAnswer
                        key={props.value._id}
                        question_id={props.value._id}
                        answers={props.answers}
                        answerType={props.value.type}
                        {...props}
                    />
                </div>
            </div>
            <div className={s.Button}>
                <IconButton aria-label="delete" onClick={props.deleteQuestionOnClick}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </Paper>
    );
};

export default ShowQuestion;