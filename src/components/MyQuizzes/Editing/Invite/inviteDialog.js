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
            // For Link Invitation
            invitationLink: null,
            // For Group Invitation
            groups: [],
            selectedGroup: 0,
            selectedPersons: {},
            // For Person Invitation
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
            disabledInviteButton: false,
            disabledGetLinkButton: false,
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
        this.setState({
            email: null,
            name: null,
            surname: null,
            invitationLink: null,
            groups: [],
            selectedGroup: 0,
            selectedPersons: {},
        });
        this.props.onClose();
    };

    generateInvitationJSON = (start, end, time_limit) => {
        if(this.state.invitationType === 'Person'){
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
        } else if(this.state.invitationType === 'Group'){
            const group_id = this.state.groups[this.state.selectedGroup]._id;
            const group = [];
            for(const [key, value] of Object.entries(this.state.selectedPersons)){
                if(value){
                    group.push(key);
                }
            }
            if(group.length === 0){
                return null;
            }
            const invitation = {
                group_id: group_id,
                group: group,
                quiz_id: this.state.quiz_id,
                start_date: start,
                end_date: end,
                time_limit: time_limit,
            };
            return invitation;
        }
    };

    onClickGetLinkInDialog = () => {
        const time_limit = this.state.checkTime ? this.state.time_limit : null;
        const start = this.state.checkStart ? this.state.start_date : null;
        const end = this.state.checkEnd ? this.state.end_date : null;
        const invitation = {
            public: true,
            quiz_id: this.state.quiz_id,
            start_date: start,
            end_date: end,
            time_limit: time_limit,
        };
        postInvitations(invitation).then((val) => {
            console.log(val);
            const link = val.link;
            this.setState({invitationLink: link});
        });
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
    onSelectGroup = (event) =>{
        const selectedPersons = {};
        this.state.groups[event.target.value].members.map((val, index) => {
            selectedPersons[val.email] = true;
        });
        this.setState({selectedPersons: selectedPersons});
        this.setState({selectedGroup: event.target.value});
    };
    onSelectChecked = (email) => {
        const selectedPersons = this.state.selectedPersons;
        selectedPersons[email] = !this.state.selectedPersons[email];
        this.setState({selectedPersons: selectedPersons});
    };
    initializeSelectedPersons = (groups) => {
        if(groups.length === 0){
            return;
        }
        const selectedPersons = {};
        groups[0].members.map((val, index) => {
            selectedPersons[val.email] = true;
        });
        this.setState({selectedPersons: selectedPersons});
    };

    componentDidMount() {
        let date = new Date().toISOString().replace('Z', '').split('.');
        this.setState({date: date[0], end_date: date[0]});
        getListGroup().then(json => {
            this.setState({groups: json.groups});
            return json.groups;
        }).then(groups => {
            this.initializeSelectedPersons(groups)
        });
    }

    render() {
        return (
            <div>
                <Dialog
                    maxWidth={'sm'}
                    fullWidth={'sm'}
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
                                                  disabled={this.state.groups.length === 0}
                                                  checked={this.state.invitationType === 'Group'}
                                                  onChange={() => this.onChangeType('Group')}
                                                  label='Groups'/>
                                <FormControlLabel value="Class" control={<Radio color="primary"/>}
                                                  checked={this.state.invitationType === 'Link'}
                                                  onChange={() => this.onChangeType('Link')}
                                                  label='Link'/>
                            </div>

                        </RadioGroup>
                    </FormControl>
                    <DialogContent>
                        {this.state.invitationType === 'Person' ?
                            <Person errorName={this.state.errorName}
                                    errorSurname={this.state.errorSurname}
                                    errorEmail={this.state.errorEmail}
                                    onChangeName={this.onChangeName}
                                    onChangeSurname={this.onChangeSurname}
                                    onChangeEmail={this.onChangeEmail}
                            /> : null}
                        {this.state.invitationType === 'Group' ?
                            <Group
                                onSelectGroup={this.onSelectGroup}
                                onSelectChecked={this.onSelectChecked}
                                selectedGroup={this.state.selectedGroup}
                                selectedPersons={this.state.selectedPersons}
                                groups={this.state.groups}
                            /> : null
                        }
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
                        <div className={s.InvitationLinkTextField}>
                            {this.state.invitationLink !== null ? <TextField
                                id="outlined-read-only-input"
                                label="Link"
                                defaultValue={this.state.invitationLink}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                            /> : null}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {this.state.invitationType === 'Link' ?
                            <Button color="primary" onClick={this.onClickGetLinkInDialog}>
                                {this.state.invitationType === 'Link' ? "Get Link": "Invite"}
                            </Button> :
                            <Button color="primary" onClick={this.onClickInviteInDialog}>
                                {this.state.invitationType === 'Link' ? "Get Link": "Invite"}
                            </Button>
                        }
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