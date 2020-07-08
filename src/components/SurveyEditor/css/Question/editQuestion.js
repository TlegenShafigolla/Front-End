import React from "react";
import s from "../editQuestion.module.css";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditAnswer from "./editAnswer";
import $ from "jquery";
import Paper from "@material-ui/core/Paper";
import {Draggable} from "react-beautiful-dnd";

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
                <div className={s.FormControl}>
                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              checked={this.props.value.type==='MULTIPLE CHOICE'}
                                              onChange={()=>this.props.changeType(this.props.index,'MULTIPLE CHOICE')}
                                              color="primary"
                                          />} label='Multiple Choice'/>
                    <FormControlLabel value="Type question"
                                      control={
                                          <Radio
                                              color="primary"
                                              onChange={()=>this.props.changeType(this.props.index,'FILL THE BLANK')}
                                              checked={this.props.value.type==='FILL THE BLANK'}
                                          />} label='Fill the blank '/>
                </div>
                <div>
                    <EditAnswer
                        {...this.props}
                    />
                </div>
                <div className={s.Buttons}>
                    <Button color="primary" className={s.SaveButton} onClick={this.props.saveOnClick}>
                        Save
                    </Button>
                    {this.props.value.type === 'MULTIPLE CHOICE'?
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