import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import s from './invite.module.css'

const Group = (props) => {
    if (props.groups.length === 0) {
        return (<div>
            group undefined
        </div>)
    }

    return (
        <div>
            <InputLabel htmlFor="grouped-native-select">Groups</InputLabel>
            <Select className={s.GroupName} native autoWidth={true}  variant='outlined' onChange={props.onSelectGroup}
                    defaultValue={props.groups[0].group_name.toString()}>
                {props.groups.map((val, index) =>
                    <option key={val._id} value={index + 1}>{val.group_name}</option>
                )}
            </Select>
        </div>
    )
};
export default Group;