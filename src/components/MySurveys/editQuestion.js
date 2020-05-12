import React from "react";
import s from "./editQuestion.module.css";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAnswer from "./editAnswer";
import $ from "jquery";

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
        this.setState({answerType: "MULTIPLE CHOICE"});
        this.props.changeType("MULTIPLE CHOICE");
    };

    fillTheBlankChecked = () => {
        this.setState({isMultipleChoice: false});
        this.setState({answerType: "FILL THE BLANK"});
        this.props.changeType("FILL THE BLANK");
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickOuterModal, false);
    }

    onClickOuterModal = (e) => {
        const save = this.props.saveOnClick;
        let div = $("." + s.Question);
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            save();
        }
    };

    render() {
        return(
            <div className={s.Question} id={this.state.order}>
                <div className={s.QuestionInfo}>
                    <div className={s.QuestionOrder}>{this.state.order}.</div>
                    <div className={s.QuestionField}>
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
                <div className={s.FormControl}>
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
                <div className={s.AnswerType}>
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
                    <Button color="primary" className={s.SaveButton} onClick={this.props.saveOnClick}>
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