import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class DeleteQuizDialog extends React.Component{
    handleAgree = () => {
        this.props.onClose(true);
    };

    handleCancel = () => {
        this.props.onClose(false);
    };

    render() {
        return(
            <Dialog
                open={this.props.openDialog}
                onClose={this.handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Delete the quiz?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deletion of the quiz means deletion of all the questions and answers.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAgree} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeleteQuizDialog;