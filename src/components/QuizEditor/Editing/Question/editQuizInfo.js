import Typography from "@material-ui/core/Typography";
import React from "react";
import TextField from "@material-ui/core/TextField";

const EditQuizInfo = (props) => {
    return (<>
            {props.editModeQuizName ?
                <TextField onBlur={props.onBlurQuizName}
                           name="quizName"
                           autoFocus fullWidth
                           value={props.quiz_name}
                           onChange={props.changeQuizName}
                           variant='outlined' margin='dense'
                /> :
                <Typography onClick={props.editQuizName} noWrap
                            variant='h4'> {props.quiz_name}</Typography>}
            {props.editModeDescription ?
                <TextField
                    onBlur={props.onBlurDescription}
                    autoFocus
                    value={props.description}
                    name="description"
                    onChange={props.changeDescription}
                    variant='outlined'
                    margin='dense' fullWidth rows={2} rowsMax={5}/> :
                <Typography onClick={props.editDescription}
                            variant='body1'>{props.description}</Typography>}
        </>
    );
};
export default EditQuizInfo