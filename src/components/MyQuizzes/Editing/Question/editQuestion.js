import React from "react";
import s from '../css/editQuestion.module.css'
import TextField from '@material-ui/core/TextField';
import EditAnswer from "./editAnswer";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ChangeTypeDialog from "./AnswerTypes/changeTypeDialog";
import $ from "jquery";
import DeleteIcon from "@material-ui/icons/Delete";
import {Draggable} from "react-beautiful-dnd";

class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        document.addEventListener('mousedown', this.onClickOuterModal, false);
        this.state = {
            editMode: this.props.editMode,
            question_id: this.props.question_id,
            order: this.props.value.order_id,
            answerType: this.props.answerType,
            isMultipleChoice: this.props.answerType === 'MULTIPLE CHOICE',
            openChangeTypeDialog: false,
            openDialogAnswer: this.props.openDialogAnswer,
        }

    }


    dialog = (action) => {
        this.setState({openChangeTypeDialog: false});
        if (!action) {
            return;
        }
        this.setState({isMultipleChoice: !this.state.isMultipleChoice});
        let newType = this.state.answerType === 'MULTIPLE CHOICE' ? 'FILL THE BLANK' : 'MULTIPLE CHOICE';
        this.setState({answerType: newType});
        this.props.changeType(newType);
    };

    multipleChoiceChecked = () => {
        this.setState({openChangeTypeDialog: true});
    };

    fillTheBlankChecked = () => {
        this.setState({openChangeTypeDialog: true});
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOuterModal, false);
    }

    onClickOuterModal = (e) => {
        const save = this.props.saveOnClick;
        let div = $("." + s.EditQuestion);
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            console.log('ok')
            save();
        }
    };

    render() {
        return (
            <div className={s.EditQuestion}>
                <Draggable draggableId={this.props.value._id} index={this.props.index}>
                    {provided => (
                        <div className={s.Question} id={this.state.order}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             ref={provided.innerRef}
                        >
                            <div className={s.QuestionInfo}>
                                <div className={s.QuestionOrder}>{this.props.value.order_id}.</div>
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
                                                onClick={event => this.props.addNewAnswer()}>
                                        <AddIcon/>
                                    </IconButton> : ''}
                                <Button color="primary" className={s.SaveButton} onClick={this.props.saveOnClick}>
                                    Save
                                </Button>
                                <IconButton aria-label="delete" onClick={this.props.deleteQuestionOnClick}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                            <ChangeTypeDialog openDialog={this.state.openChangeTypeDialog}
                                              onClose={this.dialog}/>
                        </div>)}</Draggable>


            </div>

        );
    }
}

export default EditQuestion;
