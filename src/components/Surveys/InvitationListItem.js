import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import React from "react";
import s from "../Quizzes/Invitations.module.css"
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import PersonSurveyListItem from "./PersonListItem";
import GroupSurveyListItem from "./GroupListItem";

const InvitationSurveyListItem = (props) => {
    if (props.value.email !== undefined) {
        return <PersonSurveyListItem
            email={props.value.email}
            invited_date={props.value.invited_date}
            mixed={props.value.mixed}
            showResults={props.value.showResults}
            start_date={props.value.start_date}
            end_date={props.value.end_date}
            time_limit={props.value.time_limit}
            session={props.value.session}
        />;


    }
    if (props.value.group_id !== undefined && props.value.group_id !== null) {
        return <ExpansionPanel square style={{marginTop: '5px'}}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    className={s.GroupListItem}>
                    <Typography variant='body2'>{props.value.group_name}</Typography>
                    <Typography style={{marginLeft:'10px'}} variant='body2'>Invited: {new Date(props.value.invited_date).toLocaleString()}</Typography>
                    <Grid
                        container
                        justify="space-evenly"
                        alignItems="flex-start">
                        <Grid item>
                            <Chip
                                size="small"
                                label="Mixed"
                                variant="outlined"
                                color={props.value.mixed ? "primary" : "secondary"}
                            />
                        </Grid>
                        <Grid item>
                            <Chip
                                size="small"
                                label="Show Results"
                                variant="outlined"
                                color={props.value.showResults ? "primary" : "secondary"}
                            />
                        </Grid>
                        {props.value.time_limit ?
                            <Grid item>
                                <Chip
                                    size="small"
                                    label={"Time Limit: " + props.value.time_limit + "m"}
                                    variant="outlined"
                                    color="primary"
                                />
                            </Grid> : null}
                        {props.value.start_date ?
                            <Grid item>
                                <Chip
                                    size="small"
                                    label="Start Date"
                                    variant="outlined"
                                    color="primary"
                                />
                            </Grid> : null}
                        {props.value.end_date ? <Grid item>
                            <Chip
                                size="small"
                                label="End Date"
                                variant="outlined"
                                color="primary"
                            />
                        </Grid> : null}
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <GroupSurveyListItem
                    group={props.value.group}
                    session={props.value.session}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>

    }
    // if (props.value.public) {
    //     return <ExpansionPanel square style={{marginTop: '5px'}}>
    //         <ExpansionPanelSummary
    //             expandIcon={<ExpandMoreIcon/>}
    //         >
    //             <Grid
    //                 container
    //                 direction="column"
    //                 justify="flex-start"
    //                 alignItems="center"
    //                 className={s.GroupListItem}>
    //                 <Typography variant='body2'>{props.value.link}</Typography>
    //                 <Typography style={{marginLeft:'10px'}} variant='body2'>Invited: {new Date(props.value.invited_date).toLocaleString()}</Typography>
    //                 <Grid
    //                     container
    //                     justify="space-evenly"
    //                     alignItems="flex-start">
    //                     <Grid item>
    //                         <Chip
    //                             size="small"
    //                             label="Mixed"
    //                             variant="outlined"
    //                             color={props.value.mixed ? "primary" : "secondary"}
    //                         />
    //                     </Grid>
    //                     <Grid item>
    //                         <Chip
    //                             size="small"
    //                             label="Show Results"
    //                             variant="outlined"
    //                             color={props.value.showResults ? "primary" : "secondary"}
    //                         />
    //                     </Grid>
    //                     {props.value.time_limit ?
    //                         <Grid item>
    //                             <Chip
    //                                 size="small"
    //                                 label={"Time Limit: " + props.value.time_limit + "m"}
    //                                 variant="outlined"
    //                                 color="primary"
    //                             />
    //                         </Grid> : null}
    //                     {props.value.start_date ?
    //                         <Grid item>
    //                             <Chip
    //                                 size="small"
    //                                 label="Start Date"
    //                                 variant="outlined"
    //                                 color="primary"
    //                             />
    //                         </Grid> : null}
    //                     {props.value.end_date ? <Grid item>
    //                         <Chip
    //                             size="small"
    //                             label="End Date"
    //                             variant="outlined"
    //                             color="primary"
    //                         />
    //                     </Grid> : null}
    //                 </Grid>
    //             </Grid>
    //         </ExpansionPanelSummary>
    //         <ExpansionPanelDetails>
    //             <LinkListItem
    //                 link={props.value.link}
    //                 created_date={props.value.invited_date}
    //                 mixed={props.value.mixed}
    //                 showResults={props.value.showResults}
    //                 start_date={props.value.start_date}
    //                 end_date={props.value.end_date}
    //                 time_limit={props.value.time_limit}
    //                 session={props.value.session}
    //             />
    //         </ExpansionPanelDetails>
    //     </ExpansionPanel>
    // }
    return null;
};

export default InvitationSurveyListItem;