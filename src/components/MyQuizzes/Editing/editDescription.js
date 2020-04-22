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
                    label="Quiz"
                    fullWidth
                    size='small'
                    defaultValue={this.props.quiz_name}
                    onChange={this.props.changeQuizName}
                    variant="outlined"
                />
                <div className={s.gap}/>
                <TextField
                    placeholder="Question"
                    label="Description"
                    size='small'
                    fullWidth
                    multiline={true}
                    rows={3}
                    rowsMax={4}
                    onChange={this.props.changeDescription}
                    defaultValue={this.props.description}
                    variant="outlined"
                />
                <Typography
                    color="textSecondary"> {this.props.value.questions_count} </Typography>
                <Typography variant="body2"
                            component="p"> {this.props.last_edited_date.toString()} </Typography>
                <div>
                    <Button color="primary" onClick={this.props.saveButton}>SAVE</Button>
                </div>
            </div>
        )
    }
}

export default EditDescription;