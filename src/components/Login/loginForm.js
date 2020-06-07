import React from "react";
import s from "../../css/Login.module.css";
import Button from "@material-ui/core/Button";
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../common/TextField";
import {required} from "../../utils/validators";

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.input}>
                <Field label='Email' fullWidth
                       variant='outlined' name='email'
                       validate={required}
                       error={props.error}
                       component={renderTextField}/>
            </div>
            <div className={s.input}>
                <Field label='Password' fullWidth
                       variant='outlined' name='password'
                       validate={required}
                       error={props.error}
                       type='password' component={renderTextField}/>
            </div>
            <Button variant='contained' type='submit' color='primary'>Continue</Button>
        </form>
    );
}
export default reduxForm({form: 'login'})(LoginForm)
