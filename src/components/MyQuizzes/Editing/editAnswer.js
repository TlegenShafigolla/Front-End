import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import s from './css/editAnswer.module.css'
import Radio from "@material-ui/core/Radio";

class EditAnswer extends React.Component {
    constructor(props) {
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
                <div className={s.formControll}>
                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              onChange={this.multipleChoiceChecked}
                                              checked={this.state.multiple_choice}
                                              color="primary"
                                          />} label='Multiple Choice'/>
                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              color="primary"
                                              onChange={this.fillTheBlankChecked}
                                              checked={this.state.fill_the_blank}
                                          />} label='Fill the blank '/>

                </div>
                <div className={s.TextField}>
                    {this.state.answers === [] ? '' : this.state.answers.map( (val, index) =>
                        <TextField
                            id={index.toString()}
                            key={index}
                            placeholder="Answer"
                            fullWidth
                            defaultValue={val.answer}
                            onChange={this.props.onChangeAnswer}

                        />

                    )}
            </div>
         </div>
        );
    }
}

export default EditAnswer;