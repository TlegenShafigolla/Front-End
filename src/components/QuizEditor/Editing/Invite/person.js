import React from "react";
import {TextField} from "@material-ui/core";

const Person=(props)=>{
    return(<div>
        <TextField
            error={props.errorName}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant='outlined'
            onChange={props.onChangeName}
        /> <TextField
        error={props.errorSurname}
        margin="dense"
        id="Surname"
        label="Surname"
        fullWidth
        variant='outlined'
        onChange={props.onChangeSurname}
    />
        <TextField
            error={props.errorEmail}
            margin="dense"
            id="Email"
            label="Email"
            type="email"
            fullWidth
            variant='outlined'
            onChange={props.onChangeEmail}
        />
    </div>)
};
export default Person;