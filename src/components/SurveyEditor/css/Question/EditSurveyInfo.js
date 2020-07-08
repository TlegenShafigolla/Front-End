import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";

const EditSurveyInfo = (props) => {
    return (<>
            {props.editModeSurveyName ?
                <TextField onBlur={props.onBlurSurveyName}
                           name="survey_Name"
                           autoFocus fullWidth
                           value={props.survey_name}
                           onChange={props.changeSurveyName}
                           variant='outlined' margin='dense'
                /> :
                <Typography onClick={props.editSurveyName} noWrap
                            variant='h4'> {props.survey_name}</Typography>}
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
export default EditSurveyInfo