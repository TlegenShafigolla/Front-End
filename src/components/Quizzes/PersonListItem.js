import Grid from "@material-ui/core/Grid";
import s from "./Invitations.module.css";
import Chip from "@material-ui/core/Chip";
import React from "react";
import {NavLink} from "react-router-dom";
import Paper from "@material-ui/core/Paper";

const PersonListItem = (props) => {
    return (
        <Paper square
               className={s.PersonListItem}
        >
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start">
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <span className={s.Email}>{props.email}</span>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <span className={s.Invited_date}>Invited:{new Date(props.invited_date).toLocaleString()}</span>
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
                </Grid>
                {props.session ?
                    <Grid item xs={12}>
                        <NavLink to={`/admin/reports/${props.session._id}`}>See Report</NavLink>
                    </Grid> : null}
            </Grid>
        </Paper>
    );
};
export default PersonListItem;