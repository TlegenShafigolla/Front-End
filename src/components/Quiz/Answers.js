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
        console.log(this.props.value.answers[0].question_id)
        if (this.state.type === 'MULTIPLE CHOICE') {
            return (
                <div>
                    {this.props.value.answers === null ? '' : this.props.value.answers.map((val, index) =>
                        <div key={index} id={index.toString()}>
                            <Typography className={s.typography} variant="body1" gutterBottom>
                                {val.answer}
                            </Typography>
                            <FormControlLabel
                                id={index.toString()}
                                key={index}
                                control={<Checkbox color='primary'/>}
                                onChange={this.props.onChangeCheck}/>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    {this.props.value.answers === null ? '' : this.props.value.answers.map((val, index) =>
                        <TextField id={val.question_id.toString()} key={index} onChange={this.props.onChangeAnswer}/>
                    )}
                </div>
            );
        }

    }
}

export default Answers;