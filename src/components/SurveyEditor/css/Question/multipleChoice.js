import s from "../multipleChoice.module.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";

const MultipleChoice = (props) => {
    return (
        <div className={s.SaveAnswer}>
            <div className={s.Answer}>
                <div className={s.Text}>
                    <TextField
                        error={props.errorAnswer}
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
                <IconButton className={s.DeleteButton}
                            size='small' color='inherit'
                            onClick={() => props.deleteAnswerOnClick(props.index, props.val._id, props.id)}>
                    <HighlightOffIcon color='error' fontSize='small'/>
                </IconButton>
            </div>
        </div>

    );
};

export default MultipleChoice;