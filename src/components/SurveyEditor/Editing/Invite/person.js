import {Field} from "redux-form";
import {checkEmail, required} from "../../../../utils/validators";
import {renderTextField} from "../../../common/TextField";
import React from "react";

const   Person = () => {
    return (<>
        <Field
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant='outlined'
            validate={required}
            component={renderTextField}
        /> <Field
        component={renderTextField}
        validate={required}
        margin="dense"
        name="surname"
        id="Surname"
        label="Surname"
        fullWidth
        variant='outlined'
    />
        <Field
            name="email"
            validate={required && checkEmail}
            component={renderTextField}
            margin="dense"
            id="Email"
            label="Email"
            type="email"
            fullWidth
            variant='outlined'
        />
    </>)
};
export default Person;