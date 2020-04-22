import React from "react";
import {
    IconButton,
    DialogActions,
    DialogTitle,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    DialogContent,
    TextField,
    Button,
    Dialog,
    Snackbar
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import s from "../listQuizPreview.module.css";
import {postInvitations} from "../../../services/adminAPI/invitations";
import Alert from "@material-ui/lab/Alert";

class InviteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_id: this.props.quiz_id,
            name: null,
            surname: null,
            email: null,
            errorName: false,
            errorSurname: false,
            errorEmail: false,
            openSnackbar: false,
            start_date: null,
            end_date: null,
            time_limit: null
        };
    }

    handleCancel = () => {
        this.setState({email: null});
        this.setState({name: null});
        this.setState({surname: null});
        this.props.onClose();
    };

    onClickInviteInDialog = async () => {
        let email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        if (this.state.name !== null && this.state.name !== '' && this.state.surname !== null && this.state.surname !== '' && email.test(this.state.email)) {
            const invite = {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                quiz_id: this.state.quiz_id,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                time_limit: this.state.time_limit,
            };
            await postInvitations(invite).then((val) => {
                console.log(val);
                if (val.Status === 'Success') {
                    this.setState({openSnackbar: true});
                }
            });
            this.setState({open: false});
            this.props.onClose();
        }
        if (this.state.name === '' || this.state.name === null) {
            this.setState({errorName: true})
        }
        if (this.state.surname === '' || this.state.surname === null) {
            this.setState({errorSurname: true})
        }
        if (!email.test(this.state.email)) {
            this.setState({errorEmail: true})
        }
    };

    snackClose = () => {
        this.setState({openSnackbar: false})
    };

    onChangeName = (event) => {
        this.setState({name: event.target.value});
        this.setState({errorName: false})
    };

    onChangeSurname = (event) => {
        this.setState({surname: event.target.value});
        this.setState({errorSurname: false})
    };

    onChangeEmail = (event) => {
        this.setState({email: event.target.value});
        this.setState({errorEmail: false})
    };
    onClose = () => {
        this.setState({email: null});
        this.setState({name: null});
        this.setState({surname: null});
        this.props.onClose()
    }

    render() {
        console.log(this.state.name)
        return (
            <div>
                <Dialog open={this.props.openDialog}
                        aria-labelledby="Invite"
                        onClose={this.handleCancel}
                >
                    <DialogActions>
                        <IconButton size='small' onClick={this.onClose}
                                    aria-label='delete'
                                    color='secondary'>
                            <CloseIcon fontSize='small' color='secondary'/>
                        </IconButton>
                    </DialogActions>
                    <DialogTitle id="Invite">Invite: {this.state.quiz_name}</DialogTitle>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="type" name="Results">
                            <div className={s.radioButton}>

                                <FormControlLabel value="person" control={<Radio color="primary"/>}
                                                  checked={true}
                                                  label="Person"/>
                                <FormControlLabel value="Class" control={<Radio color="primary"/>}
                                                  checked={true}
                                                  disabled={true} label='Class'/>
                            </div>

                        </RadioGroup>
                    </FormControl>
                    <DialogContent>
                        <TextField
                            error={this.state.errorName}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            variant='outlined'
                            onChange={this.onChangeName}
                        /> <TextField
                        error={this.state.errorSurname}
                        margin="dense"
                        id="Surname"
                        label="Surname"
                        fullWidth
                        variant='outlined'
                        onChange={this.onChangeSurname}
                    />
                        <TextField
                            error={this.state.errorEmail}
                            margin="dense"
                            id="Email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant='outlined'
                            onChange={this.onChangeEmail}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.onClickInviteInDialog}>
                            Invite
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={this.state.openSnackbar}
                    onClose={this.snackClose}
                >
                    <Alert variant="filled" severity="success">
                        Success
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default InviteDialog;