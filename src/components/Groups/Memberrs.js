import Members from "./Members";
import {Field, reduxForm} from "redux-form";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import {renderTextField} from "../common/TextField";
import {checkEmail} from "../../utils/validators";
import s from "./EditGroup.module.css";
import Paper from "@material-ui/core/Paper";

const Member = (props) => {
    return (
        <Paper square elevation={3}  className={s.MembersBoard}>
            <ol type='1'>{props.members.map(val => <li key={val._id}><Members onDeleteMember={props.onDeleteMember}
                                                                              val={val}/></li>)}</ol>
            {props.addmember ?
                <form onSubmit={props.handleSubmit} onBlur={props.handleSubmit}>
                    <Field autoFocus name='email' component={renderTextField}  error={props.error} validate={checkEmail} />
                </form> :
                <IconButton color="primary" size='small' onClick={props.addMembers}>
                    <AddIcon fontSize='small'/>
                </IconButton>}
        </Paper>
    )
}
export default reduxForm({
    form: 'members'
})(Member);