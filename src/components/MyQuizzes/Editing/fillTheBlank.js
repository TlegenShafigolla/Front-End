import s from "./css/editAnswer.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";

class FillTheBlank extends React.Component {
    render() {
        console.log(this.props.answers);
        return (
            <div className={s.SaveAnswer}>
                {this.props.answers !== [] ? <TextField
                    id={this.props.id}
                    key={this.props.index}
                    placeholder="New answer"
                    fullWidth
                    defaultValue={this.props.val.answer}
                    onSubmit={this.props.changeCheck}
                    onChange={this.props.onChangeAnswer}
                /> : <TextField placeholder="New answer"
                                fullWidth
                                onChange={this.props.onChangeAnswer}

                />}

                {this.props.point ?
                    <div>
                        <InputBase
                            id={this.props.id}
                            key={this.props.index}
                            inputProps={{'aria-label': 'Point'}}
                            defaultValue={this.props.val.points}
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