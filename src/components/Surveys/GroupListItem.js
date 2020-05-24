import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import React from "react";
import Typography from "@material-ui/core/Typography";

const GroupSurveyListItem = (props) => {
    let group = props.group
    let email = props.session.email;
    console.log(email)


    return (
        <Grid container
              direction="column"
              justify="flex-start"
              alignItems="center">
            {group.map((val, index) => <Grid container
                                             justify="center"
                                             alignItems="center"
                                             spacing={1}
                                             key={index}>
                    <Typography variant='body1'>{val}</Typography>
                    {props.session !== undefined && props.session.email === val ?
                        <Grid item> <Link>See Report</Link> </Grid> : null}
                </Grid>
            )}
        </Grid>

    )
        ;
};
export default GroupSurveyListItem;