import s from "../../css/editAnswer.module.css";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import React from "react";

class FillTheBlank extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            error:false
        };
    }
    render() {
        if(this.props.answers[0] === undefined){
            this.props.addNewAnswer(1,1);
            return null;
        }
        return (
            <div className={s.SaveAnswer}>
                <TextField
                    error={this.props.errorAnswer}
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