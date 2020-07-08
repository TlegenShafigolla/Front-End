import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import Group from "./Group";
import Grid from "@material-ui/core/Grid";
import Preloader from "../common/Preloader";

const GroupsPreview = (props) => {
    const [id,setId]=useState(null)
    useEffect(() => {
        props.requestGroup()
        // eslint-disable-next-line
    }, [])

    const deleteGroup = (group_id) => {
        if(props.disableButton){
            return null;
        }
        props.deleteGroups(group_id)
    };
    const addNewGroup = () => {
        if(props.disableButton){
            return null;
        }
        props.createNewGroup(setId)
    }
    const onClickGroup = (id) => {
        props.history.push(`/admin/group/${id}`)
    };

    if (id !== null) {
        props.history.push(`/admin/group/${id}`)
    }
    if(props.groups===null){
      return <Preloader/>
    }
    return (
        <Grid
            container
            justify="center"
            alignItems="flex-start">
            <Grid item lg={6} md={8} sm={10} xs={12}>
                {props.groups.map(val => <Group onClickGroup={onClickGroup}
                                                deleteGroup={deleteGroup}
                                                key={val._id}
                                                val={val}/>)}
                <Button color='primary' size='medium'
                        onClick={addNewGroup}>
                    Create group
                </Button>
            </Grid>

        </Grid>
    );
}

export default GroupsPreview;