import s from "../../css/editAnswer.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

class MultipleChoice extends React.Component {
    render() {
        return (
            <div className={s.SaveAnswer}>
                <div className={s.answer}>
                    <div className={s.text} >
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
                    <div className={s.correct}>
                        {this.props.point ?
                            <InputBase
                                className={s.point}
                                       id={this.props.id}
                                       key={this.props.index}
                                       inputProps={{'aria-label': 'Point'}}
                                       defaultValue={this.props.val.points}
                                       onChange={this.props.changePoint}
                            /> : <FormControlLabel className={s.checkbox} control={
                                <Checkbox
                                    id={this.props.id}
                                    key={this.props.index}
                                    color='primary'
                                    checked={this.props.val.correct === 1}
                                    onChange={this.props.changeCheck}/>}/>
                        }
                    </div>
                </div>
                <div className={s.deleteButton}>
                    <IconButton className={s.deleteButton}
                                size='small' color='inherit'
                                onClick={event => this.props.deleteAnswerOnClick(this.props.id)}>
                        <HighlightOffIcon color='error' fontSize='small'/>
                    </IconButton>
                </div>
            </div>

        );
    }
}

export default MultipleChoice;