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
import Paper from "@material-ui/core/Paper";

class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        document.addEventListener('mousedown', this.onClickOuterModal, false);
        this.state = {
            openChangeTypeDialog: false,
        }

    }

    dialog = (action) => {
        this.setState({openChangeTypeDialog: false});
        if (!action) {
            return;
        }
        let newType = this.props.value.type === 'MULTIPLE CHOICE' ? 'FILL THE BLANK' : 'MULTIPLE CHOICE';
        this.props.changeType(this.props.index,newType);
    };

    Checked = () => {
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
            save();
        }
    };
    render() {
        return (
            <Draggable draggableId={this.props.value._id} index={this.props.index}>
                {provided => (
                    <Paper square elevation={3} id={this.props.value.order_id}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           ref={provided.innerRef}
                           className={s.EditQuestion}>
                        <div className={s.QuestionInfo}>
                            <div className={s.QuestionOrder}>{this.props.value.order_id}.</div>
                            <div className={s.QuestionField}>
                                <TextField
                                    autoFocus
                                    error={this.props.errorQuestion}
                                    placeholder="Question"
                                    fullWidth
                                    size='small'
                                    value={this.props.value.question}
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
                                                      checked={this.props.value.type==='MULTIPLE CHOICE'}
                                                      onChange={this.Checked}
                                                      color="primary"
                                                  />} label='Multiple Choice'/>
                            <FormControlLabel value="Type question"
                                              control={
                                                  <Radio
                                                      color="primary"
                                                      onChange={this.Checked}
                                                      checked={this.props.value.type==='FILL THE BLANK'}
                                                  />} label='Fill the blank '/>
                        </div>
                        <div>
                            <EditAnswer
                                {...this.props}
                            />
                        </div>
                        <div className={s.Buttons}>
                            <Button color="primary" className={s.SaveButton} type='submit' onClick={this.props.saveOnClick}>
                                Save
                            </Button>
                            {this.props.value.type === 'MULTIPLE CHOICE' ?
                                <IconButton className={s.AddButton} color="primary"
                                            onClick={()=>this.props.addNewAnswers(this.props.index)}>
                                    <AddIcon/>
                                </IconButton> : ''}
                            <IconButton aria-label="delete" onClick={this.props.deleteQuestionOnClick}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                        <ChangeTypeDialog openDialog={this.state.openChangeTypeDialog}
                                          onClose={this.dialog}/>
                    </Paper>)}</Draggable>

        );
    }
}

export default EditQuestion;
