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
import s from "../../Preview/listQuizPreview.module.css";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import $ from 'jquery'
import Person from "./person";
import Group from "./group";
import {postInvitations} from "../../../../services/API/adminAPI/Quiz/invitations";

class InviteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_id: this.props.quiz_id,
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
            time_limit: null,
            checkTime: false,
            checkStart: false,
            checkEnd: false,
            disabledInviteButton: false
        };
    }

    checkTime = (event) => {
        this.setState({checkTime: event.target.checked});
        if (event.target.checked) {
            $('.' + s.timer).show(500)
        } else {
            $('.' + s.timer).hide(500)
        }
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
    handleCancel = () => {
        this.setState({email: null});
        this.setState({name: null});
        this.setState({surname: null});
        this.props.onClose();
    };

    onClickInviteInDialog = async () => {
        if (this.state.disabledInviteButton) {
            return ''
        }
        this.setState({disabledInviteButton: true});
        let email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        let time;
        let start;
        let end;
        this.state.checkEnd ? end = this.state.end_date : end = null;
        this.state.checkStart ? start = this.state.start_date : start = null;
        this.state.checkTime ? time = this.state.time_limit : time = null;
        if (this.state.name !== null && this.state.name !== '' && this.state.surname !== null && this.state.surname !== '' && email.test(this.state.email)) {
            const invite = {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                quiz_id: this.state.quiz_id,
                start_date: start,
                end_date: end,
                time_limit: time,
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

    componentDidMount() {
        let date = new Date().toISOString().replace('Z', '').split('.');
        this.setState({date: date[0], end_date: date[0]});
    }

    onChangeSurname = (event) => {
        this.setState({surname: event.target.value, errorSurname: false});
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
    };
    onChangeStartDate = (event) => {
        let StartDate = event.target.value.replace('T', ' ');
        this.setState({start_date: StartDate})
    };

    onChangeEndDate = (event) => {
        let EndDate = event.target.value.replace('T', ' ');
        this.setState({end_date: EndDate})
    };
    onChangeTimeLimit = (event) => {
        let time = event.target.value;
        let s = time.split(':');
        let t = Number(s[0]) * 60 + Number(s[1]);
        this.setState({time_limit: t});
    };

    render() {

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
                        <div className={s.time}>
                            <div className={s.checkbox}>
                                <FormControlLabel control={<Checkbox onChange={this.checkStart} color={"primary"}/>}
                                                  label={"Start date"}/>
                                <FormControlLabel control={<Checkbox onChange={this.checkEnd} color={"primary"}/>}
                                                  label={"End date"}/>
                                <FormControlLabel control={<Checkbox onChange={this.checkTime} color={"primary"}/>}
                                                  label={'Time Limit'}/>

                            </div>
                            <div className={s.time_limit}>
                                <div id="startDate" className={s.startDate}>
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
                                <div id="endDate" className={s.endDate}>
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
                                <div id="time" className={s.timer}>
                                    <TextField
                                        fullWidth
                                        label="Time limit"
                                        type="time"
                                        defaultValue="00:00"
                                        onChange={this.onChangeTimeLimit}
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

export default InviteDialog;