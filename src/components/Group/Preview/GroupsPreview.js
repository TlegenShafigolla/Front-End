import React from "react";
import Button from "@material-ui/core/Button";
import Group from "./Group";
import s from './GroupPreview.module.css'

const GroupsPreview = (props) => {

    return (<div className={s.Groups}>
        {props.groups.map(val => <Group deleteGroup={props.deleteGroup} key={val._id} val={val}/>)}
        <Button color='primary' size='medium'
                onClick={props.addNewGroup}>
            Create group
        </Button>
    </div>);
}


export default GroupsPreview;