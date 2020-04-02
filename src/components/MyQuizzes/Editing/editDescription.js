import React from "react";
import {TextField} from "@material-ui/core";
import s from './css/editDescription.module.css'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class EditDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id:this.props.id
        }
    }
    render() {
        return (
            <div className={s.editDescription}>
                <TextField
                    placeholder="Question"
                    fullWidth
                    size='small'
                    defaultValue={this.props.quiz_name}
                    onChange={this.props.changeQuizName}
                />
                <TextField
                    placeholder="Question"
                    fullWidth
                    size='small'
                    onChange={this.props.changeDescription}
                    defaultValue={this.props.description}
                />
                <Typography
                    color="textSecondary"> {this.props.value.questions_count} </Typography>
                <Typography variant="body2"
                            component="p"> {this.props.value.last_edited_date} </Typography>
                <div>
                    <Button color="primary" onClick={this.props.saveButton}>SAVE</Button>
                </div>
            </div>
        )
    }
}

export default EditDescription;