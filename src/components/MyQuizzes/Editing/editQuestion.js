import React from "react";
import s from './css/editQuestion.module.css'
import TextField from '@material-ui/core/TextField';
import EditAnswer from "./editAnswer";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ChangeTypeDialog from "./AnswerTypes/changeTypeDialog";
import $ from "jquery";

class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: this.props.editMode,
            question_id: this.props.question_id,
            order: this.props.value.order_id,
            answerType: this.props.answerType,
            isMultipleChoice: this.props.answerType === 'MULTIPLE CHOICE',
            openChangeTypeDialog: false,
            openDialogAnswer: this.props.openDialogAnswer,
        };
    }

    dialog = (action) => {
        this.setState({openChangeTypeDialog: false});
        if (!action) {
            return;
        }
        this.setState({isMultipleChoice: !this.state.isMultipleChoice});
        let newType = this.state.answerType === 'MULTIPLE CHOICE' ? 'FILL THE BLANK' : 'MULTIPLE CHOICE';
        this.setState({answerType: newType})
        this.props.changeType(newType);

    };

    multipleChoiceChecked = () => {
        this.setState({openChangeTypeDialog: true});
    };

    fillTheBlankChecked = () => {
        this.setState({openChangeTypeDialog: true});
    };

    render() {
        let order = this.state.order;
        const Save = this.props.saveOnClick;
        $(function ($) {
            $(document).mouseup(function (e) {
                let div = $("#" + order);
                if (!div.is(e.target)
                    && div.has(e.target).length === 0) {
                    onclick = Save
                }
            });

        });
        return (<div>
                <div className={s.question} id={this.state.order}>
                    <div className={s.questioninfo}>
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
                                        onClick={event => this.props.addNewAnswer()}>
                                <AddIcon/>
                            </IconButton> : ''}
                        <Button color="primary" className={s.saveButton} onClick={this.props.saveOnClick}>
                            Save
                        </Button>
                    </div>
                    <ChangeTypeDialog openDialog={this.state.openChangeTypeDialog} onClose={this.dialog}/>
                </div>

            </div>
        );
    }
}

export default EditQuestion;
