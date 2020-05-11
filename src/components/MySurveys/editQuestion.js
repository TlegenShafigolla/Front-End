import React from "react";
import s from "../MyQuizzes/Editing/css/editQuestion.module.css";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAnswer from "./editAnswer";

class EditQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question_id: this.props.question_id,
            order: this.props.value.order_id,
            answerType: this.props.answerType,
            isMultipleChoice: this.props.answerType === 'MULTIPLE CHOICE',
        }
    }

    multipleChoiceChecked = () => {
        this.setState({isMultipleChoice: true});
    };

    fillTheBlankChecked = () => {
        this.setState({isMultipleChoice: false});
    };

    render() {
        return(
            <div className={s.Question} id={this.state.order}>
                <div className={s.questionInfo}>
                    <div className={s.questionOrder}>{this.state.order}.</div>
                    <div className={s.questionField}>
                        <TextField
                            autoFocus
                            error={this.props.errorQuestion}
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
                    <EditAnswer
                        isMultipleChoice={this.state.isMultipleChoice}
                        {...this.props}
                    />
                </div>
                <div className={s.Buttons}>
                    {this.state.isMultipleChoice ?
                        <IconButton className={s.AddButton} color="primary"
                                    onClick={() => this.props.addNewAnswer()}>
                            <AddIcon/>
                        </IconButton> : ''}
                    <Button color="primary" className={s.saveButton} onClick={this.props.saveOnClick}>
                        Save
                    </Button>
                    <IconButton aria-label="delete" onClick={this.props.deleteQuestionOnClick}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default EditQuestion;