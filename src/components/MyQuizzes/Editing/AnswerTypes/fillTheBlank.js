import s from "../css/editAnswer.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import React from "react";

class FillTheBlank extends React.Component {
    componentDidMount() {
        if(this.props.answers.length === 0){
            this.props.addNewAnswer(1,1);
        }
    }

    render() {
        if(this.props.answers.length === 0){
            return null;
        }
        return (
            <div className={s.SaveAnswer}>
                <TextField
                    id={this.props.id}
                    key={this.props.index}
                    placeholder="New answer"
                    fullWidth
                    defaultValue={this.props.answers[0].answer}
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
                            defaultValue={this.props.answers[0].points}
                            onChange={this.props.changePoint}
                        />
                    </div> : ''}
            </div>

        );
    }
}

export default FillTheBlank;