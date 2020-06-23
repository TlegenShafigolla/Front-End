import React from "react";
import {Field, reduxForm} from "redux-form";
import Paper from "@material-ui/core/Paper";
import s from "./Profile.module.css";
import Button from "@material-ui/core/Button";
import {renderTextField} from "../common/TextField";
import {required} from "../../utils/validators";

const ProfileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Paper square elevation={3} className={s.FeedbackPaper}>
                <Field
                    name="feedback"
                    id="outlined-helperText"
                    label="Leave your feedback here"
                    helperText="It will help us a lot. Thanks!"
                    variant="outlined"
                    fullWidth
                    multiline
                    rowsMax={4}
                    validate={required}
                    component={renderTextField}
                />
                <Button color='primary' type='submit'>submit</Button>
            </Paper>
    </form>)
}
export default reduxForm({form:'feedback'})(ProfileForm)