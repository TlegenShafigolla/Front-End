import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

class EditAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question_id: props.id,
            multiple_choice: props.type === 'MULTIPLE CHOICE',
            fill_the_blank: props.type === 'FILL THE BLANK',
            answers: props.answers,
        };
    }

    multipleChoiceChecked = () => {
        this.setState({multiple_choice: true});
        this.setState({fill_the_blank: false});
        this.props.changeType('MULTIPLE CHOICE');
    };

    fillTheBlankChecked = () => {
        this.setState({multiple_choice: false});
        this.setState({fill_the_blank: true});
        this.props.changeType('FILL THE BLANK');
    };

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
                            disabled={!this.props.editMode}
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
                            disabled={!this.props.editMode}
                        />
                    }
                    label="Fill the blank"
                />
            </div>
                <div>
                    {this.state.answers === [] ? '' : this.state.answers.map(val =>
                        <TextField
                            id="standard-full-width"
                            key={val.id}
                            style={{ margin: 8 }}
                            placeholder="Placeholder"
                            label="Question"
                            margin="normal"
                            multiline={true}
                            rows={1}
                            rowsMax={2}
                            fullWidth
                            defaultValue={val.answer}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />)}
                </div>
            </div>

        );
    }
}

export default EditAnswer;