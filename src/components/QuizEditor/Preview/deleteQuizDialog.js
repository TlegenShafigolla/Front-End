import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const DeleteQuizDialog = (props) => {
    let handleAgree = () => {
        props.onClose(true,props.id);
    };

    let handleCancel = () => {
        props.onClose(false,props.id);
    };

    return (
        <Dialog
            open={props.openDialog}
            onClose={handleCancel}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Delete the quiz?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Deletion of the quiz means deletion of all the questions and answers.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAgree} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteQuizDialog;