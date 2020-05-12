import React from "react";
import {
    Button,
    Dialog,
    DialogActions, DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton, Radio,
    RadioGroup, Snackbar, TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Alert from "@material-ui/lab/Alert/Alert";
import $ from "jquery";
import s from './inviteDialog.module.css';
import {postInvitations} from "../../services/API/adminAPI/Survey/invitations";

import Group from "../MyQuizzes/Editing/Invite/group";

class InviteDialog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            email: null,
            person: true,
            errorName: false,
            errorSurname: false,
            errorEmail: false,
            openSnackbar: false,
            start_date: null,
            end_date: null,
            date: '2017-05-24T10:30',
            checkStart: false,
            checkEnd: false,
            disabledInviteButton: false
        };
    }

    handleCancel = () => {
        this.setState({email: null});
        this.setState({name: null});
        this.setState({surname: null});
        this.props.onClose();
    };

    onClose = () => {
        this.setState({email: null});
        this.setState({name: null});
        this.setState({surname: null});
        this.props.onClose()
    };

    onChangePerson = () => {
        this.setState({person: true})
    };

    onChangeGroup = () => {
        this.setState({person: false})
    };

    onChangeName = (event) => {
        this.setState({name: event.target.value});
        this.setState({errorName: false})
    };

    onChangeSurname = (event) => {
        this.setState({surname: event.target.value, errorSurname: false});
    };

    onChangeEmail = (event) => {
        this.setState({email: event.target.value});
        this.setState({errorEmail: false})
    };

    onChangeStartDate = (event) => {
        let StartDate = event.target.value.replace('T', ' ');
        this.setState({start_date: StartDate})
    };

    onChangeEndDate = (event) => {
        let EndDate = event.target.value.replace('T', ' ');
        this.setState({end_date: EndDate})
    };

    checkStart = (event) => {
        this.setState({checkStart: event.target.checked});
        if (event.target.checked) {
            $('.' + s.startDate).show(500)
        } else {
            $('.' + s.startDate).hide(500)
        }
    };
    checkEnd = (event) => {
        this.setState({checkEnd: event.target.checked});
        if (event.target.checked) {
            $('.' + s.endDate).show(500)
        } else {
            $('.' + s.endDate).hide(500)
        }
    };

    onClickInviteInDialog = async () => {
        if (this.state.disabledInviteButton) {
            return ''
        }
        this.setState({disabledInviteButton: true});
        let email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        let start;
        let end;
        this.state.checkEnd ? end = this.state.end_date : end = null;
        this.state.checkStart ? start = this.state.start_date : start = null;
        if (this.state.name !== null && this.state.name !== '' && this.state.surname !== null && this.state.surname !== '' && email.test(this.state.email)) {
            const invite = {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                survey_id: this.props.survey_id,
                start_date: start,
                end_date: end,
            };
            await postInvitations(invite).then((val) => {
                console.log(val);
                if (val.Status === 'Success') {
                    this.setState({openSnackbar: true});
                } else {
                    this.setState({email: null});
                    this.setState({name: null});
                    this.setState({surname: null});
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
        this.setState({disabledInviteButton: false});

    };

    snackClose = () => {
        this.setState({openSnackbar: false})
    };

    render() {
        return(
            <div>
                <Dialog open={this.props.openDialog}
                        aria-labelledby="Invite"
                        onClose={this.handleCancel}>
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
                            <div className={s.RadioButton}>

                                <FormControlLabel value="person" control={<Radio color="primary"/>}
                                                  checked={this.state.person}
                                                  onChange={this.onChangePerson}
                                                  label="Person"/>
                                <FormControlLabel value="Class" control={<Radio color="primary"/>}
                                                  checked={!this.state.person}
                                                  onChange={this.onChangeGroup}
                                                  label='Groups'/>
                            </div>

                        </RadioGroup>
                    </FormControl>
                    <DialogContent>
                        {this.state.person ?
                            <Person errorName={this.state.errorName}
                                    errorSurname={this.state.errorSurname}
                                    errorEmail={this.state.errorEmail}
                                    onChangeName={this.onChangeName}
                                    onChangeSurname={this.onChangeSurname}
                                    onChangeEmail={this.onChangeEmail}
                            /> : <Group/>}
                        <FormControlLabel control={<Checkbox color={"primary"}/>}
                                          label={"More options"}/>
                        <div className={s.Time}>
                            <div className={s.Checkbox}>
                                <FormControlLabel control={<Checkbox onChange={this.checkStart} color={"primary"}/>}
                                                  label={"Start date"}/>
                                <FormControlLabel control={<Checkbox onChange={this.checkEnd} color={"primary"}/>}
                                                  label={"End date"}/>
                            </div>
                            <div className={s.Time_limit}>
                                <div id="startDate" className={s.StartDate}>
                                    <TextField
                                        label="Start date"
                                        type="datetime-local"
                                        defaultValue={this.state.date}
                                        onChange={this.onChangeStartDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        fullWidth
                                    />
                                </div>
                                <div id="endDate" className={s.EndDate}>
                                    <TextField
                                        fullWidth
                                        label="End date"
                                        type="datetime-local"
                                        defaultValue={this.state.date}
                                        onChange={this.onChangeEndDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
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

const Person = (props) => {
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
            label="Email Address"
            type="email"
            fullWidth
            variant='outlined'
            onChange={props.onChangeEmail}
        />
    </div>)
};

export default InviteDialog;