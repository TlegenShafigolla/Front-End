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

class Group extends React.Component {
    render() {
        return (
            <Grid container
                  direction="column"
                  alignItems="center"
                  justify="center"
                  className={s.Group}>
                <InputLabel htmlFor="grouped-native-select">Groups</InputLabel>
                <Select className={s.GroupName} native variant='outlined'
                        onChange={this.props.onSelectGroup}
                        defaultValue={this.props.groups[this.props.selectedGroup].group_name.toString()}>
                    {this.props.groups.map((val, index) =>
                        <option key={val._id} value={index}>{val.group_name}</option>
                    )}
                </Select>
                <FormControl required error={false} component="fieldset" className={s.FormControl}>
                    <FormGroup>
                        <Paper style={{maxHeight: 150, overflowY: 'auto', margin: 'auto'}} className={s.GroupMembers} elevation={0}>
                            <List>
                                {this.props.groups[this.props.selectedGroup].members.map((val, index) =>
                                    <ListItem key={index} role={undefined} dense button
                                              onClick={() => this.props.onSelectChecked(val.email)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={this.props.selectedPersons[val.email]}
                                                disableRipple
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
    }
}

export default Group;