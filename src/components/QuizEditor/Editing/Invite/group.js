import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import s from './invite.module.css'
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const Group = (props) => {
    return (
        <Grid container
              direction="column"
              alignItems="center"
              justify="center"
              className={s.Group}>
            <InputLabel htmlFor="grouped-native-select">Groups</InputLabel>
            <Select className={s.GroupName} native variant='outlined'
                    onChange={props.onSelectGroup}
                    defaultValue={props.groups[props.selectedGroup].group_name.toString()}>
                {props.groups.map((val, index) =>
                    <option key={val._id} value={index}>{val.group_name}</option>
                )}
            </Select>
            <FormControl required error={false} component="fieldset" className={s.FormControl}>
                <FormGroup>
                    <Paper style={{maxHeight: 150, overflowY: 'auto', margin: 'auto'}} className={s.GroupMembers}
                           elevation={0}>
                        <List>
                            {props.person.map((val, index) =>
                                <ListItem key={index} role={undefined} dense button
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={val._id !== 0}
                                            disableRipple
                                            onChange={(e) => props.onSelectChecked(e, index)}
                                            color="primary"
                                            inputProps={{'aria-labelledby': `checkbox-list-label-1`}}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={index} primary={val.email}/>
                                </ListItem>)}
                        </List>
                    </Paper>
                </FormGroup>
            </FormControl>
        </Grid>
    )
};

export default Group;