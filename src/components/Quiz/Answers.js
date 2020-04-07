import React from "react";
import {Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import s from "../MyQuizzes/Editing/css/showAnswer.module.css";

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.value.type,
        }
    }

    render() {
        if (this.state.type === 'MULTIPLE CHOICE') {
            return (
                <div>
                    {this.props.value.answers === null ? '' : this.props.value.answers.map((val, index) =>
                        <div key={index}>
                            <Typography className={s.typography} variant="body1" gutterBottom>
                                {val.answer}
                            </Typography>
                            <Checkbox id={this.props.index.toString()}
                                      value={val.id.toString()}
                                      name={val.question_id.toString()}
                                      onChange={this.props.onChangeCheck} color='primary'/>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    {this.props.value.answers === null ? '' : this.props.value.answers.map((val, index) =>
                        <TextField id={val.question_id.toString()} name={this.props.index.toString()} key={index}
                                   onChange={this.props.onChangeAnswer}/>
                    )}
                </div>
            );
        }

    }


}

export default Answers;