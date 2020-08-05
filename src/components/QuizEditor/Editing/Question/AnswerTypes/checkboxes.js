import s from "../../css/editAnswer.module.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

const Checkboxes = (props) => {
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
                <div>
                    <Checkbox
                        color='primary'
                        checked={props.val.points !== 0}
                        onChange={(event) => props.onChangePoint(event.target.checked, props.index, props.id)}
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

export default Checkboxes;