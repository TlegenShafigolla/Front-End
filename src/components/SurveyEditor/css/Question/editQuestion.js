import React from "react";
import s from "../editQuestion.module.css";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAnswer from "./editAnswer";
import $ from "jquery";
import Paper from "@material-ui/core/Paper";
import {Draggable} from "react-beautiful-dnd";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        document.addEventListener('mousedown', this.onClickOuterModal, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOuterModal, false);
    }

    onClickOuterModal = (e) => {
        const save = this.props.saveOnClick;
        let div = $("." + s.Survey);
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            save();
        }
    };
    Checked = (event) => {
        this.setState({value: event.target.value})
        this.props.changeType(this.props.index, event.target.value);
    };

    render() {
        return (
            <Draggable draggableId={this.props.value._id} index={this.props.index}>
                {provided => (
                    <Paper square elevation={3} {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           ref={provided.innerRef}
                           className={s.Survey} id={this.props.value.order_id}>
                        <div className={s.SurveyInfo}>
                            <div className={s.SurveyOrder}>{this.props.value.order_id}.</div>
                            <div className={s.SurveyField}>
                                <TextField
                                    autoFocus
                                    error={this.props.errorQuestion}
                                    placeholder="Question"
                                    fullWidth
                                    size='small'
                                    defaultValue={this.props.value.question}
                                    onChange={this.props.onChangeQuestion}
                                    multiline={true}
                                    rows={4}
                                    rowsMax={6}
                                    label="Question"
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <RadioGroup name="survey" value={this.props.value.type} onChange={this.Checked}>
                            <div className={s.FormControl}>
                                <FormControlLabel value="MULTIPLE CHOICE"
                                                  control={
                                                      <Radio
                                                          color="primary"
                                                      />} label='Multiple Choice'/>
                                <FormControlLabel value="FILL THE BLANK"
                                                  control={
                                                      <Radio
                                                          color="primary"
                                                      />} label='Fill the blank '/>
                                <FormControlLabel value="CHECKBOXES"
                                                  control={
                                                      <Radio
                                                          color="primary"
                                                      />} label='Checkboxes'/>
                            </div>
                        </RadioGroup>
                        <div>
                            <EditAnswer
                                {...this.props}
                            />
                        </div>
                        <div className={s.Buttons}>
                            <Button color="primary" className={s.SaveButton} onClick={this.props.saveOnClick}>
                                Save
                            </Button>
                            {this.props.value.type !== 'FILL THE BLANK' ?
                                <IconButton className={s.AddButton} color="primary"
                                            onClick={this.props.addNewAnswers}>
                                    <AddIcon/>
                                </IconButton> : ''}
                            <IconButton aria-label="delete" onClick={this.props.deleteQuestionOnClick}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </Paper>)}</Draggable>
        );
    }
}

export default EditQuestion;