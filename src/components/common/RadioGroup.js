import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import s from "../QuizEditor/Editing/Invite/invite.module.css";

export const RadioButton = ({input, ...rest}) => (
    <FormControl>
        <RadioGroup {...input} {...rest} >
            <div className={s.Type}>
            <div><FormControlLabel value="person" control={<Radio color='primary'/>} label="Person"/></div>
            <div><FormControlLabel value="group" control={<Radio color='primary'/>} label="Group"/></div>
            <div><FormControlLabel value="link" control={<Radio color='primary'/>} label="Link"/></div>
            </div>
        </RadioGroup>
    </FormControl>
);