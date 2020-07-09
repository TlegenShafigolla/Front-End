import React from "react";
import {Dialog} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
 const CheckEmail=(props) =>{
    localStorage.removeItem('start_test')
    return (
        <div>
            <Dialog open={true} fullWidth={true} maxWidth='xs'>
                <DialogContent>
                    <TextField
                        error={props.error}
                        margin="dense"
                        id="Email"
                        label="Email Address"
                        type="email"
                        onChange={props.onChangeEmail}
                        fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClickContinue}>Continue</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CheckEmail;