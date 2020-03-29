import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import getAnswers from "../../../services/api/answers";
import Typography from "@material-ui/core/Typography";

class ShowAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question_id: props.id,
            multiple_choice: props.answerType === 'MULTIPLE CHOICE',
            fill_the_blank: props.answerType === 'FILL THE BLANK',
        };
    }

    render() {
        return (
            <div>
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.multiple_choice}
                                onChange={this.multipleChoiceChecked}
                                name="checkedB"
                                color="primary"
                                disabled={true}
                            />
                        }
                        label="Multiple Choice"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.fill_the_blank}
                                onChange={this.fillTheBlankChecked}
                                name="checkedB"
                                color="primary"
                                disabled={true}
                            />
                        }
                        label="Fill the blank"
                    />
                </div>
                <div>
                {this.props.answers === null ? '' : this.props.answers.map(val =>
                    <Typography variant="body1" gutterBottom key={val.id}>
                        {val.answer}
                    </Typography>
                )}
                </div>
            </div>
        );
    }
}

export default ShowAnswer;