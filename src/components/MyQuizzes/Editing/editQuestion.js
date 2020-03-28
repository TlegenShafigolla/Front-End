import React from "react";
import s from './editQuestion.module.css'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class EditQuestion extends React.Component {
    constructor(props){
        super(props);
        const mc = (this.props.value.type === 'MULTIPLE CHOICE');
        const ftb = (this.props.value.type === 'FILL THE BLANK');
        this.state = {
            order: this.props.value.order_id,
            question: this.props.value.question,
            multiple_choice: mc,
            fill_the_blank: ftb,
        };
    }

    multipleChoiceChecked = () => {
        this.setState({multiple_choice: true});
        this.setState({fill_the_blank: false});
    };

    render() {
        return (
            <div className={s.question}>
                <div className={s.questionOrder}>{this.state.order}</div>
                <div className={s.questionField}>
                <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    placeholder="Placeholder"
                    label="Question"
                    margin="normal"
                    multiline={true}
                    rows={2}
                    rowsMax={3}
                    fullWidth
                    defaultValue={this.state.question}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                </div>
                <div className={s.answerType}>
                    <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.multiple_choice}
                            onChange={this.multipleChoiceChecked}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Multiple Choice"
                />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.fill_the_blank}
                                onChange={this.multipleChoiceChecked}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Fill the blank"
                    />
                </div>

            </div>
        );
    }
}

export default EditQuestion;
