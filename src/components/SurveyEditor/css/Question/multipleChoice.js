import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton";
import s from "../multipleChoice.module.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";


const MultipleChoice = (props) => {
    return (
        <div className={s.SaveAnswer}>
            <div className={s.Answer}>
                <div className={s.Text}>
                    <TextField
                        placeholder="New answer"
                        fullWidth
                        value={props.val.answer}
                        onChange={(event) => props.onChangeAnswer(event, props.index, props.id)}
                        size="small"
                        multiline={true}
                        rows={1}
                        rowsMax={3}
                        variant="outlined"
                    />
                </div>
            </div>
            <div className={s.DeleteButton}>
                <IconButton size='small' color='inherit'
                            onClick={() => props.deleteAnswerOnClick(props.index, props.val._id,props.id)}>
                    <HighlightOffIcon color='error' fontSize='small'/>
                </IconButton>
            </div>
        </div>
    );
};

export default MultipleChoice;