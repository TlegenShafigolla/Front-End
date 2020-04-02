import React from "react";
import s from './css/editQuestion.module.css'
import TextField from '@material-ui/core/TextField';
import EditAnswer from "./editAnswer";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
class EditQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: this.props.editMode,
            question_id: this.props.question_id,
            order: this.props.value.order_id,
            answerType: this.props.answerType,
        };
    }

    render() {
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
                        />
                    </div>
                    </div>
                    <div className={s.answerType}>
                        <EditAnswer
                            changeCheck={this.props.changeCheck}
                            changePoint={this.props.changePoint}
                            point={this.props.point}
                            correctWrong={this.props.correctWrong}
                            onChangeAnswer={this.props.onChangeAnswer}
                            editMode={this.props.editMode}
                            type={this.state.answerType}
                            changeType={this.props.changeType}
                            answers={this.props.answers}
                        />
                    </div>
                    <div className={s.Buttons}>
                        <IconButton className={s.AddButton}  color="primary" onClick={this.props.addNewAnswer}>
                            <AddIcon/>
                        </IconButton>
                    <Button  color="primary" className={s.saveButton} onClick={this.props.saveOnClick}>
                        Save
                    </Button>
                    </div>

                </div>
            );
    }
}

export default EditQuestion;
