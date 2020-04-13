import React from "react";
import s from './css/editQuestion.module.css'
import TextField from '@material-ui/core/TextField';
import EditAnswer from "./editAnswer";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: this.props.editMode,
            question_id: this.props.question_id,
            order: this.props.value.order_id,
            answerType: this.props.answerType,
            isMultipleChoice: this.props.answerType === 'MULTIPLE CHOICE',
        };
    }

    multipleChoiceChecked = () => {
        this.setState({isMultipleChoice: true});
        this.props.changeType('MULTIPLE CHOICE');
    };

    fillTheBlankChecked = () => {
        this.setState({isMultipleChoice: false});
        this.props.changeType('FILL THE BLANK');
    };

    render() {
        console.log(this.props.answers)
        return (
            <div className={s.question} id={this.state.order}>
                <div className={s.questioninfo}>
                    <div className={s.questionOrder}>{this.state.order}.</div>
                    <div className={s.questionField}>
                        <TextField
                            placeholder="Question"
                            fullWidth
                            size='small'
                            defaultValue={this.props.question}
                            onChange={this.props.onChangeQuestion}
                            multiline={true}
                            rows={4}
                            rowsMax={6}
                            label="Question"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className={s.formControll}>
                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              checked={this.state.isMultipleChoice}
                                              onChange={this.multipleChoiceChecked}
                                              color="primary"
                                          />} label='Multiple Choice'/>
                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              color="primary"
                                              onChange={this.fillTheBlankChecked}
                                              checked={!this.state.isMultipleChoice}
                                          />} label='Fill the blank '/>
                </div>
                <div className={s.answerType}>
                    {this.props.answers === [] ?'' : this.props.answers.map((val, index) =>
                        <div key={this.props.index_key[index]} >
                            <EditAnswer
                                id={index.toString()}
                                key={this.props.index_key[index]}
                                val={val}
                                index={index}
                                isMultipleChoice={this.state.isMultipleChoice}
                                {...this.props}
                            />
                        </div>
                    )}
                </div>
                <div className={s.Buttons}>
                    {this.state.isMultipleChoice ?
                        <IconButton className={s.AddButton} color="primary" onClick={this.props.addNewAnswer}>
                            <AddIcon/>
                        </IconButton> : ''}
                    <Button color="primary" className={s.saveButton} onClick={this.props.saveOnClick}>
                        Save
                    </Button>
                </div>

            </div>
        );
    }
}

export default EditQuestion;
