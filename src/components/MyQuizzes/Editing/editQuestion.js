import React from "react";
import s from './editQuestion.module.css'
import TextField from '@material-ui/core/TextField';
import EditAnswer from "./editAnswer";
import Button from "@material-ui/core/Button";


class EditQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: this.props.editMode,
            id: this.props.value.id,
            order: this.props.value.order_id,
            question: this.props.value.question,
            answerType: this.props.answerType,
        };
    }

    render() {
            return (
                <div className={s.question} id={this.state.order}>
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
                        <EditAnswer
                            editMode={this.props.editMode}
                            type={this.state.answerType}
                            id={this.props.value.id}
                            changeType={this.props.changeType}
                            answers={this.props.answers}
                        />
                    </div>
                    <Button variant="contained" color="primary" onClick={this.props.saveOnClick}>
                        Save
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.props.addNewAnswer}>
                        New Answer
                    </Button>

                </div>
            );
    }
}

export default EditQuestion;
