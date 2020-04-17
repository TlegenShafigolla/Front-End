import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import s from "../listQuizPreview.module.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {postInvitations} from "../../../services/adminAPI/invitations";
import Snackbar from "@material-ui/core/Snackbar";

class InviteDialog extends React.Component{
    constructor(props){
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
        };
    }

    handleCancel = () => {
        this.props.onClose();
    };

    onClickInviteInDialog = async () => {
        let email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        if (this.state.name !== null && this.state.name !== '' && this.state.surname !== null && this.state.surname !== '' && email.test(this.state.email)) {
            const invite = {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                quiz_id: this.state.quiz_id
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

    render() {
        return (
            <div>
                <Dialog open={this.props.openDialog}
                        aria-labelledby="Invite"
                        onClose={this.handleCancel}
                >
                    <DialogActions>
                        <IconButton size='small' onClick={() => {
                            this.setState({open: false});
                            this.setState({email: null});
                            this.setState({name: null});
                            this.setState({surname: null})
                        }}
                                    aria-label='delete'>
                            <HighlightOffIcon fontSize='small' color='secondary'/>
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
                    message="Success"
                    onClose={this.snackClose}
                />
            </div>
        );
    }
}

export default InviteDialog;