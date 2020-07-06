import s from "../../css/editAnswer.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import React from "react";

const FillTheBlank = (props) => {
    if(props.answers[props.index]===undefined){
        return null;
    }
    if(props.answers[props.index][0]===undefined){
        return null;
    }
    return (
        <div className={s.SaveAnswer}>
            <TextField
                error={props.errorAnswer}
                placeholder="New answer"
                fullWidth
                value={props.answers[props.index][0].answer}
                onChange={(event) => props.onChangeAnswer(event, props.index, 0)}
                size="small"
                multiline
                rows={1}
                rowsMax={3}
                variant="outlined"
            />
            {props.point ?
                <div>
                    <InputBase
                        className={s.point}
                        id={props.id}
                        value={props.answers[0].points}
                        onChange={(e) => props.changePoint(e.target.value, props.index, 0)}
                    />
                </div> : ''}
        </div>

    );
};

export default FillTheBlank;