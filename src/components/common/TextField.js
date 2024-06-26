import {TextField} from "@material-ui/core";
import React from "react";

export const renderTextField = ({input, label, meta: {touched, error,},
                             ...custom
                         }) => (
    <TextField
        label={label}
        error={touched && error}
        {...input}
        {...custom}
    />
);