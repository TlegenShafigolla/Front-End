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
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import Paper from "@material-ui/core/Paper/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {getListGroup} from "../../services/API/adminAPI/Group/group";

class InviteDialog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
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

            invitationType: 'Person',
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

    generateInvitationJSON = (start, end) => {
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
                survey_id: this.props.survey_id,
                start_date: start,
                end_date: end,
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
                survey_id: this.props.survey_id,
                start_date: start,
                end_date: end,
            };
            return invitation;
        }
    };

    onClickGetLinkInDialog = () => {
        const start = this.state.checkStart ? this.state.start_date : null;
        const end = this.state.checkEnd ? this.state.end_date : null;
        const invitation = {
            public: true,
            survey_id: this.props.survey_id,
            start_date: start,
            end_date: end,
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
        const start = this.state.checkStart ? this.state.start_date : null;
        const end = this.state.checkEnd ? this.state.end_date : null;
        const invitation = this.generateInvitationJSON(start, end);
        console.log(invitation);
        if (invitation !== null) {
            await postInvitations(invitation).then((val) => {
                console.log(val);
                if (val.Status === 'Success') {
                    this.setState({openSuccessSnackbar: true});
                }
            });
            this.props.onClose();
        }
        this.setState({disabledInviteButton: false});
    };

    snackClose = () => {
        this.setState({openSnackbar: false})
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
        getListGroup().then(json => {
            this.setState({groups: json.groups});
            return json.groups;
        }).then(groups => {
            this.initializeSelectedPersons(groups)
        });
    }

    render() {
        return(
            <div>
                <Dialog maxWidth={'sm'}
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
                                    onChangeEmail={this.onChangeEmail}/> : null}
                        {this.state.invitationType === 'Group' ?
                            <Group
                                onSelectGroup={this.onSelectGroup}
                                onSelectChecked={this.onSelectChecked}
                                selectedGroup={this.state.selectedGroup}
                                selectedPersons={this.state.selectedPersons}
                                groups={this.state.groups}/> : null}
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
                                Get Link
                            </Button> :
                            <Button color="primary" onClick={this.onClickInviteInDialog}>
                                Invite
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

const Group = (props) => {
    return(
        <div className={s.Group}>
            <InputLabel htmlFor="grouped-native-select">Groups</InputLabel>
            <Select className={s.GroupName} native autoWidth={true}  variant='outlined' onChange={props.onSelectGroup}
                    defaultValue={props.groups[props.selectedGroup].group_name.toString()}>
                {props.groups.map((val, index) =>
                    <option key={val._id} value={index}>{val.group_name}</option>
                )}
            </Select>
            <FormControl required error={false} component="fieldset" className={s.FormControl}>
                <FormGroup>
                    <Paper style={{maxHeight: 150, overflow: 'auto'}} elevation={1}>
                        <List>
                            {props.groups[props.selectedGroup].members.map((val, index) =>
                                <ListItem key={index} role={undefined} dense button onClick={() => props.onSelectChecked(val.email)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={props.selectedPersons[val.email]}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': `checkbox-list-label-1` }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={index} primary={val.email} />
                                </ListItem>)}
                        </List>
                    </Paper>
                </FormGroup>
            </FormControl>
        </div>
    );
};

export default InviteDialog;