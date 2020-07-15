import React, {useEffect} from "react";
import {
    IconButton,
    DialogActions,
    Radio,
    TextField,
    Button,
    Dialog,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import s from "./invite.module.css";
import {Field} from "redux-form"
import $ from 'jquery'
import Person from "./person";
import Group from "./group";
import TimeLimits from "./TimeLimits";
import MixedShowResult from "./MixedShowResult";
import {RadioButton} from "../../../common/RadioGroup";


const InviteDialog = (props) => {

    const checkTime = (event, className) => {
        if (event.target.checked) {
            $('.' + className).show(500)
        } else {
            $('.' + className).hide(500)
        }
    };

    const onSelectGroup = (event) => {
        props.setPerson(event.target.value);
    };
    const onSelectChecked = (e, id) => {
        props.checkPerson(id, Number(e.target.checked));
    };
    useEffect(() => {
        props.requestGroup()
// eslint-disable-next-line
    }, [props.groups === []]);

    return (
            <Dialog
                fullWidth
                onClose={props.onClose}
                open={props.openDialog}
            >
                <form onSubmit={props.handleSubmit}>
                    <DialogActions>
                        <IconButton size='small' onClick={props.onClose}
                                    aria-label='delete'
                                    color='secondary'>
                            <CloseIcon fontSize='small' color='secondary'/>
                        </IconButton>
                    </DialogActions>
                    <div className={s.Invite}>
                        <Field component={RadioButton} name='type'>
                             <Radio name='person'/> <Radio name='group'/>
                        </Field>
                        {props.type === 'person' ?
                            <Person
                            /> : null}
                        {props.type === 'group' ?
                            <Group
                                onSelectGroup={onSelectGroup}
                                onSelectChecked={onSelectChecked}
                                selectedGroup={props.selectGroup}
                                groups={props.groups}
                                person={props.person}
                            /> : null
                        }
                        <TimeLimits checkTime={checkTime}/>
                        <MixedShowResult/>
                        <div className={s.InvitationLinkTextField}>
                            {props.type === 'link' && props.link !== null
                                ? <TextField
                                    label="Link"
                                    autoFocus
                                    value={props.link}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                /> : null}
                        </div>
                    </div>
                    <DialogActions>
                        <Button color="primary" type='submit'>
                            {props.type === 'link' ? "Get Link" : "Invite"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
    );
};

export default InviteDialog;