import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button,} from "@material-ui/core";
import s from "../../css/SignUp.module.css";
import {Link} from "react-router-dom";
import {renderTextField} from "../common/TextField";
import {required} from "../../utils/validators";
import Alerts from "../common/Alert";

const reg = [
    {type: 'email', label: 'Email', name: 'email'},
    {type: 'name', label: 'Name', name: 'name'},
    {type: 'surname', label: 'Surname', name: 'surname'},
    {type: 'occupation', label: 'Occupation', name: 'occupation'},
    {type: 'password', label: 'Password', name: 'password'},
    {type: 'password', label: 'Confirm password', name: 'confirmPassword'},
];
const RegistrationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {reg.map(val => <Field key={val.name}
                                   component={renderTextField}
                                   margin='dense'
                                   type={val.type}
                                   name={val.name}
                                   label={val.label}
                                   variant='outlined'
                                   autoComplete='off'
                                   fullWidth
                                   validate={required}
                                   />)}
            <div className={s.Button}>
                <div className={s.Link}>
                    <Link to='/login' underline='none'>Already have an account?</Link>
                </div>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </div>
            <Alerts open={props.error!==undefined} variant="filled" children="Account with such email already exists" severity="error" />
        </form>
    )
};
export default reduxForm({form: 'registration'})(RegistrationForm)