import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/core/SvgIcon/SvgIcon";
import s from "./multipleChoice.module.css";

class MultipleChoice extends React.Component{
    render() {
        return(
            <div className={s.SaveAnswer}>
                <div className={s.Answer}>
                    <div className={s.Text}>
                        <TextField
                            error={this.props.errorAnswer}
                            id={this.props.id}
                            key={this.props.index}
                            placeholder="New answer"
                            fullWidth
                            defaultValue={this.props.val.answer}
                            onChange={this.props.onChangeAnswer}
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
                                onClick={event => this.props.deleteAnswerOnClick(this.props.id)}>
                        <HighlightOffIcon color='error' fontSize='small'/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default MultipleChoice;