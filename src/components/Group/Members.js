import React from "react";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import s from './EditGroup.module.css'
const Members = (props) => {
    return (
        <div className={s.Members} >
            {props.val.email}
            <IconButton size='small' onClick={()=>props.onDeleteMember(props.val._id,props.path)}><HighlightOffIcon fontSize='small'/></IconButton>
        </div>
    )
}
export default Members;