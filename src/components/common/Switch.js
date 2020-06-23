import React from "react";
import Switch from "@material-ui/core/Switch";

export const renderSwitch = ({input, label, meta: {touched, error,},
                                    ...custom
                                }) => (
    <Switch
        label={label}
        {...input}
        {...custom}
    />
);