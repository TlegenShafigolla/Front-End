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
import s from "./invite.module.css";
import Alert from "@material-ui/lab/Alert";
import Checkbox from "@material-ui/core/Checkbox";
import $ from 'jquery'
import Person from "./person";
import Group from "./group";
import {postInvitations} from "../../../../services/API/adminAPI/Quiz/invitations";
import {getListGroup} from "../../../../services/API/adminAPI/Group/group";

class InviteDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_id: this.props.quiz_id,
            invitationType: 'Person',
            openSnackbar: false,

            groups: null,
            selectedGroup: null,
            selectedPersonsList: [],

            name: null,
            surname: null,
            email: null,
            errorName: false,
            errorSurname: false,
            errorEmail: false,

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
            $('.' + s.Timer).show(500)
        } else {
            $('.' + s.Timer).hide(500)
        }
    };
    checkStart = (event) => {
        this.setState({checkStart: event.target.checked});
        if (event.target.checked) {
            $('.' + s.StartDate).show(500)
        } else {
            $('.' + s.StartDate).hide(500)
        }
    };
    checkEnd = (event) => {
        this.setState({checkEnd: event.target.checked});
        if (event.target.checked) {
            $('.' + s.EndDate).show(500)
        } else {
            $('.' + s.EndDate).hide(500)
        }
    };
    handleCancel = () => {
        this.setState({email: null});
        this.setState({name: null});
        this.setState({surname: null});
        this.props.onClose();
    };

    getPersonInvitation = (start, end, time_limit) => {
        const email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
        if (this.state.name === '' || this.state.name === null) {
            this.setState({errorName: true});
            return null;
        }
        if (this.state.surname === '' || this.state.surname === null) {
            this.setState({errorSurname: true});
            return null;
        }
        if (!email.test(this.state.email)) {
            this.setState({errorEmail: true});
            return null;
        }
        const invitation = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            quiz_id: this.state.quiz_id,
            start_date: start,
            end_date: end,
            time_limit: time_limit,
        };
        this.setState({
            email: null,
            name: null,
            surname: null
        });
        return invitation;
    };

    getGroupInvitation = (start, end, time_limit) => {

    };

    generateInvitationJSON = (start, end, time_limit) => {
        if(this.state.invitationType === 'Person'){
            return this.getPersonInvitation(start, end, time_limit);
        } else if(this.state.invitationType === 'Group'){
            return this.getGroupInvitation(start, end, time_limit);
        } else if(this.state.invitationType === 'Link'){
            return null;
        }
    };

    onClickInviteInDialog = async () => {
        if (this.state.disabledInviteButton) {
            return ''
        }
        this.setState({disabledInviteButton: true});
        const time_limit = this.state.checkTime ? this.state.time_limit : null;
        const start = this.state.checkStart ? this.state.start_date : null;
        const end = this.state.checkEnd ? this.state.end_date : null;
        const invitation = this.generateInvitationJSON(start, end, time_limit);
        if (invitation !== null) {
            await postInvitations(invitation).then((val) => {
                console.log(val);
                if (val.Status === 'Success') {
                    this.setState({openSnackbar: true});
                }
            });
            this.props.onClose();
        }
        this.setState({disabledInviteButton: false});
    };

    snackClose = () => {
        this.setState({openSnackbar: false})
    };

    onChangeType = (newType) => {
        this.setState({invitationType: newType})
    };

    onChangeName = (event) => {
        this.setState({name: event.target.value});
        this.setState({errorName: false})
    };

    componentDidMount() {
        let date = new Date().toISOString().replace('Z', '').split('.');
        this.setState({date: date[0], end_date: date[0]});
        getListGroup().then(json => this.setState({groups: json.groups}));
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
    onSelectGroup=()=>{
console.log('okey')
    };
    render() {
        return (
            <div>
                <Dialog
                    maxWidth={'xl'}
                    open={this.props.openDialog}
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
                                                  checked={this.state.invitationType === 'Person'}
                                                  onChange={() => this.onChangeType('Person')}
                                                  label="Person"/>
                                <FormControlLabel value="Class" control={<Radio color="primary"/>}
                                                  checked={this.state.invitationType === 'Group'}
                                                  onChange={() => this.onChangeType('Group')}
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
                            /> : <Group
                                onSelectGroup={this.onSelectGroup}
                                groups={this.state.groups}
                            />}
                        <FormControlLabel control={<Checkbox color={"primary"}/>}
                                          label={"More options"}/>
                        <div className={s.Time}>
                            <div className={s.Checkbox}>
                                <FormControlLabel control={<Checkbox onChange={this.checkStart} color={"primary"}/>}
                                                  label={"Start date"}/>
                                <FormControlLabel control={<Checkbox onChange={this.checkEnd} color={"primary"}/>}
                                                  label={"End date"}/>
                                <FormControlLabel control={<Checkbox onChange={this.checkTime} color={"primary"}/>}
                                                  label={'Time Limit'}/>

                            </div>
                            <div className={s.TimeLimit}>
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
                                <div id="time" className={s.Timer}>
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
                    onClose={this.snackClose}>
                    <Alert variant="filled" severity="success">
                        Success
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default InviteDialog;