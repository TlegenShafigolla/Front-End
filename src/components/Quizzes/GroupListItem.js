import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

const GroupListItem = (props) => {
    return (
        <Grid container
              direction="column"
              justify="flex-start"
              alignItems="center">
            {props.group.map((val, index) => <Grid container
                                             justify="center"
                                             alignItems="center"
                                             spacing={1}
                                             key={index}>
                    <Typography variant='body1'>{val}</Typography>
                    {props.session !== undefined && props.session.email === val ?
                        <Grid item> <NavLink to={`/admin/group/quiz/report/${props.session.invitation_id}`}>See Report</NavLink> </Grid> : null}
                </Grid>
            )}
        </Grid>

    )
        ;
};
export default GroupListItem;