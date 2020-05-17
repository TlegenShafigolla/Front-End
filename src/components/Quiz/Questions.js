import React from "react";
import s from "./Quiz.module.css";
import Typography from "@material-ui/core/Typography";
import Answers from "./Answers";
import Divider from "@material-ui/core/Divider";


const Question =(props)=>{
        return (
            <div className={s.Question} id={props.index.toString()}>

                <div className={s.QuestionInfo}>
                    <span>
                        {props.index+1}.</span>
                    <div className={s.QuestionField}>
                        <span >
                            {props.value.question}
                        </span>
                    </div>
                </div>
                <Divider/>
                    <Answers
                        onChangeAnswer={props.onChangeAnswer}
                        key={props.value._id}
                        onChangeCheck={props.onChangeCheck}
                        value={props.value}
                    />

            </div>
        );
};

export default Question;