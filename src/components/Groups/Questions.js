import React from "react";
import Paper from "@material-ui/core/Paper";
import s from "./Questions.module.css";
import Typography from "@material-ui/core/Typography";
const Questions=props=>{
    console.log(props)
    return(
        <Paper square elevation={3} id={props.val.order_id.toString()} className={s.Question}>
            <div >
                <div className={s.QuestionInfo}>
                    <div className={s.QuestionOrder}>{props.val.order_id}.</div>
                    <div className={s.QuestionField}>
                        <Typography variant="body1" gutterBottom >
                            {props.val.question === ' ' ? 'New question' : props.val.question}
                        </Typography>
                    </div>
                </div>
                <div >

                </div>
            </div>
        </Paper>
    )
}
export default Questions;
