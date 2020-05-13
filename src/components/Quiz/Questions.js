import React from "react";
import s from "./Quiz.module.css";
import Typography from "@material-ui/core/Typography";
import Answers from "./Answers";
import Divider from "@material-ui/core/Divider";


const Question =(props)=>{
        return (
            <div className={s.Question} id={props.index.toString()}>

                <div className={s.QuestionInfo}>
                    <Typography variant="h6" component="h2">
                        {props.index+1}.</Typography>
                    <div className={s.QuestionField}>
                        <Typography variant="h6" component="h2">
                            {props.value.question}
                        </Typography>
                    </div>
                </div>
                <Divider/>
                <div>
                    <Answers
                        onChangeAnswer={props.onChangeAnswer}
                        key={props.value._id}
                        onChangeCheck={props.onChangeCheck}
                        value={props.value}
                    />

                </div>
            </div>
        );
}

export default Question;