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
import RadioGroup from "@material-ui/core/RadioGroup";
import InputBase from "@material-ui/core/InputBase";

class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        document.addEventListener('mousedown', this.onClickOuterModal, false);
        this.state = {
            openChangeTypeDialog: false,
            value: this.props.value.type
        }

    }

    dialog = (action) => {
        this.setState({openChangeTypeDialog: false});
        if (!action) {
            return;
        }
        console.log()
        // let newType = t';
    };

    Checked = (event) => {
        this.setState({value: event.target.value})
        this.props.changeType(this.props.index, event.target.value);

        // console.log(event.target.value)
        // this.setState({openChangeTypeDialog: true});
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
        console.log(this.props)
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
                        <RadioGroup name="type" value={this.state.value} onChange={this.Checked}>
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
                                {this.props.point ?
                                    <>  <InputBase
                                        onChange={(e) => this.props.changePoints(e.target.value, this.props.index)}
                                        value={this.props.value.points}
                                    />points</> : null}
                            </div>
                        </RadioGroup>
                        <div>
                            <EditAnswer
                                {...this.props}
                            />
                        </div>
                        <div className={s.Buttons}>
                            <Button color="primary" className={s.SaveButton} type='submit'
                                    onClick={this.props.saveOnClick}>
                                Save
                            </Button>
                            {this.props.value.type !== "FILL THE BLANK" ?
                                <IconButton className={s.AddButton} color="primary"
                                            onClick={() => this.props.addNewAnswers(this.props.index)}>
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
