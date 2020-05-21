import Grid from "@material-ui/core/Grid";
import s from "./Invitations.module.css";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const GroupListItem = (props) => {
    console.log(props)
    return (<Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={s.PersonListItem}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start">
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <span className={s.Invited_date}>Invited:{props.invited_date}</span>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="flex-start">
                <Grid item>
                    <Chip
                        size="small"
                        label="Mixed"
                        variant="outlined"
                        color={props.mixed ? "primary" : "secondary"}
                    />
                </Grid>
                <Grid item>
                    <Chip
                        size="small"
                        label="Show Results"
                        variant="outlined"
                        color={props.showResults ? "primary" : "secondary"}
                    />
                </Grid>
            </Grid>
            {props.time_limit ?
                <Grid item>
                    <Chip
                        size="small"
                        label={"Time Limit: " + props.time_limit + "m"}
                        variant="outlined"
                        color="primary"
                    />
                </Grid> : null}
            {props.start_date ?
                <Grid item>
                    <Chip
                        size="small"
                        label="Start Date"
                        variant="outlined"
                        color="primary"
                    />
                </Grid> : null}
            {props.end_date ? <Grid item>
                <Chip
                    size="small"
                    label="End Date"
                    variant="outlined"
                    color="primary"
                />
            </Grid> : null}
            {props.session.length > 0 ? <Grid item xs={12}> <Link>See Group Report</Link> </Grid> : null}

            <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="center">
                {props.group.map((email, index) => <div key={index}>{email}</div>)}
            </Grid>
        </Grid>

    )
        ;
};
export default GroupListItem;