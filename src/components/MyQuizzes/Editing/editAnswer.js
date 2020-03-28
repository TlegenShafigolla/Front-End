import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import getAnswers from "../../../services/api/answers";

class EditAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question_id: props.id,
            multiple_choice: props.type === 'MULTIPLE CHOICE',
            fill_the_blank: props.type === 'FILL THE BLANK',
            answers: null,
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

        );
    }

    componentDidMount() {
        getAnswers(this.state.question_id).then(val => this.setState({answers: val}));
    }
}

export default EditAnswer;