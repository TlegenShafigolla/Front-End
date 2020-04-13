import s from "../css/editAnswer.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";

class FillTheBlank extends React.Component {
    render() {
        console.log("Here");
        return (
            <div className={s.SaveAnswer}>
                <TextField
                    id={this.props.id}
                    key={this.props.index}
                    placeholder="New answer"
                    fullWidth
                    defaultValue={'Test'}
                    onSubmit={this.props.changeCheck}
                    onChange={this.props.onChangeAnswer}
                    size="small"
                    multiline={true}
                    rows={1}
                    rowsMax={3}
                    variant="outlined"
                />
                {this.props.point ?
                    <div>
                        <InputBase
                            className={s.point}
                            id={this.props.id}
                            key={this.props.index}
                            inputProps={{'aria-label': 'Point'}}
                            defaultValue={'2'}
                            onChange={this.props.changePoint}
                        />
                    </div> : ''}
                <IconButton className={s.deleteButton}
                            size='small' color='inherit'
                            onClick={event => this.props.deleteAnswerOnClick(this.props.id)}>
                    <HighlightOffIcon color='error' fontSize='small'/>
                </IconButton>
            </div>

        );
    }
}

export default FillTheBlank;