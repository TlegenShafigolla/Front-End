import React from "react";
import {Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Alerts = (props) => {
    return (<Snackbar
            open={props.open}
            autoHideDuration={600}
            onClose={props.onClose}>
            <Alert variant={props.variant} severity={props.severity}>
                {props.children}
            </Alert>
        </Snackbar>

    )
}
export default Alerts;