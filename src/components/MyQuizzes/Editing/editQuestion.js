import React from "react";
import s from './editQuestion.module.css'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import EditAnswer from "./editAnswer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


class EditQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            id: this.props.value.id,
            order: this.props.value.order_id,
            question: this.props.value.question,
            type: this.props.value.type,
        };
    }

    changeType = (newType) => {
        this.setState({type: newType});
    };

    editOnClick = () => {
        this.setState({editMode: true});
    };

    saveOnClick = () => {
        this.setState({editMode: false});
    };

    render() {
        if(this.state.editMode){
            return (
                <div className={s.question}>
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
                        <EditAnswer editMode={this.state.editMode} type={this.props.value.type} id={this.props.value.id} changeType={this.changeType}/>
                    </div>
                    <Button variant="contained" color="primary" onClick={this.saveOnClick}>
                        Save
                    </Button>
                </div>
            );
        }
        return (
            <div className={s.question}>
                <div className={s.questionOrder}>{this.state.order}</div>
                <div className={s.questionField}>
                    <Typography variant="body1" gutterBottom>
                        {this.state.question}
                    </Typography>
                </div>
                <div className={s.answerType}>
                    <EditAnswer editMode={this.state.editMode} type={this.props.value.type} id={this.props.value.id} changeType={this.changeType}/>
                </div>
                <Button variant="contained" color="primary" onClick={this.editOnClick}>
                    Edit
                </Button>
            </div>
        );
    }
}

export default EditQuestion;
