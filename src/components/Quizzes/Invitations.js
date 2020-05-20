import React from "react";
import Paper from "@material-ui/core/Paper";
import s from "./Invitations.module.css";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Invitations extends React.Component {
    render() {
        return (
            <Paper square elevation={3} className={s.Root}>
                {this.props.invitations.map((invitation, index) => <InvitationListItem key={index}
                                                                                       value={invitation}/>)}
            </Paper>
        );
    }
}

export default Invitations;

const InvitationListItem = (props) => {
    if (props.value.email !== undefined) {
        return <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>Person</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <PersonListItem
                    email={props.value.email}
                    invited_date={props.value.invited_date}
                    mixed={props.value.mixed}
                    showResults={props.value.showResults}
                    start_date={props.value.start_date}
                    end_date={props.value.end_date}
                    time_limit={props.value.time_limit}
                    session={props.value.session}
                />;
            </ExpansionPanelDetails>
        </ExpansionPanel>

    }
    if (props.value.group_id !== undefined && props.value.group_id !== null) {
        console.log(props.value)
        return <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>Link</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <GroupListItem
                    group={props.value.group}
                    group_name={props.value.group_name}
                    invited_date={props.value.invited_date}
                    mixed={props.value.mixed}
                    showResults={props.value.showResults}
                    start_date={props.value.start_date}
                    end_date={props.value.end_date}
                    time_limit={props.value.time_limit}
                    session={props.value.session}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>

    }
    if (props.value.public) {
        return <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>Link</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <LinkListItem
                    link={props.value.link}
                    created_date={props.value.invited_date}
                    mixed={props.value.mixed}
                    showResults={props.value.showResults}
                    start_date={props.value.start_date}
                    end_date={props.value.end_date}
                    time_limit={props.value.time_limit}
                    session={props.value.session}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    }
    return null;
};

const PersonListItem = (props) => {
    return (
        <Grid
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
                    <span className={s.Email}>{props.email}</span>
                </Grid>
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
                    <Link>See Report</Link>
                </Grid> : null}
        </Grid>
    );
};

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
                    {/*<span className={s.Email}>{props.group_name}</span>*/}
                </Grid>
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
        </Grid>
        //     {props.session.length > 0 ? <Grid item xs={12}> <Link>See Group Report</Link> </Grid> : null}
        //     <Grid item>
        //         <ExpandMoreIcon/>
        //     </Grid>
        //     <Grid container
        //           direction="column"
        //           justify="flex-start"
        //           alignItems="flex-end">
        //         <Grid item xs={11}>
        //             {props.group.map((email) => <div>{email}</div>)}
        //         </Grid>
        //     </Grid>
        // </Grid>
    )
        ;
};

const LinkListItem = (props) => {
    return (
        <div>Link</div>
    );
};
/*
_id: "5ec2ecf6b61f9c409c88b861"
deleted: false
finished: true
public: false
group: []
admin_id: "5ea86b192b827e365edcdb0b"
quiz_id: "5ec2e19300c32243c78b4ea4"
used_quiz_id: "5ec2ecf6b61f9c409c88b860"
invited_date: "2020-05-18T20:15:50.262Z"
start_date: null
end_date: null
time_limit: null
link: "h3vND57Zf41OkJbG"
email: "askargabitm@gmail.com"
name: "Gabit"
surname: "Askar"
*/