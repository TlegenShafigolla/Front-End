import React from 'react'
import s from './GroupPreview.module.css'
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const Group = (props) => {
    return (
        <div className={s.GroupsPreview}>
            <div onClick={() => props.onClickGroup(props.val._id)}>
                <Typography>{props.val.group_name}</Typography>
                <Typography>Members: {props.val.members.length}</Typography>
            </div>
            <IconButton size='small'
                        onClick={() => props.deleteGroup(props.val._id)}
                        aria-label='delete'>
                <DeleteIcon color='primary'/>
            </IconButton>
        </div>
    )
}
export default Group;